import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import { landigPageDTO } from "./peliculas/peliculas.model";
import { urlPeliculas } from "./utils/endpoints";
import AlertaContext from "./utils/AlertaContext";
import Autorizado from "./auth/Autorizado";

export default function LandingPage(){

    const [peliculas, setPeliculas] = useState <landigPageDTO>({})

    useEffect(() =>{
      cargarDatos();
    },[])

    function cargarDatos(){
      axios.get(urlPeliculas)
          .then((respuesta: AxiosResponse<landigPageDTO>) =>{
            setPeliculas(respuesta.data);
          })
    }

    return(
        <>

          <Autorizado 
            autorizado={<>Estás autorizado</>}
            noAutorizado={<>No estás autorizado</>}
            role="admin"
          />

          <AlertaContext.Provider value={() => cargarDatos()}>
            <h3>En cines</h3>
            <ListadoPeliculas peliculas={peliculas.enCines} />

            <h3>Próximos estrenos</h3>
            <ListadoPeliculas peliculas={peliculas.proximosEstrenos}/>
          </AlertaContext.Provider>
            
        </>
    )
}