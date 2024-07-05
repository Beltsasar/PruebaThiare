document.addEventListener('DOMContentLoaded', () => {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];
    const ulCarro = document.getElementById('carro');
    const mostrarCarritoBtn = document.getElementById('mostrar-carrito');

    const agregarListeners = () => {
        document.querySelectorAll('.agregar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productoDiv = e.target.closest('.producto');
                const producto = {
                    id: productoDiv.dataset.id,
                    nombre: productoDiv.dataset.nombre,
                    precio: parseFloat(productoDiv.dataset.precio),
                    cantidad: 1
                };
                agregarAlCarro(producto);
            });
        });
    };

    const guardarCarro = () => {
        localStorage.setItem('carro', JSON.stringify(carro));
    };

    const mostrarCarro = () => {
        ulCarro.innerHTML = '';
        let total = 0;
        carro.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}`;
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => eliminarDelCarro(producto.id);
            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar cantidad';
            botonModificar.onclick = () => modificarCantidad(producto.id);
            li.append(botonEliminar, botonModificar);
            ulCarro.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
        const liTotal = document.createElement('li');
        liTotal.textContent = `Total de la compra: $${total.toFixed(2)}`;
        ulCarro.appendChild(liTotal);
    };

    const mostrarCarroPagar = () => {
        const carroContainer = document.getElementById('carro');
        carroContainer.innerHTML = '';
        let total = 0;
        carro.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}`;
            carroContainer.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
        const liTotal = document.createElement('li');
        liTotal.textContent = `Total de la compra: $${total.toFixed(2)}`;
        carroContainer.appendChild(liTotal);
    };

    function agregarAlCarro(productoNuevo) {
        const productoEnCarro = carro.find(producto => producto.id === productoNuevo.id);
        if (productoEnCarro) {
            productoEnCarro.cantidad += 1;
        } else {
            carro.push(productoNuevo);
        }
        guardarCarro();
        mostrarCarro();
    }

    function eliminarDelCarro(idProducto) {
        carro = carro.filter(producto => producto.id !== idProducto);
        guardarCarro();
        mostrarCarro();
    }

    function modificarCantidad(idProducto) {
        const cantidad = prompt('Nueva cantidad (0 para eliminar):');
        const cantidadNum = parseInt(cantidad);
        if (!isNaN(cantidadNum) && cantidadNum > 0) {
            const producto = carro.find(producto => producto.id === idProducto);
            if (producto) {
                producto.cantidad = cantidadNum;
            }
        } else if (cantidadNum === 0) {
            eliminarDelCarro(idProducto);
        } else {
            alert('Por favor, introduce un número válido.');
            return;
        }
        guardarCarro();
        mostrarCarro();
    }

    mostrarCarritoBtn.addEventListener('click', () => {
        window.location.href = 'Carrito.html';
    });

    agregarListeners();
    mostrarCarro();
});
