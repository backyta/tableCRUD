import modalHTML from './render-modal.html?raw'; // exportar en crudo
import './render-modal.css'
import { User } from '../../models/user';
import { getUsersById } from '../../uses-cases/get-user-by-id';

let modal, form;
let loadedUser = {}; // Para saber si hubo informacion cargada y luego aniadirselo al objeto que mandare a grabar
// let checked = document.querySelector('checked')

/**
 * Cargar select por usuario
 * @param { String|Number } id 
 */

export const showModal  = async ( id ) =>{
    modal?.classList.remove('hiden-modal');
    loadedUser = {};
    
    if ( !id ) return;
    const user = await getUsersById( id );

    setFormValues( user );
}

export const hideModal = ( ) => {
    modal?.classList.add('hiden-modal');

    //TODO: Resetear el formulario
    form?.reset(); // si existe un formulario lo resetea
}

/**
 * 
 * @param {User} user 
 */

const setFormValues = ( user ) =>{

    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    // buscamos en el form un elemento con name respectivo y seteamos la propiedad value 
    // valor que viene del parametrro en el input con name respectivo, lo mismo para el cheked
    loadedUser = user;
    console.log(loadedUser);
    // se usa para que cuando venga y se edite un usuario.
    // cuando creamos un formulario solo tenemos la info de ese formulario en el callback de click submit
    // no tenemos la demas informacion o propiedades, como el genero u otros campos.
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */

export const renderModal = ( element, callback) => {

    if ( modal ) return; // si el modal ya existe no hago nada mas

    modal = document.createElement('div'); // pero si no existe lo construimos todo.
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hiden-modal';

    form = modal.querySelector('form');



    //? LISTENERS

    modal.addEventListener('click', ( event ) =>{
        if (event.target.className === 'modal-container'){
            hideModal();
        }
      
    });




    //* se debe prevenir o evitar el comportamiento por defecto del formulario que es la propagacion delmismo
    //* y enviarlo al backend, para esto usamos el preventDefault

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
     
        const formData = new FormData( form );
        const userLike = {...loadedUser}; // contiene todas las propiedades y evita que se spbreescriba
        // el spred servira para cuando estemos editando un usuario
        console.log(userLike);
        for( const [ key, value ] of formData){
            // console.log(formData);
            // console.log({key, value});
            if ( key === 'balance' ){
                userLike[key] = Number(value); // conversion de string a numero +value
                continue;
            }

            if ( key === 'isActive' ){
                userLike[key] = (value === 'on') ? true : false;
                // userLike[key] = (value) ? false : true;
                continue;
            }

            const checkboxElement = document.querySelector('[name="isActive"]');
            if (!checkboxElement.checked) {
              userLike['isActive'] = false;
              continue;
            }

            // el continue permite seguir con la siguiente iteracion, y todo lo que no este dentro de
            // la condicion sera su mismo valor de llave osea string porque no sufrio trasnformacion.
       
            userLike[key] = value;
        }
        console.log(userLike);

        // TODO: Guardar Usuarios
        await callback( userLike );
        hideModal();


    });

    element.append( modal );
}