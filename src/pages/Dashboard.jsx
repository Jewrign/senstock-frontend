import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [produits, setProduits] = useState([]);
  const [mouvements, setMouvements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/produits');
      setProduits(res.data);
      let recents = [];

      for (let p of res.data) {
        const r = await api.get(`/produits/${p.id}/mouvements`);
        const mouvementsProduit = r.data.map(m => ({
          ...m,
          produit_nom: p.nom
        }));
        recents = [...recents, ...mouvementsProduit];
      }

      recents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setMouvements(recents.slice(0, 5));
    };

    fetchData();
  }, []);

  const alertes = produits.filter(p => p.stock <= p.seuil_alerte);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/produits" className="bg-white shadow p-4 rounded hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold">Produits</h3>
          <p>{produits.length} en stock</p>
        </Link>

        <Link to="/alertes" className="bg-white shadow p-4 rounded hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold text-red-600">Alertes</h3>
          <p>{alertes.length} en alerte</p>
        </Link>

        <Link to="/mouvements" className="bg-white shadow p-4 rounded hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold">Mouvements</h3>
          <p>Voir les derniers mouvements</p>
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">🕒 Mouvements récents</h2>
        <table className="w-full bg-white shadow text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Produit</th>
              <th className="p-2">Type</th>
              <th className="p-2">Quantité</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mouvements.map(m => (
              <tr key={m.id} className="border-t">
                <td className="p-2">{m.produit_nom}</td>
                <td className="p-2">{m.type}</td>
                <td className="p-2">{m.quantite}</td>
                <td className="p-2">{new Date(m.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
