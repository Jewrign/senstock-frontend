import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Mouvements from './pages/Mouvements';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import AddMovement from './pages/AddMovement';
import Layout from './components/Layout';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
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
      </Routes>
    </Router>
  );
}

export default App;
