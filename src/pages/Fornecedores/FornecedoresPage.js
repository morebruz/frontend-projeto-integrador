import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import FormFornecedor from '../../components/FormFornecedor';
import TabelaFornecedores from '../../components/TabelaFornecedores';
import { getFornecedores, createFornecedor, updateFornecedor, deleteFornecedor } from '../../services/api';

const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorEditando, setFornecedorEditando] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const response = await getFornecedores();
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  const handleSalvarFornecedor = async (fornecedor) => {
    try {
      if (fornecedorEditando) {
        await updateFornecedor(fornecedorEditando.id, fornecedor);
      } else {
        await createFornecedor(fornecedor);
      }
      carregarFornecedores();
      setOpenForm(false);
      setFornecedorEditando(null);
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const handleEditarFornecedor = (fornecedor) => {
    setFornecedorEditando(fornecedor);
    setOpenForm(true);
  };

  const handleExcluirFornecedor = async (id) => {
    try {
      await deleteFornecedor(id);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Fornecedores
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: '20px' }}
      >
        Adicionar Fornecedor
      </Button>

      {openForm && (
        <FormFornecedor
          fornecedor={fornecedorEditando}
          onSave={handleSalvarFornecedor}
          onCancel={() => {
            setOpenForm(false);
            setFornecedorEditando(null);
          }}
        />
      )}

      <Paper elevation={3}>
        <TabelaFornecedores
          fornecedores={fornecedores}
          onEdit={handleEditarFornecedor}
          onDelete={handleExcluirFornecedor}
        />
      </Paper>
    </Container>
  );
};

export default FornecedoresPage;