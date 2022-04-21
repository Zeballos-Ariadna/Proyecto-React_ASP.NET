import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlPeliculas } from "../utils/endpoints";
import { convertirPeliculaAFormData } from "../utils/FormDataUtils";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioPeliculas from "./FormularioPeliculas";
import { peliculaCreacionDTO, peliculasPutGetDTO } from "./peliculas.model";

export default function EditarPeliculas(){
    const [pelicula,setPelicula] = useState<peliculaCreacionDTO>();
    const [peliculasPutGet, setPeliculasPutGet] = useState<peliculasPutGetDTO>();

    const {id}: any = useParams();

    const history = useHistory();
    const [errores,setErrores] = useState<string[]>([]);

    useEffect( () => {
        axios.get(`${urlPeliculas}/PutGet/${id}`)
            .then ((respuesta: AxiosResponse<peliculasPutGetDTO>) => {
                const modelo: peliculaCreacionDTO = {
                    titulo: respuesta.data.pelicula.titulo,
                    enCines: respuesta.data.pelicula.enCines,
                    trailer: respuesta.data.pelicula.trailer,
                    posterURL: respuesta.data.pelicula.poster,
                    resumen: respuesta.data.pelicula.resumen,
                    fechaLanzamiento: new Date(respuesta.data.pelicula.fechaLanzamiento)
                };
                setPelicula(modelo);
                setPeliculasPutGet(respuesta.data);

            })
    },[id])//para que el FormularioPeliculas no se cargue cada vez que se renderice

    async function editar(peliculaEditar: peliculaCreacionDTO){
        try{
            const formData = convertirPeliculaAFormData(peliculaEditar);
            await axios({
                method: "put",
                url: `${urlPeliculas}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push(`/pelicula/${id}`)
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Editar Película</h3>
            <MostrarErrores errores={errores} />
            {pelicula && peliculasPutGet ? <FormularioPeliculas 
                actoresSeleccionados={peliculasPutGet.actores}
                cinesSeleccionados={peliculasPutGet.cinesSeleccionados}
                cinesNoSeleccionados={peliculasPutGet.cinesNoSeleccionados}
                generosNoSeleccionados={peliculasPutGet.generosNoSeleccionados}
                generosSeleccionados={peliculasPutGet.generosSeleccionados}
                modelo={pelicula}
                onSubmit={async valores => await editar(valores)}
            />: <Cargando />}
            
        </>
        
    )
}