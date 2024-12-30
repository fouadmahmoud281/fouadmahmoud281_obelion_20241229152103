const Payment = require('../models/PaymentModel');

// Create a new payment record
const createPayment = async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
    const newPayment = await Payment.create({ cardNumber, expiryDate, cvv, nameOnCard });
    res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

// Retrieve a payment record by ID
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByPk(paymentId);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment', error: error.message });
  }
};

// Update a payment record by ID
const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
    const payment = await Payment.findByPk(paymentId);
    if (payment) {
      await payment.update({ cardNumber, expiryDate, cvv, nameOnCard });
      res.status(200).json({ message: 'Payment updated successfully', payment });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

// Delete a payment record by ID
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByPk(paymentId);
    if (payment) {
      await payment.destroy();
      res.status(200).json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment
};
