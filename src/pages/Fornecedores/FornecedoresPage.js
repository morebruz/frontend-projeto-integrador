import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';
import { getFornecedores, createFornecedor } from '../../services/api';

function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: ''
  });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await getFornecedores();
      setFornecedores(response.data);
    } catch (error) {
      setMensagem({ texto: 'Erro ao carregar fornecedores!', tipo: 'error' });
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFornecedor(formData);
      setMensagem({ texto: 'Fornecedor cadastrado com sucesso!', tipo: 'success' });
      setOpenSnackbar(true);
      fetchFornecedores();
      setFormData({
        nomeEmpresa: '',
        cnpj: '',
        endereco: '',
        telefone: '',
        email: '',
        contatoPrincipal: ''
      });
    } catch (error) {
      setMensagem({ texto: error.response?.data?.message || 'Erro ao cadastrar fornecedor!', tipo: 'error' });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Fornecedores</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginBottom: '20px' }}>
        <TextField
          label="Nome da Empresa"
          value={formData.nomeEmpresa}
          onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
          required
        />
        <TextField
          label="CNPJ"
          value={formData.cnpj}
          onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
          placeholder="00.000.000/0000-00"
          required
        />
        <TextField
          label="Endereço"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          required
          multiline
        />
        <TextField
          label="Telefone"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          placeholder="(00) 0000-0000"
          required
        />
        <TextField
          label="E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          required
        />
        <TextField
          label="Contato Principal"
          value={formData.contatoPrincipal}
          onChange={(e) => setFormData({ ...formData, contatoPrincipal: e.target.value })}
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
              <TableCell>Nome da Empresa</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Contato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>{fornecedor.nomeEmpresa}</TableCell>
                <TableCell>{fornecedor.cnpj}</TableCell>
                <TableCell>{fornecedor.contatoPrincipal}</TableCell>
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

export default FornecedoresPage;