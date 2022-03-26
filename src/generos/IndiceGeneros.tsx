import { Link } from "react-router-dom";

export default function IndiceGeneros(){
    return(
        <>
            <h3>Indice Géneros</h3>
            <Link to="generos/crear">Crear Género</Link>
            <br></br>
            <Link to="generos/editar">Editar Género</Link>
        </>
        
    )
}