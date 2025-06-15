import { useEffect, useState } from 'react';
import api from '../services/api';
import BackButton from '../components/BackButton';

export default function Mouvements() {
  const [mouvements, setMouvements] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const produitsRes = await api.get('/produits');
      let tous = [];

      for (let p of produitsRes.data) {
        const res = await api.get(`/produits/${p.id}/mouvements`);
        const mouvementsProduit = res.data.map(m => ({
          ...m,
          produit_nom: p.nom
        }));
        tous = [...tous, ...mouvementsProduit];
      }

      // Trier par date (optionnel)
      tous.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setMouvements(tous);
    };

    fetchAll();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tous les mouvements</h1>
      <BackButton />
      <table className="w-full bg-white shadow text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Produit</th>
            <th className="p-2">Type</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Date</th>
            <th className="p-2">Remarque</th>
          </tr>
        </thead>
        <tbody>
          {mouvements.map(m => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.produit_nom}</td>
              <td className="p-2">{m.type}</td>
              <td className="p-2">{m.quantite}</td>
              <td className="p-2">{new Date(m.created_at).toLocaleString()}</td>
              <td className="p-2">{m.remarque || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
