import React, { useState, useEffect, useRef } from 'react';

const MapTrackingComponent = ({ longitude, latitude, list }) => {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  const addMarker = (position, label) => {
    if (map && isMapLoaded) {
      const marker = new window.mappls.Marker(position, { label });
      map.addMarker(marker);
    }
  };

  const initializeMap = () => {
    const mapObject = new window.mappls.Map(mapContainerRef.current);
    setMap(mapObject);

    mapObject.on('load', () => {
      setIsMapLoaded(true);
      addMarker([latitude, longitude], 'You');
      list.forEach((point) => {
        addMarker([point.latitude, point.longitude], `Point ${point.name}`);
      });
    });
  };

  useEffect(() => {
    window.initMap = initializeMap;

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/6fed46e9f78796c089eacb966347836a/map_sdk?layer=vector&v=3.0&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, [latitude, longitude, list]);

  return (
    <div ref={mapContainerRef} id="map" style={{ height: '400px' }}>
      {!isMapLoaded && <p>Loading map...</p>}
      {/* Map will be rendered here */}
    </div>
  );
};

export default MapTrackingComponent;
