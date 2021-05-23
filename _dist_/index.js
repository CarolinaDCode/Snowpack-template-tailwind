/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//console.log('Happy hacking :)')
const baseUrl = "https://platzi-avo.vercel.app";
const url = "https://platzi-avo.vercel.app/api/avo";

const appNode = document.querySelector("#app");

const formatPrice = (price) => {
  //aqui utilzaremos la API de internacionalizacion
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return newPrice;
};

//Web api
//fetch la utilizamos para traer recursos desde cualquier sitio web, lo unico que haremos aqui es pasarle la url
//Pasos para trabajar con fetch:
//1)Conectarnos al server /////aqui trabajaremos con promesas, esa promesa recibira una respuesta
window
  .fetch(`${baseUrl}/api/avo`)
  //2)procesar la respuesta, y convertirla en JSON
  .then((respuesta) => respuesta.json())
  //3)JSON-->Data(informacion)-->Renderizar info en el browser
  .then((responseJson) => {
    const todosLosItems = [];
    responseJson.data.forEach((item) => {
      //console.log(item.name);
      //crear imagen
      const imagen = document.createElement("img");
      imagen.src = `${baseUrl}${item.image}`;

      //crear titulo
      const title = document.createElement("h2");
      title.textContent = item.name;
      //3 formas para gregar estilos a un nodo
      //1)  title.style = 'font-size: 2rem';
      //2)  title.style.fontSize = "3rem";
      //3)  title.className = "muy grande";(aqui se le aplicará el valor de la clase muy grande en css)
      //4) Aqui utilizaremos una clase de Tailwindcss
      title.className = "text-2xl text-green-700 font-bold border-t-2 pt-4";

      //crear precio
      const price = document.createElement("div");
      price.textContent = formatPrice(item.price);
      price.className = "text-xl text-pink-900 font-medium mb-4 mt-3";

      const container = document.createElement("div");
      container.append(imagen, title, price);
      container.className =
        "border-1 flex w-1/4 flex-col m-3.5 rounded-b-3xl shadow-xl";

      todosLosItems.push(container);
    });

    appNode.append(...todosLosItems);
  });

//Usando la API de internacionalización del browser
//API Intl
//Usos: 1).- Dar formato a fechas
//2) Dar formatos a monedas
