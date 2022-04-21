import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { generoDTO } from "../generos/generos.model";
import Button from "../utils/Button";
import { urlGeneros, urlPeliculas } from "../utils/endpoints";
import ListadoPeliculas from "./ListadoPeliculas";
import { peliculaDTO } from "./peliculas.model";

export default function FiltroPeliculas(){

    const valorInicial: filtroPeliculasForm= {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false, 
        enCines: false,
        pagina: 1,
        recordsPorPagina: 10
    }
    const [generos, setGeneros]= useState<generoDTO[]>([]);
    const [peliculas,setPeliculas]= useState<peliculaDTO[]>([];)

    useEffect(() =>{//Listado de generos que necesitamos en Select
        axios.get(`${urlGeneros}/todos`)
        .then((respuesta: AxiosResponse<generoDTO[]>) => {
            setGeneros(respuesta.data);
        })
    },[])

    useEffect(() => {
        buscarPeliculas(valorInicial);
    },[])

    function buscarPeliculas(valores: filtroPeliculasForm){
        axios.get(`${urlPeliculas}/filtrar`, {params: valores})
        .then((respuesta: AxiosResponse<peliculaDTO[]>) =>{
            setPeliculas(respuesta.data);
        })
    }

    return(
        <>
            <h3>Filtrar Películas</h3>

            <Formik initialValues={valorInicial}
                onSubmit={valores=> buscarPeliculas(valores)}
            >
                {(formikProps)=> (
                    <Form>
                        <div className="form-inline">
                            <div className="form-group mb-2">
                                <label htmlFor="titulo" className="sr-only">Titulo</label>
                                <input type="text" 
                                    className="form-control" id="titulo" 
                                    placeholder="Título de la película"
                                    {...formikProps.getFieldProps('titulo')}
                                />
                            </div>

                            <div className="form-group mx-sm-3 mb-2">
                                <select className="form-control"
                                    {...formikProps.getFieldProps('generoId')}
                                >
                                    <option value="0">--Seleccione un género--</option>
                                    {generos.map(genero => <option key={genero.id} 
                                                                value={genero.id}>{genero.nombre}
                                                            </option>
                                                )}
                                </select>
                            </div>

                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="proximosEstrenos"
                                        name="proximosEstrenos" type="checkbox"
                                />
                                <label className="form-check-label"
                                htmlFor="proximosEstrenos">Próximos Estrenos</label>
                            </div>

                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="enCines"
                                        name="enCines" type="checkbox"
                                />
                                <label className="form-check-label"
                                htmlFor="enCines">En Cines</label>
                            </div>

                            <Button
                                className="btn btn-primary mb-2 mx-sm-3"
                                onClick={() => formikProps.submitForm()}
                            >Filtrar</Button>

                            <Button
                                className="btn btn-danger mb-2"
                                onClick={() => {
                                    formikProps.setValues(valorInicial);
                                    buscarPeliculas(valorInicial)
                                }}
                            >Limpiar</Button>

                        </div>
                    </Form>
                )}
            </Formik>

            <ListadoPeliculas peliculas={peliculas}/>

        </>
        
    )
}

interface filtroPeliculasForm{//Contiene los campos del formulario
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
    pagina: number;
    recordsPorPagina: number;
}