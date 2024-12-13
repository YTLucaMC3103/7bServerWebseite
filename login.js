document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('login-button');
    const messageBox = document.getElementById('message');

    const validCredentials = {
        username: 'admin',
        password: '12345'
    };

    button.addEventListener('click', function () {
        const username = document.getElementById('first').value.trim();
        const password = document.getElementById('password').value;

        if (username === validCredentials.username && password === validCredentials.password) {
            window.location.href = 'https://jovial-bunny-450f51.netlify.app/admin-page.html'
        } else {
            messageBox.textContent = 'Ungültiger Benutzername oder Passwort. Bitte versuchen Sie es erneut.';
            messageBox.className = 'message error';
        }
    })
})