import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {String||Number} page 
 * @returns {Promise<User>} 
 */

export const getUsersById = async ( id ) => {


    const url = `${import.meta.env.VITE_BASE_URL}/users/${ id }`;

    const res  = await fetch(url);
    
    const data = await res.json();

    const users = localhostUserToModel( data ); 
    console.log( {users} );

    return users;

}
//* Rtorna una promesa resuelta que es un array de Users.
