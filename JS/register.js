const registro=document.querySelector("#registro")

registro.addEventListener("click",(e)=>{
    e.preventDefault()
    const registroNombre=document.querySelector("#registroNombre").value
    const registroEmail=document.querySelector("#registroEmail").value
    const registroPass=document.querySelector("#registroPass").value
    // const datos =[
    //     nombre=registroNombre,
    //     email=registroEmail,
    //     pass=registroPass
    // ]

    // Obtener los datos actuales del localStorage (si existen)
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Agregar el nuevo usuario a la lista
    usuariosRegistrados.push(datos={name:registroNombre, email:registroEmail, pass:registroPass});    
    // Guardar la lista actualizada en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
    
    console.log("Datos guardados en localStorage:", datos);
    window.location.href=`../HTML/login.html`
    
})