import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { urlGeneros } from "../utils/endpoints";
import ListadoGenerico from "../utils/ListadoGenerico";
import Paginacion from "../utils/Paginacion";
import { generoDTO } from "./generos.model";
import confirmar from './../utils/Confirmar';

export default function IndiceGeneros(){

    const[generos, setGeneros]= useState<generoDTO[]>();
    const [totalDePaginas, setTotalDePaginas]= useState(0);
    const [recordsPorPagina,setRecordsPorPagina]= useState(10);
    const [pagina, setPagina]= useState(1);


    useEffect(() => {
        cargarDatos();
    }, [pagina, recordsPorPagina])//arreglo de dependencias vacío
    
    function cargarDatos(){
        axios.get(urlGeneros, {
            params: {pagina, recordsPorPagina}
        })
            .then((respuesta: AxiosResponse<generoDTO[]>) => {
                const totalDeregistros= 
                parseInt(respuesta.headers['cantidadtotalregistros'],10);
                setTotalDePaginas(Math.ceil(totalDeregistros/recordsPorPagina));
                console.log(respuesta.data);
                setGeneros(respuesta.data);
            })
    }

    async function borrar(id: number){
        try{
            await axios.delete(`${urlGeneros}/${id}`)
            cargarDatos();
        }
        catch(error){
            console.log(error.response.data);
        }
    }
    
    return(
        <>
            <h3>Indice Géneros</h3>
            <Link className="btn btn-primary" to="generos/crear">Crear Género</Link>

            <div className="form-group" style={{width: '150px'}}>
                <label>Registros por páginas:</label>
                <select 
                    className="form-control"
                    defaultValue={10}
                    onChange={e => {
                    setPagina(1);
                    setRecordsPorPagina(parseInt(e.currentTarget.value,10))
                    }}> 
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Paginacion cantidadTotalDePaginas={totalDePaginas}
            paginaActual={pagina} onChange={nuevaPagina => setPagina(nuevaPagina)}/>

            <ListadoGenerico listado={generos}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generos?.map(genero => 
                        <tr key = {genero.id}>
                            <td>
                                <Link className="btn btn-success" to={`/generos/editar/${genero.id}`}>
                                    Editar
                                </Link>
                                <Button onClick={() => confirmar(() => borrar(genero.id)) }
                                className= "btn btn-danger"
                                >Borrar</Button>

                            </td>
                            <td>
                                {genero.nombre}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </ListadoGenerico>

            <br></br>
            <Link to="generos/editar">Editar Género</Link>
        </>
        
    )
}