import { tenerDatos } from "../apiConnection/API.js";

document.addEventListener("DOMContentLoaded", () => {
  tenerDatos();
  showProducts();  
  nombreLogout();
});
function nombreLogout() {
  const usernameElement = document.getElementById("nombreUsuario");
  let loggedInUserName = JSON.parse(localStorage.getItem("user"));
  usernameElement.textContent = loggedInUserName.name;

  const logout = document.getElementById("logout");
  let cerrar = JSON.parse(localStorage.getItem("validate"));  
  if (cerrar === true) {
    logout.classList.remove("deactivate");
    usernameElement.classList.remove("deactivate");
  }
  const cerrarSesion = document.querySelector("#closeSesion");
  cerrarSesion.addEventListener("click", () => {
    logout.classList.add("deactivate");
    usernameElement.classList.add("deactivate");
    localStorage.removeItem("user");
    localStorage.removeItem("validate");
  });
}

async function showProducts() {
  const contenedorProductos = document.querySelector("#tarjetasProductos");
  const productos = await tenerDatos(); // esperar la promesa

  productos.forEach((producto) => {
    const {zapatos, sacos, pantalones, implementos, camisas, bolsos, accesorios} = producto; // destructurando
    [zapatos, sacos, camisas, pantalones, implementos, bolsos, accesorios,].forEach((categoria) => { // recorrer categorias
      categoria.forEach((item) => { // recorrer dentro de categoria
        const columnas = document.createElement("div");
        columnas.innerHTML = `
          <style>
            .producto-link{
              color:black;
              text-decoration:none;
              font-weight: bold;
            }
            .card{
              height: 26.5rem;
            }
          </style>
          <div class="card" style="width: 18rem">
            <a href="vistaProducto.html" idElement="${item.id}" class="producto-link">
              <img src="${item.imgPrincipal}" class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">${item.nombre}</p>
              </div>
            </a>
          </div>
        `;
        contenedorProductos.appendChild(columnas); 
      });
    });
  });

  contenedorProductos.addEventListener("click", (e) => {
    const clickedElement = e.target.closest(".producto-link");

    if (clickedElement) {
      const idElement = clickedElement.getAttribute("idElement");
      localStorage.setItem("productId", idElement);
    }
  });
}

