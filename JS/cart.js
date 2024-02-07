import { tenerDatos } from "../apiConnection/API.js";

document.addEventListener("DOMContentLoaded", () => {
  tenerDatos();
  showProductsInCart();
  nombreLogout();
});

function nombreLogout() {
  // toda essta funcion es para que el nombre del usuario me aparezca en pantalla
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

async function showProductsInCart() {
  const carritoIds = JSON.parse(localStorage.getItem("carritoIds")) || [];
  const cajaProductos = document.querySelector(".carrito");
  const cajaResumen = document.querySelector(".cajaPedido");
  const basedeDatos = await tenerDatos();

  let productosHTML = "";
  let resumenHTML = `<h2>Resumen del pedido</h2>`;
  let totalPrecio = 0;
  let indexCarrito = 0;

  carritoIds.forEach((idProductoSeleccionado) => {
    basedeDatos.forEach((producto) => {
      const categoriaActual = [
        ...producto.zapatos,
        ...producto.sacos,
        ...producto.pantalones,
        ...producto.implementos,
        ...producto.camisas,
        ...producto.bolsos,
        ...producto.accesorios,
      ];

      const productoEncontrado = categoriaActual.find(
        (item) => item.id == idProductoSeleccionado
      );

      if (productoEncontrado) {
        productosHTML += `        
        <hr />
        <div class="producto">
          <img width="170px" padding-right:"20px"
            class="imgProducto"
            src="${productoEncontrado.imgPrincipal}"
            alt=""
          />
          <div class="o">
            <div class="nameProduct">
              <h2>${productoEncontrado.nombre}</h2>
              <button data-index="${indexCarrito}" class="delete-button">
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>

            <p>${productoEncontrado.genero}</p>
            <p>Detalles</p>
            <div class="talla-cant">
              <p>
                Talla
                <select id="tallas" name="tallas">
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                </select>
              </p>
              <p>
                Cantidad
                <select id="tallas" name="tallas">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </p>
            </div>
            <strong class="precio">${productoEncontrado.precio}</strong>
          </div>
        </div>
        `;
        resumenHTML += `        
        <div class="alinearText">
          <p>${productoEncontrado.nombre}</p>
          <p>${productoEncontrado.precio}</p>
        </div>
        <hr>        
        `;
        totalPrecio += productoEncontrado.precio;
        indexCarrito++;
        console.log(indexCarrito);
      }
    });
  });
  resumenHTML += `
    <div class="alinearText">
      <p>Entrega</p>
      <p>Gratis</p>
    </div>
    <hr />
    <div class="alinearText">
      <p>Descuento</p>
      <p>$XXX.XXX</p>
    </div>
    <hr />
    <div class="alinearText">
      <p>Total</p>
      <p>${totalPrecio}</p>
    </div>
    <hr />
    <div class="pagar">
      <a href="../HTML/pagar.html"><button class="btn btn-dark">Pagar</button></a>
    </div>
    <div class="formasPago">
      <p>Formas de pago aceptadas</p>
      <div class="pagos">
      <img src="../img/unnamed.png" alt="pse" width="70px"/>
      <img src="../img/efecty-colombia-logo.png" alt="efecty" width="50px" />
      <img src="../img/Paypal_2014_logo.png" alt="paypal" width="50px"/>
      </div>
    </div>
    `;

  cajaResumen.innerHTML = resumenHTML;
  cajaProductos.innerHTML = productosHTML;
  deleteItemFromCart(); // se llama aca para que se ejecute siempre que exista algo dentro de esta funcion grande
}

// con esta funcion eliminamos las cosas del carrito 
function deleteItemFromCart() {
  const deleteButtons = document.querySelectorAll(".delete-button"); // selector
  deleteButtons.forEach((deleteButton) => { // recorremos en forech para que me ponga un evento a cada boton 
    deleteButton.addEventListener("click", () => {
      // console.log("hola");
      const productIndex = parseInt(deleteButton.getAttribute("data-index")); // guardamos los indices aqui 
      const carritoIds = JSON.parse(localStorage.getItem("carritoIds")) || []; // obtenemos los indices del localStorage
      if (productIndex >= 0 && productIndex < carritoIds.length) { // verificamos que el indice este dentro de lo permitido
        carritoIds.splice(productIndex, 1); // esta me elimina el producto con el indice dado 
        localStorage.setItem("carritoIds", JSON.stringify(carritoIds)); // esta actualiza el localStorage
        showProductsInCart(); // volvemos a mostrar los demas productos que no se han eliminado del carrito 
      } 
    });
  });
}
