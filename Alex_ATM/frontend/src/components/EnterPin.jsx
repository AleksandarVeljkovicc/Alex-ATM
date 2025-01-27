import { useState, useEffect } from 'react';
import sjcl from 'sjcl';
import { useNavigate } from 'react-router-dom'; 
import '../styles/EnterPin.css';

function EnterPin() {
  const navigate = useNavigate(); 
  const languageParam = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';
  const languageData = JSON.parse(localStorage.getItem(`languageData_${languageParam}`)) || {};

  const [cardDetails, setCardDetails] = useState({});
  const [values, setValues] = useState(['', '', '', '']); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = () => {
      try {
        const encryptedData = localStorage.getItem('encryptedCardData');
        if (!encryptedData) {
          setError('Card not found');
          return;
        }

        const decryptedData = JSON.parse(sjcl.decrypt('nope123', encryptedData));
        setCardDetails(decryptedData.card);
      } catch (error) {
        console.error('Error decrypting card data:', error);
        setError('Failed to load card details');
      }
    };

    fetchCard();
  }, []);

  const handleNumberClick = (number) => {
    const nextIndex = values.findIndex((val) => val === ''); 
    if (nextIndex !== -1) {
      const newValues = [...values];
      newValues[nextIndex] = number;
      setValues(newValues);
    }
  };

  
  const handleDeleteClick = () => {
    const lastIndex = values
      .slice() 
      .reverse()
      .findIndex((val) => val !== ''); 
    if (lastIndex !== -1) {
      const indexToDelete = values.length - 1 - lastIndex; 
      const newValues = [...values];
      newValues[indexToDelete] = '';
      setValues(newValues);
      setError(''); 
    }
  };

  const handleSubmitClick = () => {
    const enteredPin = values.join('');
   
    if (!cardDetails.pin) {
      setError('Card PIN not found');
      return;
    }
  
    if (enteredPin !== String(cardDetails.pin)) {
      setError(languageData['wrong_pin_code'] || 'Incorrect PIN');
      return;
    }
  
    setValues(['', '', '', '']);
    setError('');
    navigate('/select-option'); 
  };
  

  return (
    <div className="number-pad-container">
      <h1>{languageData['enter_pin_code'] || 'Enter PIN Code'}</h1>
      <div className="textbox-container">
        {values.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            readOnly
            className={`square-textbox ${error ? 'error-border' : ''}`}
            placeholder="-"
          />
        ))}
      </div>

      <div className="button-container">
        {[...Array(9).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => handleNumberClick((num + 1).toString())}
            className="number-button"
          >
            {num + 1}
          </button>
        ))}

        <button
          key={0}
          onClick={() => handleNumberClick('0')}
          className="number-button"
        >
          0
        </button>
        <button onClick={handleDeleteClick} className="delete-button">
          {languageData['delete_'] || 'Delete'}
        </button>
      </div>
      <button onClick={handleSubmitClick} className="submit-button">
        {languageData['submit'] || 'Submit'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EnterPin;
