
/**
 * @returns {Promise<Object>} name information
 */

const fetchName = async (  ) =>{
    const res = await fetch( 'https://pokeapi.co/api/v2/pokemon/' );

    // let randomNumb = Math.floor(Math.random() * 20) para hacer aleatorio.

    const data = await res.json();
    
    console.log(data.results[0]);
   
    return data.results[0];

}

/**
 * 
 * @param {HTMLDivElement} elenet 
 */

export const PokemonApp = async ( element ) =>{
        
    document.querySelector('#app-title').innerHTML = 'Pokemon App';
    element.innerHTML = 'Loading...';

    const name = await fetchName(); // espera a que se resulva la funcion antes de ser asignado su valor

    const nameLabel = document.createElement('h2');
    const urlLabel = document.createElement('h3');
    const nextNameButton = document.createElement('button');
    nextNameButton.innerText= 'Next Pokemon';

    const renderName = ( data ) => {
        nameLabel.innerHTML = data.name;
        urlLabel.innerHTML = data.url
        element.replaceChildren( nameLabel, urlLabel, nextNameButton );
    }

    //aniadir listener
    let currentIndex = 0;
    nextNameButton.addEventListener('click', async () => {
        
        const res = await fetch( 'https://pokeapi.co/api/v2/pokemon/' );
        const data = await res.json();

        //* Aca tmb se puede poner en modo ramdom
        
        currentIndex = (currentIndex + 1) % data.results.length; // dividir y residuo corresponde a la posicion

        console.log(currentIndex);
        
        element.innerHTML = 'Loading...';
        const results = data.results[currentIndex];

        // const name = await fetchName();
        renderName(results);
        if(currentIndex >= 19) return element.innerHTML = 'No hay mas pokemones...';
        
    });


    fetchName()
        .then( data => renderName(data) );

}

//* El fetch me pide un input o un URl, y tmb unos argumentos de inicalizacion y esro regresa una promesa con
//* un objeto que se llama response, es decir emite la response.

//* CORS: si se presenta problemas con el CORS se debe configurar del lado del servidor para que acepte peticiones del dominio
//* donde yo me encuentro

//* Cuando se utiliza await antes de una expresión de promesa, como fetchName(), el flujo de ejecución se pausa 
//* en esa línea hasta que la promesa se resuelva. Durante ese tiempo de espera, el control se devuelve al entorno 
//* que llama, lo que permite que otros eventos y tareas se ejecuten.

//* Una vez que la promesa se resuelve, el valor de resolución se asigna a la variable name y la ejecución continúa 
//* desde la línea siguiente al await. Si la promesa es rechazada, se lanzará una excepción y se capturará con un 
//* bloque try...catch si está presente.

//* En resumen, await se utiliza para esperar a que una promesa se resuelva y obtener su resultado antes de 
//* continuar con la ejecución del código. Esto permite trabajar con código asincrónico de manera más sincrónica 
//* y facilita el manejo de resultados de promesas en JavaScript.