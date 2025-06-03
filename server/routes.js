import express from 'express';

export function apiRoutes(context) {
    const {
        urlStorage,
        createShortUrl
    } = context;
    const router = express.Router();

    router.post('/shorten', (req, res) => {
        const {
            url,
            customCode
        } = req.body;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({
                error: 'Invalid URL'
            });
        }

        try {
            const urlObj = new URL(url);

            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return res.status(400).json({
                    error: 'URL must use HTTP or HTTPS protocol'
                });
            }

            const hostnameParts = urlObj.hostname.split('.');
            if (hostnameParts.length < 2) {
                return res.status(400).json({
                    error: 'Invalid domain name'
                });
            }

            const tld = hostnameParts[hostnameParts.length - 1];
            if (tld.length < 2) {
                return res.status(400).json({
                    error: 'Invalid top-level domain'
                });
            }

            let shortCode;

            if (customCode) {
                if (!/^[a-zA-Z0-9-_]+$/.test(customCode)) {
                    return res.status(400).json({
                        error: 'Custom URL can only contain letters, numbers, hyphens, and underscores'
                    });
                }

                if (urlStorage.shortCodeExists(customCode)) {
                    return res.status(400).json({
                        error: 'This custom URL is already taken'
                    });
                }

                shortCode = customCode;
            } else {
                const existingCode = urlStorage.getShortCodeForUrl(url);
                if (existingCode) {
                    return res.json({
                        shortCode: existingCode,
                        shortUrl: `https://${req.get('host')}/${existingCode}`,
                        originalUrl: url,
                        isExisting: true
                    });
                }

                shortCode = createShortUrl(code => urlStorage.shortCodeExists(code));
            }

            const stored = urlStorage.storeUrl(shortCode, url, shortCode.length);
            if (!stored) {
                return res.status(500).json({
                    error: 'Failed to store URL'
                });
            }

            return res.json({
                shortCode,
                shortUrl: `https://${req.get('host')}/${shortCode}`,
                originalUrl: url,
                isExisting: false
            });
        } catch (error) {
            return res.status(400).json({
                error: 'Invalid URL format'
            });
        }
    });

    return router;
}
