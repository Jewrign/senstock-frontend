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

    const handleDelete = async () => {
      const confirm = window.confirm(`Supprimer "${produit.nom}" ?`);
      if (!confirm) return;

      try {
        await api.delete(`/produits/${produit.id}`);
        setProduits(produits.filter(p => p.id !== produit.id));
      } catch (error) {
        alert("Erreur lors de la suppression");
        console.error(error);
      }
    };

    return (
      <tr key={produit.id} className={isAlerte ? 'bg-red-50' : ''}>
        <td className={`p-2 ${isAlerte ? 'text-red-600 font-bold' : ''}`}>{produit.nom}</td>
        <td>{produit.categorie}</td>
        <td>{produit.stock}</td>
        <td className="space-x-2">
          <Link to={`/produits/${produit.id}`} className="text-blue-600 rounded">
            Voir
          </Link>
          <Link to={`/produits/${produit.id}/edit`} className="text-yellow-600 rounded px-2 py-1">
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 rounded px-2 py-1"
          >
            Supprimer
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
}
