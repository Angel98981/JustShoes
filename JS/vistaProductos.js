document.addEventListener("DOMContentLoaded", ()=>{  
  nombreLogout()
})


function nombreLogout() {
  const usernameElement = document.getElementById("nombreUsuario");
  let loggedInUserName = JSON.parse(localStorage.getItem("user"));
  usernameElement.textContent = loggedInUserName.name;
  
  const logout = document.getElementById("logout")
  let cerrar = JSON.parse(localStorage.getItem("validate"))
  // 
  if (cerrar === true) {
    logout.classList.remove("deactivate")
    usernameElement.classList.remove("deactivate")
  }
  const cerrarSesion = document.querySelector("#closeSesion")
  cerrarSesion.addEventListener("click",()=>{
    logout.classList.add("deactivate")
    usernameElement.classList.add("deactivate")
    localStorage.removeItem("user")
    localStorage.removeItem("validate")  
    
  }) 
}


const añadirCarrito = document.querySelector("#añadirCarrito")
añadirCarrito.addEventListener("click", añadirAlCarrito)

let contador = 0

function añadirAlCarrito() {
  contador = contador+1
  console.log(contador);
  const contadorCarrito = document.querySelector("#contadorCarrito")
  contadorCarrito.textContent=contador

}