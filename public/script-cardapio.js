document.addEventListener("DOMContentLoaded", () => {
  const containerCards = document.getElementById("container-cards");

  // Substitua pela URL da sua rota no Node.js (ex: http://localhost:3000/api/cardapio)
  const URL_API = "http://localhost:3000/api/cardapio";

  async function carregarCardapio() {
    try {
      const resposta = await fetch(URL_API);
      const cafes = await resposta.json();

      // Limpa a mensagem "Carregando cardápio..."
      containerCards.innerHTML = "";

      // Percorre a lista recebida do backend e cria o HTML para cada café
      cafes.forEach((cafe) => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${cafe.imagem}" alt="${cafe.nome}" />
          <h3>${cafe.nome}</h3>
          <p>${cafe.descricao}</p>
          <button>Pedir Agora</button>
        `;

        containerCards.appendChild(card);
      });
    } catch (erro) {
      console.error("Erro ao carregar o cardápio:", erro);
      containerCards.innerHTML = "<p>Não foi possível carregar o cardápio no momento.</p>";
    }
  }

  carregarCardapio();
});