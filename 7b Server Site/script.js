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
});

function showSnackbar(message) {
    var x = document.getElementById("snackbar");
    x.textContent = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

/*

const cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    showSnackbar(`${itemName} wurde zum Warenkorb hinzugefügt!`);
}
*/

function getParameterByName(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Preis anzeigen
window.onload = function () {
    const price = getParameterByName('price');
    if (price) {
        document.getElementById('price').textContent = price + '€';
    } else {
        document.getElementById('price').textContent = 'Unbekannt';
    }
};

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

let currentUser = localStorage.getItem("currentUser");

function initializeAccountButton() {
    const accountButton = document.getElementById("accountButton");
    const accountDropdown = document.getElementById("accountDropdown");

    if (currentUser) {
        accountButton.textContent = "Account";
        accountDropdown.style.display = "block";
    } else {
        accountButton.textContent = "Login";
        accountDropdown.style.display = "none";
    }
}

function handleAccountClick() {
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    initializeAccountButton();
    window.location.reload();
    showSnackbar('Du wurdest abgemeldet!');
}

document.addEventListener("DOMContentLoaded", initializeAccountButton);

function showRegister() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
}

let users = JSON.parse(localStorage.getItem("users")) || {};

function register() {
    const username = document.getElementById("register-minecraft-name").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert('Bitte Minecraft Name und Passwort eingeben!');
        return;
    }

    if (users[username]) {
        alert('Dieser Minecraft Name wurde schon registriert!');
        return;
    }

    users[username] = { password, rank:null };
    localStorage.setItem("users", JSON.stringify(users));
    alert('Registrierung erfolgreich!');
    showLogin();
}

function login() {
    const username = document.getElementById("login-minecraft-name").value;
    const password = document.getElementById("login-password").value;

    if (!users[username] || users[username].password !== password) {
        alert('Ungültige Anmeldedaten!');
        return;
    }

    localStorage.setItem("currentUser", username);
    alert(`Willkommen, ${username}!`);
    window.location.href = "index.html#shop";
}