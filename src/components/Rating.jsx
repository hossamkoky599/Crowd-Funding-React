import React, { useState } from 'react';
import instance from '../apis/config';

const RatingComponent = ({ projectId, onRated }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setMessage("Please select a rating between 1 and 5.");
      return;
    }

    try {
      await instance.post(`/projects/${projectId}/rate/`, { value: rating });
      setMessage("Thank you for your rating!");
      onRated();
    } catch (error) {
      console.error("Error rating project:", error);
      setMessage("You have already rated or an error occurred.");
    }
  };

  // Same button style as Donate Now
  const buttonStyle = {
    backgroundColor: '#832ef9',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#6b24d6'; 
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#832ef9';
  };

  return (
    <div className="my-4 border p-4 rounded-lg bg-white shadow-sm">
      <label className="block font-semibold mb-2 text-gray-800">⭐ Rate this project:</label>
      <select
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        className="border rounded px-3 py-2 text-sm w-full mb-3"
      >
        <option value={0}>Select rating</option>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSubmit}
      >
        <span
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '0 6px',
            borderRadius: '4px',
          }}
        >
          Submit Rating
        </span>
      </button>

      {message && (
        <p className="mt-3 text-sm text-gray-600 italic">{message}</p>
      )}
    </div>
  );
};

export default RatingComponent;

