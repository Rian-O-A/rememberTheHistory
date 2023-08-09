function passwordVisibility(x){
    
    let passwordInput = document.querySelectorAll(".passwdInput")
    let eyesLook = document.querySelectorAll(".iconEyes")

    
        
    if(passwordInput[x].type ==='password'){
        passwordInput[x].type = 'text'
        eyesLook[x].classList.add('fa-eye')
        eyesLook[x].classList.remove('fa-eye-slash')
    

    }else{
        passwordInput[x].type = 'password'
        eyesLook[x].classList.add('fa-eye-slash')
        eyesLook[x].classList.remove('fa-eye')
    
    }
    

}



var togglePassword = document.getElementById('toggle-password')
var togglePasswordVerify = document.getElementById('toggle-passwordVerify')
togglePassword.addEventListener('click', function () {
    passwordVisibility(0)})
if(togglePasswordVerify){

    togglePasswordVerify.addEventListener('click',  function () {
        passwordVisibility(1)})
}


let password = document.querySelectorAll(".passwdInput")
let verifyError 

if (password.length == 2){
    password[0].addEventListener('input', () =>{
        document.querySelector('#error-password').style.display = 'none'
        verifyError =true
        if (password[0].value.length <= 7){
            verifyError = false
            document.querySelector('#error-password').textContent ='* Minimo de caracteres aceitos (8)'
            document.querySelector('#error-password').style.display = 'flex'
        }
        if (password[0].value != password[1].value && password[1].value.length !=0){
            verifyError = false
            document.querySelector('#error-passwordVerify').textContent ='* Senhas divergentes!'
            document.querySelector('#error-passwordVerify').style.display = 'flex'
        }else{
            verifyError = true
        }
        
    })
    password[1].addEventListener('input', () =>{
        document.querySelector('#error-passwordVerify').style.display = 'none'
        verifyError =true
        if (password[0].value != password[1].value){
            verifyError = false
            document.querySelector('#error-passwordVerify').textContent ='* Senhas divergentes!'
            document.querySelector('#error-passwordVerify').style.display = 'flex'
        }
        if (password[0].value.length <= 7){
            verifyError = false}
    })
    
}

let form = document.querySelector('.register-form')

if (form){

    form.addEventListener('submit', (event) => {
        // Verifica a condição desejada (por exemplo, se o input não está vazio)
       
        if (!verifyError) {
            // Impede o envio do formulário se a condição não for atendida
            event.preventDefault()
            // Exibe uma mensagem de erro
            window.alert('Erros encontrados em seu formulario, você deve corrijir para continuar')
        }else{
    
            event.preventDefault()
            let nome = document.querySelector(".input").value
            window.alert(`User "${nome}" registrado com sucesso!`)
            window.location.href = './index.html'
        }
    
    
    })
}


var video = document.getElementById('video-background')

// video.style.display = ''