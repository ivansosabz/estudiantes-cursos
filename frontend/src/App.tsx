import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Cursos from './pages/Cursos';
import Estudiantes from './pages/Estudiantes';
import Reporte from './pages/Reporte';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <Cursos />
            </PrivateRoute>
          }
        />
        <Route
          path="/estudiantes"
          element={
            <PrivateRoute>
              <Estudiantes />
            </PrivateRoute>
          }
        />
        <Route
          path="/reporte"
          element={
            <PrivateRoute>
              <Reporte />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
