import API_BASE_URL from '../../../config.js';

class LoginHandler {
    constructor() {
        this.form = document.getElementById('login-form');
        this.messageContainer = document.getElementById('message');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.dashboardUrl = '/projet-d-web/admin/dashboard';
    }

    initialize() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault();

        const credentials = {
            email: this.emailInput.value,
            password: this.passwordInput.value
        };
        console.log("hello world !");
        

        try {
            const response = await this.login(credentials);
            this.handleLoginResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    }

    handleLoginResponse(data) {
        if (data.youpi) {
            this.showSuccessMessage(data.youpi);
            window.location.href = this.dashboardUrl;
        } else {
            this.showErrorMessage('Login failed. Please check your credentials.');
        }
    }

    handleError(error) {
        console.error('Error:', error);
        this.showErrorMessage('An error occurred. Please try again later.');
    }

    showSuccessMessage(message) {
        this.messageContainer.style.color = 'green';
        this.messageContainer.textContent = message;
    }

    showErrorMessage(message) {
        this.messageContainer.style.color = 'red';
        this.messageContainer.textContent = message;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginHandler = new LoginHandler();
    loginHandler.initialize();
});