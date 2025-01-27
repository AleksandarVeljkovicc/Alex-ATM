import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LastPage.css';

function LastPage() {
  const languageParam = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';
  const languageData = JSON.parse(localStorage.getItem(`languageData_${languageParam}`)) || {};

  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [outputData, setOutputData] = useState(null);

  const navigate = useNavigate(); 

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

    if (selectedOption === 'previous_page') {
      navigate('/transaction'); 
    } else if (selectedOption === 'eject_card') {   
      navigate('/thank-you'); 
    }
  };

  return (
    <div className="radio-container">
      <h1 className="radio-title">{languageData['select_option'] || 'Select an Option'}</h1>

      <div className="radio-buttons-wrapper">
        <div
          className={`radio-button-container ${selectedOption === 'previous_page' ? 'selected' : ''}`}
          onClick={() => handleRadioChange('previous_page')}
        >
          <span>{languageData['previous_page'] || 'Previous Page'}</span>
        </div>

        <div
          className={`radio-button-container ${selectedOption === 'eject_card' ? 'selected' : ''}`}
          onClick={() => handleRadioChange('eject_card')}
        >
          <span>{languageData['eject_card_pay'] || 'Eject Card and Pay'}</span>
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

export default LastPage;
