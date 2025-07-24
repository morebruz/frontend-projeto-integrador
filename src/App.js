import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ProdutosPage from './pages/Produtos/ProdutosPage';
import FornecedoresPage from './pages/Fornecedores/FornecedoresPage';
import AssociacaoPage from './pages/Associacoes/AssociacaoPage';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/fornecedores')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Erro:', err));
  }, []);

  return (
    <Router>
      <Navbar />
      {/* Exibe a mensagem do backend (opcional) */}
      {data && <p>Mensagem do Backend: {data.message}</p>}
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