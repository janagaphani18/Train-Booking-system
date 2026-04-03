const jwt = require('jsonwebtoken');

// In-memory mock database
const users = [];

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'secret-key-123', { expiresIn: '1h' });
  res.status(201).json({ token, user: { name: newUser.name, email: newUser.email } });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, 'secret-key-123', { expiresIn: '1h' });
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};
