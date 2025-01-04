import API_BASE_URL from '../../../../config.js';

class UserRegistration {
    constructor() {
        this.form = document.querySelector('form');
        this.initialize();
    }

    initialize() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault();

        const userData = this.getUserData();
        
        try {
            await this.registerUser(userData);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            alert('Une erreur est survenue lors de linscription.');
        }
    }

    getUserData() {
        const [nom, prenom, email, motDePasse] = Array.from(document.querySelectorAll('input'))
            .map(input => input.value);

        return {
            username: `${nom}${prenom}`,
            email,
            password: motDePasse
        };
    }

    async registerUser(userData) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.statusText}`);
        }

        const result = await response.json();
        alert(result.succes);
        window.location.href = '/projet-d-web/CruciWeb/connection';
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => new UserRegistration());