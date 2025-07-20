import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Altere para a URL do seu backend

// ================= PRODUTOS =================
export const getProdutos = () => axios.get(`${API_URL}/produtos`);
export const createProduto = (data) => axios.post(`${API_URL}/produtos`, data);
export const updateProduto = (id, data) => axios.put(`${API_URL}/produtos/${id}`, data);
export const deleteProduto = (id) => axios.delete(`${API_URL}/produtos/${id}`);

// ================= FORNECEDORES =================
export const getFornecedores = () => axios.get(`${API_URL}/fornecedores`);
export const createFornecedor = (data) => axios.post(`${API_URL}/fornecedores`, data);
export const updateFornecedor = (id, data) => axios.put(`${API_URL}/fornecedores/${id}`, data);
export const deleteFornecedor = (id) => axios.delete(`${API_URL}/fornecedores/${id}`);

// ================= ASSOCIAÇÕES =================
export const getAssociacoes = () => axios.get(`${API_URL}/associacoes`);
export const associarProdutoFornecedor = (produtoId, fornecedorId) => 
  axios.post(`${API_URL}/associacoes`, { produtoId, fornecedorId });
export const desassociarProdutoFornecedor = (associacaoId) => 
  axios.delete(`${API_URL}/associacoes/${associacaoId}`);

// ================= UTILITÁRIOS =================
const api = {
  // Produtos
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  
  // Fornecedores
  getFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
  
  // Associações
  getAssociacoes,
  associarProdutoFornecedor,
  desassociarProdutoFornecedor
};

export default api;