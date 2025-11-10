'use strict';

if (navigator.cookieEnabled) {
  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const dni = document.getElementById("dni");
  const fecnac = document.getElementById("fecnac");
  const observaciones = document.getElementById("observaciones");
  const botonGuardar = document.getElementById("guardar");

  botonGuardar.addEventListener("click", function () {
    crearCita(nombre.value, apellidos.value, dni.value, fecnac.value, observaciones.value );
    mostrarCitas();
    nombre.value = "";
    apellidos.value = "";
    dni.value = "";
    fecnac.value = "";
    observaciones.value = "";
    nombre.focus();
  });

  mostrarCitas();
} else {
  alert("El uso de cookies está desactivado en tu navegador.");
}
