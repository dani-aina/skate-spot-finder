import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "300px" };
const sydneyCenter = { lat: -33.8688, lng: 151.2093 };

function LocationPicker({ location, onSelectLocation }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  function handleMapClick(event) {
    onSelectLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={location || sydneyCenter}
      zoom={13}
      onClick={handleMapClick}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
}

export default LocationPicker;
