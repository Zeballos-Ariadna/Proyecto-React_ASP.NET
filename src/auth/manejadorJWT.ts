import { claim, respuestaAutenticacion } from "./auth.model";

const llaveToken = "token";
const llaveExpiracion = "token-expiracion"

export function guardarTokenLocalStorage(autenticacion: respuestaAutenticacion) {
    localStorage.setItem(llaveToken, autenticacion.token);
    localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
}

export function obtenerClaims(): claim[]{
    const token = localStorage.getItem(llaveToken);
    
    if(!token){
        return [];
    }

    const expiracion = localStorage.getItem(llaveExpiracion)!;
    const expiracionFecha= new Date(expiracion);

    if(expiracionFecha <= new Date()){//si la fecha actual es mayor al token => expiró token
        logout();//si expiró se elimina del LocalStorage
        return [];
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    const respuesta: claim[] = [];

    for(const propiedad in dataToken){
        respuesta.push({nombre: propiedad,valor: dataToken[propiedad]});
    }

    return respuesta;
}

//Remueve del LocalStorage el token y su tiempo de expiracion
export function logout(){
    localStorage.removeItem(llaveToken);
    localStorage.removeItem(llaveExpiracion);
}