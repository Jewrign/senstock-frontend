import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    api.get(`/produits/${id}`)
      .then(res => setProduit(res.data))
      .catch(err => console.error('Erreur chargement produit:', err));
  }, [id]);

  if (!produit) return <p className="p-6">Chargement...</p>;

  const imageUrl = produit.image
    ? `https://senstock-backend.onrender.com/storage/${produit.image}`
    : null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/produits" className="text-blue-600 hover:underline block mb-4">← Retour à la liste</Link>

      <h1 className="text-3xl font-bold mb-4">{produit.nom}</h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={produit.nom}
          className="w-full max-h-80 object-contain rounded shadow mb-6"
        />
      )}

      <div className="space-y-2">
        <p><strong>Catégorie :</strong> {produit.categorie}</p>
        <p><strong>Description :</strong> {produit.description || '—'}</p>
        <p><strong>Stock :</strong> {produit.stock}</p>
        <p><strong>Prix unitaire :</strong> {produit.prix_unitaire} FCFA</p>
        <p><strong>Seuil d’alerte :</strong> {produit.seuil_alerte}</p>
      </div>
    </div>
  );
}
