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

         
        // Hardcoded data for demonstration
        // return [
        //     ["id" => 1, "name" => "Game 1", "description" => "Description of Game 1"],
        //     ["id" => 2, "name" => "Game 2", "description" => "Description of Game 2"],
        //     ["id" => 3, "name" => "Game 3", "description" => "Description of Game 3"],
        //     ["id" => 4, "name" => "Game 4", "description" => "Description of Game 4"],
        //     ["id" => 5, "name" => "Game 5", "description" => "Description of Game 5"]
        // ];
    
?>
