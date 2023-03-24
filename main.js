import { productos } from './productos.js'

const contenedor = document.querySelector('.contenedor')
const contenedorCarrito = document.querySelector('.contenedorCarrito')

// definicio de las clases

class Producto {
  constructor (id, nombre, precio, cantidad, imagen) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.cantidad = cantidad
    this.imagen = imagen
  }

  generarHTML () {
    // Generar el HTML para la tarjeta del producto
    return `
    <div class="producto" data-id="${this.id}">
      <img src="${this.imagen}" alt="${this.nombre}">
      <h3>${this.nombre}</h3>
      <p>Precio: $${this.precio}</p>
      <p>Cantidad: ${this.cantidad}</p>
      <button class="agregar-al-carrito">Agregar al carrito</button>
    </div>
  `
  }
}

class Carrito {
  constructor () {
    this.productos = []
  }

  agregarProducto (producto) {
    // Agregar un producto al carrito
    console.log(producto + ' agregado al carrito')

    const productoExistente = this.productos.find(p => p.id === producto.id)

    if (productoExistente) {
      producto.cantidad += 1
    } else {
      this.productos.push(producto)
    }
  }

  eliminarProducto (id) {
    // Eliminar un producto del carrito

    this.productos = this.productos.filter(p => p.id !== id)
  }

  vaciarCarrito () {
    // Vaciar el carrito de compras
    // console.log('vaciando carrito')
    this.productos = []

    generarHTMLCarrito()
  }

  comprar () {
    // Procesar la compra
    console.log('Compra procesada')
    // Mostrar mensaje de "Gracias por tu compra"
    alert('Gracias por tu compra')
    // Vaciar el carrito después de la compra
    this.vaciarCarrito()
    // Actualizar la vista del carrito
    generarHTMLCarrito()
  }
}

// Crear la instancia de carrito

const carrito = new Carrito()

productos.forEach(producto => {
  // Crear un nuevo producto
  const p = new Producto(
    producto.id,
    producto.nombre,
    producto.precio,
    producto.cantidad,
    producto.imagen
  )
  const productoHTML = p.generarHTML()
  // Agregar el producto al DOM
  contenedor.innerHTML += productoHTML
  // ...
})

// Escuchar eventos de click en los botones "Agregar al carrito"
document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
  boton.addEventListener('click', () => {
    const id = boton.parentElement.dataset.id
    const producto = productos.find(p => p.id === parseInt(id))
    carrito.agregarProducto(producto)
    // Actualizar la vista del carrito
    generarHTMLCarrito()
    // ...
  })
})

function generarHTMLCarrito () {
  let total = 0
  let html = ''

  carrito.productos.forEach(producto => {
    total += producto.precio * producto.cantidad

    html += `
      <div class="producto-carrito" data-id="${producto.id}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button class="eliminar-del-carrito">Eliminar</button>
      </div>
    `
  })

  html += `
    <p>Total: $${total}</p>
    <button class="vaciar-carrito">Vaciar carrito</button>
    <button class="comprar-carrito">Comprar</button>
  `

  // Agregar el HTML al DOM
  contenedorCarrito.innerHTML = html

  // Escuchar eventos de click en los botones "Eliminar" del carrito
  document.querySelectorAll('.eliminar-del-carrito').forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.parentElement.dataset.id
      carrito.eliminarProducto(parseInt(id))
      generarHTMLCarrito()
    })
  })

  // Escuchar eventos de click en el botón "Vaciar carrito"
  document.querySelector('.vaciar-carrito').addEventListener('click', () => {
    carrito.vaciarCarrito()
    generarHTMLCarrito()
  })

  // Escuchar eventos de click en el botón "Comprar"
  contenedorCarrito
    .querySelector('.comprar-carrito')
    .addEventListener('click', () => {
      carrito.comprar()
    })
}
