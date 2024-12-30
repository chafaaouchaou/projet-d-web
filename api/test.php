<?php
// Configuration de la base de données
$host = 'localhost';
$dbname = 'projet';
$user = 'projet';
$password = 'tejorp';

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Données utilisateur
    $username = 'cccccc';
    $email = 'testusccccccer@example.com';
    $password = 'password123';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Requête SQL
    $sql = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, 'user')";
    $stmt = $pdo->prepare($sql);

    // Liaison des paramètres
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashedPassword);

    // Exécution de la requête
    if ($stmt->execute()) {
        echo "Utilisateur inséré avec succès.";
    } else {
        echo "Erreur lors de l'insertion de l'utilisateur.";
    }
} catch (PDOException $e) {
    // Afficher les erreurs PDO
    echo "Erreur : " . $e->getMessage();
}
?>
