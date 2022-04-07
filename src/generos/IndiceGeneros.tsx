import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlGeneros } from "../utils/endpoints";
import { generoDTO } from "./generos.model";

export default function IndiceGeneros(){
    useEffect(() => {
        axios.get(urlGeneros)
            .then((respuesta: AxiosResponse<generoDTO[]>) => {
                console.log(respuesta.data);
            })
    }, [])//arreglo de dependencias vacío
    return(
        <>
            <h3>Indice Géneros</h3>
            <Link to="generos/crear">Crear Género</Link>
            <br></br>
            <Link to="generos/editar">Editar Género</Link>
        </>
        
    )
}