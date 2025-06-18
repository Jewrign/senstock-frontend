import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';
import {
  HomeIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();

  const [alerteCount, setAlerteCount] = useState(0);

  useEffect(() => {
    api.get('/produits')
      .then(res => {
        const alertes = res.data.filter(p => p.stock <= p.seuil_alerte);
        setAlerteCount(alertes.length);
      })
      .catch(err => console.error('Erreur chargement alertes:', err));
  }, []);

  // Fonction pour tester si une route est active
  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded ${
      isActive(path)
        ? 'bg-blue-100 text-blue-800 font-semibold'
        : 'text-blue-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 bg-white shadow-md border-r p-4 h-screen">
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className={linkClass('/dashboard')}>
          <HomeIcon className="h-5 w-5" /> Dashboard
        </Link>
        <Link to="/produits" className={linkClass('/produits')}>
          <CubeIcon className="h-5 w-5" /> Produits
        </Link>
        <Link to="/mouvements" className={linkClass('/mouvements')}>
          <ArrowsRightLeftIcon className="h-5 w-5" /> Mouvements
        </Link>
        <Link to="/dashboard" className="flex items-center gap-2 text-red-500 hover:underline">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Accueil
        </Link>
        <Link to="/alertes" className="relative hover:underline">
          <BellIcon className="h-6 w-6 text-gray-700" />

          {alerteCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              {alerteCount}
            </span>
          )}
        </Link>
      </nav>
    </aside>
  );
}
