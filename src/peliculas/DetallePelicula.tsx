import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlPeliculas } from "../utils/endpoints";
import { peliculaDTO } from "./peliculas.model";

export default function DetallePelicula(){
    const {id}: any = useParams();//Acceso al id de la peli
    const [pelicula,setPelicula] = useState<peliculaDTO>();

    useEffect(() => {
        axios.get(`${urlPeliculas}/${id}`)
        .then((respuesta: AxiosResponse<peliculaDTO>) => {
            respuesta.data.fechaLanzamiento = new Date(respuesta.data.fechaLanzamiento);
            setPelicula(respuesta.data);//data de la peli
        })
    },[id])//Indica que id es dependencia del useEffect

    function generarURLYoutubeEmbebido(url: any): string {//devuelve un string
        if(!url){
            return '';
        }

        
        var video_id = url.split('v=')[1];
        var posicionAmpersand = video_id.indexOf('&');
        if(posicionAmpersand !== -1){
            video_id = video_id.substring(0, posicionAmpersand);//extrae el id del video
        }
        return `https://www.youtube.com/embed/${video_id}`;
    }

    return(
        pelicula ? 
        <div style={{display: 'flex'}}>
            <div>
                <h2>{pelicula.titulo} ({pelicula.fechaLanzamiento.getFullYear()})</h2>
                {pelicula.generos?.map(genero => 
                    <Link key={genero.id} style={{marginRight:'5px'}}
                    className="btn btn-primary btn-sm rounded-pill" 
                    to={`/peliculas/filtrar?generoId=${genero.id}`}
                    >{genero.nombre}</Link>)
                }
                {pelicula.fechaLanzamiento.toDateString()}

                <div style={{display: 'flex', marginTop: '1rem'}}>
                    <span style={{display:'inline-block', marginRight: '1rem'}}>
                        <img src={pelicula.poster}
                        style={{
                            width: '225px', height: '315px'
                        }}
                        alt="poster"
                        />
                    </span>
                        {pelicula.trailer ? <div>
                            <iframe
                                title="youtube-trailer"
                                width="560"
                                height="315"
                                src={generarURLYoutubeEmbebido(pelicula.trailer)}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >

                            </iframe>
                        </div> : null}
                </div>

            </div>

        </div> : <Cargando />//por si el componente no carga todavía
    )
}