import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCard } from '../services/LanguageApi';
import sjcl from 'sjcl';
import '../styles/InsertCard.css';

function InsertCard() {
  const [value, setValue] = useState('');
  const [languageData, setLanguageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const language = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';
    setSelectedLanguage(language);

    if (language) {
      const cachedData = localStorage.getItem(`languageData_${language}`);
      if (cachedData) {
        setLanguageData(JSON.parse(cachedData));
      }
    }

    localStorage.removeItem('encryptedCardData');

    setLoading(false);
  }, []);

  const handleNumberClick = (number) => setValue((prev) => prev + number);
  const handleDeleteClick = () => setValue((prev) => prev.slice(0, -1));

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setErrors([]);

    try {
      const cardCheckResponse = await checkCard(value);
      if (cardCheckResponse.error) {
        console.error('Error from server:', cardCheckResponse.error);
        setErrors([cardCheckResponse.error]);
        return;
      }

      if (!cardCheckResponse.success || !cardCheckResponse.card) {
        setErrors([languageData.wrong_card_number || 'Card not found']);
        return;
      }

      const expirationDate = new Date(cardCheckResponse.card.expiration_date);
      if (new Date() > expirationDate) {
        setErrors([languageData.account_payment_error_expired || 'Payment expired']);
        return;
      }

      const encryptedData = sjcl.encrypt('nope123', JSON.stringify(cardCheckResponse));
      localStorage.setItem('encryptedCardData', encryptedData);

      navigate('/pin-code');
    } catch (error) {
      console.error('Error during submission:', error);
      setErrors(['An unexpected error occurred. Please try again later.']);
    }
  };

  if (!selectedLanguage) {
    return <p>Loading language settings...</p>;
  }

  return (
    <form className="number-pad-container">
      <h1 ref={titleRef} className="language-title">
        {loading ? 'Loading...' : languageData.enter_card_numbers || 'Enter card numbers'}
      </h1>
      <div className="textbox">
        <input
          type="text"
          value={value}
          readOnly
          className={`readonly-textbox ${errors.length > 0 ? 'error-border' : ''}`}
          placeholder={languageData.enter_numbers || 'Enter numbers'}
        />
      </div>
      <div className="button-container">
        {[...Array(9).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => handleNumberClick((num + 1).toString())}
            className="number-button"
            type="button"
          >
            {num + 1}
          </button>
        ))}
        <button
          key={0}
          onClick={() => handleNumberClick('0')}
          className="number-button"
          type="button"
        >
          0
        </button>
        <button
          onClick={handleDeleteClick}
          className="delete-button"
          type="button"
        >
          {languageData.delete_ || 'Delete'}
        </button>
      </div>
      <button
        onClick={handleSubmitClick}
        className="submit-button"
        type="button"
      >
        {languageData.submit || 'Submit'}
      </button>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}

export default InsertCard;
