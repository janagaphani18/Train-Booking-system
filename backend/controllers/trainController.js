exports.searchTrains = (req, res) => {
  const { source, destination, date } = req.query;
  
  if (!source || !destination) {
    return res.status(400).json({ message: 'Source and destination are required' });
  }

  // AI Mock: Dynamically generate trains for ANY route searched to simulate a massive network
  const trainNames = ['Vande Bharat Express', 'Shatabdi Express', 'Rajdhani Express', 'Duronto Express', 'Superfast Express'];
  
  const results = [];
  const numTrains = Math.floor(Math.random() * 3) + 2; // 2 to 4 trains per route
  
  for (let i = 0; i < numTrains; i++) {
    // Simulated AI Dynamic Pricing (higher demand = higher price)
    const basePrice = Math.floor(Math.random() * 1000) + 300;
    const aiSurge = Math.floor(Math.random() * 200);
    const distance = Math.floor(Math.random() * 800) + 50; // 50 to 850 km
    const duration = Math.floor(distance / 60) + 1; // Approx hours
    const stopsArray = ['Secunderabad', 'Vijayawada', 'Warangal', 'Kazipet', 'Khammam', 'Pune', 'Solapur'];
    const numStops = Math.floor(Math.random() * 3) + 1; // 1 to 3 stops
    const shuffledStops = [...stopsArray].sort(() => 0.5 - Math.random());
    const intermediateStops = shuffledStops.slice(0, numStops);

    results.push({
      id: Date.now().toString() + i,
      trainNumber: Math.floor(10000 + Math.random() * 90000).toString(),
      trainName: trainNames[Math.floor(Math.random() * trainNames.length)],
      source: source,
      destination: destination,
      departureTime: `${Math.floor(Math.random() * 12 + 1)}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      arrivalTime: `${Math.floor(Math.random() * 12 + 1)}:30 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      distance: `${distance} km`,
      duration: `${duration} hrs`,
      nextStop: stopsArray[Math.floor(Math.random() * stopsArray.length)],
      intermediateStops: intermediateStops,
      price: basePrice + aiSurge,
      seats: Math.floor(Math.random() * 200) + 10
    });
  }
  
  // Simulated AI Processing Delay
  setTimeout(() => {
    res.status(200).json(results);
  }, 600);
};
