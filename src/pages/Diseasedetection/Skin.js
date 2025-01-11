import React, { useState } from 'react';
import axios from 'axios';
import './Skin.css';

const Skin = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage('');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Updated URL to use port 5001
      const response = await axios.post('http://localhost:5001/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      setErrorMessage('Error uploading or processing the image.');
      console.error(error);
    }
  };

  return (
    <div className='skin'>
      <h2>Upload Image for Prediction</h2>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {prediction && <div><strong>Prediction: </strong>{prediction}</div>}

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default Skin;
