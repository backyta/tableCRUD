
import { showModal } from '../render-modal/render-modal';
import './render-add-buttons.css'
/**
 * 
 * @param {HTMLDivElement} element 
 * @param { () => void } callback
 */


//* cuando queremos que sea reutilizable el boton usamos un callback dentro de la funcion

export const renderAddButton = ( element ) =>{

    const fabButton = document.createElement( 'button' );
    fabButton.innerText = '+';
    fabButton.classList.add('fab-button');

    element.append(fabButton)

    fabButton.addEventListener('click', () =>{
        //* delegamos el evento click del boton a que el padre me lo indique, osea el padre me indica
        //* que es lo que se quire hacer
        // if( !callback ) return;

        // callback();
        showModal();
   
    });
}