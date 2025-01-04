# Installation et Configuration du Projet

## 0. Déplacement du Dossier du Projet
Placez le dossier **projet-d-web** dans le répertoire suivant :  
`/var/www/html/`

---

## 1. Configuration du Projet
Si vous avez besoin de changer les paramètres de l'application web :

### 1. Paramètres de connexion à la base de données
- si vous utilisez une base de données defférente de celle de la notice `projet`
- Modifiez le fichier : `config/connectDB.php`.

#### remarque
Si vous changez ces informations, adaptez les instructions de configuration de la base de données qui suivent.

### 2. Adresse IP de l'hôte
- Si l'adresse IP d'hébergement de l'application est différente de `192.168.76.76`, effectuez les modifications dans les fichiers suivants :
  - `config.js`
  - `global.js`
- Remplacez `192.168.76.76` par la nouvelle adresse IP.



---

## 2. Configuration de la Base de Données

### Étapes :
1. Connectez-vous en tant qu'utilisateur **projet** :  
   ```bash
   mysql -u projet -p
   ```
   **Mot de passe** : `tejorp`

2. Sélectionnez la base de données **projet** :  
   ```sql
   USE projet;
   ```

3. Importez le fichier SQL :  
   ```sql
   SOURCE /var/www/html/projet-d-web/projet.sql;
   ```

4. Déconecter vous de la base de données : 
   ```sql
   exit
   ```
---

## 3. Configuration d'Apache

### Étapes :
1. Connectez-vous en tant que **root** :  
   ```bash
   su -
   ```
   **Mot de passe** : `rotomagus`

2. Modifiez le fichier de configuration 000-default.conf :  
   ```bash
   nano /etc/apache2/sites-available/000-default.conf
   ```

3. Remplacez le contenu existant par le code suivant :  
   ```apache
   <VirtualHost *:80>
       DocumentRoot /var/www/html

       <Directory /var/www/html>
           AllowOverride All
           Require all granted
           Options Indexes FollowSymLinks MultiViews
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

4. Enregistrez et fermez le fichier :  
   - **Sauvegarder** : `Ctrl + O`, puis appuyez sur **Entrée**  
   - **Quitter** : `Ctrl + X`

5. Exécutez les commandes suivantes pour activer les modifications :  
   ```bash
   a2enmod rewrite
   systemctl restart apache2
   ```

---

## 6. Guide Rapide

### Accéder au site web :
Pour explorer le site web, accédez à l'URL suivante :  
`http://192.168.76.76/projet-d-web/CruciWeb/`

À partir de cette URL, vous pourrez naviguer sur le site en utilisant la barre de navigation.  
Vous pouvez créer un compte ou utiliser un compte existant pour vous connecter :  
- **Email** : `chafaaouchaou@proton.me`
- **Mot de passe** : `tYsy*R62EwhHhb1*mxZY`

### Accéder au panneau administrateur :
Rendez-vous à l'URL suivante :  
`http://192.168.76.76/projet-d-web/admin/`

- **Compte admin** :  
  - **Email** : `admin@gmail.com`  
  - **Mot de passe** : `123456`

### Accéder aux endpoints API :
Vous pouvez utiliser l'URL suivante :  
`http://192.168.76.76/projet-d-web/api/games`

Une description des différents endpoints est disponible dans le rapport.

