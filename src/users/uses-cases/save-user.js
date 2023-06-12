import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} userLike 
 */

export const saveUser = async ( userLike ) => {

    const user = new User ( userLike );
    
    if ( !user.firstName || !user.lastName )
        throw 'First & LastName is required';
    const userToSave = userModelToLocalhost( user ); //Agregamdo mapper de retorno para enviar al backend
    console.log(userToSave);
    let userUpdated;

    if ( user.id ){
       userUpdated =  await updatedUser(userToSave);
    }else {
        userUpdated = await createUser(userToSave);
    }
    console.log(userUpdated);
    return localhostUserToModel( userUpdated );

}

/**
 * @param { Like<User> } user
 */

export const createUser =  async ( user ) =>{

    const url = `${ import.meta.env.VITE_BASE_URL }/users`
    // configurando objeto para metodo POST en ves del GET
    const res = await fetch( url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {

            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({ newUser });
    return newUser;

}

/**
 * 
 * @param {Like<User>} user 
 * @returns 
 */

export const updatedUser =  async ( user ) =>{

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`
    // configurando objeto para metodo POST en ves del GET
    const res = await fetch( url,{
        method: 'PATCH', // el patch actualiza lo que to le envio, el put actualiza todo el objeto que tenga el id
                        //depende de como esta construido el backend puede ser que solo se use 
        body: JSON.stringify(user),
        headers: {

            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({ updatedUser });
    return updatedUser;

}
