
//* Punto inicial del store, el state no se exporta porque no quiero que nadie afuera pueda manipular el store.

import { loadUsersByPage } from "../uses-cases/load-users-by-page";

const state = {

    currentPage : 0, 
    users : [],

}

//* Metodos Basicos

const loadNextPage = async () => {

    const users = await loadUsersByPage(state.currentPage + 1);
    if ( users.length === 0 ) return;

    state.currentPage += 1;

    state.users = users;
}

const loadPreviousPage = async () => {

    if ( state.currentPage === 1 )  return;// si la pagina es la uno por mas de que borremos mostrara
                                            // los elementos actuales en ella
    const users = await loadUsersByPage(state.currentPage - 1);


    state.currentPage -= 1;
    state.users = users;

}

const onUserChanged = async (updatedUser) => {

    let wasFound = false;

    state.users = state.users.map( user =>  {
        if( user.id === updatedUser.id ){
            wasFound = true;
            return updatedUser;
        }
        return user;// con esto se actualiza el objeto usuario que esta en nuestro estado
    });

    if( state.users.length < 10 && !wasFound ){ // wasfound es falso osea que si se cumple
        state.users.push( updatedUser )
    }
    // si borramos todos lo usuarios y cambio lo que quiero es insertarlo
}

const reloadPage = async () => { // carga la pagina uno para que siempre haigan 10 registros

    const users = await loadUsersByPage(state.currentPage);
    if ( users.length === 0 ){
        await loadPreviousPage();
        return;
    };
    state.users = users;

}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    //* Para tener acceso desde afuera del store
    /**
     * 
     * @returns { User[] }
     */
    getUsers: () => [...state.users], // spread para romper la referencia

    /**
     * 
     * @returns { Number }
     */

    getCurrentPage: () => state.currentPage,    // Aca pasa por valor por que es primitivo
}