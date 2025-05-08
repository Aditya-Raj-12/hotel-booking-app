import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function HotelDetails({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Sample hotel data with images
  const hotels = [
    { 
      id: 1, 
      name: "Luxury Resort", 
      price: 2000, 
      location: "Bali, Indonesia", 
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "A beautiful resort with private beach access", 
      amenities: ["Pool", "Spa", "Restaurant"] 
    },
    { 
      id: 2, 
      name: "Business Hotel", 
      price: 1200, 
      location: "New Delhi, India",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Perfect for business travelers", 
      amenities: ["WiFi", "Conference Room", "Gym"] 
    },
    { 
      id: 3, 
      name: "Beach Villa", 
      price: 3180, 
      location: "Maldives",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Private villas with ocean view", 
      amenities: ["Private Beach", "Bar", "Water Sports"] 
    }
  ];

  const hotel = hotels.find(h => h.id === parseInt(id));

  const handleBookNow = () => {
    navigate(`/book/${hotel.id}`);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="details-container">
      <button onClick={handleBack} className="button back-button">← Back to Hotels</button>
      <div className="hotel-details">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="hotel-image-large"
        />
        <div className="hotel-info">
          <h2>{hotel.name}</h2>
          <p className="location">{hotel.location}</p>
          <p className="price">₹{hotel.price} per night</p>
          <p className="description">{hotel.description}</p>
          <div className="amenities">
            <h3>Amenities:</h3>
            <ul>
              {hotel.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleBookNow} className="button book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;