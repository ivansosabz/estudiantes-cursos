import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '../../database/db';

const SECRET = process.env.JWT_SECRET || 'secreto';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const db = await openDb();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO usuarios (username, password) VALUES (?, ?)', [
            username,
            hashedPassword
        ]);
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar usuario (puede que ya exista)' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const db = await openDb();

    const user = await db.get('SELECT * FROM usuarios WHERE username = ?', [username]);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
        expiresIn: '2h'
    });

    res.json({ token });
};
    