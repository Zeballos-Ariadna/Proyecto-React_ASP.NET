import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import rutas from './route-config';
import Menu from './utils/Menu';
import configurarValidaciones from './validaciones'
import AutenticacionContext from './auth/AutenticacionContext'
import { claim } from './auth/auth.model';

configurarValidaciones();

function App() {
  const [claims,setClaims] = useState<claim[]>([
    {nombre: 'email', valor:'felipe@hotmail.com'},
    //{nombre: 'role', valor:'admin'}

  ]);

  function actualizar(claims: claim[]){
    setClaims(claims);
  }

  return (
    <>
      <BrowserRouter>
        {/*Autenticación en App */}
        <AutenticacionContext.Provider value={{claims,actualizar}}>
          <Menu />
          <div className="container">

            <Switch>
              {rutas.map(ruta => <Route key={ruta.path} 
                path={ruta.path} exact={ruta.exact}>
                  <ruta.componente />
              </Route>)}
            </Switch> 
          </div>
        </AutenticacionContext.Provider>

      </BrowserRouter>
    </>
  );
}

export default App;
