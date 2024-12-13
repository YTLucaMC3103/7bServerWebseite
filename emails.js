let googleUser = null;

        // API-Client laden
        function start() {
            gapi.load('client:auth2', initClient);
        }

        // Google API Client initialisieren
        function initClient() {
            gapi.client.init({
                apiKey: 'AIzaSyDbD3VRBtj9NjqqkyqSHc9QDOYx3f-UHd4', // Dein API-Schlüssel
                clientId: '536111237201-knlrag5411qgia4qd1n15ior00o4opm8.apps.googleusercontent.com', // Deine Client-ID
                scope: 'https://www.googleapis.com/auth/gmail.readonly', // Gmail API Zugriff
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
            }).then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                // Event Listener für den Login-Button
                document.getElementById('auth-button').addEventListener('click', handleAuthClick);
                document.getElementById('sign-out-button').addEventListener('click', handleSignOutClick);
            });
        }

        // Authentifizierungsstatus aktualisieren
        function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                googleUser = gapi.auth2.getAuthInstance().currentUser.get();
                document.getElementById('auth-button').style.display = 'none';
                document.getElementById('sign-out-button').style.display = 'block';
                document.getElementById('emails').style.display = 'block';
                listMessages();
            } else {
                googleUser = null;
                document.getElementById('auth-button').style.display = 'block';
                document.getElementById('sign-out-button').style.display = 'none';
                document.getElementById('emails').style.display = 'none';
            }
        }

        // Google-Login auslösen
        function handleAuthClick(event) {
            gapi.auth2.getAuthInstance().signIn();
        }

        // Abmelden
        function handleSignOutClick(event) {
            gapi.auth2.getAuthInstance().signOut();
            document.getElementById('emails').style.display = 'none';
        }

        // Ungelesene E-Mails abrufen
        function listMessages() {
            gapi.client.gmail.users.messages.list({
                'userId': 'me',
                'labelIds': ['INBOX'],
                'q': 'is:unread' // Nur ungelesene E-Mails anzeigen
            }).then(function(response) {
                const messages = response.result.messages;
                const emailListElement = document.getElementById('email-list');
                emailListElement.innerHTML = '';
                if (messages && messages.length > 0) {
                    messages.forEach(function(message) {
                        getMessage(message.id);
                    });
                } else {
                    emailListElement.innerHTML = '<li>Keine ungelesenen E-Mails gefunden.</li>';
                }
            });
        }

        // Details der Nachricht abrufen
        function getMessage(messageId) {
            gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': messageId
            }).then(function(response) {
                const message = response.result;
                const emailListElement = document.getElementById('email-list');
                const snippet = message.snippet;
                const li = document.createElement('li');
                li.className = 'email-item';
                li.innerHTML = `
                    <div class="email-title">${message.payload.headers.find(header => header.name === 'From').value}</div>
                    <div class="email-snippet">${snippet}</div>
                `;
                emailListElement.appendChild(li);
            });
        }

        // API Client starten
        start();