import API_BASE_URL from '../../../config.js';


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.youpi) {
                    messageContainer.style.color = 'green';
                    messageContainer.textContent = data.youpi;
                    // Redirect to admin dashboard or another page
                    window.location.href = '/projet-d-web/admin/dashboard';
                } else {
                    messageContainer.textContent = 'Login failed. Please check your credentials.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageContainer.textContent = 'An error occurred. Please try again later.';
            });
    });
});