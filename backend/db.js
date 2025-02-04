import Database from 'better-sqlite3';

const db = new Database('app.db');

db.pragma('journal_mode = WAL'); // write-ahead logging: https://www.sqlite.org/wal.html

// initially used AUTOINCREMENT, but SQLLite documentation recommends not using it.
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL

  )
`).run();

export default db;
