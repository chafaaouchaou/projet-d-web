document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    console.log("page 0 page loaded!");


    fetch('../api/message')
        .then(response => response.json())
        .then(data => {
            contentDiv.innerHTML = `<p>${data.message}</p>`;
            
        })

        .catch(error => {
            console.log('error: not working');
            
        });
});
