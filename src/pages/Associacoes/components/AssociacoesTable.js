import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const AssociacoesTable = ({ associacoes, onDesassociar }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Fornecedor</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {associacoes.map((associacao) => (
            <TableRow key={associacao.id}>
              <TableCell>
                <Chip 
                  label={associacao.produto.nome} 
                  color="primary"
                  variant="outlined" 
                />
              </TableCell>
              <TableCell>{associacao.produto.codigoBarras}</TableCell>
              <TableCell>
                <Chip 
                  label={associacao.fornecedor.nomeEmpresa} 
                  color="secondary" 
                  variant="outlined" 
                />
              </TableCell>
              <TableCell>{associacao.fornecedor.cnpj}</TableCell>
              <TableCell>
                <IconButton 
                  color="error" 
                  onClick={() => onDesassociar(associacao.id)}
                >
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

export default AssociacoesTable;
