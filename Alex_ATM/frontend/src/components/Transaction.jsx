import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Transaction.css';
import { updateAccountBalance } from '../services/LanguageApi'; 
import sjcl from 'sjcl';

function Transaction() {
  const [rawValue, setRawValue] = useState(''); 
  const [error, setError] = useState(''); 
  const [languageData, setLanguageData] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';

  const decryptCardDetails = () => {
    try {
      const encryptedData = localStorage.getItem('encryptedCardData');
      if (!encryptedData) {
        return {};
      }
      const decryptedData = JSON.parse(sjcl.decrypt('nope123', encryptedData));
      return decryptedData.card || {};
    } catch (error) {
      console.error('Error decrypting card details:', error);
      return {};
    }
  };

  const cardDetails = decryptCardDetails();

  useEffect(() => {
    const cachedData = localStorage.getItem(`languageData_${selectedLanguage}`);
    if (cachedData) {
      setLanguageData(JSON.parse(cachedData));
    }
    setLoading(false);
  }, [selectedLanguage]);

  const formatNumber = (num) => {
    if (!num) return '';
    const parsedNumber = parseFloat(num.replace(/\s/g, '')) || 0;
    return parsedNumber
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleNumberClick = (number) => {
    setRawValue((prevValue) => prevValue + number);
  };

  const handleDeleteClick = () => {
    setRawValue((prevValue) => prevValue.slice(0, -1));
  };

  const navigate = useNavigate();

  const handleSubmit = async (redirectPath) => {
    const enteredAmount = parseFloat(rawValue.replace(/\s/g, '')) || 0;

    if (enteredAmount < 2) {
      setError(languageData.minimum_amount || 'The minimum amount is 2');
      return;
    }

    const accountBalance = parseFloat(cardDetails.account_balance || 0);

    if (enteredAmount > accountBalance) {
      setError(languageData.account_payment_error_balance || 'Insufficient balance');
      return;
    }

    const newBalance = accountBalance - enteredAmount;

    try {
      const response = await updateAccountBalance(cardDetails.full_name, newBalance);
      if (response.success) {
        cardDetails.account_balance = newBalance.toFixed(2); 
        const updatedCardData = { ...cardDetails };
        localStorage.setItem(
            'encryptedCardData',
            sjcl.encrypt('nope123', JSON.stringify({ card: updatedCardData }))
        );
        navigate(redirectPath);
    } else {
        setError('Failed to update account balance');
    }
    } catch (error) {
      setError('Error communicating with server');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="number-pad-container">
      <h1>{languageData.enter_amount || 'Enter amount'}</h1>
      <div className="textbox">
        <input
          type="text"
          value={formatNumber(rawValue)}
          readOnly
          className={`readonly-textbox ${error ? 'error-border' : ''}`}
          placeholder={languageData.enter_numbers || 'Enter numbers'}
        />
      </div>

      <div className="error-message">{error && <span>{error}</span>}</div>

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
        <button onClick={() => handleNumberClick('0')} className="number-button">
          0
        </button>
        <button onClick={handleDeleteClick} className="delete-button">
          {languageData.delete_ || 'Delete'}
        </button>
      </div>

      <div className="action-buttons">
        <button
          className="action-button"
          onClick={() => handleSubmit('/transaction-complete')}
        >
          {languageData.account_payment || 'Account Payment'}
        </button>
        <button
          className="action-button"
          onClick={() => {
            navigate('/select-option'); 
          }}
        >
          {languageData.previous_page || 'Previous Page'}
        </button>
      </div>
    </div>
  );
}

export default Transaction;
