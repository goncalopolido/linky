# Linky

A minimalist URL shortening app.

![image](https://github.com/user-attachments/assets/199bdcab-65c7-47b8-8f71-f71ca7ccf769)

## Features

- Custom URL support: Create memorable short links
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
> [!NOTE]
> Due to a high volume of abuse emails, all shortened URLs created in the live demo expire after 10 minutes.

Try Linky at [linky.polido.pt](https://linky.polido.pt).

## Technical Details

Linky uses:
- Express.js for the backend server
- better-sqlite3 for database operations
- CSS for styling (no frameworks)
- JavaScript for frontend functionality
