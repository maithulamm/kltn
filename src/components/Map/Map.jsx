import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BasemapLayer, FeatureLayer } from "react-esri-leaflet";
import "leaflet/dist/leaflet.css"
import L from "leaflet";

import './style.css';

export const Map = () => {

    return (
        <section className="Map">
            <MapContainer
                center={[10.430582870379785, 105.21931237399188]}
                zoom={10}
                crollWheelZoom={true}
                maxBounds={L.latLngBounds(L.latLng(15.430582870379785, 100.21931237399188), L.latLng(5.430582870379785, 115.21931237399188))}
            >
                <BasemapLayer name="Topographic" />
            </MapContainer>
        </section>
    );
};