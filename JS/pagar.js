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
