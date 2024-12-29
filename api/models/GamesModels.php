<?php
class GamesModels {

    private $db;

        public function __construct($db)
        {
            $this->db = $db;
        }

    public function getAllGames() {
        $requete = "SELECT id,nom AS name,description FROM grids";
        $stm = $this->db->query($requete);
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFilteredGames($niveau_difficulte = null, $date_de_creation = null)
    {
        $requeteFiltre = "SELECT id, nom AS name, description, niveau_difficulte, date_de_creation FROM grids WHERE 1=1";
        $parametresRequete = [];
    
        if ($niveau_difficulte) {
            $requeteFiltre .= " AND niveau_difficulte = :niveau_difficulte";
            $parametresRequete['niveau_difficulte'] = $niveau_difficulte;
        }
    
        if ($date_de_creation) {
            $requeteFiltre .= " AND DATE(date_de_creation) = :date_de_creation";
            $parametresRequete['date_de_creation'] = $date_de_creation;
        }
    
        $stm = $this->db->prepare($requeteFiltre);
        $stm->execute($parametresRequete);
    
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
?>
