import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
// import { PokemonApp } from './src/pokemon/pokemon-app';
import { UsersApp } from './src/users/uses-cases/user-app';


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <div class="card">

    </div>

  </div>
`;

const element = document.querySelector('.card');
// PokemonApp(element);

UsersApp( element ); 


//? CARPETAS Y ORGANIZACION

//* Mappers, la idea de esta carpeta o funciones mappers es que tomemos la info que luce de una manera y la 
//* tranformemos a otra, esto tiene sentido porque la data de la BD tiene ciertos nombres estranios como con - guion

//* Models, la idea de esta carpeta es que esto va ser una representacionde como queremos trabjar internamente
//* en nuestra app, se va a trabajar con nuestros modelos y no importa que el backend retorne nombres diferentes
//* vamos a estar trabajando con nuestros modelos.

//* Presentacion, aqui vamos a poner nuestras funciones que van a servir para mostrarselas al usuario

//* Store, va ser nuestro lugar centralizado de informacion

//* Use-cases, es donde se va tener funciones especificas que realizan una tarea en especifico, traer datos,
//* grabar datos, actualizar datos, crear, eliminar etc.

