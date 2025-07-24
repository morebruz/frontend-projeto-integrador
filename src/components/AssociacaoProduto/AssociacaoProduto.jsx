import { useNavigate } from 'react-router-dom';
import './AssociacaoProduto.css';

export default function AssociacaoProduto() {
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/produtos'); // Ou -1 para voltar
  };

  return (
    <div className="associacao-container">
      {/* ... outros elementos ... */}
      <button 
        onClick={handleCancelar}
        className="btn-cancelar"
      >
        Cancelar
      </button>
    </div>
  );
}