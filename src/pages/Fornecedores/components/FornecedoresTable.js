import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const FornecedoresTable = () => {
  // Dados mockados temporários
  const fornecedores = [
    { 
      id: 1, 
      nomeEmpresa: 'Fornecedor A', 
      cnpj: '12.345.678/0001-90', 
      contatoPrincipal: 'João Silva',
      telefone: '(11) 9999-8888'
    },
    { 
      id: 2, 
      nomeEmpresa: 'Fornecedor B', 
      cnpj: '98.765.432/0001-21', 
      contatoPrincipal: 'Maria Souza',
      telefone: '(21) 98888-7777'
    }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome da Empresa</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Contato</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fornecedores.map((fornecedor) => (
            <TableRow key={fornecedor.id}>
              <TableCell>{fornecedor.nomeEmpresa}</TableCell>
              <TableCell>{fornecedor.cnpj}</TableCell>
              <TableCell>{fornecedor.contatoPrincipal}</TableCell>
              <TableCell>{fornecedor.telefone}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FornecedoresTable;