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
        // Borrar la cookie antigua 
        document.cookie = `${idCita}=; path=/; max-age=0`;
        
        // Guardar la nueva cookie con los datos actualizados
        const datosActualizados = { ...cookies[idCita], ...nuevosDatos };
        document.cookie = `${idCita}=${encodeURIComponent(JSON.stringify(datosActualizados))}; path=/;`;
        
        alert(`Cita actualizada exitosamente.`);
    } else {
        alert("No se encontró esa cita.");
    }

    // Vuelves a mostrar la tabla
    mostrarCitas();
}
