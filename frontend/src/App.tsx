import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cursos from './pages/Cursos';
import Estudiantes from './pages/Estudiantes';
import Reporte from './pages/Reporte';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/estudiantes" element={<Estudiantes />} />
      <Route path="/reporte" element={<Reporte />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
