fetch('data.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('form-data');
    if (data.length === 0) {
        container.innerHTML = '<p>Keine Formulardaten gefunden.</p>';
        return;
    }

    data.forEach((entry, index) => {
        const div = document.createElement('div');
        div.classList.add('entry');

        div.innerHTML = `
            <h3>Eintrag ${index + 1}</h3>
            <p><strong>Minecraft Name:</strong> ${entry.minecraft_name}</p>
            <p><strong>Vorname:</strong> ${entry.first_name}</p>
            <p><strong>Anliegen:</strong> ${entry.subject}</p>
            <p><strong>Beschreibung:</strong> ${entry.description}</p>
            <p><strong>Anhänge:</strong></p>
            <ul>
                ${entry.files.map(file => `<li><a href="${file}" target="_blank">${file}</a></li>`).join('')}
            </ul>
        `;

        container.appendChild(div);
    });
})
.catch(err => {
    console.error('Fehler beim Laden der Daten:', err);
    document.getElementById('form-data').innerHTML = '<p>Fehler beim Laden der Formulardaten.</p>';
});