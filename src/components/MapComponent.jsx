import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import images for marker icons
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon (important for proper display)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// Component to move the map to current location automatically
const LocateMe = ({ setCurrentPosition }) => {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setCurrentPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    });
  }, [map, setCurrentPosition]);

  return null;
};

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Function to handle the manual location click
  const handleLocationClick = () => {
    const map = useMap();
    map.locate().on("locationfound", function (e) {
      setCurrentPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    });
  };

  return (
    <div className="w-full h-[500px] mt-10 rounded-3xl overflow-hidden shadow-lg border-2 border-gray-300">
      <MapContainer
        center={[20.5937, 78.9629]} // Default: India center
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Default View">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution='Tiles © Esri &mdash; Source: Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Show current location marker if available */}
        {currentPosition && (
          <Marker position={currentPosition}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Activate location tracking */}
        <LocateMe setCurrentPosition={setCurrentPosition} />
      </MapContainer>

      {/* Button to trigger location manually */}
      <button
        onClick={handleLocationClick}
        className="absolute top-10 left-10 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md"
      >
        Find My Location
      </button>
    </div>
  );
};

export default MapComponent;
