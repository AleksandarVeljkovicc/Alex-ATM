export const fetchLanguages = async () => {
  const response = await fetch('http://localhost/Alex_ATM/backend/src/Routes/api.php?route=languages');
  const data = await response.json();
  return data;
};

export const fetchDataWithLanguage = async () => {
  const savedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));
  const languageParam = savedLanguage ? savedLanguage.value : 'en'; 

  const cachedData = localStorage.getItem(`languageData_${languageParam}`);
  if (cachedData) {
      return JSON.parse(cachedData);
  }

  const response = await fetch(`http://localhost/Alex_ATM/backend/src/Routes/api.php?route=select-language&language=${languageParam}`);
  const data = await response.json();
  localStorage.setItem(`languageData_${languageParam}`, JSON.stringify(data));
  return data;
};

export const checkCard = async (cardNumber) => {
try {
    const response = await fetch('http://localhost/Alex_ATM/backend/src/Routes/api.php?route=check-card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ card_number: cardNumber }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error('Invalid response or network error:', error);
    return { success: false, message: 'Invalid response from server' };
}
};

export const updateAccountBalance = async (fullName, newBalance) => {
  try {
      const response = await fetch('http://localhost/Alex_ATM/backend/src/Routes/api.php?route=update-account-balance', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullName, newBalance }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json(); 
  } catch (error) {
      console.error('Error updating account balance:', error);
      return { success: false };
  }
};
