import { obtenerProductos, getProductos } from "./../services/index.js";
import {
  TITLE,
  AMOUNT,
  PRICE,
  SUB_TOTAL,
  YOU_RE_SURE,
  THEY_ARE_GOING_TO_BE_DELETED,
  ERROR_MESSAGE,
  CONFIRMATION_MESSAGE,
  NO_CONFIRMATION_MESSAGE,
  NAME,
  SEGUIR_COMPRANDO_TEXT,
  FOOTER,
  NAME_CART,
  NAME_CART_ELEMENTS,
  EMPTY_CART,
  CLEAN_CART,
  TOTAL,
  BUY_NOW,
  CART_PURCHASED,
} from "./../constants/index.js";

let productosEnCarrito =
  JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

document.addEventListener("DOMContentLoaded", () => {
  cargarProductosCarrito();
});

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${
        producto.titulo
      }">
        <div class="carrito-producto-titulo">
          <small>${TITLE}</small>
          <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>${AMOUNT}</small>
          <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
          <small>${PRICE}</small>
          <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
          <small>${SUB_TOTAL}</small>
          <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${
          producto.id
        }"><i class="bi bi-trash-fill"></i></button>
      `;
      contenedorCarritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

function actualizarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(
    ".carrito-producto-eliminar"
  );
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
  }).showToast();

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  if (index !== -1) {
    productosEnCarrito.splice(index, 1);
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify(productosEnCarrito)
    );
    cargarProductosCarrito();
  }
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: `${YOU_RE_SURE}`,
    icon: "question",
    html: `${THEY_ARE_GOING_TO_BE_DELETED} ${productosEnCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `${CONFIRMATION_MESSAGE}`,
    cancelButtonText: `${NO_CONFIRMATION_MESSAGE}`,
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito = [];
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
      cargarProductosCarrito();
    }
  });
}

function actualizarTotal() {
  if (Array.isArray(productosEnCarrito)) {
    const totalCalculado = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    contenedorTotal.innerText = `$${totalCalculado}`;
  } else {
    console.error(`${ERROR_MESSAGE}`);
  }
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito = [];
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("NAME").textContent = NAME;
  document.getElementById("logo").textContent = NAME;
  document.getElementById("ContinuarCompra").textContent =
    SEGUIR_COMPRANDO_TEXT;
  document.getElementById("footerCart").textContent = FOOTER;
  document.getElementById("nameCart").textContent = NAME_CART;
  document.getElementById("nameCartElements").textContent = NAME_CART_ELEMENTS;
  document.getElementById("carrito-vacio").textContent = EMPTY_CART;
  document.getElementById("carrito-acciones-vaciar").textContent = CLEAN_CART;
  document.getElementById("TitleTotal").textContent = TOTAL;
  document.getElementById("carrito-acciones-comprar").textContent = BUY_NOW;
  document.getElementById("carrito-comprado").textContent = CART_PURCHASED;
  cargarProductosCarrito();
});
