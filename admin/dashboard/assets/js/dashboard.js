document.addEventListener("DOMContentLoaded", function () {
    const usersButton = document.getElementById('users-button');
    const gridsButton = document.getElementById('grids-button');
    const addUserButton = document.getElementById('add-user-button');
    const logoutButton = document.getElementById('logout-button');
    const usersSection = document.getElementById('users-section');
    const gridsSection = document.getElementById('grids-section');
    const usersList = document.getElementById('users-list');
    const gridsList = document.getElementById('grids-list');

    usersButton.addEventListener('click', function () {
        usersSection.classList.add('visible');
        gridsSection.classList.remove('visible');
        addUserButton.classList.remove('hidden');
        fetchUsers();
    });

    gridsButton.addEventListener('click', function () {
        gridsSection.classList.add('visible');
        usersSection.classList.remove('visible');
        addUserButton.classList.add('hidden');
        fetchGrids();
    });

    addUserButton.addEventListener('click', function () {
        const username = prompt("Enter user username:");
        const email = prompt("Enter user email:");
        const password = prompt("Enter user password:");
        if (email && password) {
            addUser(username,email, password);
        }
    });

    logoutButton.addEventListener('click', function logout() {
        if (confirm('Are you sure you want to log out?')) {
            // Suppression du cookie PHPSESSID (ou tout autre cookie de session)
            document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname;
            document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

            // Effectuer une requête POST pour la déconnexion
            fetch('http://localhost/projet-d-web/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    alert(data.succes); // Afficher un message de succès
                    // Rediriger après la déconnexion
                    window.location.href = 'http://localhost/projet-d-web/admin/';
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
        fetch('http://localhost/projet-d-web/api/admin/getUsers')
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
        fetch('http://localhost/projet-d-web/api/admin/getGrids')
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

    function addUser(username,email, password) {
        console.log(JSON.stringify({username, email, password }));
    
        fetch('http://localhost/projet-d-web/api/admin/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                if (data.succes) {
                    alert(data.succes);
                    fetchUsers();
                } else {
                    alert('Error adding user.');
                }
            })
            .catch(error => {
                console.error('Error adding user:', error);
                alert('Error adding user: ' + error.message);
            });
    }
    


    function deleteUser(userId) {
        fetch(`http://localhost/projet-d-web/api/admin/deleteUser/${userId}`, {
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
        fetch(`http://localhost/projet-d-web/api/admin/deleteGame/${gridId}`, {
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
});