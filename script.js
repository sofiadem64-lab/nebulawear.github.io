function agregarCarrito(nombre, idCantidad){
    const cantidad = document.getElementById(idCantidad).value;
    alert(`Agregaste ${cantidad} de ${nombre} al carrito`);
}
