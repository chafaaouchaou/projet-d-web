# Project: CruciWeb - A Crossword Puzzle Application

CruciWeb is a web application designed for players to create and solve crossword grids. The project uses a structured approach with PHP for the backend, adopting the MVC architecture, and organizes frontend resources in dedicated folders for each page, containing the corresponding HTML, CSS, and JavaScript files.

# Project Installation and Configuration

## 0. Moving the Project Folder
Place the **projet-d-web** folder in the following directory:  
`/var/www/html/`

---

## 1. Project Configuration
If you need to change the web application settings:

### 1. Database Connection Settings
- If you are using a different database than the default `projet`
- Modify the file: `config/connectDB.php`.

#### Note
If you change these details, adjust the following database configuration instructions accordingly.

### 2. Host IP Address
- If the hosting IP address of the application is different from `192.168.76.76`, modify the following files:
  - `config.js`
  - `global.js`
- Replace `192.168.76.76` with the new IP address.

---

## 2. Database Configuration

### Steps:
1. Log in as the **projet** user:  
   ```bash
   mysql -u projet -p
   ```
   **Password**: `tejorp`

2. Select the **projet** database:  
   ```sql
   USE projet;
   ```

3. Import the SQL file:  
   ```sql
   SOURCE /var/www/html/projet-d-web/projet.sql;
   ```

4. Disconnect from the database:  
   ```sql
   exit
   ```

---
🌐 Live demo: [https://cruciweb.chafaaouchaou.online/projet-d-web/CruciWeb/games/](https://cruciweb.chafaaouchaou.online/projet-d-web/CruciWeb/games/)




## 3. Apache Configuration

### Steps:
1. Log in as **root**:  
   ```bash
   su -
   ```
   **Password**: `rotomagus`

2. Edit the `000-default.conf` configuration file:  
   ```bash
   nano /etc/apache2/sites-available/000-default.conf
   ```

3. Replace the existing content with the following code:  
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

4. Save and close the file:  
   - **Save**: Press `Ctrl + O`, then **Enter**  
   - **Exit**: Press `Ctrl + X`

5. Run the following commands to apply the changes:  
   ```bash
   a2enmod rewrite
   systemctl restart apache2
   ```

---

## 6. Quick Guide

### Accessing the Website:
To explore the website, go to the following URL:  
`http://192.168.76.76/projet-d-web/CruciWeb/`

From this URL, you can navigate the site using the navigation bar.  
You can create an account or use an existing one to log in:  
- **Email**: `chafaaouchaou@proton.me`
- **Password**: `tYsy*R62EwhHhb1*mxZY`

### Accessing the Admin Panel:
Go to the following URL:  
`http://192.168.76.76/projet-d-web/admin/`

- **Admin Account**:  
  - **Email**: `admin@gmail.com`  
  - **Password**: `123456`

### Accessing API Endpoints:
You can use the following URL:  
`http://192.168.76.76/projet-d-web/api/games`

A description of the different endpoints is available in the report.
