import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <Link className="navbar-brand" to="/cursos">
                    Estudiantes&Cursos
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cursos">Cursos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/estudiantes">Estudiantes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reporte">Reporte</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            <main className="container mt-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
