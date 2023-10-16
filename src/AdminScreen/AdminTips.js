import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminTips = () => {
  const [tips, setTips] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    // Fetch tips from your API
    axios.get('http://localhost:3000/admin/tips')
      .then(response => {
        setTips(response.data.safety_tips);
      })
      .catch(error => {
        console.error('Error fetching tips:', error);
      });
  }, []);

  const handleDeleteTip = (tip_id) => {
    // Send a request to delete the tip
    axios.delete(`http://localhost:3000/admin/tips/${tip_id}`)
      .then(response => {
        console.log(response.data.message);
        // Remove the deleted tip from the UI
        setTips(prevTips => prevTips.filter(tip => tip.tip_id !== tip_id));
        setDeleteMessage('Tip successfully deleted.'); // Set the success message
        setTimeout(() => {
          setDeleteMessage(''); // Clear the success message after a few seconds
        }, 3000);
      })
      .catch(error => {
        console.error('Error deleting tip:', error);
        setDeleteMessage('Error deleting tip.'); // Set the error message
      });
  };

  return (
    <div>
      <style>
        {`
          .heading {
            font-size: 24px;
            margin-bottom: 16px;
          }
         
          .message {
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
          }
         
          .success {
            background-color: lightgreen;
          }
         
          .error {
            background-color: lightcoral;
          }
         
          .tip-container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
         
          .tip-box {
            background-color: lightgrey;
            padding: 10px;
            border-radius: 5px;
            flex: 1;
            margin-right: 10px;
          }
         
          .tip-description {
            margin: 0;
          }
         
          .tip-date {
            margin: 0;
            font-size: 12px;
          }
         
          .delete-button {
            background-color: blue;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
         
          .delete-button:hover {
            background-color: darkblue;
          }
        `}
      </style>
      <h1 className="heading">Admin Tips</h1>
      {deleteMessage && <p className={`message ${deleteMessage.includes('success') ? 'success' : 'error'}`}>{deleteMessage}</p>}
      {tips.map(tip => (
        <div key={tip.tip_id} className="tip-container">
          <div className="tip-box">
            <p className="tip-description">{tip.tip_description}</p>
            <p className="tip-date">{new Date(tip.date).toLocaleString()}</p>
          </div>
          <button className="delete-button" onClick={() => handleDeleteTip(tip.tip_id)}>Delete Tip</button>
        </div>
      ))}
    </div>
  );
};

export default AdminTips;