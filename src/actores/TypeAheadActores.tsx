import { ReactElement } from "react";
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

    const seleccion: actorPeliculaDTO[] = []

    return(
        <>
            <label>Actores</label>
            <Typeahead 
                id="typeahead"
                onChange={actores =>{
                    if(props.actores.findIndex(x => x.id === actores[0].id) === -1){
                        props.onAdd([...props.actores, actores[0]]);
                    }
                }}
                options={actores}
                labelKey={actor=>actor.nombre}
                filterBy={['nombre']}
                placeholder="Escriba el nombre del actor"
                minLength={2}
                flip={true}
                selected= {seleccion}
                renderMenuItemChildren={actor => (
                    <>
                        <img alt="imagen actor" src={actor.foto} 
                            style={{
                                height: '64px',
                                marginRight: '10px',
                                width: '64px'
                            }}
                        />
                        <span>{actor.nombre}</span>
                    </>
                )}
            />

            <ul className="list-group">
                {props.actores.map(actor => <li 
                    className="list-group-item list-group-item-action"
                    key={actor.id}>
                    {props.listadoUI(actor)}
                    <span className="badge badge-primary badge-pill pointer"
                        style={{marginLeft:'0.5rem'}}
                        onClick={() => props.onRemove(actor)}
                    >
                        X
                    </span>
                </li>)}
            </ul>

        </>
    )
}

interface typeAheadActores{
    actores: actorPeliculaDTO[];
    onAdd(actores: actorPeliculaDTO[]): void;
    listadoUI(actor: actorPeliculaDTO): ReactElement;
    onRemove(actor: actorPeliculaDTO): void;
}