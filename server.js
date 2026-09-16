import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// No ES Modules, __dirname não existe nativamente e precisa ser reconstruído:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Libera requisições de outras origens
app.use(express.json());

import cardapio from './data/cardapio.js';

// Servir arquivos estáticos (HTML, CSS, JS do front-end e imagens)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rota da API para retornar o cardápio
app.get('/api/cardapio', (req, res) => {
  res.json(cardapio);
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});