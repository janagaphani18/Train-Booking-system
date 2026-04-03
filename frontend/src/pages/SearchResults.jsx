import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, IndianRupee, MapPin } from 'lucide-react';

export default function SearchResults() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get('source');
  const destination = queryParams.get('destination');
  const date = queryParams.get('date');

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/trains/search?source=${source}&destination=${destination}&date=${date}`);
        setTrains(res.data);
      } catch (error) {
        console.error("Failed to fetch trains", error);
      } finally {
        setLoading(false);
      }
    };
    if (source && destination) {
      fetchTrains();
    } else {
      setLoading(false);
    }
  }, [source, destination, date]);

  return (
    <div className="page-container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Search Results</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Showing trains from <strong style={{ color: 'var(--primary)' }}>{source?.toUpperCase()}</strong> to <strong style={{ color: 'var(--primary)' }}>{destination?.toUpperCase()}</strong> on {date}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading AI-optimized routes...
        </div>
      ) : trains.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: '12px' }}>
          <h3>No trains found for this route.</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please try another route (e.g., Charlapalli to Nalgonda).</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {trains.map((train) => (
            <div key={train.id} style={{ 
              background: 'var(--bg-card)', 
              borderRadius: '16px', 
              padding: '1.5rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>{train.trainName}</h3>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                    #{train.trainNumber}
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} /> <span style={{ color: 'var(--text-light)' }}>{train.source.toUpperCase()} &rarr; {train.destination.toUpperCase()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <Clock size={16} /> <span>{train.departureTime} - {train.arrivalTime} ({train.duration})</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
                    <div><strong>Distance:</strong> {train.distance}</div>
                    <div><strong>Stops Between:</strong> <span style={{ color: 'var(--accent)' }}>{train.intermediateStops ? train.intermediateStops.join(', ') : train.nextStop}</span></div>
                    <div><strong>Available Seats:</strong> <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{train.seats}</span></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  <IndianRupee size={20} /> {train.price}
                </div>
                <button 
                  className="btn-primary" 
                  onClick={() => navigate('/bookings', { state: { train } })}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
