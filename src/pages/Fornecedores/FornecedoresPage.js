import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import FornecedorForm from './components/FornecedorForm';
import FornecedoresTable from './components/FornecedoresTable';

const FornecedoresPage = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Fornecedores
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Novo Fornecedor
      </Button>

      {openForm && <FornecedorForm onClose={() => setOpenForm(false)} />}
      
      <FornecedoresTable />
    </Container>
  );
};

export default FornecedoresPage;