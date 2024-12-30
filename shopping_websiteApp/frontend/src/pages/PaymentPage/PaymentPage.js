import React, { useState } from 'react';
import './PaymentPage.css';
import axios from 'axios';

function PaymentPage() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = async () => {
    try {
      const encryptedPaymentInfo = await encryptPaymentData(paymentInfo);
      const response = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/payments', encryptedPaymentInfo, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        alert('Payment Successful');
      } else {
        alert('Payment Failed');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const encryptPaymentData = async (data) => {
    try {
      const response = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/encrypt', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      alert('Encryption error: ' + error.message);
      throw error;
    }
  };

  return (
    <div className="payment-page">
      <h1>Secure Payment</h1>
      <form>
        <div className="form-group">
          <label htmlFor="nameOnCard">Name on Card</label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={paymentInfo.nameOnCard}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;