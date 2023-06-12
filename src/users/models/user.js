
//* Nuestro objeto del usuario que vamos a manjear en la app, tmb podria ser como una representasion de un
//* usuario en la BBDD 
//* Es la data que necesito para trebajar no es lo que viene en el backend





export class User{
    //* La idea es que2 el constructor reciba la data mas o menos como nostos la estamos esperando.

    //* Se desestructura de un objeto que luce mas o menos a un usuario, de esta manera se crea la instancia.
    //* voy a llamar a mandar al contructo del usuario y le voy a mandar un objeto que tiene que tener esas propiedades
    //* y ahi las establesco, se puede colocar valores por defecto.

    //* Obviamente al tener la desestrucutracion con nombres properties diferentes no hara match con los 
    //* usuario que manda el backend, para esto usamos los MAPPERS.
    
    //* La idea del MAPPER es que sea un ente intermedio que me sirva as mi para saber como viene la data de mi
    //* backend y generar una instancia basada en lo que yo necesito, esto es util porque si despies nos
    //* conectamos a otro backend que etsba en produccion y este es diferente ala que estaba en desarrollo
    //* usualmente pasa, entonces lo unico que deberiamos crearnos es un nuevo MAPPER, que se va adaptar
    //* a la data como venga de ese backedn o servidor y se adapta exanctamente a como necesito mi objeto
    //* en mi app. 

    /**
     * 
     * @param {Like<User>} userDataLike 
     */

    constructor({id, isActive, balance, avatar, firstName, lastName, gender}) {

        this.id         = id;
        this.isActive   = isActive;
        this.balance    = balance;
        this.avatar     = avatar;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.gender     = gender;

    }


}
