import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Products() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.get('/produits').then(res => setProduits(res.data));
  }, []);

  

  return (
    <div>
      <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-bold mb-4">Liste des produits</h1>
        <Link to="/produits/nouveau" className="bg-green-600 text-white px-4 py-2 rounded">+ Ajouter</Link>
      </div>
      <table className="w-full bg-white shadow-md text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th className="p-2">Catégorie</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {produits.map((produit) => {
          const isAlerte = produit.stock <= produit.seuil_alerte;

          return (
            <tr key={produit.id} className={isAlerte ? 'bg-red-100' : ''}>
              <td className={isAlerte ? 'text-red-600 font-bold' : ''}>{produit.nom}</td>
              <td>{produit.categorie}</td>
              <td>{produit.stock}</td>
              <td>{produit.prix_unitaire}</td>
              <td>
                <Link to={`/produits/${produit.id}`} className="text-blue-600 underline">
                  Détails
                </Link>
              </td>
            </tr>
          );
        })}

        </tbody>
      </table>
    </div>
  );
}
