const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'news.json');

// Helferfunktion: Lese die News
function getNews() {
    if (!fs.existsSync(filePath)) {
        return { news: [] };
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Helferfunktion: Speichere die News
function saveNews(news) {
    fs.writeFileSync(filePath, JSON.stringify({ news }, null, 2));
}

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        // News abrufen
        const data = getNews();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    }

    if (event.httpMethod === 'POST') {
        // Neue News hinzufügen
        const body = JSON.parse(event.body);
        const data = getNews();

        const newNews = {
            id: Date.now().toString(),
            title: body.title,
            content: body.content,
            createdAt: new Date().toISOString(),
        };

        data.news.push(newNews);
        saveNews(data.news);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'News hinzugefügt!' }),
        };
    }

    return {
        statusCode: 405,
        body: 'Method not allowed',
    };
};
