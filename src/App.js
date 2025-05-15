// src/App.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
    const [vehicles, setVehicles] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch vehicle locations
        fetch('https://yxnqsooy4j.execute-api.us-east-2.amazonaws.com/prod/gps')
            .then((res) => res.json())
            .then((data) => setVehicles(data))
            .catch((error) => console.error('Error fetching vehicle data:', error));

        // Fetch video files
        fetch('https://yxnqsooy4j.execute-api.us-east-2.amazonaws.com/prod/videos?vehicleId=vehicle001')
            .then((res) => res.json())
            .then((data) => setVideos(data))
            .catch((error) => console.error('Error fetching video data:', error));
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            {/* Vehicle Map Section */}
            <div className="w-full md:w-2/3 h-[500px] bg-gray-100">
                <MapContainer center={[34.0522, -118.2437]} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {vehicles.map((vehicle) => (
                        <Marker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]}>
                            <Popup>
                                <div>
                                    <h2>{vehicle.name}</h2>
                                    <button
                                        onClick={() => alert(`View camera footage for ${vehicle.name}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View Camera Footage
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Camera Section */}
            <div className="w-full md:w-1/3 h-[500px] overflow-y-scroll bg-gray-50 p-4">
                <h2 className="text-lg font-bold mb-4">Camera Footage</h2>
                {videos.map((video) => (
                    <div key={video.name} className="mb-4">
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            {video.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
