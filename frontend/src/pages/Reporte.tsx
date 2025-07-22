// src/pages/Reporte.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

type ReporteData = {
    curso: string;
    cantidad: number;
};

const Reporte = () => {
    const [datos, setDatos] = useState<ReporteData[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/reportes/estudiantes-por-curso')
            .then(res => setDatos(res.data))
            .catch(err => console.error('Error al obtener el reporte:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Estudiantes por Curso</h2>

            {/* Gráfico de Barras */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="curso" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cantidad" fill="#007bff" />
                </BarChart>
            </ResponsiveContainer>

            {/* Tabla Bootstrap */}
            <div className="mt-5">
                <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            <th>Curso</th>
                            <th>Cantidad de Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((fila, index) => (
                            <tr key={index}>
                                <td>{fila.curso}</td>
                                <td>{fila.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reporte;
