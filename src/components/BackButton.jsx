import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({ label = "Retour" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 inline-flex items-center text-blue-600 hover:underline"
    >
      <ArrowLeftIcon className="h-5 w-5 mr-1" />
      {label}
    </button>
  );
}
