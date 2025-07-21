import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button,
  Box,
  Alert
} from '@mui/material';
import AssociacaoForm from './components/AssociacaoForm';
import AssociacoesTable from './components/AssociacoesTable';
import { 
  getAssociacoes, 
  associarProdutoFornecedor, 
  desassociarProdutoFornecedor 
} from "../../services/api";

const AssociacaoPage = () => {
  const [associacoes, setAssociacoes] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarAssociacoes();
  }, []);

  const carregarAssociacoes = async () => {
    try {
      const response = await getAssociacoes();
      setAssociacoes(response.data);
    } catch (err) {
      setError('Erro ao carregar associações');
      console.error(err);
    }
  };

  const handleAssociar = async (produtoId, fornecedorId) => {
    try {
      await associarProdutoFornecedor(produtoId, fornecedorId);
      carregarAssociacoes();
    } catch (err) {
      setError('Erro ao criar associação');
      console.error(err);
    }
  };

  const handleDesassociar = async (associacaoId) => {
    try {
      await desassociarProdutoFornecedor(associacaoId);
      carregarAssociacoes();
    } catch (err) {
      setError('Erro ao remover associação');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Associações Produto-Fornecedor
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => setOpenForm(true)}
        >
          Nova Associação
        </Button>
      </Box>

      {openForm && (
        <AssociacaoForm 
          onClose={() => setOpenForm(false)} 
          onAssociar={handleAssociar}
        />
      )}
      
      <AssociacoesTable 
        associacoes={associacoes} 
        onDesassociar={handleDesassociar} 
      />
    </Container>
  );
};

export default AssociacaoPage;