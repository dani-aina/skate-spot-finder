import { useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "100%" };
const sydneyCenter = { lat: -33.8688, lng: 151.2093 };

function SpotMap({ spots = [], selectedSpot, onSelectSpot }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedSpot) return;

    const [lng, lat] = selectedSpot.location.coordinates;
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, [selectedSpot]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={sydneyCenter}
      zoom={13}
      onLoad={handleMapLoad}
    >
      {spots.map((spot) => (
        <Marker
          key={spot._id}
          position={{
            lat: spot.location.coordinates[1],
            lng: spot.location.coordinates[0],
          }}
          title={spot.name}
          onClick={() => onSelectSpot?.(spot._id)}
        />
      ))}
    </GoogleMap>
  );
}

export default SpotMap;
