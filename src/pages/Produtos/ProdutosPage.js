import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import AssociacaoForm from '../../components/AssociacaoProduto/AssociacaoForm';
import { produtoService, associacaoService } from '../../services/api';

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

 const carregarProdutos = async () => {
  setLoading(true);
  setError(null);
  const response = await produtoService.listar();
  if (response.success) {
    setProdutos(response.data || []);
  } else {
    setError('Erro ao carregar produtos');
    setProdutos([]);
  }
  setLoading(false);
};

  const handleAssociar = async (produtoId, fornecedorId) => {
    try {
      const response = await associacaoService.associar(produtoId, fornecedorId);
      if (!response.success) throw new Error('Falha na associação');
      setModalAberto(false);
      await carregarProdutos();
    } catch (error) {
      console.error('Erro na associação:', error);
      throw error; // para o componente AssociacaoForm tratar o erro
    }
  };

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Produtos</h1>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.codigoBarras}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => abrirModal(produto)}
                    >
                      Associar Fornecedor
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AssociacaoForm
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onAssociar={handleAssociar}
        produtoSelecionado={produtoSelecionado}
      />
    </div>
  );
}

export default ProdutosPage;