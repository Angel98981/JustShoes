import { newUser } from "../apiConnection/API.js";

const formulario = document.querySelector("#formulario")
formulario.addEventListener("submit",createUser)

function createUser(e) {
    e.preventDefault()    
    const name = document.querySelector("#registroNombre").value
    const id = document.querySelector("#registroId").value // esta es la cedula de la persona, para tener un numero que diferencie a cada usuario. 
    const email = document.querySelector("#registroEmail").value // con este se valida el inicio de sesion. 
    const pass = document.querySelector("#registroPass").value // se valida el inicio de sesion.

    const registroUser = {
        id,
        name,
        email,
        pass,        
    }
    // console.log(registroUser);
    newUser(registroUser)
}