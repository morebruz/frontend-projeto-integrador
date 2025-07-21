import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Controle de Estoque
        </Typography>
        <Button color="inherit" component={Link} to="/produtos">Produtos</Button>
        <Button color="inherit" component={Link} to="/fornecedores">Fornecedores</Button>
        <Button color="inherit" component={Link} to="/associacoes">Associações</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;