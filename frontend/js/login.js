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

    // Aqui você pode adicionar o código para executar quando o formulário for enviado
    console.log("Formulário enviado!");

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
    fetch("https://rememberthehistory.onrender.com/auth/login", optionsPost)
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        console.log('Resposta da API:', data)
        setObjectFromCookie(data["access_token"], 'user')
        console.log('SALVO NO COOKIE')
        window.location.href = "/frontend/index.html";
        // Aqui você pode lidar com a resposta da API
    })
    .catch(error => {
        console.error('Erro na requisição:', error)
        // Lidar com erros, se houver
    })
    
    console.log("Email:", userEmail);
    console.log("Senha:", senha);
    });
    
    