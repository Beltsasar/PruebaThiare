function valida() {
    var login = document.getElementById('login').value.trim();
    var clave = document.getElementById('clave').value.trim();
    var repetir = document.getElementById('repetir').value.trim();
    var nombre = document.getElementById('nombre').value.trim();
    var fono = document.getElementById('fono').value.trim();
    var email = document.getElementById('email').value.trim();
    var comuna = document.getElementById('comuna').value;
    var edad = document.getElementById('edad').value.trim();

    // Validación de campos vacíos
    if (login === '' || clave === '' || repetir === '' || nombre === '' || fono === '' || email === '' || comuna === 'Seleccione' || edad === '') {
        alert('Por favor, complete todos los campos');
        return false;
    }

    // Validación de correo electrónico
    if (!validateEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido');
        return false;
    }

    // Validación de número de teléfono
    if (!validatePhoneNumber(fono)) {
        alert('Por favor, ingrese un número de teléfono válido');
        return false;
    }

    // Validación de que las claves coincidan
    if (clave !== repetir) {
        alert('Las claves no coinciden');
        return false;
    }

    // Validación de edad
    if (isNaN(edad) || edad < 18) {
        alert('Debe ser mayor de 18 años para registrarse');
        return false;
    }

    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
    var re = /^[0-9]{9}$/;
    return re.test(phoneNumber);
}
