import React from 'react';
import { claim } from './auth.model';


const AutenticacionContext = React.createContext<{
    claims: claim[];//listado de claims que me va servir para info de usuario
    actualizar(claims: claim[]) : void//actualizar los claims
}>({claims: [], actualizar: ()=> {}});

export default AutenticacionContext;