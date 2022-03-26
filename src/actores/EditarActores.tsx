import FormularioActores from "./FormularioActores";

export default function EditarActores(){
    return(
        <>
            <h3>Editar Actor</h3>
            <FormularioActores 
                modelo={{nombre: 'Tom Holland', fechaNacimiento: new Date('1996-06-01T00:00:00')}}
                onSubmit={valores => console.log(valores)}
            />
        </>
    )
}