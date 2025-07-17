// src/database/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const openDb = async () => {
    return open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });
};
