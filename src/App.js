import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ProdutosPage from './pages/Produtos/ProdutosPage';
import FornecedoresPage from './pages/Fornecedores/FornecedoresPage';
import AssociacaoPage from './pages/Associacoes/AssociacaoPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/fornecedores" element={<FornecedoresPage />} />
        <Route path="/associacoes" element={<AssociacaoPage />} />
        <Route path="/" element={<ProdutosPage />} />
      </Routes>
    </Router>
  );
}

export default App;