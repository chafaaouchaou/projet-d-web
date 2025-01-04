import API_BASE_URL from '../../../../config.js';

class AdminDashboard {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        // Buttons
        this.usersButton = document.getElementById('users-button');
        this.gridsButton = document.getElementById('grids-button');
        this.logoutButton = document.getElementById('logout-button');
        this.addUserButton = document.getElementById('add-user-button');
        this.closeModalButton = document.getElementById('close-modal-button');

        // Sections and Lists
        this.usersSection = document.getElementById('users-section');
        this.gridsSection = document.getElementById('grids-section');
        this.usersList = document.getElementById('users-list');
        this.gridsList = document.getElementById('grids-list');

        // Modal and Form
        this.addUserModal = document.getElementById('add-user-modal');
        this.addUserForm = document.getElementById('add-user-form');
    }

    initializeEventListeners() {
        this.usersButton.addEventListener('click', () => this.showUsersSection());
        this.gridsButton.addEventListener('click', () => this.showGridsSection());
        this.logoutButton.addEventListener('click', () => this.handleLogout());
        this.addUserButton.addEventListener('click', () => this.showAddUserModal());
        this.closeModalButton.addEventListener('click', () => this.hideAddUserModal());
        this.addUserForm.addEventListener('submit', (e) => this.handleAddUserSubmit(e));
    }

    showUsersSection() {
        this.usersSection.classList.add('visible');
        this.gridsSection.classList.remove('visible');
        this.fetchUsers();
    }

    showGridsSection() {
        this.gridsSection.classList.add('visible');
        this.usersSection.classList.remove('visible');
        this.fetchGrids();
    }

    async handleLogout() {
        if (!confirm('Are you sure you want to log out?')) return;

        try {
            const response = await this.makeRequest('/logout', 'POST');
            if (response.succes) {
                this.clearSessionCookies();
                alert(response.succes);
                window.location.href = '/projet-d-web/admin/';
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed');
        }
    }

    clearSessionCookies() {
        const cookieOptions = [
            `PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`,
            'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        ];
        cookieOptions.forEach(option => document.cookie = option);
    }

    async fetchUsers() {
        try {
            const users = await this.makeRequest('/admin/getUsers', 'GET');
            this.renderUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async fetchGrids() {
        try {
            const grids = await this.makeRequest('/admin/getGrids', 'GET');
            this.renderGrids(grids);
        } catch (error) {
            console.error('Error fetching grids:', error);
        }
    }

    renderUsers(users) {
        this.usersList.innerHTML = '';
        users.forEach(user => {
            const li = this.createListItem(
                `${user.username} (${user.email})`,
                user.id,
                () => this.deleteUser(user.id)
            );
            this.usersList.appendChild(li);
        });
    }

    renderGrids(grids) {
        this.gridsList.innerHTML = '';
        grids.forEach(grid => {
            const li = this.createListItem(
                `${grid.nom} - ${grid.description} (${grid.niveau_difficulte})`,
                grid.id,
                () => this.deleteGrid(grid.id)
            );
            this.gridsList.appendChild(li);
        });
    }

    createListItem(text, id, deleteCallback) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-button" data-id="${id}">Delete</button>
        `;
        li.querySelector('.delete-button').addEventListener('click', deleteCallback);
        return li;
    }

    async deleteUser(userId) {
        try {
            const response = await this.makeRequest(`/admin/deleteUser/${userId}`, 'POST');
            if (response[0] === "Utilisateur supprimé") {
                alert(response[0]);
                await this.fetchUsers();
            } else {
                alert('Error deleting user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    async deleteGrid(gridId) {
        try {
            const response = await this.makeRequest(`/admin/deleteGame/${gridId}`, 'POST');
            if (response[0] === "Grille supprimée") {
                alert(response[0]);
                await this.fetchGrids();
            } else {
                alert('Error deleting grid.');
            }
        } catch (error) {
            console.error('Error deleting grid:', error);
        }
    }

    async addUser(username, email, password) {
        try {
            const data = await this.makeRequest('/admin/addUser', 'POST', { username, email, password });
            
            if (data[0] === 'Utilisateur ajouté avec succès') {
                alert('Utilisateur ajouté avec succès');
                await this.fetchUsers();
            } else if (data.includes('Adresse email déjà utilisée')) {
                alert('Adresse email déjà utilisée');
            } else if (data.includes('Adresse email non valide')) {
                alert('Adresse email non valide');
            } else {
                alert('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    async makeRequest(endpoint, method, body = null) {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        return await response.json();
    }

    showAddUserModal() {
        this.addUserModal.classList.remove('hidden');
    }

    hideAddUserModal() {
        this.addUserModal.classList.add('hidden');
    }

    handleAddUserSubmit(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        this.addUser(username, email, password);
        this.hideAddUserModal();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AdminDashboard();
});