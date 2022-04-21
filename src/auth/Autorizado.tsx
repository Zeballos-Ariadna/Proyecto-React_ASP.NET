import { ReactElement, useState } from "react";

export default function Autorizado(props: autorizadoProps){
    const[estaAutorizado, setEstadoAutorizado] =useState(false);
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