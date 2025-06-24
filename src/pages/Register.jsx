import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { initCsrf } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await initCsrf();
      const response = await api.post('/register', form);
      if (response.status === 201) {
        navigate('/dashboard');
      } else {
        throw new Error('Inscription échouée');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
      console.error('Erreur d’inscription:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow bg-white rounded">
      <h1 className="text-xl font-bold mb-4">Inscription</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nom" onChange={handleChange} className="w-full border p-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} className="w-full border p-2" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">S’inscrire</button>
      </form>
    </div>
  );
}
