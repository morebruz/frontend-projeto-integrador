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
  Alert,
  CircularProgress
} from '@mui/material';
import { fornecedorService } from '../../services/api';

const AssociacaoForm = ({
  open,
  onClose,
  onAssociar,
  produtoSelecionado
}) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setSelectedFornecedor('');
      carregarFornecedores();
    }
  }, [open]);

  const carregarFornecedores = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await fornecedorService.listar();
      console.log('Fornecedores API:', data);

      if (success && Array.isArray(data)) {
        setFornecedores(data);
      } else {
        setFornecedores([]);
        setError(error?.message || 'Erro ao carregar fornecedores');
      }
    } catch (error) {
      setFornecedores([]);
      setError('Erro ao buscar fornecedores: ' + (error.message || error.toString()));
      console.error('Erro ao buscar fornecedores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFornecedor) {
      setError('Selecione um fornecedor!');
      return;
    }

    try {
      setLoading(true);
      await onAssociar(produtoSelecionado.id, selectedFornecedor);
      onClose(); // Fecha o modal após sucesso
    } catch (error) {
      setError('Erro ao realizar associação: ' + (error.message || error.toString()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Associar Fornecedor a: {produtoSelecionado?.nome || ''}
      </DialogTitle>

      <DialogContent>
        {loading && fornecedores.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Produto</InputLabel>
              <Select
                value={produtoSelecionado?.id || ''}
                label="Produto"
                disabled
              >
                <MenuItem value={produtoSelecionado?.id || ''}>
                  {produtoSelecionado?.nome} - {produtoSelecionado?.codigoBarras}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Fornecedor</InputLabel>
              <Select
                value={selectedFornecedor}
                onChange={(e) => setSelectedFornecedor(e.target.value)}
                label="Fornecedor"
                disabled={loading}
              >
                <MenuItem value="">Selecione um fornecedor</MenuItem>
                {fornecedores.map((fornecedor) => (
                  <MenuItem key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !selectedFornecedor}
        >
          {loading ? <CircularProgress size={24} /> : 'Associar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssociacaoForm;