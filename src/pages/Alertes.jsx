import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Alertes() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.get('/produits')
      .then(res => {
        const alertes = res.data.filter(p => p.stock <= p.seuil_alerte);
        setProduits(alertes);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produits en alerte</h1>

      {produits.length === 0 ? (
        <p className="text-green-700">✅ Aucun produit en alerte</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th>Catégorie</th>
              <th>Stock</th>
              <th>Seuil</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id} className="bg-red-50">
                <td className="p-2 text-red-600 font-bold">{produit.nom}</td>
                <td>{produit.categorie}</td>
                <td>{produit.stock}</td>
                <td>{produit.seuil_alerte}</td>
                <td>
                  <Link to={`/produits/${produit.id}`} className="text-blue-600 underline">
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
