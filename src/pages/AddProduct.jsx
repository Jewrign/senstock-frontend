import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import BackButton from '../components/BackButton';

export default function AddProduct() {
  const [form, setForm] = useState({ nom: '', categorie: '', stock: '', prix_unitaire: '', seuil_alerte: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/produits', form);
    navigate('/produits');
  };

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Ajouter un nouveau produit</h1>
        <BackButton />
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {['nom', 'categorie', 'stock', 'prix_unitaire', 'seuil_alerte'].map(field => (
        <input key={field} name={field} placeholder={field} onChange={handleChange} className="w-full p-2 border rounded" />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
    </form>
    </div>
  );
}
