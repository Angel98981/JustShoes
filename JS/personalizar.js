//URLS
const URLProductos = "http://localhost:3000/productos";
const URLDiseños = "http://localhost:3000/diseños";


// --------------- INTERCAMBIO DE IMAGENES ---------------
// SELECTORES
const imgPrincipal = document.querySelector(".imgPrincipal");
const imagenes = document.querySelectorAll(".imagenes");


// EVENTOS
imagenes.forEach(imagen => {
  imagen.addEventListener("click", intercambiar )
});


// FUNCIONES
function intercambiar (){
  const imgSeleccionada = document.querySelector(".imgSeleccionada");
  imgSeleccionada.classList.remove("imgSeleccionada");
  this.classList.add("imgSeleccionada");
  imgPrincipal.src = this.src;
};



// --------------- MODAL DE LOS PRODUCTOS ---------------
// SELECTORES
const contenedorProductos = document.querySelector("#contenedorProductos");
const categorias = document.querySelectorAll(".categoria");
const generos = document.querySelectorAll(".genero");
let generOculto = "";
let categoriaOculto = "";


// EVENTOS
contenedorProductos.addEventListener("click", e =>{
  e.preventDefault();
  if (e.target.classList.contains("contenido-modal-producto")){
    selectProduct(e.target.getAttribute("id"))
  }
});


categorias.forEach(categoria => {
  categoria.addEventListener("click", seleccionCategoria)
});


generos.forEach(genero => {
  genero.addEventListener("click", seleccionGenero)
});


// FUNCIONES
// 1. funcion para mostrar los productos.
function cargarProductos(productosElegidos){
  // Funcion para evitar que se duplique las cartas.
  limpiarProducto()
  // Recorrer los productos e inyectar la informacion.
  productosElegidos.forEach((productoElegido) => {
      const div = document.createElement("div");
      div.classList.add("contenido-modal-producto");
      div.setAttribute("id",`${productoElegido.id}`)
      div.innerHTML += `
      <img src="${productoElegido.imagenes.frontal}" alt="">
      <h5 class="titulo-contenido">${productoElegido.titulo}</h5>
      <p class="precio-contenido">${productoElegido.precio}</p>
      `
      contenedorProductos.appendChild(div);
      // console.log(productosElegidos);
  });
}

// 2. funcion para seleccionar por categoria.
async function seleccionCategoria(e){
  categoriaOculto = e.target.id;

  // Consumir el json server.
  const response = await fetch(`${URLProductos}`);
  const datas = await response.json();

  // Condicional para eliminar el contido de genero.
  if(e.target.id === "todo"){
    generOculto = "";
    cargarProductos(datas)
    return;
  }
  
  categorias.forEach(categoria => categoria.classList.remove("activo"));
  e.target.classList.add("activo");
  
  // Filtrar por categoria.
  const productosBtn = datas.filter(data => {
    // Filtrar por categoria y genero, si genero tiene contenido.
    if(generOculto.length > 0){
      return data.categoria.id === e.target.id && data.genero.id === generOculto;
    }
    // si no, filtrar solo por categoria.
    return data.categoria.id === e.target.id; 
  });
  // console.log(productosBtn);
  cargarProductos(productosBtn);
}
  
// 3. funcion para seleccionar por genero.
async function seleccionGenero(e){
  generOculto = e.target.id;

  // Consumir el json server.
  const response = await fetch(`${URLProductos}`);
  const datas = await response.json();
  
  // Condicional para eliminar el contido de genero.
  if(categoriaOculto === "todo"){
    categoriaOculto = "";
  } 
  
  generos.forEach(genero => genero.classList.remove("activo"));
  e.target.classList.add("activo");
  
  // Filtrar por categoria.
  const generosBtn = datas.filter(data => {
    // Filtrar por categoria y genero, si genero tiene contenido.
    if(categoriaOculto.length > 0){
      return data.genero.id === e.target.id && data.categoria.id === categoriaOculto; 
    } 
    // si no, filtrar solo por categoria.
    return data.genero.id === e.target.id;
  });
  // console.log(generosBtn);
  cargarProductos(generosBtn);
}
  
// 4. funcion para seleccionar el producto y sobrescribir la info.
async function selectProduct(id){
  //Cerrar el modal
  document.querySelector("#cerrar").click()

  // Consumir el json server.
  const response = await fetch(`${URLProductos}/${id}`);
  const data = await response.json();
  
  //Pintar pagina principal
  document.querySelector(".Nombre").textContent = data.titulo;
  document.querySelector(".precio").textContent = data.precio;
  document.querySelector(".imgPrincipal").src = data.imagenes.frontal;
  document.querySelector("#A").src = data.imagenes.frontal;
  document.querySelector("#B").src = data.imagenes.trasera;
  document.querySelector("#C").src = data.imagenes.izquierda;
  document.querySelector("#D").src = data.imagenes.derecha;
  
}

// 5. funcion para limpiar.
function limpiarProducto (){
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild)
  }
}
  

// --------------- MODAL DE LOS PRODUCTOS ---------------
// SELECTORES
const contenedorDiseños = document.querySelector("#contenedorDiseños");
const categoriaDiseños = document.querySelectorAll(".categoria-diseños");


// EVENTOS
categoriaDiseños.forEach(categoriaDiseño => {
  categoriaDiseño.addEventListener("click", seleccionCategoriaDiseño)
});


// FUNCIONES
// 1. funcion para mostrar los productos.
function cargarDiseños(productosElegidos){
  // Funcion para evitar que se duplique las cartas.
  limpiarDiseño()
  // Recorrer los productos e inyectar la informacion.
  productosElegidos.forEach((productoElegido) => {
      const div = document.createElement("div");
      div.classList.add("contenido-modal-diseño");
      div.setAttribute("id",`${productoElegido.id}`)
      div.innerHTML += `
      <img src="${productoElegido.imagenes}" alt="">
      `
      contenedorDiseños.appendChild(div);
      console.log(productoElegido);
  });
}

// 3. funcion para seleccionar por genero.
async function seleccionCategoriaDiseño(e){
  categoriaOculto = e.target.id;

  // Consumir el json server.
  const response = await fetch(`${URLDiseños}`);
  const datas = await response.json();
  
  // Condicional para eliminar el contido de genero.
  if(e.target.id === "todo"){
    cargarDiseños(datas)
    return;
  }

  categoriaDiseños.forEach(categoriaDiseño => categoriaDiseño.classList.remove("activo"));
  e.target.classList.add("activo");
  
  // Filtrar por categoria.
  const diseñosBtn = datas.filter(data => data.categoria.id === e.target.id);
  
  // console.log(productosBtn);
  cargarDiseños(diseñosBtn)
}

// 4. funcion para limpiar.
function limpiarDiseño (){
  while (contenedorDiseños.firstChild) {
    contenedorDiseños.removeChild(contenedorDiseños.firstChild)
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