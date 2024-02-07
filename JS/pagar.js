console.log("lol");

function guardarDatos() {
    console.log("hola");

    // Obtener los valores del formulario
    const nombre = document.getElementById("nameUser").value;
    const apellido = document.getElementById("lastNameUser").value;
    const direccion = document.getElementById("direction").value;
    const adicionalInfo = document.getElementById("aditionalInfo").value;
    const departamento = document.getElementById("departament").value;
    const ciudad = document.getElementById("city").value;
    const codigoPostal = document.getElementById("postalCode").value;
    const telefono = document.getElementById("userNumber").value;
    const tipoID = document.getElementById("tipeId").value;
    const numeroId = document.getElementById("userId").value;

    // Validar campos según necesidades

    // Crear un objeto con los datos del formulario
    const datos = {
        nombre,
        apellido,
        direccion,
        adicionalInfo,
        departamento,
        ciudad,
        codigoPostal,
        telefono,
        tipoID,
        numeroId
    };

    // Obtener el array de localStorage o inicializar uno nuevo
    const arrayDatos = JSON.parse(localStorage.getItem("arrayDatos")) || [];

    // Agregar el nuevo objeto al array
    arrayDatos.push(datos);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("arrayDatos", JSON.stringify(arrayDatos));

    // Limpiar el formulario después de guardar los datos
    document.getElementById("miFormulario").reset();

    alert("Datos guardados correctamente.");
}

// Añadir un listener de eventos al botón de enviar
const botonEnviar = document.getElementById("enviar");
botonEnviar.addEventListener("click", guardarDatos);