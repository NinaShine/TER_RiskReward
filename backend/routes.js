const express = require('express');
const router = express.Router();

router.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

module.exports = router;
