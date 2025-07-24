import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { produtoService, fornecedorService } from '../../services/api';

const AssociacaoForm = ({ open = true, onClose, onAssociar, loading = false }) => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');

  // Carregar produtos e fornecedores
  useEffect(() => {
    const carregarDados = async () => {
      const [produtosRes, fornecedoresRes] = await Promise.all([
        produtoService.listar(),
        fornecedorService.listar()
      ]);

      if (produtosRes.success) setProdutos(produtosRes.data);
      if (fornecedoresRes.success) setFornecedores(fornecedoresRes.data);
    };

    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (produtoId && fornecedorId) {
      await onAssociar(produtoId, fornecedorId);
      handleClose();
    }
  };

  const handleClose = () => {
    setProdutoId('');
    setFornecedorId('');
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Associação</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Produto</InputLabel>
            <Select
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              label="Produto"
              disabled={loading}
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Fornecedor</InputLabel>
            <Select
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              label="Fornecedor"
              disabled={loading}
            >
              {fornecedores.map((fornecedor) => (
                <MenuItem key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !produtoId || !fornecedorId}
        >
          {loading ? <CircularProgress size={24} /> : 'Associar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssociacaoForm;