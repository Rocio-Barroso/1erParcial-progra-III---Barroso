/**Me piden crear un array con claves especificas por lo que decido 
 * declarar una constante (porque no cambia)de nombre frutas\
 * pongo los precios segun la imagen */

const productoFrutas = [
    { id: 1, nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg"},
    { id: 2, nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg"},
    { id: 3, nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg"},
    { id: 4, nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png"},
    { id: 5, nombre: "Frutilla", precio: 3000, ruta_img: "img/frutilla.jpg"},
    { id: 6, nombre: "Kiwi", precio: 2000, ruta_img: "img/kiwi.jpg"},
    { id: 7, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg"},
    { id: 8, nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg"},
    { id: 9, nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg"},
    { id: 10, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg"},
    { id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg"},
    { id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg"},
    { id: 13, nombre: "sandia", precio: 3000, ruta_img: "img/sandia.jpg"}
];


//---------variables----------//

let listadoProductos = document.getElementById("listadoProductos")
let cartaProducto = ""
let objetosCarrito = document.getElementById("elementos");
const carrito = [];



//---------variables----------//




/**Me piden modificar init() para incluir una funcion que imprima mi nombre y apellido en el nav
 * declaro la funcion 
 * se me ocurre declarar un const objeto alumno con los datos pedidos para poder acceder a los datos desde alumno.
 * para que lo muestre en el nav abro una etiqueta de nav en html y le pongo un id, traigo ese id y meto todo ahi
 */

function imprimirDatosAlumno(){
    const alumno ={
        dni: "41292163",
        nombre: "Rocio",
        apellido: "Barroso"
};
//---consola---//
console.log(`Alumno: ${alumno.nombre} ${alumno.apellido}, DNI: ${alumno.dni}`);

//---nav---//
const nav = document.getElementById("datosNav")
nav.textContent = `${alumno.nombre} ${alumno.apellido}`;
}


/**me piden mostrarel array  de productos cvreando el html de manera dinamica
 * en el main del html pongo id al seccion dentro del main 
 * recorro la lista de productos y accedo por clave a lo que necesito respetando el formato
 */
function mostrarProductos(array){
    cartaProducto = "" 
    array.forEach(productoFrutas =>{
        cartaProducto += `
            <div class= "card-producto">
                <img src="${productoFrutas.ruta_img}" atl="imagen de fruta">
                <h3>${productoFrutas.nombre}</h3>
                <p>${productoFrutas.precio}</p>
                <button onclick="agregarACarrito('${productoFrutas.id}')"> agregar al carrito</button>
            </div>`;
        });
    listadoProductos.innerHTML = cartaProducto;
}

/**toma lo que escribis (barraBusqueda.value) y lo pasa a minúscula (toLowerCase())
Recorre el array y se queda solo con los productos cuyo nombre coincida
Imprime en la consola la lista filtrada para que veas qué productos coinciden.
Llama a mostrarProductos(productosFiltrados) para que en la página solo se muestren esos productos que coinciden */
let barraBusqueda = document.getElementById("barraBusqueda");
barraBusqueda.addEventListener("input", function(){ //uso input porque no se me actualiza cmo corresponde si no
    let valorBusqueda = barraBusqueda.value.toLowerCase();

    let productosFiltrados = productoFrutas.filter(producto =>{
        return  producto.nombre.toLowerCase().includes(valorBusqueda);
    });
    console.table(productosFiltrados)
    mostrarProductos(productosFiltrados)
});


/**Buscar por id(id array)
 * id = identificador
 * array = lista
 * hice una funcion aparte para que sea mas legible
 */
function buscarProductoId(id, array){
    return array.find(producto => producto.id == id) 
}


/**AgregarACarrito()
 * busco la referencia por id de los productois en el array(la funcion de buscar esta arriba)
 * verific si el producto existe en el carrito y si existe le agrega uno (con contador)
 * si no, lo pushea
 * guarda los cambios
 */
function agregarACarrito(id){
    let productoSeleccionado = buscarProductoId(id, productoFrutas)
    let existe = buscarProductoId(id, carrito)
    if(existe){
        existe.cantidad += 1;
    }else{
        carrito.push({ ...productoSeleccionado, cantidad: 1});
    }
    guardarCarritoLocalStorage();
    mostrarCarrito();
} 



/**mostrarCarrito()
 * recorro mi 'carrito' y lo agrego a la card
 * muestro varios datos
 * puedo eliminar 1 producto o todo el contenido
 * lo inserto en html
 */
function mostrarCarrito(){
    cartaCarrito = "";
    carrito.forEach((producto, i) => {
        cartaCarrito += `
        <li>
            <p>${producto.nombre} - ${producto.precio} x${producto.cantidad} = $${producto.precio * producto.cantidad}</p>
            <button id="btn-eliminar" onclick="eliminarProductos(${i})">Eliminar</button>
        </li>
        `;
    });
    cartaCarrito += `<button id="btn-vaciar" onclick="vaciarCarrito()">Vaciar carrito</button>`;

    objetosCarrito.innerHTML = cartaCarrito;
}
    



/**eliminarProductos()
 * si la cantidad es mayor a 1 le resta 1 
 * si no, lo borra
 * guarda el cambio en lolcalStorage
 */
function eliminarProductos(indice){
    if(carrito[indice].cantidad > 1){
        carrito[indice].cantidad -=1;
    }else{
        carrito.splice(indice, 1)
    }
    mostrarCarrito();
    guardarCarritoLocalStorage();
}


function vaciarCarrito() {
    carrito.length = 0; // vacía el array 
    localStorage.removeItem("carrito"); // borra el carrito guardado
    mostrarCarrito(); // actualiza la vista
}


//trae por clave y guarda en txt plano
function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function recuperarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito.length = 0; // vacía el array actual sin perder la referencia
        const datos = JSON.parse(carritoGuardado);
        carrito.push(...datos); // llena el array con los datos guardados()
        mostrarCarrito();
    }
}

/**init()
 * llama la funcion que los datos del alumno
 * llama la funcion que imprime los productos
*/
function init() {
    imprimirDatosAlumno(); 
    mostrarProductos(productoFrutas);
    recuperarCarrito();

}

//-- ejecuto --
init();
