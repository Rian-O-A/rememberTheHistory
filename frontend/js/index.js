let container = document.querySelector("#muralStore")
let quant = document.querySelector("p")
console.log(quant.innerText.length)

for (let x=0; x <=20; x++){

    container.innerHTML += `
    <div class="cardUser">
        <div class="user">
            <img src="./styles/css/img/userQuestion.png">
        </div>
        <div class="message"><p>Olá mundo!</p></div>
        <div class="date">2002-01-22</div>
    </div>`
    
 
}
// URL da rota que você deseja acessar
const url = 'http://127.0.0.1:5500/getHistory';

// Configuração do request
const options = {
  method: 'GET',
  headers: {
    // Se necessário, você pode adicionar cabeçalhos personalizados aqui
    // Por exemplo, para definir o tipo de conteúdo aceito:
    // 'Content-Type': 'application/json'
  }
};

// Fazendo o request
fetch(url, options)
  .then(data => {
    // Aqui você pode lidar com a resposta recebida
    console.log(data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
