//Maneja la funcionalidad de abrir y cerrar el menu
/*openMenu: Selecciona el elemento con el ID open-menu, que probablemente es un botón o enlace que abre el menú.
closeMenu: Selecciona el elemento con el ID close-menu, que probablemente es un botón o enlace que cierra el menú.
aside: Selecciona el elemento <aside>, que es el contenedor del menú. Este elemento se muestra u oculta al añadir o quitar una clase. */
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

/*openMenu.addEventListener("click", () => { ... });: Añade un manejador de eventos que se ejecuta cuando se hace clic en el elemento openMenu.
aside.classList.add("aside-visible");: Añade la clase aside-visible al elemento aside. Esta clase probablemente tiene reglas CSS 
asociadas que hacen que el menú sea visible. Por ejemplo, podría cambiar la propiedad display o opacity para mostrar el menú.*/
openMenu.addEventListener("click", () => {
  aside.classList.add("aside-visible");
});

/*closeMenu.addEventListener("click", () => { ... });: Añade un manejador de eventos que se ejecuta cuando se hace clic en el elemento closeMenu.
aside.classList.remove("aside-visible");: Elimina la clase aside-visible del elemento aside. Esto ocultará el menú, ya que al remover la clase se 
aplicarán las reglas CSS que ocultan el menú (por ejemplo, cambiando display o opacity a un valor que no sea visible). */
closeMenu.addEventListener("click", () => {
  aside.classList.remove("aside-visible");
});
