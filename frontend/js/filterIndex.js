var messageSet= document.querySelector("#textInput")
var charCount = document.querySelector("#charCount") 
var modaltitle = document.querySelector(".modal-title") 




if(document.querySelector(".modalInput").style.display !== 'none'){

    messageSet.addEventListener("input", () => {
        charCount.textContent = `${messageSet.value.length}/75`
        if (messageSet.value.length <= 75){
            charCount.style.color ='white'
        }else{
            charCount.style.color ='red'
        }
    
    })
    function typeWriter(el) {
        if(el.innerHTML.length === 20){
    
            const textArray = el.innerHTML.split('');
            el.innerHTML = '';
            textArray.forEach((letter, i) =>
                setTimeout(() => (el.innerHTML += letter), 95 * i)
            );
        
            setInterval(() => typeWriter(el), 8000);
        }
        
        
        }
    typeWriter(modaltitle);
}




