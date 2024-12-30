import React, { useState } from 'react';
import './Payment.css';
import axios from 'axios';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [approvalCode, setApprovalCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = async () => {
    try {
      const encryptedDataResponse = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/encrypt', {
        cardNumber,
        expiryDate,
        cvv,
        nameOnCard
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const encryptedData = encryptedDataResponse.data;

      const isApproved = await verifyPaymentApproval(approvalCode);

      if (isApproved) {
        await processPayment(encryptedData);
      } else {
        alert('Payment could not be verified.');
      }
    } catch (error) {
      alert('Error processing payment');
    }
  };

  const verifyPaymentApproval = async (code) => {
    try {
      // Assume this sends request to verify approval code
      const response = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/verify', {
        approvalCode: code
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.isApproved;
    } catch (error) {
      alert('Error verifying payment approval');
      return false;
    }
  };

  const processPayment = async (data) => {
    try {
      await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/payments', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Payment processed successfully');
    } catch (error) {
      alert('Error processing payment');
    }
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <form>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
        />
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="Expiry Date (MM/YY)"
        />
        <input
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="CVV"
        />
        <input
          type="text"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Name on Card"
        />
        <input
          type="text"
          value={approvalCode}
          onChange={(e) => setApprovalCode(e.target.value)}
          placeholder="Approval Code"
        />
        <button type="button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Payment;