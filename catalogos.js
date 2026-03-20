/*
CATÁLOGO - JAVASCRIPT

Este archivo:
1. Define los productos
2. Muestra los productos en el HTML
3. Permite agregarlos al carrito
*/


// Arreglo de productos (objetos)
const productos = [
    { id: 1, nombre: "Laptop", precio: 15000, imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60" },
    { id: 2, nombre: "Mouse", precio: 300, imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=870&auto=format&fit=crop" },
    { id: 3, nombre: "Teclado", precio: 800, imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
    { id: 4, nombre: "Monitor", precio: 4000, imagen: "https://plus.unsplash.com/premium_photo-1678565546470-e94fb3e9501e?q=80&w=387&auto=format&fit=crop" }
];


// Arreglo del carrito
let carrito = [];


// Obtener el contenedor del HTML
const contenedorProductos = document.getElementById("lista-productos");


// Función para mostrar productos
function mostrarProductos() {

    // Validación por si el contenedor no existe
    if (!contenedorProductos) {
        console.error("No existe el contenedor con id 'lista-productos'");
        return;
    }

    contenedorProductos.innerHTML = "";

    productos.forEach(function(producto) {

        const divProducto = document.createElement("div");

        // IMPORTANTE: usar backticks (`) para que funcione ${}
        divProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button> `;

        contenedorProductos.appendChild(divProducto);
    });
}


// Función para agregar al carrito
function agregarAlCarrito(idProducto) {

    const productoSeleccionado = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    if (!productoSeleccionado) {
        alert("Producto no encontrado");
        return;
    }

    carrito.push(productoSeleccionado);

    alert(productoSeleccionado.nombre + " agregado al carrito");

    console.log("Carrito:", carrito);
}


// Ejecutar cuando cargue la página
mostrarProductos();