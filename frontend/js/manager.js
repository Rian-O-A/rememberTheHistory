function setObjectFromCookie(salvarObject, name){

    const dataExpiracao = new Date('9999-12-31').toUTCString()
    const cookie = `${name}=${encodeURIComponent(JSON.stringify(salvarObject))}; expires=${dataExpiracao}; path=/`
    document.cookie = cookie

}

function getObjectFromCookie(nome) {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(nome + '=')) {
        const objetoCodificado = cookie.substring(nome.length + 1)
        const objetoDecodificado = decodeURIComponent(objetoCodificado)
        return JSON.parse(objetoDecodificado)
      }
    }
    return null
  }

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

const url = "https://rememberthehistory.onrender.com"