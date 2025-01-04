```markdown
# Instructions pour la gestion de la base de données MySQL

## Étape 1 : Se connecter à MySQL en tant que `root`

1. Ouvre une ligne de commande ou un terminal et connecte-toi à MySQL en utilisant l'utilisateur `root` :

   ```bash
   mysql -u root -p
   ```

2. Saisis le mot de passe de l'utilisateur `root` lorsque cela est demandé.

---

## Étape 2 : Créer la base de données

Une fois connecté, tu peux créer une nouvelle base de données en utilisant la commande suivante :

```sql
CREATE DATABASE cruciweb;
```

Cela créera une base de données appelée `cruciweb`.

---

## Étape 3 : Créer un utilisateur et lui attribuer des droits

Crée un utilisateur et attribue-lui des droits sur la base de données `cruciweb`. Remplace `user-pass` par le mot de passe souhaité.

```sql
CREATE USER 'cruciuser'@'localhost' IDENTIFIED BY 'user-pass';
```

Ensuite, accorde à cet utilisateur tous les privilèges sur la base de données `cruciweb` :

```sql
GRANT ALL PRIVILEGES ON cruciweb.* TO 'cruciuser'@'localhost';
```

Enfin, applique les changements de privilèges avec la commande :

```sql
FLUSH PRIVILEGES;
```

---

## Étape 4 : Créer une table `message`

Maintenant, tu peux créer une table `message` dans la base de données `cruciweb`. Utilise la commande suivante pour créer la table :

```sql
USE cruciweb;

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Cela crée une table `message` avec trois colonnes :
- `id` : un identifiant unique pour chaque message.
- `content` : le contenu du message.
- `created_at` : la date et l'heure à laquelle le message a été créé.

---

## Étape 5 : Insérer des données dans la table `message`

Insère un message dans la table en utilisant la commande suivante :

```sql
INSERT INTO message (content) VALUES ('Hello, this is your message!');
```

Tu peux ajouter autant de messages que tu veux en remplaçant le contenu dans la commande `INSERT INTO`.

---

## Étape 6 : Vérifier les données

Pour vérifier que les données ont été insérées correctement, utilise cette commande :

```sql
SELECT * FROM message;
```

Cela affichera tous les messages stockés dans la table `message`.

---

## Étape 7 : Se déconnecter de MySQL

Lorsque tu as terminé, tu peux te déconnecter de MySQL avec la commande suivante :

```sql
EXIT;
```

---

## Résumé des commandes

```bash
mysql -u root -p
```

```sql
CREATE DATABASE cruciweb;
CREATE USER 'cruciuser'@'localhost' IDENTIFIED BY 'user-pass';
GRANT ALL PRIVILEGES ON cruciweb.* TO 'cruciuser'@'localhost';
FLUSH PRIVILEGES;
USE cruciweb;
CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO message (content) VALUES ('Hello, this is your message!');
SELECT * FROM message;
EXIT;
```

---

## Conclusion

Tu as maintenant créé une base de données, un utilisateur avec des droits sur cette base de données, une table `message`, et inséré des données de test. Tu peux continuer à travailler avec cette base pour ajouter plus de fonctionnalités à ton projet.

```

### Explication des étapes :
- **Étape 1** : Connexion à MySQL en tant qu'administrateur `root`.
- **Étape 2** : Création de la base de données `cruciweb`.
- **Étape 3** : Création de l'utilisateur `cruciuser` et attribution des privilèges.
- **Étape 4** : Création de la table `message` pour stocker les messages.
- **Étape 5** : Insertion d'un message dans la table.
- **Étape 6** : Vérification des données insérées avec une requête `SELECT`.
- **Étape 7** : Déconnexion de MySQL.

N'oublie pas de tester chaque étape pour t'assurer que tout fonctionne correctement.