import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { coordenadaDTO } from './coordenadas.model';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]//para colocar el marcador cuando hacemos click en el mapa
})

L.Marker.prototype.options.icon=DefaultIcon;

export default function Mapa(props: mapaProps){
    const[coordenadas,setCoordenadas] = useState<coordenadaDTO[]>(props.coordenadas)
    return(
        <MapContainer
            center={[18.467455, -69.931242]} zoom={14}
            style={{height: props.height}}
        >

            <TileLayer attribution="React peliculas" 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/*Permite clickear en el mapa */}
            {props.soloLectura ? null: <ClickMapa setPunto={coordenadas =>{
                setCoordenadas([coordenadas]);
                props.manejarClickMapa(coordenadas);
            }} />}

            {coordenadas.map(coordenada =><Marcador key={coordenada.lat + coordenada.lng} 
                {...coordenada}
            />)}
        </MapContainer>
    )
}

function ClickMapa(props: clickMapaProps){
    useMapEvent('click', e =>{
        props.setPunto({lat: e.latlng.lat, lng: e.latlng.lng})
    })
    return null;
}

interface clickMapaProps{
    setPunto(coordenadas: coordenadaDTO): void;

}

function Marcador(props: coordenadaDTO){
    return(
        <Marker position={[props.lat, props.lng]}>
            {props.nombre ? <Popup>
                {props.nombre}
            </Popup>:null}{/*Si no existe, null */}
        </Marker>

    )
}

interface mapaProps{
    height: string;
    coordenadas: coordenadaDTO[];
    manejarClickMapa(coordenadas: coordenadaDTO): void;
    soloLectura: boolean;
}

Mapa.defaultProps = {
    height: '500px',
    soloLectura: false,
    manejarClickMapa: () => {}
}