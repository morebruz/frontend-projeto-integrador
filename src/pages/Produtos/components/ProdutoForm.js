import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Button,
  Stack
} from '@mui/material';

const ProdutoForm = ({ onClose }) => {
  const [produto, setProduto] = useState({
    nome: '',
    codigoBarras: '',
    descricao: '',
    preco: 0,
    quantidade: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto enviado:', produto);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Produto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              label="Nome"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Código de Barras"
              name="codigoBarras"
              value={produto.codigoBarras}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={produto.descricao}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Preço"
              name="preco"
              type="number"
              value={produto.preco}
              onChange={handleChange}
              fullWidth
              inputProps={{ step: "0.01" }}
            />
            <TextField
              label="Quantidade em Estoque"
              name="quantidade"
              type="number"
              value={produto.quantidade}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProdutoForm;