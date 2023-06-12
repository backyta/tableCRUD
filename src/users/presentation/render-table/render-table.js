
import usersStore from '../../store/users-store'
import { deleteUserById } from '../../uses-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css'

let table;

const createTable = () =>{
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML= `

        <tr>
            <th> #ID    </th>
            <th> Balance </th>
            <th> FirstName </th>
            <th> LasName </th>
            <th> isActive </th>
            <th> Actions </th>
        </tr>
    
    `; // aqui ya esta aniadido al tableHeaders

    const tableBody = document.createElement('tbody');

    table.append( tableHeaders, tableBody )// retorna elementos HTML para selecionar con querySelctor.
  
    return table;
}


/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = ( event ) =>{
    const element = event.target.closest('.select-user'); // targetea lo que tega .select-user

    if ( !element ) return;

    const id = element.getAttribute('data-id');
    showModal(id);

}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async ( event ) =>{
    const element = event.target.closest('.delete-user'); // targetea lo que tega .select-user
    if ( !element ) return;
    const id = element.getAttribute('data-id');

    try{
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();

    }catch (error){
        console.log(error);
        alert('No se pudo eleminar');
    }


}

export const renderTable = ( element ) => {

    const users = usersStore.getUsers(); // array de todos los objetos de User

    if ( !table ){
        table = createTable();
        element.append( table );

        // TODO: listeners a la tabla

        // table.addEventListener( 'click', event => tableSelectListener(event) );
        table.addEventListener( 'click', tableSelectListener ); // mandando funcion x referencia
        table.addEventListener('click', tableDeleteListener );

    }

    let tableHTML = '';
    users.forEach(user => { // recorre objetos del array User, pero no regresa un array solo henera cmabios y los
                            // los imprime segun la funcion esto para cada elemento del array.

        tableHTML = tableHTML + `
            <tr>
                <td> ${ user.id }    </td>
                <td> ${ user.balance } </td>
                <td> ${ user.firstName } </td>
                <td> ${ user.lastName } </td>
                <td> ${ user.isActive } </td>
                <td> 
                    <a href="#/" class="select-user" data-id=${ user.id }> Select </a>   
                    |
                    <a href="#/" class="delete-user" data-id=${ user.id }> Delete </a>   
                </td>
            </tr>
        `;

    });

    table.querySelector('tbody').innerHTML = tableHTML;

    //* Al regresar elementos html en la funcion createTable, se debe seleccionar el elemtno tbody
    //* donde se quiere insertar el HTML genrado en el Foreach.

}

