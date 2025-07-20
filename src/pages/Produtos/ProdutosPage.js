import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Snackbar,
  Alert 
} from '@mui/material';
import { getProdutos, createProduto } from '../../services/api';

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    codigoBarras: '',
    descricao: '',
    quantidade: 0,
    categoria: ''
  });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response.data);
    } catch (error) {
      setMensagem({ texto: 'Erro ao carregar produtos!', tipo: 'error' });
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduto(formData);
      setMensagem({ texto: 'Produto cadastrado com sucesso!', tipo: 'success' });
      setOpenSnackbar(true);
      buscarProdutos();
      setFormData({ 
        nome: '', 
        codigoBarras: '', 
        descricao: '', 
        quantidade: 0, 
        categoria: '' 
      });
    } catch (error) {
      setMensagem({ texto: error.response?.data?.message || 'Erro ao cadastrar produto!', tipo: 'error' });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginBottom: '20px' }}>
        <TextField
          label="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <TextField
          label="Código de Barras"
          value={formData.codigoBarras}
          onChange={(e) => setFormData({ ...formData, codigoBarras: e.target.value })}
        />
        <TextField
          label="Descrição"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
          multiline
          rows={3}
        />
        <TextField
          label="Quantidade"
          type="number"
          value={formData.quantidade}
          onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
        />
        <TextField
          label="Categoria"
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Cadastrar
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Código de Barras</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.codigoBarras}</TableCell>
                <TableCell>{produto.quantidade}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={mensagem.tipo} sx={{ width: '100%' }}>
          {mensagem.texto}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProdutosPage;