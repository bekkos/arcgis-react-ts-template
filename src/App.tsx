import './App.css'

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config.js"
import { useEffect, useRef, useState } from 'react';

function App() {
  esriConfig.apiKey = ""
  
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [currentMap, setMap] = useState<Map>();
  const [currentView, setView] = useState<MapView>();
  const [layerRef, setLayer] = useState<FeatureLayer>();

  

  useEffect(() => {
    const map = new Map({
      basemap: "arcgis-topographic",
    })
    setMap(map)

    const view = new MapView({
      container: mapRef.current || undefined,
      map: map,
      center: [10.757933, 59.911491],
      zoom: 8,
    })
    setView(view);

    const layer = new FeatureLayer({
      url: "https://services-eu1.arcgis.com/zci5bUiJ8olAal7N/arcgis/rest/services/OSM_Medical_Areas_EU/FeatureServer"
    })

    setLayer(layer);
    map.layers.add(layer);
  }, [])



  const handleClick = () => {
    if(!currentView) return;
    currentView.goTo({center:[10.7522, 59.9139]}, {duration: 5000})
  }

  const handleToggle = () => {
    if(!layerRef) return;
    layerRef.visible = !layerRef.visible;
  }



  return(
    <>
      <div className='vh-100' ref={mapRef}></div>
      <button className='btn btn-dark' onClick={handleClick} style={{"position": "fixed", "top": "50px", "right": "100px"}}>Til Oslo</button>
      <button className='btn btn-dark' onClick={handleToggle} style={{"position": "fixed", "top": "120px", "right": "100px"}}>Toggle</button>
    </>
  )
}

export default App
