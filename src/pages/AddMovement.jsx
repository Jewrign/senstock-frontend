import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import BackButton from '../components/BackButton';

export default function AddMovement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: 'entrée', quantite: '', remarque: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/produits/${id}/mouvements`, form);
    navigate(`/produits/${id}`);
  };

  return (
    <div className="space-y-6">
    <h1 className="text-2xl font-bold mb-4">Ajouter un mouvement</h1>
    <BackButton />
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="entrée">Entrée</option>
        <option value="sortie">Sortie</option>
      </select>
      <input name="quantite" placeholder="Quantité" onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="remarque" placeholder="Remarque" onChange={handleChange} className="w-full p-2 border rounded" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Valider</button>
    </form>
    </div>
      );
}
