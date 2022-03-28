import { Form, Formik, FormikHelpers } from "formik";
import { peliculaCreacionDTO } from "./peliculas.model";
import * as Yup from 'yup';
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function FormularioPeliculas(props: formularioPeliculasProps){
    return(
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                titulo: Yup.string().required('Este campo es obligatorio').primeraLetraMayuscula()
            })}
        >
            {formikProps => (
                <Form>
                    <FormGroupText label="Título" campo="titulo" />
                    <FormGroupCheckbox label="En cines" campo="enCines" />
                    <FormGroupText label="Trailer" campo="trailer" />
                    <FormGroupFecha campo="fechaLanzamiento" label="Fecha Lanzamiento"/>
                    <FormGroupImagen campo="poster" label="Poster"
                    imagenURL={props.modelo.posterURL}/>

                    <Button disabled={formikProps.isSubmitting} type="submit" >Enviar</Button> 
                    <Link className="btn btn-secondary" to="/" >Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface formularioPeliculasProps{
    modelo: peliculaCreacionDTO;
    onSubmit(valores: peliculaCreacionDTO, acciones: FormikHelpers<peliculaCreacionDTO>): void;
}