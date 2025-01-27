import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TransactionComplete.css';

const TransactionComplete = () => {
  const [languageData, setLanguageData] = useState({});
  const [transactionMessage, setTransactionMessage] = useState('Transaction in progress...');
  const [h1Text, setH1Text] = useState('Transaction in progress...'); 
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'))?.value || 'en';
    const cachedData = localStorage.getItem(`languageData_${selectedLanguage}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setLanguageData(parsedData);
      setH1Text(parsedData.transaction_in_progress || 'Transaction in progress...'); 
    }
  }, []);

  useEffect(() => {
    const progressTimeout = setTimeout(() => {
      setTransactionMessage('Transaction completed!');
    }, 4000);

    const redirectTimeout = setTimeout(() => {
      navigate('/bill'); 
    }, 6000);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="transaction-complete-container">
      <h1>{h1Text}</h1>
      <div className="transaction-box">
        <span className="transaction-text">{transactionMessage}</span>
        {transactionMessage === 'Transaction in progress...' ? (
          <div className="dot-spinner"></div>
        ) : (
          <img
            className="check-mark"
            src="/images/check-mark.png"
            alt="Check Mark"
          />
        )}
      </div>
    </div>
  );
};

export default TransactionComplete;
