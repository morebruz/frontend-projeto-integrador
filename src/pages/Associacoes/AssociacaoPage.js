import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import { 
  getAssociacoes, 
  associarProdutoFornecedor, 
  desassociarProdutoFornecedor,
  getProdutos,
  getFornecedores 
} from '../../services/api';

const AssociacaoPage = () => {
  const [associacoes, setAssociacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [responseAssociacoes, responseProdutos, responseFornecedores] = await Promise.all([
        getAssociacoes(),
        getProdutos(),
        getFornecedores()
      ]);
      
      setAssociacoes(responseAssociacoes.data);
      setProdutos(responseProdutos.data);
      setFornecedores(responseFornecedores.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleAssociar = async () => {
    if (!produtoSelecionado || !fornecedorSelecionado) {
      alert('Selecione um produto e um fornecedor!');
      return;
    }

    try {
      await associarProdutoFornecedor(produtoSelecionado, fornecedorSelecionado);
      carregarDados();
      setProdutoSelecionado('');
      setFornecedorSelecionado('');
    } catch (error) {
      console.error('Erro ao associar:', error);
    }
  };

  const handleDesassociar = async (associacaoId) => {
    try {
      await desassociarProdutoFornecedor(associacaoId);
      carregarDados();
    } catch (error) {
      console.error('Erro ao desassociar:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Associação Produto-Fornecedor
      </Typography>

      <Box display="flex" gap={2} marginBottom={4}>
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
          variant="contained" 
          onClick={handleAssociar}
          style={{ height: '56px' }}
        >
          Associar
        </Button>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Código de Barras</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {associacoes.map((associacao) => (
                <TableRow key={`${associacao.produtoId}-${associacao.fornecedorId}`}>
                  <TableCell>{associacao.produto.nome}</TableCell>
                  <TableCell>{associacao.produto.codigoBarras}</TableCell>
                  <TableCell>{associacao.fornecedor.nomeEmpresa}</TableCell>
                  <TableCell>{associacao.fornecedor.cnpj}</TableCell>
                  <TableCell>
                    <Button 
                      color="error"
                      onClick={() => handleDesassociar(associacao.id)}
                    >
                      Desassociar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AssociacaoPage;