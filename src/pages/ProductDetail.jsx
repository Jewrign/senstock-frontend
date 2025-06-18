import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [mouvements, setMouvements] = useState([]);

  useEffect(() => {
    api.get(`/produits/${id}`)
      .then(res => setProduit(res.data))
      .catch(err => console.error('Erreur chargement produit:', err));
    api.get(`/produits/${id}/mouvements`).then(res => setMouvements(res.data));
  }, [id]);

  if (!produit) return <p className="p-6">Chargement...</p>;

  const imageUrl = produit.image
    ? `https://senstock-backend.onrender.com/storage/${produit.image}`
    : null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Détail du produit</h1>
      <BackButton />
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">{produit.nom}</h2>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={produit.nom}
            className="w-full max-h-80 object-contain rounded shadow mb-6"
          />
        )}

        <p><strong>Catégorie :</strong> {produit.categorie}</p>
        <p><strong>Description :</strong> {produit.description || '-'}</p>
        <p><strong>Stock actuel :</strong> {produit.stock}</p>
        <p><strong>Prix unitaire :</strong> {produit.prix_unitaire} F CFA</p>
        <p><strong>Seuil d’alerte :</strong> {produit.seuil_alerte}</p>

        <Link to={`/produits/${id}/mouvement`} className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter Mouvement
        </Link>
      </div>  

      <h2 className="text-xl font-bold mb-2">Historique des mouvements</h2>
      <table className="w-full bg-white shadow text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Type</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Date</th>
            <th className="p-2">Remarque</th>
          </tr>
        </thead>
        <tbody>
          {mouvements.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-gray-500">Aucun mouvement enregistré</td>
            </tr>
          ) : (
            mouvements.map(m => (
              <tr key={m.id} className="border-t">
                <td className="p-2">{m.type}</td>
                <td className="p-2">{m.quantite}</td>
                <td className="p-2">{new Date(m.created_at).toLocaleString()}</td>
                <td className="p-2">{m.remarque || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
