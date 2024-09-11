import './App.css';
import {MapContainer, Marker, Tooltip, Popup, TileLayer, Circle} from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import LibraryData from "../src/libraryData.json.json"
import { useEffect, useState } from 'react';
import Footer from './Footer';



function App() {

  const [searchQuery, setSearchQuery] = useState('')
  
  const fetchedLibrary = () => {
   if(searchQuery) {
    return LibraryData.filter(data => data.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
     )
   }
  return LibraryData;
 }

 useEffect(()=>{
  fetchedLibrary()
 }, [searchQuery])


const getOpacityByPopulation = (population) => {
  const minPopulation = 1000;   // Example minimum population
  const maxPopulation = 12000000; // Example maximum population
  return (population - minPopulation) / (maxPopulation - minPopulation) * 0.9 + 0.1;
};



const customIcon = L.icon({
  iconUrl: 'https://i0.wp.com/bhumkalsamachar.com/wp-content/uploads/2019/03/Inquilab-Zindabad-1.png?ssl=1',
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 38], // Point where the icon should anchor (coordinates for centering the icon)
  popupAnchor: [0, -38], // Position of the popup relative to the icon
});

  

  return (
    <div className=''>
<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search for a particular library'>
</input>

   
    <div>
      <MapContainer center={[23.5, 88.67]} zoom={4.8} style={{width: "100vw" , zIndex: 10}}>
      <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
       {fetchedLibrary().map((lib)=> (
          <Circle center={[lib.lat ,lib.long]} radius={lib.radius || 10000} opacity={getOpacityByPopulation(lib.population)} fillColor="blue" color="transparent" bindlabel={"test"}>
           <Tooltip>Population Size : {lib.population}</Tooltip> 
        
        <Marker position={[lib.lat ,lib.long]} icon={customIcon}>

        <Popup><h4>{lib.name}</h4>
          {lib.address}
          <p>Contact Email : {lib.contact_email}</p>
        </Popup>
      </Marker>
      </Circle>
       ))}
        
      </MapContainer>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
