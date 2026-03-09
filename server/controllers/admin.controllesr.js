const newUser = (req, res) => {
  try {
    const { agentCode, fullName, role } = req.body;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
