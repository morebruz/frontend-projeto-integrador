import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import ProdutoForm from './components/ProdutoForm';
import ProdutosTable from './components/ProdutosTable';

const ProdutosPage = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Produtos
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Novo Produto
      </Button>

      {openForm && <ProdutoForm onClose={() => setOpenForm(false)} />}
      
      <ProdutosTable />
    </Container>
  );
};

export default ProdutosPage;