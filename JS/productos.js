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
  //
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
  const productos = await tenerDatos();
  console.log(productos);
  let i = 0;
  productos.forEach((producto) => {
    const {
      zapatos,
      sacos,
      pantalones,
      implementos,
      camisas,
      bolsos,
      accesorios,
    } = producto;
    console.log(zapatos[0].nombre);
    console.log(sacos);
    const columnas = document.createElement("div");
    zapatos.forEach((zapato) => {
      const columnasZapato = document.createElement("div");
      columnasZapato.innerHTML += `
      <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${zapato.id}">
          <img src="${zapato.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${zapato.nombre}</p>
          </div>
        </a>
      </div>
      `;
      contenedorProductos.appendChild(columnasZapato);
      i++;
    });
    sacos.forEach((saco) => {
      const columnasSaco = document.createElement("div");
      columnasSaco.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${saco.id}">
          <img src="${saco.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${saco.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasSaco);
      i++;
    });
    camisas.forEach((camisa) => {
      const columnasCamisa = document.createElement("div");
      columnasCamisa.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${camisa.id}">
          <img src="${camisa.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${camisa.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasCamisa);
      i++;
    });
    pantalones.forEach((pantalon) => {
      const columnasPantalones = document.createElement("div");
      columnasPantalones.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${pantalon.id}">
          <img src="${pantalon.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${pantalon.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasPantalones);
      i++;
    });

    implementos.forEach((implemento) => {
      const columnasImplementos = document.createElement("div");
      columnasImplementos.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${implemento.id}">
          <img src="${implemento.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${implemento.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasImplementos);
      i++;
    });
    bolsos.forEach((bolso) => {
      const columnasBolsos = document.createElement("div");
      columnasBolsos.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${bolso.id}">
          <img src="${bolso.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${bolso.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasBolsos);
      i++;
    });
    accesorios.forEach((accesorio) => {
      const columnasAccesorio = document.createElement("div");
      columnasAccesorio.innerHTML += `
        <div class="card" style="width: 18rem">
        <a href="vistaProducto.html" idElement="${accesorio.id}">
          <img src="${accesorio.imgPrincipal}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${accesorio.nombre}</p>
          </div>
        </a>
        </div>
      `;
      contenedorProductos.appendChild(columnasAccesorio);
      i++;
    });
  });
}

// const handleCheckboxChange = async (checkbox) => {
//   // console.log("hola");
//   console.log(checkbox)
//   if (checkbox.checked) {
//     try {
//       const valor = checkbox.value;
//       const resultado = await obtenerDatosYFiltrar(valor);
//       const grid_container = document.querySelector(".grid-container");
//       grid_container.remove();
//       const contenedor = document.querySelector(".container");
//       resultado.forEach((objeto) => {
//         contenedor.innerHTML += `
//           <div class="card" style="width: 18rem">
//             <img src="${objeto.imagen}" />
//             <div class="card-body">
//             <h3>${objeto.tipo}</h3>
//               <p class="card-text">
//                 Some quick example text to build on the card title and make up the
//                 bulk of the card's content.
//               </p>
//               <p class="card-text">
//                 talla ${objeto.talla}
//               </p>
//             </div>
//           </div>`;
//         contenedor.style.display = "grid";
//       });
//       console.log(resultado);
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     window.location = "productos.html";
//   }
// };

// const obtenerDatosYFiltrar = async (valor) => {
//   try {
//     const datos = await tenerDatos();
//     const resultado = datos.filter((ropita) => ropita.tipo == valor);
//     return resultado;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const zapatos = document.querySelector("#checkbox1");
// zapatos.addEventListener("change", () => handleCheckboxChange(zapatos, "zapato"));

// const camisas = document.querySelector("#checkbox2");
// camisas.addEventListener("change", () => handleCheckboxChange(camisas, "camisa"));

// const pantalones = document.querySelector("#checkbox3");
// pantalones.addEventListener("change", () => handleCheckboxChange(pantalones, "pantalon"));

// const sacos = document.querySelector("#checkbox4");
// sacos.addEventListener("change", () => handleCheckboxChange(sacos, "saco"));

// const bolsos = document.querySelector("#checkbox5");
// bolsos.addEventListener("change", () => handleCheckboxChange(bolsos, "bolso"));

// const accesorios = document.querySelector("#checkbox6");
// accesorios.addEventListener("change", () => handleCheckboxChange(accesorios, "accesorio"));

// const implementos = document.querySelector("#checkbox7");
// implementos.addEventListener("change", () => handleCheckboxChange(implementos, "implemento"));
