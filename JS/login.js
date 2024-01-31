import { getUsers } from "../apiConnection/API.js";

const login = document.querySelector("#login");

document.addEventListener("DOMContentLoaded", bringUsers);

function bringUsers() {
  getUsers();
}

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const emailUsuario = document.querySelector("#userEmail").value;
  const passUsuario = document.querySelector("#userPass").value;
  const usersData = await getUsers();
  
  
  let validate = false
  usersData.forEach(user => {

    if(user.email === emailUsuario && user.pass === passUsuario ){
        alert("Inicio de sesion exitoso!!")
        validate=true
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem('validate', JSON.stringify(validate));
        window.location.href="../index.html"
        
    }
  }); 
  if (validate === false){
      alert("Datos incorrectos")
    }
});
