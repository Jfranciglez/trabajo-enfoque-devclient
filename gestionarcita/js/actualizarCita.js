"use strict"

function actualizarCita(idCita, nuevosDatos) {
    // Validar datos actualizados
    if (!validarDatos(nuevosDatos.nombre, nuevosDatos.apellidos, nuevosDatos.dni, nuevosDatos.fecnac, nuevosDatos.fechaCita, nuevosDatos.observaciones)) {
        return;
    }
    
    // Leemos todas las cookies
    const cookies = leerCookies();
    
    // Si existe la cookie, la actualizamos
    if (cookies[idCita]) {
        const datosActualizados = { ...cookies[idCita], ...nuevosDatos };

        // Guardamos la nueva cookie (mismo id)
        document.cookie = `${idCita}=${encodeURIComponent(JSON.stringify(datosActualizados))}; path=/; max-age=3600`;
        alert(`Cita actualizada exitosamente.`);
    } else {
        alert("No se encontró esa cita.");
    }

    // Vuelves a mostrar la tabla
    mostrarCitas();
}
