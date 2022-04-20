import { useEffect, useState } from "react";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import { landigPageDTO } from "./peliculas/peliculas.model";

export default function LandingPage(){

    const [peliculas, setPeliculas] = useState <landigPageDTO>({})

  useEffect(() =>{
    const timerid = setTimeout(() =>{
      setPeliculas({
        enCartelera: [],
      proximosEstrenos:[]
    })
    }, 500)
    return () => clearTimeout(timerid);
  })

    return(
        <>
            <h3>En cartelera</h3>
            <ListadoPeliculas peliculas={peliculas.enCartelera} />

            <h3>Próximos estrenos</h3>
            <ListadoPeliculas peliculas={peliculas.proximosEstrenos}/>
        </>
    )
}