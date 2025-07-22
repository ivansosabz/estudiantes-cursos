import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiBook, FiUsers, FiFileText, FiLogOut } from 'react-icons/fi';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* Navbar */}
            <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold d-flex align-items-center" to="/cursos">
                        <span className="ms-2">Estudiantes & Cursos</span>
                    </Link>

                    <div className="d-flex align-items-center">
                        <nav className="d-none d-lg-block">
                            <ul className="navbar-nav me-auto">
                                <NavItem to="/cursos" icon={<FiBook />} text="Cursos" />
                                <NavItem to="/estudiantes" icon={<FiUsers />} text="Estudiantes" />
                                <NavItem to="/reporte" icon={<FiFileText />} text="Reporte" />
                            </ul>
                        </nav>

                        <button
                            className="btn btn-outline-light ms-3 d-flex align-items-center"
                            onClick={handleLogout}
                            aria-label="Cerrar sesión"
                        >
                            <FiLogOut className="me-2" />
                            <span className="d-none d-sm-inline">Salir</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="container-fluid py-4 flex-grow-1">
                <div className="px-3">
                    <Outlet />
                </div>
            </main>

            {/* Footer opcional */}
            {/* <footer className="bg-light py-3 text-center text-muted small border-top">
                <div className="container">
                    © {new Date().getFullYear()} Estudiantes & Cursos - Todos los derechos reservados
                </div>
            </footer> */}
        </div>
    );
};

// Componente auxiliar para items del nav
const NavItem = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
    <li className="nav-item">
        <Link className="nav-link d-flex align-items-center px-3" to={to}>
            <span className="me-2">{icon}</span>
            {text}
        </Link>
    </li>
);

export default Layout;