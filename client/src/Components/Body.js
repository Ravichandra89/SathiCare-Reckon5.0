import HomeLayout from '../Layout/HomeLayout';
import useData from '../utils/useData';
import useGeoLocattion from '../utils/useGeoLocattion';
import MapTrackingComponent from './MapTrackingComponent';

const List = {
  organizations: [
    {
      id: '1',
      name: 'Animal Aid Unlimited',
      type: 'NGO',
      location: {
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        address: '123 Main Street, Jaipur, Rajasthan 302001',
        latitude: 26.915465, // Placeholder coordinates, replace with actual ones
        longitude: 75.785485, // Placeholder coordinates, replace with actual ones
      },
      contact: {
        phone: '+91 141 555 1234',
        email: 'info@animalaidunlimited.org',
        website: 'https://animalaidunlimited.org',
      },
      services: ['Rescue', 'Medical care', 'Rehabilitation', 'Education'],
    },
    {
      id: 'animals-home-society',
      name: 'Animals Home Society / Kutte ka Badda',
      type: 'NGO',
      location: {
        city: 'Jodhpur',
        state: 'Rajasthan',
        country: 'India',
        address: 'Soorsagar Rd, behind Ramdeo Petrol Pump, Kabir Nagar, Jodhpur, Rajasthan 342001',
        latitude: 26.254689, // Placeholder coordinates, replace with actual ones
        longitude: 73.024546, // Placeholder coordinates, replace with actual ones
      },
      contact: {},
      services: ['Rescue'],
    },
    {
      id: 'wildlife-rescue-jodhpur',
      name: 'वन्यजीव बचाव एवं पुनर्वास केंद्र जोधपुर',
      type: 'NGO',
      location: {
        city: 'Jodhpur',
        state: 'Rajasthan',
        country: 'India',
        address: 'Kailana Lake Road, opposite Hotel Lake View & Resort, Jodhpur, Rajasthan 342008',
        latitude: 26.265412, // Placeholder coordinates, replace with actual ones
        longitude: 73.035298, // Placeholder coordinates, replace with actual ones
      },
      contact: {},
      services: ['Rescue'],
    },
    {
      id: 'asia-wildlife-alliance',
      name: 'ASIA WILDLIFE ALLIANCE',
      type: 'NGO',
      location: {
        city: 'Jodhpur',
        state: 'Rajasthan',
        country: 'India',
        address: '6 H 323 KBHB, Choudhary Colony, Basni, Jodhpur, Rajasthan 342005',
        latitude: 26.251548, // Placeholder coordinates, replace with actual ones
        longitude: 73.015469, // Placeholder coordinates, replace with actual ones
      },
      contact: {
        website: 'http://asiawildlifealliance.com/',
      },
      services: ['Rescue'],
    },
    {
      id: 'asia-wildlife-alliance_1',
      name: 'ASIA WILDLIFE ALLIANCE',
      type: 'NGO',
      location: {
        city: 'Jodhpur',
        state: 'Rajasthan',
        country: 'India',
        address: '6 H 323 KBHB, Choudhary Colony, Basni, Jodhpur, Rajasthan 342005',
        latitude: 26.28005, // Placeholder coordinates, replace with actual ones
        longitude: 72.98596, // Placeholder coordinates, replace with actual ones
      },
      contact: {
        website: 'http://asiawildlifealliance.com/',
      },
      services: ['Rescue'],
    },
  ],
};

const Body = () => {
  return (
    <HomeLayout>
      {/* <div className="flex items-center justify-center">
        <h1 className="text-5xl text-white">
          <span>SwiftRescue</span>: Bridging Compassion and Action for Injured Animals
        </h1>
      </div> */}
    </HomeLayout>
  );
};

export default Body;

// const filteredData = useData(List);
//   const location = useGeoLocattion();
//   <p>useLocation</p>
//         <MapTrackingComponent latitude={location.latitude} longitude={location.longitude} list={filteredData} />
