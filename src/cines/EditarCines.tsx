import FormulariosCines from "./FormulariosCines";

export default function EditarCines(){
    return(
        <>
            <h3>Editar Cine</h3>
            <FormulariosCines 
                modelo={{nombre: 'Sambil'}}
                onSubmit={valores => console.log(valores)}
            />
        </>
    )
}