<?php
require_once 'models/GameModel.php';
require_once 'views/GameView.php';

class GameController {
    private $model;
    private $view;

    public function __construct($db) {
        $this->model = new GameModel($db);
        $this->view = new GameView();
    }

    public function showAddGridForm() {
        session_start();
        if(!isset($_SESSION['user_id'])){
            throw new Exception('Une connexion est requise.');
        }
        echo $this->view->renderAddGridForm();
    }

    public function addGrid() {
        session_start();
        header('Content-Type: application/json; charset=utf-8');

        try {
            // Vérification de la requête POST et du type de contenu
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Méthode non autorisée');
            }
    
            if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
                throw new Exception('Le type de contenu doit être application/json');
            }
    
            $donnesGrillesBrutes = file_get_contents("php://input");//permet de recuperer les données 
            $donnesGrille = json_decode($donnesGrillesBrutes, true);
    
            if (!$donnesGrille) {
                throw new Exception('Aucune donnée reçue ou format JSON invalide');
            }
            //verification du nbr de lignes et colonnes entrés
            if($donnesGrille['colonnes'] <= 0 || $donnesGrille['lignes'] <= 0){
                throw new Exception("Le nombre de lignes/colonnes doit etre supérieur a 0");
            }

            //1.verifier si le nbr de def horizontales = nbr lignes 
            if(count($donnesGrille['defHorizontales']) !== $donnesGrille['lignes']){
                throw new Exception("Le nombre de définitions horizontales n'est pas accepté");
            }

            if(count($donnesGrille['defVerticales']) !== $donnesGrille['colonnes']){
                throw new Exception("Le nombre de définitions verticales n'est pas accepté");
            }

            //verifier la taille de la solution si elle est valide 
            // $tailleSol = count($donnesGrille['solution']);
            

            //2.verification de la solution
            $this->ValiderSol($donnesGrille['lignes'],$donnesGrille['colonnes'],$donnesGrille['casesNoire'],$donnesGrille['solutions']);

            //3.calcul ou vérification de la position des cases noires
            $this->verificationCasesNoir($donnesGrille['casesNoire'],$donnesGrille['lignes'],$donnesGrille['colonnes']);


            // Vérifier que l'utilisateur est connecté
            if (!isset($_SESSION['user_id'])) {
                throw new Exception('Une connexion est requise.');
            }
    
            $utilisateurId = $_SESSION['user_id']; // Utilisateur connecté
    
            // Traitement de l'ajout à la base de données
            $resultat = $this->model->addGrid(
                $donnesGrille['nom'], $donnesGrille['description'], $donnesGrille['defHorizontales'], 
                $donnesGrille['defVerticales'], $donnesGrille['colonnes'], $donnesGrille['lignes'], 
                $donnesGrille['casesNoire'], $donnesGrille['solutions'], $donnesGrille['niveauDifficulte'], 
                $utilisateurId
            );
    
            if ($resultat) {
                echo json_encode(['succes' => 'Grille ajoutée avec succès.']);
            } else {
                throw new Exception('Une erreur s\'est produite lors de l\'ajout de la grille.');
            }
    
        } catch (Exception $e) {
            echo json_encode(['erreur' => $e->getMessage()]);
        }
        
    }

    //vérifier que les solutions horizontales et verticales se superposent correctement si le mode de saisie des solutions le nécessite 

    //On doit d'abord représenter notre solution comme une matrice
    private function convSol($solution,$lignes,$colonnes,$caseNoire){
        $grille = [];
        $i = 0;//index qui parcours la solution

        for($l = 0;$l<$lignes; $l++){
            for($c= 0; $c < $colonnes; $c++){
                $case = "$l,$c"; //les coordonnées de la cellule
                //si la cellule est noire alors la case du tableau recevera ■ 
                if(in_array($case,$caseNoire)){
                    $grille[$l][$c] = '■';
                }else{
                    $grille[$l][$c] = $solution[$i++];
                }
            }
        }
        return $grille;
    }

    //verifier la superposition 
    private function ValiderSuperposition($grille, $colonnes, $lignes) {
        for ($l = 0; $l < $lignes; $l++) {
            for ($c = 0; $c < $colonnes; $c++) {
                // Ignorer les cases noires
                if ($grille[$l][$c] === '■') {
                    continue;
                }
    
                // Vérifier uniquement si la position appartient à un croisement
                $hasHorizontal = ($c < $colonnes - 1 && $grille[$l][$c + 1] !== '■');
                $hasVertical = ($l < $lignes - 1 && $grille[$l + 1][$c] !== '■');
    
                if ($hasHorizontal && $hasVertical) {
                    $lettreHorizontal = $grille[$l][$c] ?? null;
                    $lettreVertical = $grille[$l][$c] ?? null;
    
                    if ($lettreHorizontal && $lettreVertical && $lettreHorizontal !== $lettreVertical) {
                        return "Les mots de la solution ne se croisent pas correctement à la position ($l, $c).";
                    }
                }
            }
        }
        return true; // Si tout va bien
    }
    
    

    private function ValiderSol($lignes,$colonnes,$caseNoire,$solution){
        //tester la taille de la solution
        $tailleGrille = $lignes * $colonnes;
        if (mb_strlen($solution) !== $tailleGrille) {
            throw new Exception("La solution n'est pas valide, elle doit avoir   $tailleGrille caractéres.");
        }
        //convertir la solution en une matrice 
        $grille = $this->convSol($solution,$lignes,$colonnes,$caseNoire);

        //valider la superposition
        $valide = $this->ValiderSuperposition($grille,$colonnes,$lignes);

        if($valide !== true){
            throw new Exception($valide);
        }
    }

    //verification des cases noir
    private function verificationCasesNoir($casesNoire,$lignes,$colonnes){
        $position = [];
        foreach($casesNoire as $caseNoir){
            if(!preg_match('/^\d+,\d+$/', $caseNoir)){
                throw new Exception("erreur, Les positions des cases noir doivent etres des entiers non positifs");
            }

            list($x,$y) = explode(',', $caseNoir);
            if($x < 0 || $x >= $lignes || $y < 0 || $y >= $colonnes){
                throw new Exception("Une erreur s'est produite, les positions des cases noirs ne rentrent pas dans les dimensions de la grille ($lignes,$colonnes)");
            }


            //verifier s'il y a des positions qui se répétent
            if(in_array($caseNoir,$position)){
                throw new Exception("$caseNoir se répète !");
            }
            $position[] = $caseNoir;
        }
    }

    public function getGame($id) {
        // Ici tu peux récupérer les informations du jeu avec l'ID $id depuis la base de données
        $game = $this->model->getGame($id);
        header('Content-Type: application/json');
        echo json_encode($game);
        // $this->view->render($game);

    }

}
