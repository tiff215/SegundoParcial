// Para que este proyecto funcione tenemos que usar el local storage
// Usamos localStorage para que los productos no se borren al cambiar de página.
// Es como una mini base de datos que guarda el navegador en texto.
// y el JSON.parse es y JSON.stringify es para convertir de texto a arreglo y de arreglo a texto, ya que el localstorage solo guarda texto
let miCarrito = JSON.parse(localStorage.getItem("carritoGuardado")) || [];

// Capturamos los elementos del DOM usando sus IDs únicos definidos en el HTML.
// Esto crea un "puente" entre las etiquetas de HTML y nuestro código de JavaScript.
const contenedor = document.getElementById("contenedor-carrito"); // Donde se dibujarán los productos.
const totalTxt = document.getElementById("monto-total");           // Donde mostraremos la suma total.
const mensaje = document.getElementById("mensaje-pago");           // Donde daremos avisos de éxito o error.

// Definimos la función que se encarga de mostrar (renderizar) los productos en la pantalla.
function renderizarCarrito() {
    // Limpiamos el contenido del contenedor para evitar que se dupliquen los elementos al actualizar.
    contenedor.innerHTML = "";
    
    // Declaramos una variable para ir acumulando el costo total de los productos.
    let total = 0;

    // Aplicamos una condicional (if/else) para manejar el estado del carrito.
    if (miCarrito.length === 0) {
        // Si el arreglo está vacío, insertamos un mensaje informativo en el HTML.
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        // Usamos el método forEach para recorrer cada objeto (producto) dentro de nuestro arreglo.
        // 'prod' representa el objeto actual y 'index' su posición numérica en la lista.
        miCarrito.forEach((prod, index) => {
            // Sumamos el precio del objeto actual a nuestra variable acumuladora.
            total += prod.precio;

            // Creamos un nuevo elemento 'div' en la memoria del navegador para que sirva de tarjeta.
            const div = document.createElement("div");
            
            // Aplicamos estilos básicos directamente al elemento usando la propiedad .style (como en clase).
            div.style.border = "1px solid #ccc";
            div.style.margin = "10px";
            div.style.padding = "10px";
            
            // Usamos innerHTML con Template Strings (``) para inyectar los datos del objeto en el div.
            // El botón de eliminar llama a la función pasándole el 'index' específico de este producto.
            div.innerHTML = `
                <h4>${prod.nombre}</h4>
                <p>Precio: $${prod.precio}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            
            // Insertamos el div recién creado como un hijo del contenedor principal en el DOM.
            contenedor.appendChild(div);
        });
    }
    // Actualizamos el texto del total en el HTML con el valor final de la suma.
    totalTxt.innerText = total;
}

// Función para eliminar un producto del carrito (Requisito: manejo de arreglos).
function eliminarDelCarrito(indice) {
    // Usamos .splice para quitar exactamente 1 elemento del arreglo en la posición indicada.
    miCarrito.splice(indice, 1);
    
    // Guardamos la versión actualizada del arreglo en el localStorage.
    // JSON.stringify aplasta el arreglo y lo vuelve texto para que el navegador lo pueda guardar.
    localStorage.setItem("carritoGuardado", JSON.stringify(miCarrito));
    
    // Volvemos a llamar a la función de dibujo para que el cambio sea visible de inmediato.
    renderizarCarrito();
}

// Función para simular el proceso de pago (Requisito: condicionales y clases CSS).
function realizarPago() {
    // Convertimos el texto del total a un número decimal usando parseFloat.
    const total = parseFloat(totalTxt.innerText);
    
    // Obtenemos el valor que el usuario ingresó en el input de pago.
    const pago = parseFloat(document.getElementById("input-pago").value);

    // Evaluamos si el pago es suficiente y si hay productos en el carrito (total > 0).
    if (pago >= total && total > 0) {
        // Si todo está bien, mostramos mensaje de éxito y cambiamos su estilo visual.
        mensaje.innerText = "¡Pago realizado con éxito! Gracias por su compra.";
        mensaje.style.color = "green";
        mensaje.style.fontWeight = "bold";
        
        // Vaciamos el arreglo y limpiamos la memoria del navegador para finalizar la compra.
        miCarrito = [];
        localStorage.removeItem("carritoGuardado");
        
        // Actualizamos la pantalla para que el carrito se vea vacío.
        renderizarCarrito();
    } else {
        // Si hay un error (falta dinero o carrito vacío), avisamos al usuario.
        mensaje.innerText = "Error: Monto insuficiente o carrito vacío.";
        mensaje.style.color = "red";
        
        // Agregamos una clase CSS dinámicamente para cumplir con el requisito del proyecto.
        // Asegúrate de definir '.error-animacion' en tu archivo CSS.
        mensaje.classList.add("error-animacion"); 
    }
}

// Ejecutamos la función al cargar la página para mostrar los datos que ya estaban guardados.
renderizarCarrito();