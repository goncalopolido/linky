const themeToggle = document.getElementById('themeToggle');
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const lengthSlider = document.getElementById('lengthSlider');
const randomToggle = document.getElementById('randomToggle');
const customUrlToggle = document.getElementById('customUrlToggle');
const customUrlInput = document.getElementById('customUrlInput');
const customUrlContainer = document.getElementById('customUrlContainer');
const lengthDisplay = document.getElementById('lengthDisplay');
const result = document.getElementById('result');
const error = document.getElementById('error');

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

setTheme(getSystemTheme());

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTheme(getSystemTheme());
});

customUrlToggle.addEventListener('change', () => {
    customUrlContainer.classList.toggle('active', customUrlToggle.checked);
    lengthSlider.parentElement.classList.toggle('disabled', customUrlToggle.checked);
    randomToggle.parentElement.classList.toggle('disabled', customUrlToggle.checked);
    updateLengthDisplay();
});

function updateLengthDisplay() {
    if (customUrlToggle.checked) {
        lengthDisplay.textContent = 'Using custom URL';
    } else if (randomToggle.checked) {
        lengthDisplay.textContent = 'Your short link will have a random length between 1-6 characters';
        lengthSlider.parentElement.classList.add('disabled');
    } else {
        const length = lengthSlider.value;
        lengthDisplay.textContent = `Your short link will be ${length} character${length !== '1' ? 's' : ''} long`;
        lengthSlider.parentElement.classList.remove('disabled');
    }
}

lengthSlider.addEventListener('input', updateLengthDisplay);
randomToggle.addEventListener('change', updateLengthDisplay);

updateLengthDisplay();

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.classList.add('hidden');
    result.classList.add('hidden');

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Shortening...';

    try {
        const urlToCheck = urlInput.value.trim();

        if (!isValidUrl(urlToCheck)) {
            throw new Error('Please enter a valid URL (must start with http:// or https://)');
        }

        const requestBody = {
            url: urlToCheck,
            length: parseInt(lengthSlider.value),
            isRandom: randomToggle.checked,
        };

        if (customUrlToggle.checked) {
            if (!customUrlInput.value.trim()) {
                throw new Error('Please enter a custom URL');
            }

            if (!/^[a-zA-Z0-9-_]+$/.test(customUrlInput.value.trim())) {
                throw new Error('Custom URL can only contain letters, numbers, hyphens, and underscores');
            }

            requestBody.customCode = customUrlInput.value.trim();
            delete requestBody.length;
            delete requestBody.isRandom;
        }

        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to shorten URL');
        }

        result.innerHTML = `
      <div class="short-url-container">
        <a href="${data.shortUrl}" target="_blank" rel="noopener noreferrer">${data.shortUrl}</a>
        <button id="copyButton" aria-label="Copy to clipboard">
          <svg id="copyIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg id="checkIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    `;

        const copyButton = document.getElementById('copyButton');
        const copyIcon = document.getElementById('copyIcon');
        const checkIcon = document.getElementById('checkIcon');

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(data.shortUrl);
                copyIcon.classList.add('hidden');
                checkIcon.classList.remove('hidden');
                setTimeout(() => {
                    copyIcon.classList.remove('hidden');
                    checkIcon.classList.add('hidden');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });

        result.classList.remove('hidden');
        error.classList.add('hidden');
    } catch (err) {
        result.classList.add('hidden');
        error.classList.remove('hidden');
        error.textContent = err.message;
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Shorten URL';
    }
});
