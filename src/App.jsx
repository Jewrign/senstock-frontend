import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Mouvements from './pages/Mouvements';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import AddMovement from './pages/AddMovement';
import Layout from './components/Layout';
import Alertes from './pages/Alertes';
import EditProduit from './pages/EditProduit';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/produits"
          element={<Layout><Products /></Layout>}
        />
        <Route
          path="/produits/nouveau"
          element={<Layout><AddProduct /></Layout>}
        />
        <Route
          path="/produits/:id"
          element={<Layout><ProductDetail /></Layout>}
        />
        <Route
          path="/produits/:id/mouvement"
          element={<Layout><AddMovement /></Layout>}
        />
        <Route
          path="/mouvements"
          element={<Layout><Mouvements /></Layout>}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/alertes"
          element={<Layout><Alertes /></Layout>}
        />
        <Route
          path="/produits/:id/edit"
          element={<Layout><EditProduit /></Layout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
