import API_BASE_URL from '../../../../config.js';

document.addEventListener("DOMContentLoaded", function () {
    const usersButton = document.getElementById('users-button');
    const gridsButton = document.getElementById('grids-button');
    const logoutButton = document.getElementById('logout-button');
    const usersSection = document.getElementById('users-section');
    const gridsSection = document.getElementById('grids-section');
    const usersList = document.getElementById('users-list');
    const gridsList = document.getElementById('grids-list');

    usersButton.addEventListener('click', function () {
        usersSection.classList.add('visible');
        gridsSection.classList.remove('visible');
        fetchUsers();
    });

    gridsButton.addEventListener('click', function () {
        gridsSection.classList.add('visible');
        usersSection.classList.remove('visible');
        fetchGrids();
    });


    logoutButton.addEventListener('click', function logout() {
        if (confirm('Are you sure you want to log out?')) {
            // Suppression du cookie PHPSESSID (ou tout autre cookie de session)


            // Effectuer une requête POST pour la déconnexion
            fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname;
                    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                    alert(data.succes); // Afficher un message de succès
                    // Rediriger après la déconnexion
                    window.location.href = '/projet-d-web/admin/';
                } else {
                    alert('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
                alert('Logout failed');
            });
        }
    });

    function fetchUsers() {
        fetch(`${API_BASE_URL}/admin/getUsers`) //----------------------------------------------------------
            .then(response => response.json())
            .then(users => {
                usersList.innerHTML = '';
                console.log(users);
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${user.username} (${user.email})</span>
                        <button class="delete-button" data-id="${user.id}">Delete</button>
                    `;
                    usersList.appendChild(li);
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', function () {
                        const userId = this.dataset.id;
                        deleteUser(userId);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    function fetchGrids() {
        fetch(`${API_BASE_URL}/admin/getGrids`)
            .then(response => response.json())
            .then(grids => {
                console.log(grids);
                gridsList.innerHTML = '';
                grids.forEach(grid => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${grid.nom} - ${grid.description} (${grid.niveau_difficulte})</span>
                        <button class="delete-button" data-id="${grid.id}">Delete</button>
                    `;
                    gridsList.appendChild(li);
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', function () {
                        const gridId = this.dataset.id;
                        deleteGrid(gridId);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching grids:', error);
            });
    }

    function deleteUser(userId) {
        fetch(`${API_BASE_URL}/admin/deleteUser/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                if (data[0] === "Utilisateur supprimé") {
                    alert(data[0]);
                    fetchUsers();
                } else {
                    alert('Error deleting user.');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    function deleteGrid(gridId) {
        fetch(`${API_BASE_URL}/admin/deleteGame/${gridId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                if (data[0] === "Grille supprimée") {
                    alert(data[0]);
                    fetchGrids();
                } else {
                    alert('Error deleting grid.');
                }
            })
            .catch(error => {
                console.error('Error deleting grid:', error);
            });
    }



function addUser(username, email, password) {
    fetch(`${API_BASE_URL}/admin/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data[0]=='Utilisateur ajouté avec succès') {
                alert('Utilisateur ajouté avec succès');
                fetchUsers(); // Rafraîchir la liste des utilisateurs
            } else if (data.includes('Adresse email déjà utilisée')) {
                alert('Adresse email déjà utilisée');
            } else if (data.includes('Adresse email non valide')) {
                alert('Adresse email non valide');
            } else {
                alert('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur');
            }
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
}



const addUserButton = document.getElementById('add-user-button');
const addUserModal = document.getElementById('add-user-modal');
const closeModalButton = document.getElementById('close-modal-button');
const addUserForm = document.getElementById('add-user-form');

// Afficher le formulaire modal
addUserButton.addEventListener('click', () => {
    addUserModal.classList.remove('hidden');
});

// Cacher le formulaire modal
closeModalButton.addEventListener('click', () => {
    addUserModal.classList.add('hidden');
});

// Soumettre le formulaire
addUserForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    addUser(username, email, password); // Fonction d'ajout de l'utilisateur (à définir)
    addUserModal.classList.add('hidden'); // Fermer le modal après soumission
});




});