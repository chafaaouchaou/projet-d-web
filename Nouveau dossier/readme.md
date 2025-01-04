
---

## Structure du Projet

```

htdocs/
├── api/
│   ├── controllers/
│   │   └── MessageController.php
│   ├── models/
│   │   └── MessageModel.php
│   ├── views/
│   │   └── JsonView.php
│   ├── .htaccess
│   ├── index.php
│   └── routes.php
├── CruciWeb/
│   ├── about/
│   │   ├── assets/
│   │   │   └── css
│   │   │   └── js
│   │   └── index.html
│   ├── home/
│   │   ├── assets/
│   │   │   └── css
│   │   │   └── js
│   │   └── index.html
│   ├── assets/
│   │       └── css
│   │       └── js
│   │   
│   └── index.html
│
├── index.html
├── global.css
└── README.md
```

---

### **Explications des dossiers et fichiers :**

#### **1. Racine principale :**
- **`htdocs/`** : Dossier principal contenant tout le projet (API et front-end).

---

#### **2. Dossier `api/` (backend) :**
Ce dossier suit une architecture **MVC** (Model-View-Controller).

- **`controllers/`** :  
  Contient les contrôleurs responsables de la gestion des requêtes et de la logique métier.
  - Exemple : `MessageController.php` pour la gestion des messages.

- **`models/`** :  
  Définit les modèles, qui manipulent les données.
  - Exemple : `MessageModel.php` pour gérer les données des messages.

- **`views/`** :  
  Gère les réponses backend (généralement au format JSON).
  - Exemple : `JsonView.php` pour construire les réponses JSON.

- **`.htaccess`** :  
  Fichier de configuration Apache pour gérer la réécriture d'URL, permettant d'accéder à des routes plus conviviales comme `/api/message`.

- **`index.php`** :  
  Point d'entrée principal de l'API. Peut être utilisé pour des tests rapides ou comme base pour d'autres requêtes.

- **`routes.php`** :  
  Fichier qui contient la logique des routes. Chaque URL est associée à un contrôleur.

---

#### **3. Dossier `CruciWeb/` (front-end) :**
Ce dossier contient le front-end, organisé par pages.

- **`about/`** :  
  Dossier pour la page "À propos".
  - **`index.html`** : Page principale "À propos".
  - **`assets/`** : Contient les ressources spécifiques à cette page (CSS, images, etc.).

- **`home/`** :  
  Dossier pour la page d'accueil.
  - **`index.html`** : Page principale de l'accueil.
  - **`assets/`** : Contient les ressources spécifiques à cette page (CSS, images, etc.).

- **`assets/`** :  
  Contient des ressources spécifiques a la page principale.

- **`index.html`** :  
  Page principale servant de point d'entrée au front-end.

---

#### **4. Fichiers supplémentaires :**
- **`index.html`** (racine) : Elle ne sera pas utilisé.
- **`global.css`** : Fichier de styles CSS global, utilisé pour définir des styles communs à toutes les pages.

---

## Notes importantes :


1. **Améliorations possibles :**
   - Revoir les TP web pour améliorer la gestion des requêtes HTTP.

---

## Utilisation :


2. **Déploiement front-end (CruciWeb)** :
   - Déployer le dossier `CruciWeb/` dans le répertoire `htdocs` d'Apache.
   - Accéder aux différentes pages via **http://localhost/CruciWeb/** ou **http://localhost/CruciWeb/about/** ....

3. **Test de l'API** :
   - Accéder aux routes de l'API, par exemple :
     - **http://localhost/api/message** pour récupérer un message.

---

### Exemple de résultat attendu :
- Accès à **http://localhost/CruciWeb/** : Charge la page d'accueil.
- Accès à **http://localhost/api/message** : Retourne une réponse JSON comme :
  ```json
  {
      "message": "Hello from the MVC PHP API!"
  }
  ```

---
```
