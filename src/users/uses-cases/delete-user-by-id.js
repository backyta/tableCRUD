
/**
 * 
 * @param {String|Number} user 
 * @returns 
 */

export const deleteUserById =  async ( id ) =>{

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`
    // configurando objeto para metodo POST en ves del GET
    const res = await fetch( url,{
        method: 'DELETE', // el patch actualiza lo que to le envio, el put actualiza todo el objeto que tenga el id
                        //depende de como esta construido el backend puede ser que solo se use 

    });

    const deleteResult = await res.json();
    console.log({ deleteResult });
    return true;

}
