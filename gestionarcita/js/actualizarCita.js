"use strict"

function actualizarCita(nombre, nuevosDatos) {
    // Validar datos actualizados
    if (!validarDatos(nombre, nuevosDatos.apellidos, nuevosDatos.dni, nuevosDatos.fecnac, nuevosDatos.observaciones)) {
        return;
    }
    
    // Leemos todas las cookies
    const cookies = leerCookies();
    
    // Si existe la cookie, la actualizamos
    if (cookies[nombre]) {
        const datosActualizados = { ...cookies[nombre], ...nuevosDatos };

        // Guardamos la nueva cookie (mismo nombre)
        document.cookie = `${nombre}=${encodeURIComponent(JSON.stringify(datosActualizados))}; path=/; max-age=3600`;
        alert(`Cita de ${nombre} actualizada exitosamente.`);
    } else {
        alert("No se encontró esa cita.");
    }

    // Vuelves a mostrar la tabla
    mostrarCitas();
}
