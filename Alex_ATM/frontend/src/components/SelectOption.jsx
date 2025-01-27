import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/SelectOption.css';
import sjcl from 'sjcl'; 

function SelectOption() {
  const languageParam = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';
  const languageData = JSON.parse(localStorage.getItem(`languageData_${languageParam}`)) || {};

  const [cardDetails, setCardDetails] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [outputData, setOutputData] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCard = () => {
      try {
        const encryptedData = localStorage.getItem('encryptedCardData');
        if (!encryptedData) {
          setError('No card found in session');
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

  const handleRadioChange = (value) => {
    setSelectedOption((prev) => (prev === value ? '' : value));
    setError('');
    setOutputData(null);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError(languageData['select_option_error'] || 'Please select an option');
      return;
    }

    if (selectedOption === 'account_balance_check') {
      const accountBalanceText = languageData['account_balance'] || 'Account Balance';
      const accountBalanceValue = cardDetails['account_balance'] || '0.00';
      setOutputData(`${accountBalanceText}: ${accountBalanceValue}€`);
      return;
    }

    if (selectedOption === 'eject_card') {
      navigate('/thank-you'); 
    } else if (selectedOption === 'account_payment') {
      navigate('/transaction'); 
    }
  };

  return (
    <div className="radio-container">
      <h1 className="radio-title">{languageData['select_option'] || 'Select an Option'}</h1>

      <div className="radio-buttons-wrapper">
        <div
          className={`radio-button-container ${selectedOption === 'account_balance_check' ? 'selected' : ''}`}
          onClick={() => handleRadioChange('account_balance_check')}
        >
          <span>{languageData['account_balance_check'] || 'Account Balance Check'}</span>
        </div>

        <div
          className={`radio-button-container ${selectedOption === 'account_payment' ? 'selected' : ''}`}
          onClick={() => handleRadioChange('account_payment')}
        >
          <span>{languageData['account_payment'] || 'Account Payment'}</span>
        </div>

        <div
          className={`radio-button-container ${selectedOption === 'eject_card' ? 'selected' : ''}`}
          onClick={() => handleRadioChange('eject_card')}
        >
          <span>{languageData['eject_card'] || 'Eject Card'}</span>
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        {languageData['submit'] || 'Submit'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {outputData && <p className="output-data">{outputData}</p>}
    </div>
  );
}

export default SelectOption;
