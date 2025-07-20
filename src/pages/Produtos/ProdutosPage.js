import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import FormProduto from '../../components/FormProduto';
import TabelaProdutos from '../../components/TabelaProdutos';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../../services/api';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSalvarProduto = async (produto) => {
    try {
      if (produtoEditando) {
        await updateProduto(produtoEditando.id, produto);
      } else {
        await createProduto(produto);
      }
      carregarProdutos();
      setOpenForm(false);
      setProdutoEditando(null);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEditarProduto = (produto) => {
    setProdutoEditando(produto);
    setOpenForm(true);
  };

  const handleExcluirProduto = async (id) => {
    try {
      await deleteProduto(id);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Produtos
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: '20px' }}
      >
        Adicionar Produto
      </Button>

      {openForm && (
        <FormProduto
          produto={produtoEditando}
          onSave={handleSalvarProduto}
          onCancel={() => {
            setOpenForm(false);
            setProdutoEditando(null);
          }}
        />
      )}

      <Paper elevation={3}>
        <TabelaProdutos
          produtos={produtos}
          onEdit={handleEditarProduto}
          onDelete={handleExcluirProduto}
        />
      </Paper>
    </Container>
  );
};

export default ProdutosPage;