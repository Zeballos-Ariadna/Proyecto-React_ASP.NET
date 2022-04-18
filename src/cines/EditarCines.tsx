import EditarEntidad from "../utils/EditarEntidad";
import { urlCines } from "../utils/endpoints";
import { cineCreacionDTO, cineDTO } from "./cines.model";
import FormulariosCines from "./FormulariosCines";

export default function EditarCines(){
    return(
        <>
            <EditarEntidad<cineCreacionDTO, cineDTO>
                url={urlCines} urlIndice= "/cines" nombreEntidad="Cines"
                >
                {(entidad, editar) => 
                    <FormulariosCines modelo={entidad} 
                        onSubmit={async valores=> {
                        await editar(valores)
                        }}
                    />
                }
            </EditarEntidad>
        </>
    )
}