import React, { Fragment, useState } from "react";
import {
  MapContainer,
  ScaleControl,
  Popup,
  Marker,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
// import { place } from "../../assets/data/place";
import "./style.css";
import { useSelector } from "react-redux";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import 'mapbox-gl/dist/mapbox-gl.css'


const Map = ({ height }) => {
  // const [map, setMap] = useState(null);
  const place = useSelector((state) => state.places.places?.allPlaces);
  // console.log(place);
  const apiKey =
  "AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn";

  const add_Data = () => {
    
    return (
      <Fragment>
        {place?.map((p) => (
          <Marker
          key={p._id}
            position={[p.lat, p.long]}
            icon={L.divIcon({
              className: "my-div-icon",
              html: `
                <img src="https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png" class="icon-image"/>`,
              // iconSize: [40 , 40 ],
            })}
          >
            <Popup>
              {p.intro}<br></br> {p.address}
            </Popup>
          </Marker>
        ))}
      </Fragment>
    );
  };

  const basemap = [
    ["ArcGIS:Navigation", "Đường phố"],
    ["ArcGIS:Imagery", "Vệ tinh"],
  ];

  function layersControlData() {
    return (
      <Fragment>
        <LayersControl position="topright">
          {basemap.map((b) => (
            <LayersControl.BaseLayer
              key={b}
              name={b[1]}
              checked={b[0] === "ArcGIS:Navigation"}
            >
              <LayerGroup>
                <VectorBasemapLayer apiKey={apiKey} name={b[0]} />
              </LayerGroup>
            </LayersControl.BaseLayer>
          ))}

          <LayersControl.Overlay name="Địa điểm" checked>
            <LayerGroup>{add_Data()}</LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Khác">
            <LayerGroup>{add_Data()}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <ScaleControl position="bottomleft" />
      </Fragment>
    );
}
  return (
    <div style={{height: height }}
    >
      <MapContainer
        center={[10.530582870379785, 105.21931237399188]}
        zoom={10}
        minZoom={6}
        maxZoom={18}
        crollWheelZoom={true}
        maxBounds={L.latLngBounds(
          L.latLng(15.430582870379785, 100.21931237399188),
          L.latLng(5.430582870379785, 115.21931237399188)
        )}
        
      >
        {layersControlData()}
      </MapContainer>
    </div>
  );
};

export { Map };
