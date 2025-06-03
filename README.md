# Linky

A minimalist URL shortening app.

![image (1)](https://github.com/user-attachments/assets/0d72e71b-e741-4ae9-83fa-28c2505d21db)

## Features

- Custom URL support: Create memorable short links
- Adjustable link length: Choose between 1-6 characters
- Random length option: Let the system decide
- Duplicate prevention: Same URLs get the same short code
- Auto dark/light theme based on system settings
- Fully responsive design for all devices
- SQLite database for reliable storage
- Express backend with efficient routing

## Quick Start

```bash
# Clone repository
git clone https://github.com/goncalopolido/linky

# Install dependencies
cd linky && npm install

# Start the server
npm start

# Linky is now running on http://localhost:3000
```

## Live Demo
Try Linky at [linky.polido.pt](https://linky.polido.pt).

## Technical Details

Linky uses:
- Express.js for the backend server
- better-sqlite3 for database operations
- CSS for styling (no frameworks)
- JavaScript for frontend functionality

## License

```
MIT License

Copyright (c) 2025 goncalopolido

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
