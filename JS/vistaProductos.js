import { tenerDatos } from "../apiConnection/API.js"; //importo la base de datos

document.addEventListener("DOMContentLoaded", ()=>{  
  tenerDatos()
  injectImg()
  nombreLogout()
})


function nombreLogout() { // toda essta funcion es para que el nombre del usuario me aparezca en pantalla 
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

function añadirAlCarrito() { // esta funcion aun no esta bien, si funciona pero los estilos no me gustan
  contador = contador+1
  console.log(contador);
  const contadorCarrito = document.querySelector("#contadorCarrito")
  contadorCarrito.textContent=contador

  

}

function injectImg() {
  const storedProductId = localStorage.getItem("productId"); // aca estoy obteniendo el id del producto que esta guardado en local storage
  if (storedProductId) {
    console.log("ID del producto almacenado:", storedProductId);
    insertImg(storedProductId); //se le pasa el parametro del id para que se ejecute bien la funcion 
  }
}

async function insertImg(productId) {  
  const imgPrincipal = document.querySelector(".imagen-grande") //selector del espacio vacio
  const productos = await tenerDatos(); //se le pone asyn await para que no me traiga la promesa vacia 

  productos.forEach((producto) => {
    const {
      zapatos,
      sacos,
      pantalones,
      implementos,
      camisas,
      bolsos,
      accesorios,
    } = producto; //destructuracion de base de datos

    const categoriaActual = [...zapatos, ...sacos, ...pantalones, ...implementos, ...camisas, ...bolsos, ...accesorios]; //aqui concateno toda mi base de datos, para luego con .find buscar de manera mas sencilla 
    const productoEncontrado = categoriaActual.find(item => item.id == productId);
    if (productoEncontrado) {       
      imgPrincipal.innerHTML = `<img width="650px"; src="${productoEncontrado.imgPrincipal}">`;    // inyecto dinamicamente las fotos de los productos 
      return; 
    }
    
  });
  
}




