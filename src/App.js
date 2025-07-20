import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProdutosPage from './pages/Produtos/ProdutosPage';
import FornecedoresPage from './pages/Fornecedores/FornecedoresPage';
import AssociacaoPage from './pages/Associacoes/AssociacaoPage';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/fornecedores" element={<FornecedoresPage />} />
          <Route path="/associacoes" element={<AssociacaoPage />} />
          <Route path="/" element={<ProdutosPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;