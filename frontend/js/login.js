function remenberMe(){
    let salvarObject = {email: document.querySelector('#userEmail').value, password: document.querySelector('#password').value}
    setObjectFromCookie(salvarObject, 'inputs')
}





  

document.addEventListener('DOMContentLoaded', () => {
    
    const objetoSalvo = getObjectFromCookie('inputs')
    if (objetoSalvo){
    
        document.querySelector("#remember").checked = true
        document.querySelector("#password").value = objetoSalvo.password
        document.querySelector("#userEmail").value = objetoSalvo.email
    }
})

document.querySelector("#remember").addEventListener('change', function() {
    if (document.querySelector("#remember").checked) {
      remenberMe()
    } else {
        deleteCookie("inputs")
    }})


var modal = document.getElementById("myModal")
var openModalBtn = document.getElementById("openModalBtn")
var closeModalBtn = document.getElementsByClassName("close")[0]
var modalForm = document.querySelector(".inputsModal")
var modalButton = document.querySelector(".buttonModal")

openModalBtn.addEventListener("click", function() {
        
    modal.style.display = "block"
    if (document.querySelector("#userEmail").value === ""){

        document.querySelector("#userEmail").value = 'example@example.com'
    }
});


    


closeModalBtn.addEventListener("click", function() {
    if(document.querySelector("#userEmail").value === 'example@example.com'){
        document.querySelector("#userEmail").value = ""
    }
    modal.style.display = "none"
})



modalButton.addEventListener("click", function(event) {
    event.preventDefault() // Impede o envio do formulário (recarregar a página)
    
    // Lógica de validação e processamento do formulário aqui
    // Acesse os campos usando modalForm.campo1.value, modalForm.campo2.value, etc.

    // Exemplo de validação simples
    if (modalForm.value === "") {
        
        alert("Preencha o campo do email!")
        } else {
            if (modalForm.value.includes('@')){
                alert("Email de recuperação enviado com sucesso!")
                if(document.querySelector("#userEmail").value === 'example@example.com'){
                    document.querySelector("#userEmail").value = ""
                }
                modal.style.display = "none"}
            else{
                alert(`Inclua o @ no seu email (${modalForm.value})`)
        }
        }
    })

document.querySelector(".login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário
    let controllViwer= document.getElementById("controllViwer")
    let loader_container= document.querySelector(".loader-container")
    controllViwer.style.display ='none'
    loader_container.style.display ='flex'

    // Você pode acessar os valores dos campos do formulário assim:
    var userEmail = document.getElementById("userEmail").value;
    var senha = document.getElementById("password").value;
    
    let data =  {
        email:userEmail, 
        password:senha
    }   
     // Configuração do request
    const optionsPost = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
    }
    
    // Fazendo o request
    fetch(`${url}/auth/login`, optionsPost)
    .then(response => {

        if (response.status === 200) {
          return response.json(); // ou response.text() se estiver recebendo texto
        } else {
            controllViwer.style.display =''
            loader_container.style.display ='none'
            document.getElementById("modalErro").style.display = "block";
            console.error('Erro na solicitação. Status code:', response.status);
        }
      }) // Converte a resposta para JSON
    .then(data => {
        if(data){

            console.log('Resposta da API:', data)
            setObjectFromCookie(data["access_token"], 'user')
            console.log('SALVO NO COOKIE')
            controllViwer.style.display =''
            loader_container.style.display ='none'
            window.location.href = "./index.html";
            // Aqui você pode lidar com a resposta da API
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error)
        // Lidar com erros, se houver
    })
    
    console.log("Email:", userEmail);
    console.log("Senha:", senha);
    });
    
    
