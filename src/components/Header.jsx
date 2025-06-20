import { Link } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import api from "../services/api";
import { useEffect, useState } from "react";

export default function Header() {

  const [alerteCount, setAlerteCount] = useState(0);

  useEffect(() => {
      api.get('/produits')
        .then(res => {
          const alertes = res.data.filter(p => p.stock <= p.seuil_alerte);
          setAlerteCount(alertes.length);
        })
        .catch(err => console.error('Erreur chargement alertes:', err));
    }, []);
  
  return (
      <header className="bg-blue-700 text-white p-4 shadow flex justify-between items-center">
        <div className="text-xl font-bold">SenStock</div>
        <nav className="flex items-center gap-4">
                <Link to="/alertes" className="relative hover:underline">
                  <BellIcon className="h-6 w-6 text-gray-700" />
        
                  {alerteCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                      {alerteCount}
                    </span>
                  )}
                </Link>
              </nav>
      </header>
    );
  }
  