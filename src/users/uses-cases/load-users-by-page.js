import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>} array Users
 */

export const loadUsersByPage = async ( page = 1 ) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;

    const res  = await fetch(url);
    
    const data = await res.json();

    // console.log(data);
    // const users = data.map(userLike => localhostUserToModel(userLike));
    const users = data.map( localhostUserToModel ); // se puede mandar la funcion como referencia
    
    //* Map sirve para iterar por cada elemento del array donde el parametro es el elemento actual donde vamos
    //* y retorna un nuevo array con las modificaciones que hagamos en este caso mediante la dfuncion
    //* trasnformamos o cambiamos el nombre de propiedad de  todos objetos de data y los pusheamos dentro de un
    //* nuevo array, crea una instancia User para cada objeto del array.

    // console.log(users); // [User, User, User, x10]
    // console.log(users);
    return users;

}
//* Rtorna una promesa resuelta que es un array de Users.
