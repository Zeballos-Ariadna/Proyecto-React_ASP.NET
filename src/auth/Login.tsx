import axios from "axios";
import { useState } from "react";
import { urlCuentas } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import { credencialesUsuarios, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";

export default function Login(){

    const [errores,setErrores] = useState<string[]>([])

    async function login(credenciales: credencialesUsuarios){
        try{
            const respuesta= await axios.post<respuestaAutenticacion>(`${urlCuentas}/login`, credenciales); 
            console.log(respuesta);
        }catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Login</h3>
            <MostrarErrores errores={errores}/>
            <FormularioAuth 
                modelo={{email: '', password: ''}}
                onSubmit={async valores => await login(valores)}
            />
        </>
        
    )
}