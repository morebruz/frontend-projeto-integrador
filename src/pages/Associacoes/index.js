import { useState } from 'react';
import AssociacaoForm from './components/AssociacaoForm';
import { produtoService, fornecedorService } from '../../../services/api';

export default function AssociacoesPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleAssociar = async (produtoId, fornecedorId) => {
    try {
      await produtoService.associarFornecedor(produtoId, fornecedorId);
      setModalAberto(false);
    } catch (error) {
      console.error("Erro na associação:", error);
    }
  };

  return (
    <div>
      <h1>Gerenciar Associações</h1>
      <button onClick={() => setModalAberto(true)}>
        Nova Associação
      </button>

      <AssociacaoForm
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onAssociar={handleAssociar}
        produtoSelecionado={produtoSelecionado}
      />
    </div>
  );
}