"use strict"

function crearCita(nombre, apellidos, dni, fecnac, observaciones) {
    console.log("Creando Cita...");

    cookieStore.setItem(nombre, apellidos, dni, fecnac, observaciones);

    console.log("Cookie creada: ", cookieStore);
    mostrarCitas();
}