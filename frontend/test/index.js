// Elementos do DOM
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModal');
const textInput = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');

// Abrir modal
openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Fechar modal
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Ação do botão de submit
submitButton.addEventListener('click', () => {
  const userInput = textInput.value;
  // Faça algo com o texto digitado pelo usuário, por exemplo, exibir um alerta:
  alert(`Texto digitado: ${userInput}`);
});
