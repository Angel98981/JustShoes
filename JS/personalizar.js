//URLS
const URLProductos = "http://localhost:3000/productos";
const URLDiseños = "http://localhost:3000/diseños";


// SELECTORES-----------------------------------------------
// Imagenes
const imgPrincipal = document.querySelector(".imgPrincipal");
const imagenes = document.querySelectorAll(".imagenes");



// Modal producto
const contenedorProductos = document.querySelector("#contenedorProductos");
const categorias = document.querySelectorAll(".categoria");
const generos = document.querySelectorAll(".genero");
let generOculto = "";
let categoriaOculto = "";



// Modal diseño
const contenedorDiseños = document.querySelector("#contenedorDiseños");
const categoriaDiseños = document.querySelectorAll(".categoria-diseños");


// EVENTOS---------------------------------------
// Imagenes
imagenes.forEach(imagen => {
  imagen.addEventListener("click", intercambiar )
});


// Modal producto
contenedorProductos.addEventListener("click", e =>{
  e.preventDefault();
  if (e.target.classList.contains("contenido-modal")){
    selectProduct(e.target.getAttribute("id"))
  }
});

categorias.forEach(categoria => {
  categoria.addEventListener("click", seleccionCategoria)
});


generos.forEach(genero => {
  genero.addEventListener("click", seleccionGenero)
});


// Modal diseño
categoriaDiseños.forEach(categoriaDiseño => {
  categoriaDiseño.addEventListener("click", seleccionCategoriaDiseño)
});



// FUNCIONES--------------------------------------------------------
// Imagenes
function intercambiar (){
  const imgSeleccionada = document.querySelector(".imgSeleccionada");
  imgSeleccionada.classList.remove("imgSeleccionada");
  this.classList.add("imgSeleccionada");
  imgPrincipal.src = this.src;
};



// Modal producto
function cargarProductos(productosElegidos){
  limpiar()
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
      console.log(productoElegido);
    });
    
  }
  
  
  async function seleccionCategoria(e){
    categoriaOculto = e.target.id;
    const response = await fetch(`${URLProductos}`);
    const datas = await response.json();
    
    if(e.target.id === "todo"){
      generOculto = "";
      cargarProductos(datas)
      return;
    }
    
    categorias.forEach(categoria => categoria.classList.remove("activo"));
    e.target.classList.add("activo");
    
    const productosBtn = datas.filter(data => {
      if(generOculto.length > 0){
        return data.categoria.id === e.target.id && data.genero.id === generOculto;
      }
      
      return data.categoria.id === e.target.id;
      
    });
    
    // console.log(productosBtn);
    cargarProductos(productosBtn);
  }
  
  
  async function seleccionGenero(e){
    generOculto = e.target.id;
    const response = await fetch(`${URLProductos}`);
    const datas = await response.json();
    
    if(categoriaOculto === "todo"){
      categoriaOculto = "";
    } 
    
    
    generos.forEach(genero => genero.classList.remove("activo"));
    e.target.classList.add("activo");
    
    const generosBtn = datas.filter(data => {
      if(categoriaOculto.length > 0){
        return data.genero.id === e.target.id && data.categoria.id === categoriaOculto; 
      } 
      
      return data.genero.id === e.target.id;
      
    })
    console.log(generosBtn);
    cargarProductos(generosBtn);
    
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
  
  


// modal diseño
function cargarDiseños(productosElegidos){
  limpiar()
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


async function seleccionCategoriaDiseño(e){
  categoriaOculto = e.target.id;
  const response = await fetch(`${URLDiseños}`);
  const datas = await response.json();
  
  if(e.target.id === "todo"){
    generOculto = "";
    cargarDiseños(datas)
    return;
  }
  
  categoriaDiseños.forEach(categoriaDiseño => categoriaDiseño.classList.remove("activo"));
  e.target.classList.add("activo");
  
  const diseñosBtn = datas.filter(data => {
    return data.categoria.id === e.target.id; 
  });
  
  // console.log(productosBtn);
  cargarDiseños(diseñosBtn)
}

function limpiar (){
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