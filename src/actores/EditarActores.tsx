import FormularioActores from "./FormularioActores";

export default function EditarActores(){
    return(
        <>
            <h3>Editar Actor</h3>
            <FormularioActores 
                modelo={{nombre: 'Tom Holland', 
                        biografia: `# tom 
                        Ha nacido **tom**` ,
                        fechaNacimiento: new Date('1996-06-01T00:00:00'),
                        fotoURL: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tom_Holland_by_Gage_Skidmore.jpg'
                }}
                onSubmit={valores => console.log(valores)}
            />
        </>
    )
}