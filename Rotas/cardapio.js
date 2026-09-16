import express from 'express'

import dados from'../data/cardapio.js'

//Importação e inicialização do roteador
const router = express.Router()

// Rota GET: Retorna a lista de cursos
router.get('/cursos',(req,res) =>{
	res.send(dados)
});

// Rota POST: Cria um novo curso
router.post('/cursos',(req,res) => {
		const {id, curso} = req.body;
		
		const existeCurso = dados.some(curso =>curso.id ===id);
		
		if(existeCurso){
				return res.json({"erro":"Id já existe."})
}
		
		const novoCurso = {
				id:id,
				curso:curso
		}
		
		dados.push (novoCurso)
		
		res.send(dados)
})

// Rota PUT: Atualiza um curso
router.put('/cursos/:id',(req,res) => {
		const {id} = req.params
		
		const curso = dados.filter((curso)=>{
				return curso.id == id 
		})
		
		console.log(curso)
    res.json(curso)
})

// Rota DELETE: Deleta um curso específico usando um parâmetro (ID)
router.delete('/cursos/:id', (req, res) => {
  res.send(`Curso com ID ${req.params.id} deletado.`);
});

export default router;