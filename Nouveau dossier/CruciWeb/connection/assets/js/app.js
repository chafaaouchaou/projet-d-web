import API_BASE_URL from '../../../../config.js';

const handleLogin = async (event) => {
    event.preventDefault();

    // Récupération des valeurs avec destructuring
    const [emailInput, passwordInput] = document.querySelectorAll('input');
    const data = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.succes) {
            console.log(result.succes);
            alert(`Connexion réussie : ${result.succes}`);
            window.location.href = '/projet-d-web/CruciWeb/';
        } else if (result.erreur) {
            alert(`Erreur : ${result.erreur}`);
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error.message);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
};

document.querySelector('form').addEventListener('submit', handleLogin);