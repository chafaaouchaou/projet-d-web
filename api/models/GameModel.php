<?php

class GameModel {

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    //ajout d'une grille 
    public function addGrid($nom,$description,$defHorizontales,$defVerticales,$colonnes,$lignes,$casesNoire,$solutions,$niveauDifficulte,$utilisateurId){
        // préparation de la requête
        $query = $this->db->prepare("INSERT INTO grids(description, nom, niveau_difficulte, nbr_lignes, nbr_colonnes, def_horizontales, def_verticales, cases_noire, solutions, id_utilisateur) VALUES(?,?,?,?,?,?,?,?,?,?)");
    
        // Formatage des données
        $casesNoireText = implode(' ', $casesNoire); // Ex : "1,1 2,3"
        $defHorizontalesText = implode(',', $defHorizontales); // Ex : "A,B,C"
        $defVerticalesText = implode(',', $defVerticales); // Ex : "X,Y,Z"
    
        // Exécution de la requête
        return $query->execute([
            $description,           
            $nom,                   
            $niveauDifficulte,      
            $lignes,                
            $colonnes,              
            $defHorizontalesText,   
            $defVerticalesText,     
            $casesNoireText,        
            $solutions,             
            $utilisateurId          
        ]);
    }
    //a faire dynamiquement 
    public function getGame($id) {

        $queryGetGameById = "SELECT def_horizontales, def_verticales,nbr_lignes,nbr_colonnes,solutions FROM grids WHERE id = :id";
        $stm = $this->db->prepare($queryGetGameById);
        $stm->bindParam(':id', $id, PDO::PARAM_INT); 
        $stm->execute();
        $result = $stm->fetch(PDO::FETCH_ASSOC);
        return [
            'concatenatedGrid' => $result['solutions'], 
            'rows' => $result['nbr_lignes'],  
            'cols' => $result['nbr_colonnes'], 
            'horizontalDesc' => $result['def_horizontales'], 
            'verticalDesc' => $result['def_verticales'],
        ];
    }
}

?>
