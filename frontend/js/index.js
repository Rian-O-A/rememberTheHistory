let container = document.querySelector("#muralStore")


// URL da rota que você deseja acessar
const url = 'https://rememberthehistory.onrender.com/all/getHistory';

token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MTk3NjYwMSwianRpIjoiMjM3MTJmNGYtNGM0Zi00OTQzLTkyOWQtY2YxNjhlMDA2YTg5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOiJDUGhpQ2RCUENsV25PNW4xUEN3ZGRjQ0lnWUYzIiwiZGlzcGxheU5hbWUiOiJSaWFuIGRlIE9saXZlaXJhIEFsbWVpZGEifSwibmJmIjoxNjkxOTc2NjAxLCJleHAiOjE2OTIxNDk0MDF9.wFkfXNitTUBkNBokFiG36KQy9GGnf9kDCBdzafV5lYKi7k9RfBrQr3AuI3eVOoMTVRDtj3VZ5vYmAUf7P_6DIlAs3J3pQ7XYUdVTvzZ0HmxrXmx2PjfPP2pdq1BSGS8HdnNHCPsh9j8pcW5jenF54B0m3eATW_iGE74l2aYqsfulT824p7sesLnXU6_A54qLIzxszOCf-POTyKzapER8FIdxy3569YSAu4DbBsjbaEE85xeLBky4j81Vl6aMhWDIysiWCuQU4vyJFn4JcKrctHYYYfcZuVFTcJ_cnh48rhUaPSaAFT2HdnHo_5_73OjNzUpdc-77BJ5nJ2LEBiF36w"

// Configuração do request
const options = {
  method: 'GET',
  headers: {
    "Authorization": `Bearer ${token}`
  }
}

// Fazendo o request
fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao fazer o request: ' + response.status);
    }
    return response.json(); // Se você estiver esperando uma resposta em formato JSON
  })
  .then(data => {
    // Aqui você pode lidar com a resposta recebida
    const message = data.message
    const chaves = Object.keys(message)
    document.querySelector(".loaderDiv").style.display ='none'
    chaves.forEach((valor) => {

      let date = message[valor].dataCreate.slice(0, 10).split('-').reverse().join("/")


      container.innerHTML += `
      <div class="cardUser">
          <div class="user">
              <img src="./styles/css/img/userQuestion.png">
              <div class="idUSER">${valor}</div>
          </div>
          <div class="message"><p>${message[valor].message}</p></div>
          <div class="date">${date}</div>
      </div>`
    });

    // ============================
    const openModalButton = document.querySelectorAll('.user');
    const closeModalButton = document.getElementById('closeModalButton');
    const userModal = document.getElementById('userModal');
    const userNameElement = document.getElementById('userName');
    const userDateElement = document.getElementById('userDate');
    const userHoraElement = document.getElementById('userHora');






    // Função para abrir o modal e exibir as informações do usuário
    function openModal(event, div) {
      // Simule dados de usuário (substitua com os dados reais)
      const idUSER = div.querySelector(".idUSER").innerHTML
      const user = {
        name: message[idUSER].nome,
        date: message[idUSER].dataCreate.slice(0, 10).split('-').reverse().join("/"),
        hora: message[idUSER].dataCreate.split(' ')[1]
      };
      event.preventDefault();
      userNameElement.textContent = user.name;
      userDateElement.textContent = user.date;
      userHoraElement.textContent = user.hora;
      userModal.style.display = 'block';

      // Posiciona a modal abaixo do botão
      const buttonRect = div.getBoundingClientRect();
      userModal.style.left = `${buttonRect.left}px`;
      userModal.style.top = `${buttonRect.bottom + 10}px`;
    }

    // Função para fechar o modal
    function closeModal() {
      userModal.style.display = 'none';
    }

    openModalButton.forEach((div) => {
      div.addEventListener('click', (event) => { openModal(event, div) })

    })


    closeModalButton.addEventListener('click', closeModal);


  })
  .catch(error => {
    console.error('Erro:', error);
  });



//   ============ modal input ===============
const modal = document.querySelector('.modalInput');
const openModalButtonInput = document.querySelector('.plus-icon');
const closeModalButton = document.getElementById('closeModal');
const textInput = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');

// Abrir modal
openModalButtonInput.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Fechar modal
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Ação do botão de submit
submitButton.addEventListener('click', () => {
  const userInput = textInput.value
  // Faça algo com o texto digitado pelo usuário, por exemplo, exibir um alerta:
  const data ={
    nome: "Leticia Baronete da Silva",
    message: userInput
  }
  
  // Configuração do request
  const optionsPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data),
  }
  
  // Fazendo o request
  fetch("https://rememberthehistory.onrender.com/to-record", optionsPost)
  .then(response => response.json()) // Converte a resposta para JSON
  .then(data => {
    console.log('Resposta da API:', data)
    // Aqui você pode lidar com a resposta da API
  })
  .catch(error => {
    console.error('Erro na requisição:', error)
    // Lidar com erros, se houver
  })
  textInput.value = ""
  modal.style.display = 'none';
});


