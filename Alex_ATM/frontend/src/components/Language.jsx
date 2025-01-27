import { useState, useEffect } from 'react';
import { fetchLanguages, fetchDataWithLanguage } from '../services/LanguageApi';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; 
import '../styles/languagePage.css'; 

function Languages() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState(false); 
    const navigate = useNavigate(); 
    useEffect(() => {
        localStorage.clear();
        console.log("localStorage deleted.");

        fetchLanguages()
            .then(data => {
                const formattedOptions = data.map(lang => ({
                    value: lang.language,
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img 
                                src={`/images/flags/${lang.language.toLowerCase()}.png`} 
                                alt={lang.language} 
                                style={{ width: 20, height: 20, marginRight: 10 }} 
                            />
                            {lang.language}
                        </div>
                    )
                }));
                setOptions(formattedOptions);
            })
            .catch(error => console.error('Error fetching languages:', error));
    }, []); 

    const handleChange = (option) => {
        setSelectedOption(option); 
        setError(false); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedOption) {
            localStorage.setItem('selectedLanguage', JSON.stringify(selectedOption));
            console.log("Language saved to localStorage:", selectedOption);

            await fetchDataWithLanguage();

            navigate('/card-input');

        } else {
            setError(true); 
        }
    };

    return (
        <div className="center-div">
            <form onSubmit={handleSubmit}>
                <h1 className="text-center">Welcome to Alex bank</h1>
                <Select 
                    className={`custom-select ${error ? 'error-border' : ''}`} 
                    options={options} 
                    onChange={handleChange} 
                    placeholder="Select a language" 
                />
                <h1 className="text-center">Please select your language</h1>
                <button type="submit">Select</button>
                {error && <p className="error-message">Please select a language before proceeding</p>} 
            </form>
        </div>
    );
}

export default Languages;
