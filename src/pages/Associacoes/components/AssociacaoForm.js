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

export default function AssociacaoForm({ open, onClose, onAssociar, produtoSelecionado }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fornecedorService.listar();
        if (response && response.data) {
          setFornecedores(response.data);
        } else {
          setFornecedores([]);
          setError('Resposta inválida do servidor');
        }
      } catch (err) {
        setError('Erro ao carregar fornecedores');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      carregarFornecedores();
      setFornecedorId(''); // resetar seleção ao abrir modal
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!fornecedorId) {
      setError('Selecione um fornecedor');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await onAssociar(produtoSelecionado.id, fornecedorId);
      onClose();
    } catch (err) {
      setError('Erro ao associar: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Associar fornecedor a: {produtoSelecionado?.nome || ''}
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading && fornecedores.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FormControl fullWidth>
            <InputLabel id="fornecedor-label">Fornecedor</InputLabel>
            <Select
              labelId="fornecedor-label"
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              label="Fornecedor"
              disabled={loading}
            >
              <MenuItem value="">Selecione um fornecedor</MenuItem>
              {fornecedores.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.nomeEmpresa} - {f.cnpj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !fornecedorId}
        >
          {loading ? <CircularProgress size={24} /> : 'Associar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}