// import { useState, useEffect } from 'react';
// import useGeoLocattion from '.'

// function haversineDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// }

// const useData = (List) => {
//   const myLocation = useGeoLocattion();

//   const [filteredData, setFilteredData] = useState(List.organizations);

//   console.log(myLocation);

//   useEffect(() => {
//     const getData = () => {
//       const data = List.organizations.filter((location) => {
//         const distance = haversineDistance(
//           location.location.latitude,
//           location.location.longitude,
//           myLocation.latitude,
//           myLocation.longitude
//         );
//         return distance <= 50;
//       });
//       setFilteredData(data);
//     };

//     getData();
//   }, [myLocation, List.organizations]);

//   return filteredData;
// };

// export default useData;
