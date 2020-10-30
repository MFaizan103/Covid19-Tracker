import { Card } from "@material-ui/core";
import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./../../utils";
import "./Map.css";

export const Map = ({ countries,casesType, zoom, center }) => {
  return (
    <Card className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </Card>
  );
};
