// const login =document.querySelector("#log");
// const nombreUsuario="";
// const datos = {nombre:"", email:""}

// login.addEventListener("click",()=>{
//     datos.nombre=document.querySelector("#name").value
//     datos.email=document.querySelector("#email").value
//     // const datosString = new URLSearchParams(datos).toString()
//     // window.location.href=`index.html?${datosString}`
//     window.localStorage.setItem("dato", JSON.stringify(datos))
//     window.location.href=`index.html`
// });

// const usuarioGuardado=JSON.parse(window.localStorage.getItem("dato"))
// console.log(usuarioGuardado);

const login = document.querySelector("#login");


login.addEventListener("click", (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#userEmail").value;
  const userPass = document.querySelector("#userPass").value;
  
  const usuariosRegistrados =
    JSON.parse(localStorage.getItem("usuarios")) || [];
  let inicioSesionExitoso = false;  
  usuariosRegistrados.forEach((usuarios) => {
    if (usuarios.email === userEmail && usuarios.pass === userPass) {
      inicioSesionExitoso = true;
      localStorage.setItem('inicioSesionExitoso', inicioSesionExitoso);     
    }
  });
  // Con esto verificamos si el usuario efectivamente esta en el local storage
  if (inicioSesionExitoso) {
    console.log("Inicio de sesión exitoso");
    alert("se ha iniciado sesión");
    window.location.href = `../index.html`;    
  } else {
    localStorage.setItem('inicioSesionExitoso', inicioSesionExitoso); 
    console.log("Inicio de sesión fallido. Verifica tus credenciales.");
    console.log(inicioSesionExitoso);
  }
});


