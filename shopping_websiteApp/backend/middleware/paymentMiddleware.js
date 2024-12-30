const jwt = require('jsonwebtoken');
const Payment = require('../models/PaymentModel');
const { secretKey } = require('../config');

// Middleware for authenticating payment requests
const authenticatePaymentRequest = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

// Middleware for validating payment data
const validatePaymentData = async (req, res, next) => {
  const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;

  if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Further validation logic
    const existingPayment = await Payment.findOne({ where: { cardNumber } });
    if (existingPayment) {
      return res.status(400).json({ message: 'Payment information already exists' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error validating payment data', error: error.message });
  }
};

module.exports = {
  authenticatePaymentRequest,
  validatePaymentData
};
