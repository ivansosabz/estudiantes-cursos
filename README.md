# 🎓 Estudiantes y Cursos - App Full Stack

Este es un proyecto web de gestión académica desarrollado como parte de la materia **Programación Web 1**. Permite administrar estudiantes, cursos y visualizar reportes con autenticación de usuarios.

---

## 🚀 Tecnologías utilizadas

| Frontend             | Backend              | Base de Datos |
|----------------------|----------------------|---------------|
| React + TypeScript   | Node.js + Express    | SQLite        |
| Bootstrap 5          | JWT (Login seguro)   | sqlite3       |

---

## 🧠 Estructura general del proyecto

```bash
estudiantes-cursos/
│
├── backend/               # Servidor backend (Express + SQLite)
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio (CRUD, login, reportes)
│   │   ├── routes/        # Endpoints de la API REST
│   │   ├── database/      # Conexión con SQLite
│   │   └── index.ts       # Punto de entrada del servidor
│
├── frontend/              # Aplicación frontend (React)
│   ├── src/
│   │   ├── pages/         # Vistas principales (Login, Cursos, Estudiantes, Reporte)
│   │   ├── components/    # Componentes reutilizables (Layout, Navbar, Rutas privadas)
│   │   └── App.tsx        # Configuración de rutas con React Router
│
└── README.md              # Este archivo
