"use strict"

function crearCita(nombre, apellidos, dni, fecnac, observaciones) {
    const datos = { apellidos, dni, fecnac, observaciones };
    document.cookie = `${nombre}=${JSON.stringify(datos)}; path=/; `;
    mostrarCitas();
}