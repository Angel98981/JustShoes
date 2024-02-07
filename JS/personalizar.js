//URLS
const URLProductos = "http://localhost:3000/productos";
const URLDiseños = "http://localhost:3000/diseños";


// --------------- INTERCAMBIO DE IMAGENES ---------------
// SELECTORES
const imgPrincipal = document.querySelector(".imgPrincipal");
const imagenes = document.querySelectorAll(".imagenes");


// EVENTOS
imagenes.forEach(imagen => {
  imagen.addEventListener("click", intercambiar );
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
    selectProduct(e.target.getAttribute("id"));
  }
});


categorias.forEach(categoria => {
  categoria.addEventListener("click", seleccionCategoria);
});


generos.forEach(genero => {
  genero.addEventListener("click", seleccionGenero);
});


// FUNCIONES
// 1. funcion para mostrar los productos.
function cargarProductos(productosElegidos){
  // Funcion para evitar que se duplique las cartas.
  limpiar(contenedorProductos);

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
    cargarProductos(datas);
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
  document.querySelector("#cerrar").click();

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


  

// --------------- MODAL DE LOS DISEÑOS ---------------
// SELECTORES
const contenedorDiseños = document.querySelector("#contenedorDiseños");
const categoriaDiseños = document.querySelectorAll(".categoria-diseños");
const vistaPrincipal = document.querySelector(".vista-elegida");

// EVENTOS
categoriaDiseños.forEach(categoriaDiseño => {
  categoriaDiseño.addEventListener("click", seleccionCategoriaDiseño);
});

contenedorDiseños.addEventListener("click", e =>{
  e.preventDefault();
  if (e.target.classList.contains("contenido-modal-diseño")){
    selectDiseño(e.target.getAttribute("id"));
  }
});



// FUNCIONES
// 1. funcion para mostrar los diseños.
function cargarDiseños(productosElegidos){
  // Funcion para evitar que se duplique las cartas.
  limpiar(contenedorDiseños);
  // Recorrer los diseños e inyectar la informacion.
  productosElegidos.forEach((productoElegido) => {
      const div = document.createElement("div");
      div.classList.add("contenido-modal-diseño");
      div.setAttribute("id",`${productoElegido.id}`);
      div.innerHTML += `
      <img src="${productoElegido.imagenes}" alt="">
      `
      contenedorDiseños.appendChild(div);
      // console.log(productoElegido);
  });
}

// 3. funcion para seleccionar por categoria.
async function seleccionCategoriaDiseño(e){
  categoriaOculto = e.target.id;

  // Consumir el json server.
  const response = await fetch(`${URLDiseños}`);
  const datas = await response.json();
  
  // Condicional para eliminar mostrar todo.
  if(e.target.id === "todo"){
    cargarDiseños(datas);

    return;
  }

  categoriaDiseños.forEach(categoriaDiseño => categoriaDiseño.classList.remove("activo"));
  e.target.classList.add("activo");
  
  // Filtrar por categoria.
  const diseñosBtn = datas.filter(data => data.categoria.id === e.target.id);
  
  // console.log(diseñosBtn);
  cargarDiseños(diseñosBtn)
}

// 4. funcion para seleccionar el producto y sobrescribir la info.
async function selectDiseño(id) {
  //Cerrar el modal
  document.querySelector("#salir").click();

  // Consumir el json server.
  const response = await fetch(`${URLDiseños}/${id}`);
  const data = await response.json();

  // condicional para agregar el contenedor y contenido del diseño
  if (data.imagenes) {
    const div = document.createElement("div");
    div.classList.add("contenedor-drag-and-drop");
    div.setAttribute("draggable", "true");
    
    const imagenDiseñoDiv = document.createElement("div");
    imagenDiseñoDiv.classList.add("imagen-diseño");
    imagenDiseñoDiv.setAttribute("id", `${data.id}`);
    
    imagenDiseñoDiv.innerHTML += `
      <img src="${data.imagenes}" alt="">
      <button class="eliminar-diseño" ">
        <img src="../img/personalizar/x-circle-solid-204.png" alt="">
      </button>
    `;
    
    // agregar elementos
    div.appendChild(imagenDiseñoDiv);
    vistaPrincipal.appendChild(div);

    // llamar funciones
    eliminarDiseño();
    draggable(imagenDiseñoDiv);
  }
}


// --------------- MODAL DE LAS IMAGENES ---------------
// SELECTORES
const botonTexto = document.querySelector(".boton-texto");


// EVENTOS
botonTexto.addEventListener("click", texto);


// FUNCIONES
function texto (){
  // Cerrar el modal
  document.querySelector("#cerrado").click();
  
  const div = document.createElement("div");
  div.classList.add("contenedor-drag-and-drop");
  div.setAttribute("draggable", "true");

  const inputDiv = document.createElement("div");
  inputDiv.classList.add("imagen-diseño");

  inputDiv.innerHTML += `
    <input type="text" placeholder="Ingrese su texto"> 
    <button class="eliminar-diseño">
      <img src="../img/personalizar/x-circle-solid-204.png" alt="">
    </button> 
  `;
  
  
  // agregar elementos
  div.appendChild(inputDiv);
  vistaPrincipal.appendChild(div);

  // llamar funciones
  eliminarDiseño();
  draggable(inputDiv);
}

// --------------- MODAL DE LAS IMAGENES ---------------
// SELECTORES
const contenedorImagenes = document.querySelector("#contenedor-imagenes");
const subirFotos = document.querySelector("#subir-foto");
const error = document.querySelector("#error");


// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  // Código que se ejecutará cuando el DOM esté completamente cargado.
  error.innerHTML = "";
});

// evento donde se activa cuando el valor de un elemento de formulario cambia.
subirFotos.addEventListener("change", () => {
  Array.from(subirFotos.files).forEach((file) => {
    fileHandler(file, file.type);
  });
});

contenedorImagenes.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.classList.contains("contenido-modal-diseño")) {
    selectImagen(e.target.querySelector("img"));
  }
});


// FUNCIONES
// 1. Funcion para subir las imagenes.
function fileHandler (file, type)  {
  
  // verificando si el el archivo es una imagen.
  if (type.split("/")[0] !== "image") {
    error.innerText = "Por favor ingrese una foto";
    return false;
  }
  
  error.innerText = "";

  const imagenContenedor = document.createElement("div");
  imagenContenedor.className = "contenido-modal-diseño";

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  imagenContenedor.appendChild(img);
  contenedorImagenes.appendChild(imagenContenedor);
};

// 2. funcion para seleccionar una imagen
function selectImagen (img){
  // Cerrar el modal
  document.querySelector("#cerrado").click();

  // condicional para agregar el contenedor y contenido de la imagen
  if (img) {
    const div = document.createElement("div");
    div.classList.add("contenedor-drag-and-drop");
    div.setAttribute("draggable", "true");

    const imagenDiv = document.createElement("div");
    imagenDiv.classList.add("imagen-diseño");

    imagenDiv.innerHTML += `
      <img src="${img.src}" alt="">
      <button class="eliminar-diseño">
        <img src="../img/personalizar/x-circle-solid-204.png" alt="">
      </button>
    `;

    
    // agregar elementos
    div.appendChild(imagenDiv);
    vistaPrincipal.appendChild(div);

    // llamar funciones
    eliminarDiseño();
    draggable(imagenDiv);
  }
}


// --------------- MODAL DE LAS IMAGENES ---------------
// SELECTORES
const botonesRestar = document.querySelectorAll(".restar");
const botonesSumar = document.querySelectorAll(".sumar");
const btnTalla = document.querySelector(".escoger-talla-cantidad")

// EVENTOS
btnTalla.addEventListener("click")
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar los elementos
  

  // Asignar event listeners a los botones de restar
  botonesRestar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      decrementar(boton);
    });
  });

  // Asignar event listeners a los botones de sumar
  botonesSumar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      incrementar(boton);
    });
  });

});

// Función para decrementar
function decrementar(boton) {
  const input = boton.nextElementSibling;
  input.value = Math.max(parseInt(input.value, 10) - 1, 0);
}

// Función para incrementar
function incrementar(boton) {
  const input = boton.previousElementSibling;
  input.value = parseInt(input.value, 10) + 1;
}



// --------------- FUNCIONES GLOBALES ---------------
// 1. funcion para mover el contenido
function draggable(element) {
  let posicionX, posicionY;

  // evento que escucha cuando se da click
  element.addEventListener("mousedown", (e) => {
    e.preventDefault();

    // variable que guarda la posicion del mouse y del elemento
    posicionX = e.clientX - element.getBoundingClientRect().left;
    posicionY = e.clientY - element.getBoundingClientRect().top;

    // evento que escucha cuando se mueve y cuando suelta
    document.addEventListener("mousemove", moverDrag);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moverDrag);
    });
  });

  // funcion para mover el elemento
  function moverDrag (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Limitar el movimiento al contenedor
    const contenedorDrag= element.parentElement.getBoundingClientRect();

    // constante con la nueva posicion
    const posicionLeft = mouseX - posicionX - contenedorDrag.left;
    const posicionTop = mouseY - posicionY - contenedorDrag.top;

    // Verificar los límites del contenedor
    if (posicionLeft >= 0 && posicionLeft + element.clientWidth <= contenedorDrag.width &&
        posicionTop >= 0 && posicionTop + element.clientHeight <= contenedorDrag.height) {
      element.style.left = `${posicionLeft}px`;
      element.style.top = `${posicionTop}px`;
    }
  }
}

// 2. eliminar el diseño
function eliminarDiseño(){
  const botonEliminar = document.querySelector(".eliminar-diseño");
  const contenedorDragDrop = document.querySelector(".contenedor-drag-and-drop");

  botonEliminar.addEventListener("click", () =>{
    if (contenedorDragDrop ) {
      contenedorDragDrop.remove();
    }
  });

}

// 3. funcion para limpiar.
function limpiar (elemento){
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
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