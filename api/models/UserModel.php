<?php

class User{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    //Inscription
    public function register($username,$email,$password)
    {
        $passwordHash = password_hash($password,PASSWORD_DEFAULT);
        $query = $this->db->prepare("INSERT INTO users (username, email, password, role) VALUES(?,?,?,'user') ");
        $query->bindParam(1,$username);
        $query->bindParam(2,$email);
        $query->bindParam(3,$passwordHash);

        return $query->execute();

    }

    //Connexion
    public function login($email,$password)
    {
        //On réupere l'utilisateur selon son email
        $query = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $query->bindParam(1,$email);
        $query->execute();
        $user = $query->fetch();
        //Si la methode fetch a retourné l'utilisateur et que son mot de passe est correcte alors on retourne l'utilisateur
        if($user && password_verify($password,$user['password'])){
            return $user;
        }else{
            return false;
        }
    }

}

?>