// let container = document.querySelector("#muralStore")


// // URL da rota que você deseja acessar
// const url = 'https://rememberthehistory.onrender.com/getHistory';


// // Configuração do request
// const options = {
//   method: 'GET',
//   headers: {
   
//   }
// };

// // Fazendo o request
// fetch(url, options)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erro ao fazer o request: ' + response.status);
//     }
//     return response.json(); // Se você estiver esperando uma resposta em formato JSON
//   })
//   .then(data => {
//     // Aqui você pode lidar com a resposta recebida
//     const message = data.message
//     const chaves =  Object.keys(message)
    
//     chaves.forEach((valor) => {
      
//       let date = message[valor].dataCreate.slice(0, 10).split('-').reverse().join("/")
      
     
//       container.innerHTML += `
//       <div class="cardUser">
//           <div class="user">
//               <img src="./styles/css/img/userQuestion.png">
//               <div class="idUSER">${valor}</div>
//           </div>
//           <div class="message"><p>${message[valor].message}</p></div>
//           <div class="date">${date}</div>
//       </div>`
//     });

//     // ============================
//     const openModalButton = document.querySelectorAll('.user');
//     const closeModalButton = document.getElementById('closeModalButton');
//     const userModal = document.getElementById('userModal');
//     const userNameElement = document.getElementById('userName');
//     const userDateElement = document.getElementById('userDate');
//     const userHoraElement = document.getElementById('userHora');




    

//     // Função para abrir o modal e exibir as informações do usuário
//     function openModal(event, div) {
//       // Simule dados de usuário (substitua com os dados reais)
//       const idUSER = div.querySelector(".idUSER").innerHTML
//       const user = {
//         name: message[idUSER].nome,
//         date: message[idUSER].dataCreate.slice(0, 10).split('-').reverse().join("/"),
//         hora: message[idUSER].dataCreate.split(' ')[1]
//       };
//       event.preventDefault();
//       userNameElement.textContent = user.name;
//       userDateElement.textContent = user.date;
//       userHoraElement.textContent = user.hora;
//       userModal.style.display = 'block';

//       // Posiciona a modal abaixo do botão
//       const buttonRect = div.getBoundingClientRect();
//       userModal.style.left = `${buttonRect.left}px`;
//       userModal.style.top = `${buttonRect.bottom + 10}px`;
//     }

//     // Função para fechar o modal
//     function closeModal() {
//       userModal.style.display = 'none';
//     }

//     openModalButton.forEach((div)=>{
//       div.addEventListener('click', (event)=>{openModal(event, div)})

//     })
    
    
//     closeModalButton.addEventListener('click', closeModal);
   

//   })
//   .catch(error => {
//     console.error('Erro:', error);
//   });


