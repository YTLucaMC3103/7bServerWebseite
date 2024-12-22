async function calculateSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.addEventListener('DOMContentLoaded', function() {

    // Funktion für das Kopieren von Text
    document.querySelectorAll('.copy-text').forEach(element => {
        element.addEventListener('click', () => {
            const textToCopy = element.getAttribute('data-copy');

            if (!textToCopy) {
                console.error('Kein Text zum Kopieren gefunden!');
                return;
            }

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Text wurde kopiert: ' + textToCopy);
                })
                .catch(err => {
                    console.error('Fehler beim Kopieren: ', err);
                });
        });
    });

    document.getElementById('redirect-button').addEventListener('click', async function () {
        const userInput = document.getElementById('input-field').value.trim();

        const validHashes = [
            await calculateSHA256('A7bC-3Df9-GH1k-LMn2'),
            await calculateSHA256('Z1xY-9AbC-4GhK-MoP7'),
            await calculateSHA256('3tUf-B7iG-Jh6K-LQ8x')
        ];

        const userInputHash = await calculateSHA256(userInput);

        if (validHashes.includes(userInputHash)) {
            window.location.href = 'https://jovial-bunny-450f51.netlify.app/index.html';
            return; 
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        const button = document.getElementById('login-button');
        const messageBox = document.getElementById('message');

        // Beispielhafte Zugangsdaten
        const validCredentials = {
            username: 'admin',
            password: '12345'
        };

        // Event-Listener für den Button
        button.addEventListener('click', function () {
            // Eingabewerte holen
            const username = document.getElementById('first').value.trim();
            const password = document.getElementById('password').value;

            // Überprüfen der Eingaben
            if (username === validCredentials.username && password === validCredentials.password) {
                window.location.href = 'gesundheit.html'
            } else {
                messageBox.textContent = 'Ungültiger Benutzername oder Passwort. Bitte versuchen Sie es erneut.';
                messageBox.className = 'message error';
            }
        });
    });
});