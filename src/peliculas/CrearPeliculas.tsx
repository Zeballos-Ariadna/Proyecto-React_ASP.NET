import FormularioPeliculas from "./FormularioPeliculas";

export default function CrearPeliculas(){
    return(
        <>
            <h3>Crear Película</h3>

            <FormularioPeliculas 
                modelo={{titulo:'', enCines: false, trailer:''}}
                onSubmit={valores => console.log(valores)}
            />
        </>
        
    )
}