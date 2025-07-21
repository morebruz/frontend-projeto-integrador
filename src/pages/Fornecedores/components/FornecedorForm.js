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

const FornecedorForm = ({ onClose }) => {
  const [fornecedor, setFornecedor] = useState({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor(prev => ({ ...prev, [name]: value }));
  };

  const formatarCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const formatarTelefone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .slice(0, 15);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fornecedor enviado:', fornecedor);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Fornecedor</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              label="Nome da Empresa"
              name="nomeEmpresa"
              value={fornecedor.nomeEmpresa}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              label="CNPJ"
              name="cnpj"
              value={fornecedor.cnpj}
              onChange={(e) => setFornecedor({...fornecedor, cnpj: formatarCNPJ(e.target.value)})}
              placeholder="00.000.000/0000-00"
              fullWidth
              required
            />
            
            <TextField
              label="Endereço Completo"
              name="endereco"
              value={fornecedor.endereco}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
            />
            
            <TextField
              label="Telefone"
              name="telefone"
              value={fornecedor.telefone}
              onChange={(e) => setFornecedor({...fornecedor, telefone: formatarTelefone(e.target.value)})}
              placeholder="(00) 0000-0000"
              fullWidth
              required
            />
            
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={fornecedor.email}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              label="Contato Principal"
              name="contatoPrincipal"
              value={fornecedor.contatoPrincipal}
              onChange={handleChange}
              fullWidth
              required
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

export default FornecedorForm;