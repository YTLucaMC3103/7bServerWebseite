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
            window.location.href = 'https://luxismp.netlify.app/index.html';
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

    document.getElementById('payment-button').addEventListener('click', function() {
        function redirectToPayment(price) {
            window.location.href = `./payment/payment.html?price=${price}`;
        }
    })

    const queryParams = new URLSearchParams(window.location.search);
    const price = queryParams.get('price');

    if (price) {
        document.getElementById('payment-amount').textContent = `Zu bezahlen: ${price}€`;
    } else {
        document.getElementById('payment-amount').textContent = `Kein Preis verfügbar`
    }
});

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

async function loadNews() {
    const response = await fetch('/.netlify/functions/news');
    const data = await response.json();

    const container = document.getElementById('news-container');
    container.innerHTML = '';

    data.news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.content}</p>
            <small>Erstellt am: ${new Date(item.createdAt).toLocaleString()}</small>
        `;
        container.appendChild(newsItem);
    });
}

loadNews();