import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import MapCard from "./MapCard";
import Loading from "./Loading";
import { useState } from "react";
import { getGenreColour } from "../utils/genreColours";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 55.9533,
  lng: -3.1883,
};

function Map({ events, currentLocation }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Loading />;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      {events.map((event, index) => (
        <Marker
          key={index}
          position={{
            lat: event.venue.position.lat,
            lng: event.venue.position.lon,
          }}
          onClick={() => setSelectedEvent(event)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getGenreColour(event.genre),
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
      ))}
      {currentLocation && (
        <OverlayView
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute w-8 h-8 rounded-full bg-blue-400 opacity-40 animate-ping" />
            <div className="relative z-10 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
          </div>
        </OverlayView>
      )}
      {selectedEvent && (
        <InfoWindow
          position={{
            lat: selectedEvent.venue.position.lat,
            lng: selectedEvent.venue.position.lon,
          }}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <MapCard event={selectedEvent} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;
