document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validación de campos
        if (name === '') {
            alert('Por favor, ingrese su nombre.');
            return;
        }

        if (email === '' || !validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        if (subject === '') {
            alert('Por favor, ingrese un asunto.');
            return;
        }

        if (message === '') {
            alert('Por favor, ingrese su mensaje.');
            return;
        }

        // Mostrar mensaje de éxito
        alert('Comentario enviado con exito');

        // Limpiar formulario
        form.reset();
    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});
