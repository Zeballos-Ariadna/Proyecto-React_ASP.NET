import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import Button from "../utils/Button";
import { coordenadaDTO } from "../utils/coordenadas.model";
import FormGroupText from "../utils/FormGroupText";
import MapaFormulario from "../utils/MapaFormulario";
import { cineCreacionDTO } from "./cines.model";

export default function FormulariosCines(props: formulariosCinesProps){
    
    function transformarCoordenadas(): coordenadaDTO[] | undefined { 
        if(props.modelo.latitud && props.modelo.longitud){
            const respuesta: coordenadaDTO = {lat: props.modelo.latitud, 
                lng: props.modelo.longitud}
            return [respuesta];
        }

        return undefined;
    }
    
    return(
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre: Yup.string().required('Este campo es obligatorio').primeraLetraMayuscula()
            })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText label="Nombre" campo="nombre" />

                    <div style={{marginBottom: '1rem'}}>
                        <MapaFormulario campoLat="latitud" campoLng="longitud" 
                            coordenadas={transformarCoordenadas()}
                        />
                    </div>

                    <Button disabled={formikProps.isSubmitting} type="submit">Salvar</Button>
                    <Link className="btn btn-secondary" to="/cines">Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface formulariosCinesProps{
    modelo: cineCreacionDTO;
    onSubmit(valores: cineCreacionDTO, acciones: FormikHelpers<cineCreacionDTO>): void;
}