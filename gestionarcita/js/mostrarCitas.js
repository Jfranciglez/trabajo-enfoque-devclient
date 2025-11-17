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

            const celdaId = document.createElement("td");
            celdaId.textContent = valor.idCita || clave;
            celdaId.setAttribute('data-label', 'ID Cita');

            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = valor.nombre || "";
            celdaNombre.setAttribute('data-label', 'Nombre');

            const celdaApellidos = document.createElement("td");
            celdaApellidos.setAttribute('data-label', 'Apellidos');
            const celdaDni = document.createElement("td");
            celdaDni.setAttribute('data-label', 'DNI');
            const celdaFecnac = document.createElement("td");
            celdaFecnac.setAttribute('data-label', 'Fecha Nacimiento');
            const celdaFechaCita = document.createElement("td");
            celdaFechaCita.setAttribute('data-label', 'Fecha Cita');
            const celdaObservaciones = document.createElement("td");
            celdaObservaciones.setAttribute('data-label', 'Observaciones');
            const celdaAcciones = document.createElement("td");
            celdaAcciones.setAttribute('data-label', 'Acciones');
            celdaAcciones.className = "acciones"; // usa la clase .acciones definida en CSS para centrar y separar botones

            celdaApellidos.textContent = valor.apellidos || "";
            celdaDni.textContent = valor.dni || "";
            celdaFecnac.textContent = valor.fecnac || "";
            celdaFechaCita.textContent = valor.fechaCita || "";
            celdaObservaciones.textContent = valor.observaciones || "";

            // Botón Actualizar
            const botonActualizar = document.createElement("button");
            botonActualizar.textContent = "✏️ Actualizar";
            botonActualizar.classList.add('actualizar');
            botonActualizar.style.marginRight = "5px";
            botonActualizar.addEventListener("click", () => {
                mostrarFormularioActualizar(clave, valor);
            });

            // Botón Borrar
            const botonBorrar = document.createElement("button");

            botonBorrar.textContent = "🗑️ Borrar";
            botonBorrar.classList.add('borrar');
            botonBorrar.addEventListener("click", () => borrarCita(clave));

            celdaAcciones.appendChild(botonActualizar);
            celdaAcciones.appendChild(botonBorrar);

            fila.append(
                celdaId,
                celdaNombre,
                celdaApellidos,
                celdaDni,
                celdaFecnac,
                celdaFechaCita,
                celdaObservaciones,
                celdaAcciones
            );

            cuerpo.appendChild(fila);
        });
    } else {
        cuerpo.innerHTML = "<tr><td colspan='8'>No hay citas almacenadas</td></tr>";
    }
}

function mostrarFormularioActualizar(nombre, datos) {
    // Llenar los campos del formulario con los datos actuales
    document.getElementById("idCita").value = datos.idCita || "";
    document.getElementById("nombre").value = datos.nombre || "";
    document.getElementById("apellidos").value = datos.apellidos || "";
    document.getElementById("dni").value = datos.dni || "";
    document.getElementById("fecnac").value = datos.fecnac || "";
    document.getElementById("fechaCita").value = datos.fechaCita || "";
    document.getElementById("observaciones").value = datos.observaciones || "";

    // Enfocar en el primer campo
    document.getElementById("nombre").focus();

    // Cambiar el texto del botón para indicar que se está actualizando
    const botonGuardar = document.getElementById("guardar");
    const textoOriginal = botonGuardar.innerHTML;
    botonGuardar.innerHTML = "Actualizar";
    botonGuardar.onclick = function() {
        const nuevosDatos = {
            idCita: datos.idCita,
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            dni: document.getElementById("dni").value,
            fecnac: document.getElementById("fecnac").value,
            fechaCita: document.getElementById("fechaCita").value,
            observaciones: document.getElementById("observaciones").value
        };
        actualizarCita(datos.idCita, nuevosDatos);
        
        // Restaurar botón y limpiar campos
        botonGuardar.innerHTML = textoOriginal;
        botonGuardar.onclick = null;
        document.getElementById("idCita").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("fecnac").value = "";
        document.getElementById("fechaCita").value = "";
        document.getElementById("observaciones").value = "";
    };
}