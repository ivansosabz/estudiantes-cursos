import { useEffect, useState } from 'react';
import axios from 'axios';

interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    curso_id: number;
    curso_nombre?: string;
}

interface Curso {
    id: number;
    nombre: string;
}

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [cursoId, setCursoId] = useState<number>(0);
    const [editandoId, setEditandoId] = useState<number | null>(null);

    const fetchEstudiantes = async () => {
        const res = await axios.get('http://localhost:3000/api/estudiantes');
        setEstudiantes(res.data);
    };

    const fetchCursos = async () => {
        const res = await axios.get('http://localhost:3000/api/cursos');
        setCursos(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { nombre, email, curso_id: cursoId };

        if (editandoId === null) {
            await axios.post('http://localhost:3000/api/estudiantes', data);
        } else {
            await axios.put(`http://localhost:3000/api/estudiantes/${editandoId}`, data);
            setEditandoId(null);
        }

        setNombre('');
        setEmail('');
        setCursoId(0);
        fetchEstudiantes();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/api/estudiantes/${id}`);
        fetchEstudiantes();
    };

    const handleEdit = (estudiante: Estudiante) => {
        setNombre(estudiante.nombre);
        setEmail(estudiante.email);
        setCursoId(estudiante.curso_id);
        setEditandoId(estudiante.id);
    };

    const cancelarEdicion = () => {
        setNombre('');
        setEmail('');
        setCursoId(0);
        setEditandoId(null);
    };

    useEffect(() => {
        fetchEstudiantes();
        fetchCursos();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Gestión de Estudiantes</h2>

            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={cursoId}
                        onChange={(e) => setCursoId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecciona un curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">
                    {editandoId === null ? 'Crear Estudiante' : 'Actualizar Estudiante'}
                </button>
                {editandoId !== null && (
                    <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                )}
            </form>

            <h4>Lista de Estudiantes</h4>
            <ul className="list-group">
                {estudiantes.map((est) => (
                    <li key={est.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{est.nombre}</strong> - {est.email} <br />
                            <small className="text-muted">Curso: {est.curso_nombre || 'Sin asignar'}</small>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(est)}>
                                Editar
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(est.id)}>
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Estudiantes;
