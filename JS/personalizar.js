//URLS
const URLProductos = "http://localhost:3000/productos"
// SELECTORES

// Imagenes
const imgPrincipal = document.querySelector(".imgPrincipal");
const imagenes = document.querySelectorAll(".imagenes");
const contenedorProductos = document.querySelector("#contenedorProductos");
const categorias = document.querySelectorAll(".categoria");
const generos = document.querySelectorAll(".genero");



// EVENTOS

// Imagenes
imagenes.forEach(imagen => {
  imagen.addEventListener("click", intercambiar )
});

contenedorProductos.addEventListener("click", e =>{
  e.preventDefault();
  console.log(e.target.getAttribute("id"));
  if (e.target.classList.contains("contenido-modal")){
    selectProduct(e.target.getAttribute("id"))
  }
})
categorias.forEach(categoria => {
  categoria.addEventListener("click", seleccionCategoria)
});

generos.forEach(genero => {
  genero.addEventListener("click", seleccionGenero)
});


// FUNCIONES

// Imagenes
function intercambiar (){
  const imgSeleccionada = document.querySelector(".imgSeleccionada");
  imgSeleccionada.classList.remove("imgSeleccionada");
  this.classList.add("imgSeleccionada");
  imgPrincipal.src = this.src;
};

async function cargarProductos(){
  const response = await fetch(URLProductos)
  const productosElegidos = await response.json()
  limpiar()
  productosElegidos.forEach(productoElegido => {
      console.log(productoElegido.id);
      const div = document.createElement("div");
      div.classList.add("contenido-modal");
      div.setAttribute("id",`${productoElegido.id}`)
      div.innerHTML += `
      <img src="${productoElegido.imagenes.frontal}" alt="">
      <h5 class="titulo-contenido">${productoElegido.titulo}</h5>
      <p class="precio-contenido">${productoElegido.precio}</p>
      `
      contenedorProductos.appendChild(div);
  });

}

cargarProductos();


async function seleccionCategoria(e){
  const response = await fetch(`${URLProductos}`);
  const data = await response.json();
  console.log(data);
  // categorias.forEach(categoria => categoria.classList.remove("activo"));
  // e.target.classList.add("active");

  // const productosBtn = productos.filter(producto => producto.categoria.id === e.target.id)
  // cargarProductos(productosBtn);

  
}


function seleccionGenero(e){
  generos.forEach(genero => genero.classList.remove("activo"));
  e.target.classList.add("activo");
  const generoBtn = productos.filter(producto => producto.genero.id === e.target.id)

  const generoSeleccionado = e.target.id
;
  if(generoSeleccionado == "femenino"){
  

   }
 if(generoSeleccionado == "masculino"){

 }
 cargarProductos(generoBtn)  
  
}

async function selectProduct(id){
  //Cerrar el modal
  document.querySelector("#cerrar").click()
  //Pintar pagina principal
  const response = await fetch(`${URLProductos}/${id}`);
  const data = await response.json();

  document.querySelector(".Nombre").textContent = data.titulo;
  document.querySelector(".precio").textContent = data.precio;
  document.querySelector(".imgPrincipal").src = data.imagenes.frontal;
  document.querySelector("#A").src = data.imagenes.frontal;
  document.querySelector("#B").src = data.imagenes.trasera;
  document.querySelector("#C").src = data.imagenes.izquierda;
  document.querySelector("#D").src = data.imagenes.derecha;




}

function limpiar (){
  while (contenedorProductos.firstChild) {
      contenedorProductos.removeChild(contenedorProductos.firstChild)
  }
}






















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