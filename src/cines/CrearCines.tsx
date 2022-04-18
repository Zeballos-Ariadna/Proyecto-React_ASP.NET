import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCines } from "../utils/endpoints";
import MostrarErrorCampo from "../utils/MostrarErrorCampo";
import MostrarErrores from "../utils/MostrarErrores";
import { cineCreacionDTO } from "./cines.model";
import FormulariosCines from "./FormulariosCines";

export default function CrearCines(){

    const history =useHistory();
    const [errores,setErrores]=useState<string[]>([]);

    async function crear(cine: cineCreacionDTO){
        try{
            await axios.post(urlCines, cine);
            history.push('/cines');
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Crear Cine</h3>
            <MostrarErrores errores={errores}/>
            <FormulariosCines 
                modelo={{nombre: ''}}
                onSubmit={async valores => await crear(valores)}
            />
        </>
        
    )
}