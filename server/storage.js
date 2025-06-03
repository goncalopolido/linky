import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class UrlStorage {
  constructor() {
    // Create the database directory in the project root
    const dbDir = join(process.cwd(), 'database');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = join(dbDir, 'urls.db');
    this.db = new Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS urls (
        short_code TEXT PRIMARY KEY,
        original_url TEXT NOT NULL,
        length INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_url_length ON urls(original_url, length);
      CREATE INDEX IF NOT EXISTS idx_url ON urls(original_url);
    `);
  }

  storeUrl(shortCode, originalUrl, length) {
    try {
      const stmt = this.db.prepare('INSERT INTO urls (short_code, original_url, length) VALUES (?, ?, ?)');
      stmt.run(shortCode, originalUrl, length);
      return true;
    } catch (error) {
      console.error('Error storing URL:', error);
      return false;
    }
  }

  getOriginalUrl(shortCode) {
    try {
      const stmt = this.db.prepare('SELECT original_url FROM urls WHERE short_code = ?');
      const result = stmt.get(shortCode);
      return result ? result.original_url : null;
    } catch (error) {
      console.error('Error getting original URL:', error);
      return null;
    }
  }

  getShortCode(originalUrl, length) {
    try {
      const stmt = this.db.prepare('SELECT short_code FROM urls WHERE original_url = ? AND length = ?');
      const result = stmt.get(originalUrl, length);
      return result ? result.short_code : null;
    } catch (error) {
      console.error('Error getting short code:', error);
      return null;
    }
  }

  getShortCodeForUrl(originalUrl) {
    try {
      const stmt = this.db.prepare('SELECT short_code FROM urls WHERE original_url = ? ORDER BY created_at ASC LIMIT 1');
      const result = stmt.get(originalUrl);
      return result ? result.short_code : null;
    } catch (error) {
      console.error('Error getting short code for URL:', error);
      return null;
    }
  }

  shortCodeExists(shortCode) {
    try {
      const stmt = this.db.prepare('SELECT 1 FROM urls WHERE short_code = ?');
      return !!stmt.get(shortCode);
    } catch (error) {
      console.error('Error checking short code:', error);
      return false;
    }
  }
}
