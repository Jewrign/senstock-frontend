import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EditProduit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    categorie: '',
    description: '',
    stock: '',
    prix_unitaire: '',
    seuil_alerte: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.get(`/produits/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          nom: data.nom,
          categorie: data.categorie,
          description: data.description || '',
          stock: data.stock,
          prix_unitaire: data.prix_unitaire,
          seuil_alerte: data.seuil_alerte,
        });
        if (data.image) {
          setPreview(`https://senstock-backend.onrender.com/storage/${data.image}`);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append('image', image);
    }

    try {
      await api.post(`/produits/${id}?_method=PUT`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/produits');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier le produit</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="w-full border p-2" />
        <input type="text" name="categorie" value={formData.categorie} onChange={handleChange} placeholder="Catégorie" className="w-full border p-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full border p-2" />
        <input type="number" name="prix_unitaire" value={formData.prix_unitaire} onChange={handleChange} placeholder="Prix unitaire" className="w-full border p-2" />
        <input type="number" name="seuil_alerte" value={formData.seuil_alerte} onChange={handleChange} placeholder="Seuil d’alerte" className="w-full border p-2" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2" />

        {preview && (
          <img src={preview} alt="Aperçu" className="h-32 mt-2 object-cover rounded" />
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enregistrer</button>
      </form>
    </div>
  );
}
