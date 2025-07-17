import { useEffect, useState } from 'react';
import axios from 'axios';

interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
}

function Cursos() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    const fetchCursos = async () => {
        const res = await axios.get('http://localhost:3000/api/cursos');
        setCursos(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editandoId === null) {
            // Crear nuevo curso
            await axios.post('http://localhost:3000/api/cursos', { nombre, descripcion });
        } else {
            // Editar curso existente
            await axios.put(`http://localhost:3000/api/cursos/${editandoId}`, { nombre, descripcion });
            setEditandoId(null);
        }

        setNombre('');
        setDescripcion('');
        fetchCursos();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/api/cursos/${id}`);
        fetchCursos();
    };

    const handleEdit = (curso: Curso) => {
        setNombre(curso.nombre);
        setDescripcion(curso.descripcion);
        setEditandoId(curso.id);
    };

    const cancelarEdicion = () => {
        setNombre('');
        setDescripcion('');
        setEditandoId(null);
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Gestión de Cursos</h2>

            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del curso"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">
                    {editandoId === null ? 'Crear Curso' : 'Actualizar Curso'}
                </button>
                {editandoId !== null && (
                    <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                )}
            </form>

            <h4>Lista de Cursos</h4>
            <ul className="list-group">
                {cursos.map((curso) => (
                    <li key={curso.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{curso.nombre}</strong><br />
                            <small>{curso.descripcion}</small>
                        </div>
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(curso)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(curso.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cursos;
