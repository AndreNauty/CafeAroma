import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. IMPORTAÇÃO: Dê o nome 'cardapioRouter' aqui
import cardapioRouter from './rotas/cardapio.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// 2. USO: Use o mesmo nome 'cardapioRouter' aqui
app.use('/api/cardapio', cardapioRouter);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});