import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTicket } from '../Redux/Slices/ticketSlice';
import HomeLayout from '../Layout/HomeLayout';
import Header from '../Components/Header';
import Card from '../Components/Card';
import useGeoLocation from '../utils/useGeoLocattion';
import { Link } from 'react-router-dom';
import TicketDescription from './TicketDescription';
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

const handleFilter = (myLocation, ticketList, maxDistance, status) => {
  const filtered = ticketList.filter((ticket) => {
    const distance = calculateDistance(myLocation.latitude, myLocation.longitude, ticket.latitude, ticket.longitude);
    const withinRange = maxDistance === '' || distance <= parseInt(maxDistance);
    const matchingStatus = ticket.status.toLowerCase() === status.toLowerCase();
    return matchingStatus && withinRange;
  });
  return filtered;
};

const TicketPage = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector((store) => store.ticketSlice.ticketList);
  const myLocation = useGeoLocation();

  useEffect(() => {
    dispatch(getAllTicket());
  }, []);

  // mandatory
  useEffect(() => {
    setFilteredTickets(ticketList);
  }, [ticketList]);

  const [city, setCity] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [status, setStatus] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(ticketList);

  return (
    <HomeLayout>
      <div className="flex flex-col">
        <Header />
        <div className="flex justify-center items-center px-4 gap-2 h-8">
          <h1 className="text-lg">Filter result :</h1>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-36 md:w-auto"
          />
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="select select-bordered w-36 md:w-auto"
          >
            <option value="">Select max distance (km)</option>
            <option value="10">Within 10 km</option>
            <option value="20">Within 20 km</option>
            <option value="30">Within 30 km</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-36 md:w-auto"
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = handleFilter(myLocation, ticketList, maxDistance, status);
              console.log(data);
              setFilteredTickets(data);
            }}
          >
            Apply Filters
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-start mt-4">
          {filteredTickets.map((ticket) => (
            <Link to={`/card?v=${ticket._id}`}>
              <Card key={ticket._id} ticket={ticket} />
            </Link>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default TicketPage;
