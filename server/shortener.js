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

export function createShortUrl(length, isRandom, existsCheck) {

    const finalLength = isRandom ? Math.floor(Math.random() * 6) + 1 : length;

    let shortCode = generateRandomString(finalLength);

    let attempts = 0;
    const maxAttempts = 10;

    while (existsCheck(shortCode) && attempts < maxAttempts) {
        shortCode = generateRandomString(finalLength);
        attempts++;
    }

    if (attempts >= maxAttempts) {
        return createShortUrl(Math.min(finalLength + 1, 6), false, existsCheck);
    }

    return shortCode;
}
