exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    // Mock response for now
    res.json({ reply: `Mock AI response to: "${message}"` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.predictPrice = async (req, res) => {
  try {
    const { trainId, date } = req.query;
    // Mock prediction logic
    const predictedPrice = Math.floor(Math.random() * (2000 - 500 + 1) + 500); 
    res.json({ predictedPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
