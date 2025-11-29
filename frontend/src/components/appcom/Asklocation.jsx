import { useState } from "react";

export default function Asklocation() {

    const [location, setLocation] = useState(null);

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (err) => {
                console.log(err.message);
            }
        );
    };

    return (
        <main>
            <div className="p-6">
                <button
                    onClick={handleGetLocation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Location
                </button>

                {location && (
                    <p className="mt-3">
                        Latitude: {location.lat}, Longitude: {location.lon}
                    </p>
                )}
            </div>
        </main>
    )
};


// after registering ask for location