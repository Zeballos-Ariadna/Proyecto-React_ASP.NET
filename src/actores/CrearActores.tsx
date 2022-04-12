import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlActores } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import { actorCreacionDTO } from "./actores.model";
import FormularioActores from "./FormularioActores";

export default function CrearActores(){
    const [errores,setErrores] =useState<string[]>([]);
    const history= useHistory();

    async function crear(actor: actorCreacionDTO){
        try{
            await axios.post(urlActores, actor);
            history.push('/actores');
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Crear Actor</h3>
            <MostrarErrores errores={errores} />
            <FormularioActores 
                modelo={{nombre: '', fechaNacimiento: undefined}}
                onSubmit={async valores => await crear(valores)}
            />
        </>
        
    )
}