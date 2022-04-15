import EditarEntidad from "../utils/EditarEntidad";
import { urlActores } from "../utils/endpoints";
import { actorCreacionDTO, actorDTO } from "./actores.model";
import FormularioActores from "./FormularioActores";

export default function EditarActores(){
    return(
        <>
            <EditarEntidad<actorCreacionDTO, actorDTO>
                url={urlActores} urlIndice= "/actores" nombreEntidad="Actores"
                >
                {(entidad, editar) => 
                    <FormularioActores 
                    modelo={entidad}
                    onSubmit={async valores => await editar(valores)}
                />
                }
            </EditarEntidad>
            
        </>
    )
}