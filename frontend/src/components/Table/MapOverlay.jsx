import React, { useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import { useState, useMemo, useCallback } from "react";


function DraggableMarker({ center, onPositionChange}) {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          onPositionChange(newPosition); // Call the callback function
        }
      },
    }),
    [onPositionChange]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={
        L.icon({ iconUrl: "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png", iconSize: [40, 40] })
      }
    >
      <Tooltip direction="top" opacity={1} permanent>
        {position.lat.toString().slice(0, 9)}, {position.lng.toString().slice(0, 9)}
      </Tooltip>
    </Marker>
  );
}

const MapOverlay = ({LAT, LNG, onPositionChange}) =>  {
  
  const op = useRef(null);
  const apiKey =
    "AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn";
  const position = [10.530582870379785, 105.21931237399188];
  const [markerPosition, setMarkerPosition] = useState([LAT, LNG]);

  const handleMarkerPositionChange = useCallback((newPosition) => {
    setMarkerPosition(newPosition); // Cập nhật trạng thái của vị trí marker khi nó thay đổi
    onPositionChange(newPosition); // Gọi hàm callback
  }, [onPositionChange]);
  function LegendControl({ map }) {
    useEffect(() => {
      if (!map) return;
  
      const legend = L.control({ position: 'bottomleft' });
  
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += `<strong style="padding: .3rem;background-color: #007bff;border-radius: 10px;color: white;">Kéo thả để thay đổi vị trí</strong> `;
        return div;
      };
  
      legend.addTo(map);

      const legend2 = L.control({ position: 'topright' });
  
      legend2.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += `<div style="padding-top: .3rem; color: blue">${markerPosition}</div>`;
        return div;
      };
  
      legend2.addTo(map);
  
      return () => {
        map.removeControl(legend);
        map.removeControl(legend2);
      };
    }, [map]);
  
    return null;
  }
  const MapInstance = () => {
    const map = useMap();
    return <LegendControl map={map} />;
  };
  return (
    <div className="">
      <Button
        type="button"
        icon="pi pi-map"
        label="Chọn trên bản đồ"
        onClick={(e) => op.current.toggle(e)}
        className="p-button-primary m-2 h-4rem"
      />
      <OverlayPanel
        ref={op}
        style={{ height: "300px", width: "400px" }}
        showCloseIcon
      >
        {/*  */}
        <div style={{ height: 'calc(300px - 2.5rem)' }}>
          <MapContainer
            center={[10.530582870379785, 105.21931237399188]}
            zoom={8}
            minZoom={8}
            maxZoom={14}
            crollWheelZoom={true}
            maxBounds={L.latLngBounds(
              L.latLng(15.430582870379785, 100.21931237399188),
              L.latLng(5.430582870379785, 115.21931237399188)
            )}
          >
            <VectorBasemapLayer apiKey={apiKey} name="ArcGIS:Navigation" />
            <DraggableMarker
              center={{
                lat: LAT,
                lng: LNG,
              }}
              onPositionChange={handleMarkerPositionChange}
            />
            <MapInstance />
          </MapContainer>
        </div>
      </OverlayPanel>
    </div>
  );
}

export default MapOverlay;