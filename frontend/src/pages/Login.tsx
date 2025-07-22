import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Nuevo: modo login/registro
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isRegister ? 'register' : 'login';
            const res = await axios.post(`http://localhost:3000/api/auth/${endpoint}`, {
                username,
                password
            });

            if (!isRegister) {
                localStorage.setItem('token', res.data.token);
                navigate('/cursos');
            } else {
                alert('Usuario registrado correctamente. Ahora podés iniciar sesión.');
                setIsRegister(false);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error en la solicitud');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">
                {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
            </h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    {isRegister ? 'Registrarse' : 'Ingresar'}
                </button>
            </form>

            <div className="text-center mt-3">
                <button
                    className="btn btn-link"
                    onClick={() => {
                        setError('');
                        setIsRegister(!isRegister);
                    }}
                >
                    {isRegister ? '¿Ya tienes cuenta? Iniciar sesión' : '¿No tienes cuenta? Registrate'}
                </button>
            </div>
        </div>
    );
};

export default Login;
