import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Select, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Snackbar,
  Alert,
  Box,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';
import { getAssociacoes, associarProdutoFornecedor, getProdutos, getFornecedores } from '../../services/api';

function AssociacaoPage() {
  const [associacoes, setAssociacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    buscarAssociacoes();
    buscarProdutos();
    buscarFornecedores();
  }, []);

  const buscarAssociacoes = async () => {
    try {
      const response = await getAssociacoes();
      setAssociacoes(response.data);
    } catch (error) {
      mostrarErro('Erro ao carregar associações!');
    }
  };

  const buscarProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response.data);
    } catch (error) {
      mostrarErro('Erro ao carregar produtos!');
    }
  };

  const buscarFornecedores = async () => {
    try {
      const response = await getFornecedores();
      setFornecedores(response.data);
    } catch (error) {
      mostrarErro('Erro ao carregar fornecedores!');
    }
  };

  const handleAssociar = async () => {
    if (!produtoSelecionado || !fornecedorSelecionado) {
      mostrarErro('Selecione um produto e um fornecedor!');
      return;
    }

    try {
      await associarProdutoFornecedor(produtoSelecionado, fornecedorSelecionado);
      mostrarSucesso('Associação realizada com sucesso!');
      buscarAssociacoes();
      setProdutoSelecionado('');
      setFornecedorSelecionado('');
    } catch (error) {
      mostrarErro(error.response?.data?.message || 'Erro ao associar!');
    }
  };

  const mostrarSucesso = (texto) => {
    setMensagem({ texto, tipo: 'success' });
    setOpenSnackbar(true);
  };

  const mostrarErro = (texto) => {
    setMensagem({ texto, tipo: 'error' });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Associação Produto-Fornecedor
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Produto</InputLabel>
          <Select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
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
            value={fornecedorSelecionado}
            onChange={(e) => setFornecedorSelecionado(e.target.value)}
            label="Fornecedor"
          >
            {fornecedores.map((fornecedor) => (
              <MenuItem key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          onClick={handleAssociar} 
          variant="contained" 
          size="large"
          sx={{ height: '56px' }}
        >
          Associar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Código de Barras</TableCell>
              <TableCell>Fornecedor</TableCell>
              <TableCell>CNPJ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {associacoes.map((associacao) => (
              <TableRow key={`${associacao.produtoId}-${associacao.fornecedorId}`}>
                <TableCell>{associacao.produto.nome}</TableCell>
                <TableCell>{associacao.produto.codigoBarras}</TableCell>
                <TableCell>{associacao.fornecedor.nomeEmpresa}</TableCell>
                <TableCell>{associacao.fornecedor.cnpj}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={mensagem.tipo}>
          {mensagem.texto}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AssociacaoPage;