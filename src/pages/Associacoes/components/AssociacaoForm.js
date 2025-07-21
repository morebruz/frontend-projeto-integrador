import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { getProdutos, getFornecedores } from '../../../services/api';

const AssociacaoForm = ({ onClose, onAssociar }) => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [produtosRes, fornecedoresRes] = await Promise.all([
          getProdutos(),
          getFornecedores()
        ]);
        setProdutos(produtosRes.data);
        setFornecedores(fornecedoresRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    carregarDados();
  }, []);

  const handleSubmit = () => {
    if (!selectedProduto || !selectedFornecedor) {
      alert('Selecione um produto e um fornecedor!');
      return;
    }
    onAssociar(selectedProduto, selectedFornecedor);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Associação</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Produto</InputLabel>
            <Select
              value={selectedProduto}
              onChange={(e) => setSelectedProduto(e.target.value)}
              label="Produto"
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.nome} - {produto.codigoBarras}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Fornecedor</InputLabel>
            <Select
              value={selectedFornecedor}
              onChange={(e) => setSelectedFornecedor(e.target.value)}
              label="Fornecedor"
            >
              {fornecedores.map((fornecedor) => (
                <MenuItem key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!selectedProduto || !selectedFornecedor}
        >
          Associar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssociacaoForm;