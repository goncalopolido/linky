function generateRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += generateRandomChar();
    }
    return result;
}

export function createShortUrl(existsCheck) {
    let length = 5;
    let shortCode = generateRandomString(length);
    let attempts = 0;
    const maxAttempts = 10;

    while (existsCheck(shortCode)) {
        if (attempts >= maxAttempts) {
            length++;
            attempts = 0;
        }
        shortCode = generateRandomString(length);
        attempts++;
    }

    return shortCode;
}
