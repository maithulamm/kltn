import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BasemapLayer, FeatureLayer } from "react-esri-leaflet";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

import './style.css';

export function Map({ whtl }) {
    return (
        <section className="Main__map" style={{ width: whtl[0], height: whtl[1], top: whtl[2], left: whtl[3] }}>
            <MapContainer
                center={[10.430582870379785, 105.21931237399188]}
                zoom={10}
                crollWheelZoom={true}
                maxBounds={L.latLngBounds(L.latLng(15.430582870379785, 100.21931237399188), L.latLng(5.430582870379785, 115.21931237399188))}
            >
                <VectorBasemapLayer
                    //url="https://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json"
                    apiKey="AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn"
                    name="ArcGIS:StreetsRelief"
                />
            </MapContainer>

        </section>
    );
};