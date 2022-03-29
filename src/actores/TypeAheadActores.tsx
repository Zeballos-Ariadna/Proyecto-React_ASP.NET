import { Typeahead } from "react-bootstrap-typeahead";
import { actorPeliculaDTO } from "./actores.model";

export default function TypeAheadActores(props: typeAheadActores){
    
    const actores: actorPeliculaDTO[] = [
        {
            id:1, nombre: 'Tom Holland', personaje:'Spider-Man', 
            foto:'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tom_Holland_by_Gage_Skidmore.jpg'
        },
        {
            id:2, nombre: 'Fernando',personaje: '',
            foto: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg'
        },
        {
            id:3, nombre: 'Mariano',personaje: '',
            foto: 'https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg'
        }
    ];

    return(
        <>
            <label>Actores</label>
            <Typeahead 
                id="typeahead"
                onChange={actor =>{
                    console.log(actor);
                }}
                options={actores}
                labelKey={actor=>actor.nombre}
                filterBy={['nombre']}
                placeholder="Escriba el nombre del actor"
                minLength={2}
                flip={true}
            />
        </>
    )
}

interface typeAheadActores{
    actores: actorPeliculaDTO[];
}