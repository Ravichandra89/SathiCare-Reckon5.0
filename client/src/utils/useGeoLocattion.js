import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [myLocation, setMyLocation] = useState({});

  const getLocation = async () => {
    const data = await fetch('https://ipapi.co/json');
    const json = await data.json();
    setMyLocation(json);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return myLocation;
};

export default useGeoLocation;
