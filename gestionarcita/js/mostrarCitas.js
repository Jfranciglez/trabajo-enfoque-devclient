"use strict"

function mostrarCitas() {
    const cuerpo = document.getElementById("cuerpo");
    cuerpo.innerHTML = "";

    const cookies = leerCookies();
    const claves = Object.keys(cookies);

    if (claves.length > 0) {
        claves.forEach(clave => {
            const valor = cookies[clave];
            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = clave;

            const celdaApellidos = document.createElement("td");
            const celdaDni = document.createElement("td");
            const celdaFecnac = document.createElement("td");
            const celdaObservaciones = document.createElement("td");
            const celdaBorrar = document.createElement("td");

            celdaApellidos.textContent = valor.apellidos || "";
            celdaDni.textContent = valor.dni || "";
            celdaFecnac.textContent = valor.fecnac || "";
            celdaObservaciones.textContent = valor.observaciones || "";

            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.addEventListener("click", () => borrarCita(clave));
            celdaBorrar.appendChild(botonBorrar);

            fila.append(
                celdaNombre,
                celdaApellidos,
                celdaDni,
                celdaFecnac,
                celdaObservaciones,
                celdaBorrar
            );

            cuerpo.appendChild(fila);
        });
    } else {
        cuerpo.innerHTML = "<tr><td colspan='6'>No hay cookies almacenadas</td></tr>";
    }
}