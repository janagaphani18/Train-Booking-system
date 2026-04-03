// In-memory mock database for bookings
const bookings = [];

exports.createBooking = (req, res) => {
  const { userId, train, passengers, totalPrice } = req.body;
  if (!userId || !train) {
    return res.status(400).json({ message: 'User ID and Train details are required' });
  }

  const newBooking = {
    id: 'BK' + Date.now().toString(),
    userId,
    train,
    passengers: passengers || 1,
    totalPrice,
    status: 'Confirmed',
    bookingDate: new Date().toISOString()
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
};

exports.getUserBookings = (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const userBookings = bookings.filter(b => b.userId === userId);
  res.status(200).json(userBookings);
};
