import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import BackButton from '../components/BackButton';

export default function AddProduct() {
  const [form, setForm] = useState({ nom: '', categorie: '', stock: '', prix_unitaire: '', seuil_alerte: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append('image', image);
    }

    try {
        await axios.post('/produits', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('✅ Produit ajouté avec succès');
        setForm({
          nom: '',
          categorie: '',
          description: '',
          stock: '',
          prix_unitaire: '',
          seuil_alerte: '',
        });
        setImage(null);
        setPreview(null);
      } catch (error) {
        setMessage('❌ Erreur lors de l’ajout');
        console.error(error);
      }
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
      <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2" />

        {preview && <img src={preview} alt="Aperçu" className="h-32 mt-2 object-cover rounded" />}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
    </div>
  );
}
