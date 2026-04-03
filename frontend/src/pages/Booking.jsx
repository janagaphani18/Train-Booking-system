import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store';
import { Ticket, MapPin, Clock, IndianRupee, CheckCircle } from 'lucide-react';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // If we navigated here with a train, we are in "Confirm Booking" mode
  const trainToBook = location.state?.train;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // If not booking a specific train, fetch user's past bookings
    if (!trainToBook) {
      fetchBookings();
    }
  }, [user, trainToBook, navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings?userId=${user.email}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.email,
        train: trainToBook,
        passengers,
        totalPrice: trainToBook.price * passengers
      });
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/bookings', { replace: true, state: {} }); // Reload without trainToBook state
      }, 2000);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Failed to confirm booking.");
    }
  };

  if (!user) return null;

  // View: Confirming a specific booking
  if (trainToBook) {
    return (
      <div className="page-container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
        {bookingSuccess ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
            <CheckCircle size={64} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ color: 'var(--text-light)' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Redirecting to your tickets...</p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>Confirm Your Ticket</h2>
            
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{trainToBook.trainName}</strong>
                <span>#{trainToBook.trainNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>{trainToBook.source.toUpperCase()} &rarr; {trainToBook.destination.toUpperCase()}</span>
                <span>{trainToBook.departureTime}</span>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label>Number of Passengers</label>
              <input 
                type="number" 
                min="1" 
                max="6" 
                value={passengers} 
                onChange={(e) => setPassengers(Number(e.target.value))} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>Total Amount:</span>
              <strong style={{ fontSize: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                <IndianRupee size={20} /> {trainToBook.price * passengers}
              </strong>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', height: '50px', fontSize: '1.1rem' }} onClick={handleConfirmBooking}>
              Pay & Book Ticket
            </button>
          </div>
        )}
      </div>
    );
  }

  // View: List of past bookings
  return (
    <div className="page-container" style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-light)' }}>My Bookings</h2>
      
      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Loading your tickets...</p>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: '12px' }}>
          <Ticket size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No bookings found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>You haven't booked any AI trains yet.</p>
          <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/')}>Book a Ticket</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ 
              background: 'var(--bg-card)', 
              borderRadius: '16px', 
              padding: '1.5rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderLeft: '4px solid var(--accent)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem' }}>{booking.status}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Booking ID: {booking.id}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>{booking.train.trainName}</h3>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  #{booking.train.trainNumber}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> {booking.train.source.toUpperCase()} &rarr; {booking.train.destination.toUpperCase()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} /> {booking.train.departureTime}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Ticket size={16} /> {booking.passengers} Passenger(s)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontWeight: 'bold' }}>
                  <IndianRupee size={16} /> {booking.totalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
