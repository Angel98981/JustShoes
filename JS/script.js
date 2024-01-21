let nombreUsuario =
  JSON.parse(localStorage.getItem("inicioSesionExitoso")) || false;

console.log(nombreUsuario);

if (nombreUsuario === true) {
  injectName();
} else {
  const unete = "Unete!!";
}

function injectName() {
  const nombreUser = document.querySelector("#nombreUsuario");
  const usuariosRegistrados =
    JSON.parse(localStorage.getItem("usuarios")) || [];
  usuariosRegistrados.forEach((caracteristica) => {
    const { name } = caracteristica;
    console.log(name);
    nombreUser.innerHTML = `  
            <style>
                .nombreInsert{
                    color: #81c9fa;
                    font-size: 19px;
                    font-weight: bold;
                    position: relative;
                    top: 5px;
                }
                @media only screen and (max-width: 600px){
                    .nombreInsert{
                        color: #81c9fa;
                        font-size: 19px;
                        font-weight: bold;
                        position: relative;
                        top: 5px;
                        
                    }
                }
            </style>
            <p class="nombreInsert">${name}</p>
            
            `;
  });
}
