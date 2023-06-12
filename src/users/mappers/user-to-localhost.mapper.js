
//* Tengo una instancia de mi clase y la voy a convertir a los que es pero mi backend

/**
 * 
 * @param {User} user 
 */

export const userModelToLocalhost = ( user ) => {

    const {

        avatar,
        balance,
        gender,
        firstName,
        id,
        isActive,
        lastName,

    } = user;


    return { 

        avatar,
        balance,
        gender,
        first_name: firstName,
        id,
        isActive,
        last_name: lastName,

     }



}