const container = document.querySelector("#muralStore")
const url = 'https://rememberthehistory.onrender.com/all/history'

const token  = getObjectFromCookie('user')
   



const options = {

  method: 'GET',
  headers: {
    "Authorization": `Bearer ${token}`
  }
}

fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Request error: ' + response.status)
    }
    return response.json()
  })
  .then(data => {
    const message = data.message["historys"]
    const chaves = Object.keys(message)
    document.querySelector(".loaderDiv").style.display = 'none'
    
    chaves.forEach((valor) => {
      const cardHTML = createCardHTML(message, valor)
      container.innerHTML += cardHTML
    })
    
    const openModalButton = document.querySelectorAll('.user')
    
    openModalButton.forEach((div) => {
      div.addEventListener('click', (event) => { openModal(event, div, message) })
    })
    
    const closeModalButton = document.getElementById('closeModalButton')
    closeModalButton.addEventListener('click', closeModal)
  })
  .catch(error => {
    console.error('Error:', error)
  })

  const modal = document.querySelector('.modalInput')
  const openModalButtonInput = document.querySelector('.plus-icon')
  const closeModalButtonInput = document.getElementById('closeModal')
  const textInput = document.getElementById('textInput')
  const submitButton = document.getElementById('submitButton')

  openModalButtonInput.addEventListener('click', () => {
  modal.style.display = 'block'
})

  closeModalButtonInput.addEventListener('click', () => {
  modal.style.display = 'none'
})

submitButton.addEventListener('click', () => {
  const userInput = textInput.value
  const data = {
    nome: "Leticia Baronete da Silva",
    message: userInput
  }

  const optionsPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }

  fetch("https://rememberthehistory.onrender.com/to-record", optionsPost)
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data)
    })
    .catch(error => {
      console.error('Request Error:', error)
    })

  textInput.value = ""
  modal.style.display = 'none'
})

fetch("https://rememberthehistory.onrender.com/user/history", options)
  .then(response => {

    if (!response.ok) {
      window.location.href = "/frontend/login.html"
      throw new Error('Request error: ' + response.status)
    }
    return response.json()})
  .then(data => {
    console.log('API Response:', data)
    const nome = data["message"]["myHistorys"]["nome"].split(" ")
    const formattedName = `${nome[0]} ${nome[nome.length - 1]}`
    document.querySelector("#nomeUser").innerHTML = formattedName
  })
  .catch(error => {
    console.error('Request Error:', error)
  })


  function createCardHTML(message, valor) {
    const date = message[valor].dataCreate.slice(0, 10).split('-').reverse().join("/")
    return `
      <div class="cardUser">
        <div class="user">
          <img src="./styles/css/img/userQuestion.png">
          <div class="idUSER">${valor}</div>
        </div>
        <div class="message"><p>${message[valor].message}</p></div>
        <div class="date">${date}</div>
      </div>`
  }
  

function openModal(event, div, message) {
  const idUSER = div.querySelector(".idUSER").innerHTML
  console.log("paseei aqui")
  const user = {
    name: message[idUSER].nome,
    date: message[idUSER].dataCreate.slice(0, 10).split('-').reverse().join("/"),
    hora: message[idUSER].dataCreate.split(' ')[1]
  }
  console.log(user)
  const userModal = document.querySelector('.modal')
  const userNameElement = document.getElementById('userName')
  const userDateElement = document.getElementById('userDate')
  const userHoraElement = document.getElementById('userHora')
  event.preventDefault()
  const buttonRect = div.getBoundingClientRect()
  
  userNameElement.textContent = user.name
  userDateElement.textContent = user.date
  userHoraElement.textContent = user.hora

  


  userModal.style.display = 'block'
  userModal.style.left = `${buttonRect.left}px`
  userModal.style.top = `${buttonRect.bottom + 10}px`
  console.log(userModal.style.display)

}

function closeModal() {
  userModal.style.display = 'none'
}


document.querySelector("#logout").addEventListener("click", ()=> {
  deleteCookie("user")
  window.location.href = "/frontend/login.html"
})