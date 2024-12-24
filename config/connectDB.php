<?php 

class Database{
    private $host = 'localhost';
    private $username = 'root'; // private $username = 'projet'
    private $dbname = 'projet';
    private $mdp = '';
    public $pdo;

    public function __construct()
    {
        try{
            $dataSource = "mysql:host={$this->host};dbname={$this->dbname}";
            $this->pdo = new PDO($dataSource,$this->username, $this->mdp,[
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES =>false,
            ]);

        }catch(PDOException $e){
            die("Echec de connexion a la base de données" . $e->getMessage());
        }
    }

    public function getDbConnexion(){
        return $this->pdo;
    }

}

// $connection = new Database();
?>