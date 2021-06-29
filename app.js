const producto = document.querySelector('#productos');

let carritoCompras = [];

const tablaCarrito = document.querySelector('#tablaCarrito tbody');

const carrito = document.querySelector('#carrito');

const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');


eventListener();

function eventListener() {
    //Agregar
    producto.addEventListener('click',agregarCarrito);

    //Eliminar
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar
    vaciarCarritoBtn.addEventListener('click', ()=> {
        //console.log('hola');
        carritoCompras = [];
        limpiarCarrito();
    })


}

function agregarCarrito(e) {
    e.preventDefault();
    if(e.target.classList.contains('btnProducto')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);
    }  
}
function eliminarCurso(e) {
    if(e.target.classList.contains('borrarCurso')){
        const productoId = e.target.getAttribute('data-id');
        carritoCompras = carritoCompras.filter( producto => producto.id != productoId)
        carritoHTML()
    }
}

function leerDatos(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.oferta').textContent,
        cantidad: 1,
        id: producto.querySelector('a').getAttribute('data-id')
    }
    const existe = carritoCompras.some(producto => producto.id === infoProducto.id)
    //console.log(existe)
    if(existe){
        const nuevosProductos = carritoCompras.map(producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        })
        carritoCompras = [...nuevosProductos];
    } else {
        carritoCompras = [...carritoCompras, infoProducto];
    }
    //console.log(carritoCompras);
    carritoHTML();
}

function carritoHTML(){
    //Limpiar Carrito
    limpiarCarrito();
    //Recorre todo el array
    carritoCompras.forEach( producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>    
            <td>${producto.titulo}</td> 
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrarCurso" data-id=${producto.id}> X </a></td> 
        `;
        tablaCarrito.appendChild(row);
    })
}

function limpiarCarrito() {
    while(tablaCarrito.firstChild){
        tablaCarrito.removeChild(tablaCarrito.firstChild);
    }
}


