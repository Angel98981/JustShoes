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

const login=document.querySelector("#login")

login.addEventListener("submit",(e)=>{
    e.preventDefault()
    const user=document.querySelector("#user").value
    const pass=document.querySelector("#pass").value
    console.log(user, pass);
})


