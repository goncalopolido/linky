import express from 'express';
import path from 'path';
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import {
    UrlStorage
} from './storage.js';
import {
    createShortUrl
} from './shortener.js';
import {
    apiRoutes
} from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const urlStorage = new UrlStorage();

const context = {
    urlStorage,
    createShortUrl
};

app.use('/api', apiRoutes(context));

app.get('/:shortCode', (req, res) => {
    const {
        shortCode
    } = req.params;
    const originalUrl = urlStorage.getOriginalUrl(shortCode);

    if (originalUrl) {
        return res.redirect(originalUrl);
    }

    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
