"use strict"

function validarDatos(nombre, apellidos, dni, fecnac, observaciones) {
    // Validar que los campos requeridos no estén vacíos
    if (!nombre.trim()) {
        alert("El nombre es obligatorio");
        return false;
    }
    
    if (!apellidos.trim()) {
        alert("Los apellidos son obligatorios");
        return false;
    }
    
    if (!dni.trim()) {
        alert("El DNI es obligatorio");
        return false;
    }
    
    if (!fecnac.trim()) {
        alert("La fecha de nacimiento es obligatoria");
        return false;
    }
    
    // Validar formato del DNI (8 dígitos + 1 letra)
    const regexDni = /^[0-9]{8}[A-Za-z]$/;
    if (!regexDni.test(dni.trim())) {
        alert("El DNI debe tener formato válido (8 dígitos + 1 letra)");
        return false;
    }
    
    // Validar que el nombre tenga al menos 2 caracteres
    if (nombre.trim().length < 2) {
        alert("El nombre debe tener al menos 2 caracteres");
        return false;
    }
    
    // Validar que los apellidos tengan al menos 2 caracteres
    if (apellidos.trim().length < 2) {
        alert("Los apellidos deben tener al menos 2 caracteres");
        return false;
    }
    
    // Validar que la fecha de nacimiento sea válida y no sea una fecha futura
    const fecha = new Date(fecnac);
    const hoy = new Date();
    if (fecha > hoy) {
        alert("La fecha de nacimiento no puede ser una fecha futura");
        return false;
    }
    
    return true;
}

function crearCita(nombre, apellidos, dni, fecnac, observaciones) {
    // Validar datos antes de crear la cita
    if (!validarDatos(nombre, apellidos, dni, fecnac, observaciones)) {
        return;
    }
    
    const datos = { apellidos, dni, fecnac, observaciones };
    document.cookie = `${nombre}=${JSON.stringify(datos)}; path=/; `;
    alert("Cita creada exitosamente");
    mostrarCitas();
}