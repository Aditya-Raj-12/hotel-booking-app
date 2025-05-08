import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const hotels = [
    { id: 1, name: "Luxury Resort", price: 2000, location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Business Hotel", price: 1200, location: "New Delhi, India", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Beach Villa", price: 3180, location: "Maldives", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
  ];

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleHotelClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Our Hotel Booking</h1>
        <button onClick={handleLogout} className="button logout-button">Logout</button>
      </header>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hotels or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="hotel-grid">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card" onClick={() => handleHotelClick(hotel.id)}>
            <img 
        src={hotel.image} 
        alt={hotel.name}
        className="hotel-image"
      />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p className="price">Rs. {hotel.price} per night</p>
              <button className="button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;