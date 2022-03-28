import FormulariosCines from "./FormulariosCines";

export default function EditarCines(){
    return(
        <>
            <h3>Editar Cine</h3>
            <FormulariosCines 
                modelo={{nombre: 'Sambil', latitud:18.471210,longitud:-69.933270}}
                onSubmit={valores => console.log(valores)}
            />
        </>
    )
}