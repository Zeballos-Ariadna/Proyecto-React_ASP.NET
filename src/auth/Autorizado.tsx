import { ReactElement, useContext, useEffect, useState } from "react";
import AutenticacionContext from "./AutenticacionContext";

export default function Autorizado(props: autorizadoProps){
    const[estaAutorizado, setEstadoAutorizado] =useState(false);
    const {claims} = useContext(AutenticacionContext);
    
    useEffect(()=>{
        //si hay un rol presente, con claims determinamos dicho rol del usuario
        if(props.role){
            const indice = claims.findIndex(claim => 
                claim.nombre === 'role' && claim.valor === props.role);
            //Si el usuario esta autenticado tiene claims, de lo contrario no esta autenticado
            setEstadoAutorizado(indice > -1);
        }else{ 
            setEstadoAutorizado(claims.length > 0);
        }
    },[claims, props.role])//listado de dependencias Claims

    return(
        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado}
        </>
    )
}

interface autorizadoProps{
    autorizado: ReactElement;
    noAutorizado?: ReactElement;
    role?: string;
}