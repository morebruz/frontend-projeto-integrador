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

const ProdutosTable = () => {
  // Dados mockados temporários - substitua pela chamada à API depois
  const produtos = [
    { id: 1, nome: 'Produto A', codigoBarras: '123456789', preco: 10.99, quantidade: 50 },
    { id: 2, nome: 'Produto B', codigoBarras: '987654321', preco: 25.50, quantidade: 30 }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Código de Barras</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{produto.codigoBarras}</TableCell>
              <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
              <TableCell>{produto.quantidade}</TableCell>
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

export default ProdutosTable;