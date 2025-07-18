import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Cursos from './pages/Cursos';
import Estudiantes from './pages/Estudiantes';
import Reporte from './pages/Reporte';

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas con navbar (Layout) */}
      <Route element={<Layout />}>
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/reporte" element={<Reporte />} />
      </Route>

      {/* Redirección para cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
