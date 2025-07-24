import axios from 'axios';

// Cria instância Axios com baseURL correta
const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // CORRETO: porta do backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor global para erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'Erro no servidor',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      return Promise.reject({
        message: 'Servidor não respondeu',
        status: 503,
      });
    } else {
      return Promise.reject({
        message: 'Erro na configuração da requisição',
        status: 500,
      });
    }
  }
);

// Serviços Produtos
export const produtoService = {
  listar: () => api.get('/produtos'),
  criar: (dados) => api.post('/produtos', dados),
  atualizar: (id, dados) => api.put(`/produtos/${id}`, dados),
  remover: (id) => api.delete(`/produtos/${id}`),
};

// Serviços Fornecedores
export const fornecedorService = {
  listar: () => api.get('/fornecedores'),
  criar: (dados) => api.post('/fornecedores', dados),
  atualizar: (id, dados) => api.put(`/fornecedores/${id}`, dados),
  remover: (id) => api.delete(`/fornecedores/${id}`),
};

// Serviços Associações
export const associacaoService = {
  listar: () => api.get('/associacoes'),
  associar: (produtoId, fornecedorId) => api.post('/associacoes', { produtoId, fornecedorId }),
  desassociar: (id) => api.delete(`/associacoes/${id}`),
};

export default api;