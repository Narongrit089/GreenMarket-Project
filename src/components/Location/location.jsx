import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch data from your API when the component mounts and whenever the component is navigated back to
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/GreenMarket/get_location.php"
        );
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount and not on subsequent updates

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5 relative text-green-600">
        <span className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-600"></span>
        Shop <span className="text-black">Location</span>
        <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-green-600"></span>
      </h2>

      <LoadScript googleMapsApiKey="AIzaSyCejGvT7sqhBdIScABKrWHhgBAQAjp3ueo">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "564px" }}
          zoom={12}
          center={{ lat: 19.973, lng: 99.846 }} // Default center position (Bangkok)
        >
          {locations.map((location) => (
            <Marker
              key={location.codeLo}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              onClick={() => setSelectedLocation(location)}
            />
          ))}

          {/* InfoWindow to display location details when a marker is clicked */}
          {selectedLocation && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedLocation.latitude),
                lng: parseFloat(selectedLocation.longitude),
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {selectedLocation.nameLo}
                </h3>
                <p className="text-sm">{selectedLocation.details}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Location;
