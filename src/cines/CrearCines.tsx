import FormulariosCines from "./FormulariosCines";

export default function CrearCines(){
    return(
        <>
            <h3>Crear Cine</h3>
            <FormulariosCines 
                modelo={{nombre: ''}}
                onSubmit={valores => console.log(valores)}
            />
        </>
        
    )
}