import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register', form);
      navigate('/login');
    } catch (err) {
      alert("Erreur d'inscription");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 space-y-4">
      <input name="name" placeholder="Nom" onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" />
      <input name="email" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="w-full p-2 border rounded" />
      <input name="password" type="password" placeholder="Mot de passe" onChange={(e) => setForm({...form, password: e.target.value})} className="w-full p-2 border rounded" />
      <input name="password_confirmation" type="password" placeholder="Confirmer" onChange={(e) => setForm({...form, password_confirmation: e.target.value})} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">S'inscrire</button>
    </form>
  );
}
