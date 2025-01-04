# Project: CruciWeb - A Crossword Puzzle Application

CruciWeb is a web application designed for players to create and solve crossword grids. The project uses a structured approach with PHP for the backend, adopting the MVC architecture, and organizes frontend resources in dedicated folders for each page, containing the corresponding HTML, CSS, and JavaScript files.

---

## Project Structure

```
├── 📁Nouveau dossier
    ├── 📁admin
        ├── 📁assets
            ├── 📁css
                └── login.css
            ├── 📁js
                └── login.js
        ├── 📁dashboard
            ├── 📁assets
                ├── 📁css
                    └── dashboard.css
                ├── 📁js
                    └── dashboard.js
            └── index.html
        └── index.html
    ├── 📁api
        ├── .htaccess
        ├── 📁controllers
            ├── 📁admin
                ├── AdminController.php
                ├── AdminManipController.php
            ├── GameController.php
            ├── GamesController.php
            ├── MessageController.php
            ├── SavedGameController.php
            ├── UserController.php
        ├── index.php
        ├── 📁models
            ├── 📁admin
                ├── AdminManipModel.php
                ├── AdminModel.php
            ├── GameModel.php
            ├── GamesModels.php
            ├── MessageModel.php
            ├── MessageModelbasic.php
            ├── SavedGameModel.php
            ├── UserModel.php
        ├── routes.php
        ├── test.php
        ├── 📁views
            ├── GamesView.php
            ├── GameView.php
            ├── MessageView.php
    ├── 📁config
        └── connectDB.php
    ├── 📁CruciWeb
        ├── 📁assets
            ├── 📁css
                └── styles.css
            ├── 📁js
                └── home.js
        ├── 📁connection
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁images
                    └── logo.png.png
                ├── 📁js
                    └── app.js
            └── index.html
        ├── 📁creergrid
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁js
                    └── script.js
            └── index.html
        ├── 📁game
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁js
                    └── script.js
            └── index.html
        ├── 📁games
            ├── 📁assets
                ├── 📁css
                    └── styless.css
                ├── 📁images
                    ├── arrow.png
                    ├── card-image.png
                    ├── search.png
                ├── 📁js
                    └── games.js
            └── index.html
        ├── index.html
        ├── 📁inscription
            ├── 📁assets
                ├── 📁css
                    └── styles.css
                ├── 📁images
                    └── logo.png.png
                ├── 📁js
                    └── app.js
            └── index.html
        ├── 📁mygames
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁images
                    ├── bin.png
                    ├── card-image.png
                ├── 📁js
                    └── script.js
            └── index.html
        ├── 📁mygrids
            └── index.html
        ├── 📁profile
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁images
                    └── avatar.png
                ├── 📁js
            └── index.html
        ├── 📁sgame
            ├── 📁assets
                ├── 📁css
                    └── style.css
                ├── 📁js
                    └── script.js
            └── index.html
    ├── bin.txt
    ├── config.js
    ├── Déploiment.md
    ├── global.css
    ├── global.js
    ├── index.html
    ├── info.php
    ├── normalize.css
    ├── projet.sql
    ├── readme.md
```

---


---

## How to Deploy
1. Follow the setup instructions in the [Déploiment.md](Déploiment.md) file.


---

