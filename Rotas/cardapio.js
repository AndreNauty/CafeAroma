import express from 'express';

// Ajuste o caminho importado abaixo se necessário (ex: '../data/cardapio.js')
import dados from '../data/cardapio.js';

const router = express.Router();

// Middleware para verificar se o item existe no cardápio
function verificarItemExiste(req, res, next) {
  const { id } = req.params;

  const index = dados.findIndex((item) => item.id == id);

  if (index < 0) {
    return res.status(404).json({ erro: "Item do cardápio não encontrado." });
  }

  // Anexa o ID e o índice encontrado ao objeto 'req' para reuso nas rotas
  req.id = id;
  req.index = index;

  return next();
}

// GET /api/cardapio
router.get('/', (req, res) => {
  res.json(dados);
});

// POST /api/cardapio (Cria um novo item)
router.post('/', (req, res) => {
  const { id, nome, descricao, imagem } = req.body;

  // Validação: verifica se os campos obrigatórios foram enviados
  if (!id || !nome || !descricao || !imagem) {
    return res.status(400).json({ 
      erro: "Todos os campos (id, nome, descricao, imagem) são obrigatórios." 
    });
  }

  // Verifica se o ID já existe
  const existeItem = dados.some(item => item.id == id);
  if (existeItem) {
    return res.status(400).json({ erro: "Item com este ID já existe." });
  }

  // Cria o novo objeto com todas as propriedades
  const novoItem = {
    id: Number(id),
    nome,
    descricao,
    imagem
  };

  dados.push(novoItem);

  res.status(201).json({ 
    mensagem: "Item adicionado com sucesso!", 
    item: novoItem,
    dados 
  });
});

// PUT /api/cardapio/:id (Atualiza um item existente usando o middleware)
router.put('/:id', verificarItemExiste, (req, res) => {
  const { nome, descricao, imagem } = req.body;
  const index = req.index; // Recupera o índice enviado pelo middleware

  // Atualiza as chaves mantendo os valores antigos se não forem passados
  dados[index] = {
    ...dados[index],
    nome: nome !== undefined ? nome : dados[index].nome,
    descricao: descricao !== undefined ? descricao : dados[index].descricao,
    imagem: imagem !== undefined ? imagem : dados[index].imagem
  };

  res.json({ 
    mensagem: "Item atualizado com sucesso!", 
    itemAtualizado: dados[index] 
  });
});

// DELETE /api/cardapio/:id (Remove um item usando o middleware)
router.delete('/:id', verificarItemExiste, (req, res) => {
  const index = req.index; // Recupera o índice enviado pelo middleware
  const id = req.id;       // Recupera o ID enviado pelo middleware

  dados.splice(index, 1);

  res.json({ mensagem: `Item com ID ${id} deletado com sucesso.`, dados });
});

export default router;