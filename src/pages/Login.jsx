import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Connexion échouée');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <input className="w-full p-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 border rounded" type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full p-2 bg-blue-600 text-white rounded" type="submit">Se connecter</button>
    </form>
  );
}
