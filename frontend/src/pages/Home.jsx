import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(source && destination) {
      navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover the Future of Train Travel</h1>
          <p className="hero-subtitle">Smart bookings powered by AI. Fast, predictive, and intelligent.</p>
          
          <form className="search-form" onSubmit={handleSearch}>
            <div className="input-group">
              <label>From</label>
              <input type="text" placeholder="Departure Station" value={source} onChange={(e)=>setSource(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>To</label>
              <input type="text" placeholder="Arrival Station" value={destination} onChange={(e)=>setDestination(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
            </div>
            <button type="submit" className="btn-search">
              <Search size={20} />
              <span>Search Trains</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
