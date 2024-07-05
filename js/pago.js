document.getElementById('formulario-pago').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validarFormulario()) {
        alert('Pago realizado con éxito');
        // Aquí puedes agregar la lógica para procesar el pago
    }
});

function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const direccion = document.getElementById('direccion');
    const ciudad = document.getElementById('ciudad');
    const codigoPostal = document.getElementById('codigo-postal');
    const tarjeta = document.getElementById('tarjeta');
    const vencimiento = document.getElementById('vencimiento');
    const cvv = document.getElementById('cvv');

    let valido = true;

    if (!nombre.value.trim()) {
        mostrarError(nombre, 'El nombre es obligatorio');
        valido = false;
    } else {
        limpiarError(nombre);
    }

    if (!email.value.trim() || !validarEmail(email.value)) {
        mostrarError(email, 'Correo electrónico no válido');
        valido = false;
    } else {
        limpiarError(email);
    }

    if (!direccion.value.trim()) {
        mostrarError(direccion, 'La dirección es obligatoria');
        valido = false;
    } else {
        limpiarError(direccion);
    }

    if (!ciudad.value.trim()) {
        mostrarError(ciudad, 'La ciudad es obligatoria');
        valido = false;
    } else {
        limpiarError(ciudad);
    }

    if (!codigoPostal.value.trim() || isNaN(codigoPostal.value)) {
        mostrarError(codigoPostal, 'El código postal no es válido');
        valido = false;
    } else {
        limpiarError(codigoPostal);
    }

    if (!tarjeta.value.trim() || !validarTarjeta(tarjeta.value)) {
        mostrarError(tarjeta, 'El número de tarjeta no es válido');
        valido = false;
    } else {
        limpiarError(tarjeta);
    }

    if (!vencimiento.value.trim() || !validarVencimiento(vencimiento.value)) {
        mostrarError(vencimiento, 'La fecha de vencimiento no es válida');
        valido = false;
    } else {
        limpiarError(vencimiento);
    }

    if (!cvv.value.trim() || isNaN(cvv.value) || cvv.value.length !== 3) {
        mostrarError(cvv, 'El CVV no es válido');
        valido = false;
    } else {
        limpiarError(cvv);
    }

    return valido;
}

function mostrarError(input, mensaje) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error')) {
        error = document.createElement('span');
        error.classList.add('error');
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = mensaje;
    input.classList.add('invalid');
}

function limpiarError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error')) {
        input.parentNode.removeChild(error);
    }
    input.classList.remove('invalid');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTarjeta(tarjeta) {
    const regex = /^\d{16}$/;
    return regex.test(tarjeta);
}

function validarVencimiento(vencimiento) {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(vencimiento)) {
        return false;
    }

    const partes = vencimiento.split('/');
    const mes = parseInt(partes[0], 10);
    const año = parseInt(partes[1], 10) + 2000;
    const fechaActual = new Date();
    const fechaVencimiento = new Date(año, mes);

    return fechaVencimiento > fechaActual;
}
