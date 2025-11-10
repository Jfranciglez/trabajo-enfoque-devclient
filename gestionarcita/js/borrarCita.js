"use strict"

function borrarCita(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
    mostrarCitas();
}
