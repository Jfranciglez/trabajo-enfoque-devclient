"use strict"

function leerCookies() {
    const cookies = {};
    if (document.cookie.length > 0) {
        document.cookie.split(";").forEach(cookie => {
            const [clave, valor] = cookie.trim().split("=");
            if (clave && valor) {
                try {
                    cookies[clave] = JSON.parse(decodeURIComponent(valor));
                } catch (e) {
                    cookies[clave] = decodeURIComponent(valor);
                }
            }
        });
    }
    return cookies;
}

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

            // Botón Actualizar
            const botonActualizar = document.createElement("button");
            botonActualizar.textContent = "Actualizar";
            botonActualizar.style.marginRight = "5px";
            botonActualizar.addEventListener("click", () => {
                mostrarFormularioActualizar(clave, valor);
            });

            // Botón Borrar
            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.style.backgroundColor = "#dc3545";
            botonBorrar.style.color = "white";
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

function mostrarFormularioActualizar(nombre, datos) {
    // Llenar los campos del formulario con los datos actuales
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellidos").value = datos.apellidos || "";
    document.getElementById("dni").value = datos.dni || "";
    document.getElementById("fecnac").value = datos.fecnac || "";
    document.getElementById("observaciones").value = datos.observaciones || "";

    // Enfocar en el primer campo
    document.getElementById("nombre").focus();

    // Cambiar el texto del botón para indicar que se está actualizando
    const botonGuardar = document.getElementById("guardar");
    const textoOriginal = botonGuardar.innerHTML;
    botonGuardar.innerHTML = "Actualizar";
    botonGuardar.onclick = function() {
        const nuevosDatos = {
            apellidos: document.getElementById("apellidos").value,
            dni: document.getElementById("dni").value,
            fecnac: document.getElementById("fecnac").value,
            observaciones: document.getElementById("observaciones").value
        };
        actualizarCita(nombre, nuevosDatos);
        
        // Restaurar botón y limpiar campos
        botonGuardar.innerHTML = textoOriginal;
        botonGuardar.onclick = null;
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("fecnac").value = "";
        document.getElementById("observaciones").value = "";
    };
}