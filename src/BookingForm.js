import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './App.css';

function BookingForm() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [roomType, setRoomType] = useState('standard');
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomTypes = [
    { id: 'standard', name: 'Standard Room', price: 2000 },
    { id: 'deluxe', name: 'Deluxe Room', price: 3500 },
    { id: 'suite', name: 'Suite', price: 5000 }
  ];

  const calculateNights = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleGuestChange = (type, value) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, value)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const nights = calculateNights();
    const selectedRoom = roomTypes.find(room => room.id === roomType);
    
    if (nights === 0) {
      alert('Please select valid dates');
      setIsSubmitting(false);
      return;
    }

    if (!userDetails.fullName || !userDetails.email || !userDetails.phone) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      ...userDetails,
      roomType: selectedRoom.name,
      checkIn: startDate.toISOString().split('T')[0],
      checkOut: endDate.toISOString().split('T')[0],
      nights,
      adults: guests.adults,
      children: guests.children,
      totalPrice: nights * selectedRoom.price
    };

    try {
      // In a real app, you would call your backend API here
      // This is a mock implementation
      console.log('Booking data:', bookingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock email sending
      alert(`Booking confirmed!\n\nA receipt has been sent to ${userDetails.email}\n\nCheck your email for booking details.`);
      
      navigate('/home');
    } catch (error) {
      alert('Error processing booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Complete Your Booking</h2>
      <form onSubmit={handleSubmit}>
        {/* User Details Section */}
        <div className="form-section">
          <h3>Your Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <input
                type="text"
                name="specialRequests"
                value={userDetails.specialRequests}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="form-section">
          <h3>Booking Details</h3>
          
          {/* Date Picker */}
          <div className="form-group">
            <label>Select Dates *</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              minDate={new Date()}
              monthsShown={2}
              inline
            />
            {startDate && endDate && (
              <p className="nights-count">
                {calculateNights()} night{calculateNights() !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Room Selection */}
          <div className="form-group">
            <label>Room Type *</label>
            <div className="room-options">
              {roomTypes.map(room => (
                <div 
                  key={room.id} 
                  className={`room-card ${roomType === room.id ? 'selected' : ''}`}
                  onClick={() => setRoomType(room.id)}
                >
                  <h4>{room.name}</h4>
                  <p>₹{room.price}/night</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Selection */}
          <div className="form-group">
            <label>Guests *</label>
            <div className="guest-selector">
              <div className="guest-type">
                <span>Adults:</span>
                <div className="counter">
                  <button 
                    type="button" 
                    onClick={() => handleGuestChange('adults', guests.adults - 1)}
                    disabled={guests.adults <= 1}
                  >
                    -
                  </button>
                  <span>{guests.adults}</span>
                  <button 
                    type="button" 
                    onClick={() => handleGuestChange('adults', guests.adults + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest-type">
                <span>Children:</span>
                <div className="counter">
                  <button 
                    type="button" 
                    onClick={() => handleGuestChange('children', guests.children - 1)}
                    disabled={guests.children <= 0}
                  >
                    -
                  </button>
                  <span>{guests.children}</span>
                  <button 
                    type="button" 
                    onClick={() => handleGuestChange('children', guests.children + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <h3>Booking Summary</h3>
          {startDate && endDate && (
            <div className="summary-details">
              <p>
                <span>Dates:</span> 
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </p>
              <p><span>Nights:</span> {calculateNights()}</p>
              <p><span>Room:</span> {roomTypes.find(r => r.id === roomType).name}</p>
              <p><span>Guests:</span> {guests.adults} adult{guests.adults !== 1 ? 's' : ''}, {guests.children} child{guests.children !== 1 ? 'ren' : ''}</p>
              <p className="total-price">
                <span>Total:</span> ₹{calculateNights() * roomTypes.find(r => r.id === roomType).price}
              </p>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="book-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking & Send Receipt'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;