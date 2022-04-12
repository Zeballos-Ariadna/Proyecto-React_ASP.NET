export default function MostrarErrores(props: mostrarErroresProps){
    const style={color : 'red'}
    return(
        <>
            {props.errores ? <ul style={style}>
                {console.log("Errores: ",props.errores)}
                {props.errores.map((error, indice) => 
                <li key={indice}>{error}</li>)}
            </ul> : null}
        </>
    )
}

interface mostrarErroresProps{
    errores?: string[];
}