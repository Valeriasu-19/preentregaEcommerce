function verificarFormularioCompleto(formularioId) {
    const formulario = document.getElementById(formularioId);
    let todosCompletos = true;

    if (!formulario) {
        console.error(`Formulario con ID "${formularioId}" no encontrado.`);
        return false;
    }

    Array.from(formulario.elements).forEach((campo) => {
        if (campo.type !== "submit" && campo.type !== "button" && campo.type !== "reset") {
            if (!campo.value.trim()) {
                campo.classList.add("error");
                todosCompletos = false;
            } else {
                campo.classList.remove("error");
            }
        }
    });

    return todosCompletos;
}


document.addEventListener("DOMContentLoaded", () => {
    const botonEnviar = document.getElementById("btnEnviar");
    if (botonEnviar) {
        botonEnviar.addEventListener("click", () => {
            const formularioCompleto = verificarFormularioCompleto("formulario_contacto");
            if (formularioCompleto) {
                console.log("El formulario está listo para enviarse.");
            } else {
                console.log("Por favor, complete todos los campos antes de enviar.");
            }
        });
    } else {
        console.error("Botón de envío no encontrado.");
    }
});




document.addEventListener("DOMContentLoaded", function () {

    const carritoContainer = document.getElementById("carritoContainer");
    const carritoItems = document.getElementById("carritoItems");
    const carritoTotal = document.getElementById("carritoTotal");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productos = [
        {id: 1, title: "Set animales", price: 4500},
        {id: 2, title: "Oveja de peluche", price: 7600},
        {id: 3, title:"Patitos de goma" , price: 14500},
        {id: 4, title:"Xilofon" , price: 10700},
        {id: 5, title:"Cocina de juguete" , price: 37999, },
        {id: 6, title:"Colgante" , price: 17600 },
        {id: 7, title:"Muñeca" , price: 12500 },
        {id: 8, title: "Martillo", price: 7999 },
        {id: 9, title: "Auto/telefono", price: 8999 },
        {id: 10, title:"Monopatin" , price: 25999 },
        {id: 11, title:"Bloques" , price: 11500 }
        ];
    
        generarListadoProductos(productos);

        function generarListadoProductos(productos) {
            const container = document.getElementById("Productos");
            productos.forEach((producto) => {
                const card = document.createElement("div");
                card.classList.add("card");
    
                card.innerHTML = `
                    <div class="item">
                        <h3>${producto.title}</h3>
                        <p>Descripcion del ${producto.title}</p>
                        <p><strong>Precio:</strong> ${(producto.price) }</p>
                        <button class="add-to-cart" data-id="${producto.id}" data-title="${producto.title}" data-price="${producto.price}">Añadir al Carrito</button>
                    </div>`;
    
                container.appendChild(card);
            });

       
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                const title = e.target.dataset.title;
                const price = parseFloat(e.target.dataset.price);

                agregarAlCarrito({ id, title, price, cantidad: 1 });
            });
        });
    }

    function agregarAlCarrito(producto) {
        const existe = carrito.find((item) => item.id === producto.id);
        if (existe) {
            existe.cantidad += 1;
        } else {
            carrito.push(producto);
        }
        guardarCarrito();
        mostrarCarrito();
    }

    function mostrarCarrito() {
        carritoItems.innerHTML = "";

        carrito.forEach((item, index) => {
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");

            carritoItem.innerHTML = `
                <span>${item.title} (x${item.cantidad})</span>
                <span>$${(item.price * item.cantidad).toFixed(2)}</span>
                <button class="incrementar" data-index="${index}">+</button>
                <button class="decrementar" data-index="${index}">-</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;

            carritoItems.appendChild(carritoItem);
        });

     
        const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
        carritoTotal.textContent = `Total: $${total.toFixed(2)}`;

       
        document.querySelectorAll(".incrementar").forEach((btn) =>
            btn.addEventListener("click", (e) => incrementarCantidad(e.target.dataset.index))
        );
        document.querySelectorAll(".decrementar").forEach((btn) =>
            btn.addEventListener("click", (e) => decrementarCantidad(e.target.dataset.index))
        );
        document.querySelectorAll(".eliminar").forEach((btn) =>
            btn.addEventListener("click", (e) => eliminarProducto(e.target.dataset.index))
        );
    }

    function incrementarCantidad(index) {
        carrito[index].cantidad += 1;
        guardarCarrito();
        mostrarCarrito();
    }

    function decrementarCantidad(index) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            eliminarProducto(index);
        }
        guardarCarrito();
        mostrarCarrito();
    }

    function eliminarProducto(index) {
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
    }

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    mostrarCarrito();
});




