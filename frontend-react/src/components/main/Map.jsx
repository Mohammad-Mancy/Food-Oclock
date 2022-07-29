import React,{useState,useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import '../../App.css';
import { reactLocalStorage } from 'reactjs-localstorage';


const Map = ({latLngg,display}) => {

    let latCoordinate = reactLocalStorage.get("lat-coordinates");
    let lngCoordinate = reactLocalStorage.get("lng-coordinates");

    let latMarker = parseFloat(latCoordinate);
    let lngMarker = parseFloat(lngCoordinate);
    const [lat, setLat] = useState(33.884211);
    const [lag, setLag] = useState(35.492409);
   
    const [position, setPosition] = useState(null);

    // Events
    const HandleClickMap = () =>{
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng);
                map.flyTo(e.latlng);
                try{
                    console.log(position.lat);
                    console.log(position.lng);
                    reactLocalStorage.set("coordinateLat", position.lat);
                    reactLocalStorage.set("coordinateLng", position.lng);
                }catch(res){
                    console.log("Click");
                }  
            }
        })
        return position == null
        ? null 
        : <Marker position={position}></Marker>;
    };
    
    
  return (
    <div>
            {!latLngg && display?
            <MapContainer center={[latMarker, lngMarker]} zoom={13}  scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latMarker,lngMarker]}>
                </Marker>    
            </MapContainer> 
            :
            !latLngg?
            <MapContainer center={[latMarker, lngMarker]} zoom={13}  scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latMarker,lngMarker]}>
                    <Popup>
                        your current location
                    </Popup>
                    <HandleClickMap/>
                </Marker>    
            </MapContainer> 
            :
            <MapContainer center={[lat, lag]} zoom={13}  scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {latLngg?<HandleClickMap/>:""}
            </MapContainer> 
            }
    </div>
  )
}

export default Map
