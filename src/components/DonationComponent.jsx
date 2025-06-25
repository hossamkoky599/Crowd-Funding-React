import React, { useState } from 'react';
import instance from '../apis/config';

const DonationComponent = ({ projectId, remainingAmount, onDonationSuccess }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleDonate = async () => {
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid donation amount.');
      setMessage('');
      return;
    }

    if (numericAmount > remainingAmount) {
      setError(`You can only donate up to $${remainingAmount}.`);
      setMessage('');
      return;
    }

    try {
      await instance.post('/donations/', {
        project: projectId,
        amount: numericAmount,
      });

      setMessage('Thank you for your donation!');
      setError('');
      setAmount('');

      if (onDonationSuccess) {
        onDonationSuccess();
      }
    } catch (error) {
      console.error('Donation error:', error);
      setError('Failed to donate. Please try again.');
      setMessage('');
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonStyle = {
    backgroundColor: isHovered ? '#5a00b0' : '#6a0dad',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Make a Donation</h3>

      <small className="text-gray-500 block mb-2">
        Maximum donation allowed: ${remainingAmount}
      </small>

      <input
        type="number"
        value={amount}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val > remainingAmount) {
            setAmount(remainingAmount.toString());
          } else {
            setAmount(e.target.value);
          }
        }}
        placeholder={`Enter amount (max $${remainingAmount})`}
        className="border p-2 rounded mb-2 w-full"
        min="1"
        max={remainingAmount}
      />

      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDonate}
      >
        Donate Now
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
    </div>
  );
};

export default DonationComponent;
