import { Link, NavLink } from "react-router-dom";
import Autorizado from "../auth/Autorizado";

export default function Menu(){
    const claseActiva="active";
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" activeClassName={claseActiva} 
                    to="/">React películas
                </NavLink>
                <div className="collapse navbar-collapse" 
                   style={{display: 'flex', justifyContent: 'space-between' }}
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva} to="/peliculas/filtrar">
                                Filtrar Películas
                            </NavLink>
                        </li>

                        <Autorizado role="admin"
                            autorizado={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} to="/generos">
                                            Géneros
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} to="/actores">
                                            Actores
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} to="/cines">
                                            Cines
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} to="/peliculas/crear">
                                            Crear Películas
                                        </NavLink>
                                    </li>
                                </>
                            } 
                        />
                    </ul>
                    
                        <div className="d-flex">
                            <Autorizado 
                                autorizado={<></>}
                                noAutorizado={<>
                                    <Link to="/Registro" className="nav-link btn btn-link">
                                        Registro
                                    </Link>
                                    <Link to="/Login" className="nav-link btn btn-link">
                                        Login
                                    </Link>

                                </>}
                            />
                        </div>
                    
                </div>
            </div>
        </nav>
    )
}