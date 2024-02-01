// SELECTORES

// Imagenes
const imgPrincipal = document.querySelector(".imgPrincipal");
const imagenes = document.querySelectorAll(".imagenes");



// EVENTOS

// Imagenes
imagenes.forEach(imagen => {
  imagen.addEventListener("click", intercambiar )
});


// FUNCIONES

// Imagenes
function intercambiar (){
  const imgSeleccionada = document.querySelector(".imgSeleccionada");
  imgSeleccionada.classList.remove("imgSeleccionada");
  this.classList.add("imgSeleccionada");
  imgPrincipal.src = this.src;
};























// Cerra sesion
// const usernameElement = document.getElementById("nombreUsuario");
// let loggedInUserName = JSON.parse(localStorage.getItem("user"));
// usernameElement.textContent = loggedInUserName.name;

// const logout = document.getElementById("logout")
// let cerrar = JSON.parse(localStorage.getItem("validate"))
// // 
// if (cerrar === true) {
//   logout.classList.remove("deactivate")
//   usernameElement.classList.remove("deactivate")
// }
// const cerrarSesion = document.querySelector("#closeSesion")
// cerrarSesion.addEventListener("click",()=>{
//   logout.classList.add("deactivate")
//   usernameElement.classList.add("deactivate")
//   localStorage.removeItem("user")
//   localStorage.removeItem("validate")  
  
// })