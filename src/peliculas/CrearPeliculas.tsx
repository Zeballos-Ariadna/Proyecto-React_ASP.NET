import { generoDTO } from "../generos/generos.model";
import FormularioPeliculas from "./FormularioPeliculas";

export default function CrearPeliculas(){

    const generos: generoDTO[] = [
        {id:1, nombre: 'Acción'},
        {id:2, nombre: 'Drama'},
        {id:3, nombre: 'Comedia'}
    ]

    return(
        <>
            <h3>Crear Película</h3>

            <FormularioPeliculas 
                generosNoSeleccionados={generos}
                generosSeleccionados={[]}
                modelo={{titulo:'', enCines: false, trailer:''}}
                onSubmit={valores => console.log(valores)}
            />
        </>
        
    )
}