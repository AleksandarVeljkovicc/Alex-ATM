import React, { useEffect, useState } from 'react';

function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const language = localStorage.getItem('selectedLanguage');
      if (language) {
        setSelectedLanguage(JSON.parse(language).value);
      } else {
        setSelectedLanguage('english');
      }
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 

  if (!selectedLanguage) {
    return null;
  }

  return (
    <div className="header">
      <img
        src={`/images/flags/${selectedLanguage.toLowerCase()}.png`}
        alt={`${selectedLanguage} flag`}
        className="language-flag"
      />
    </div>
  );
}

export default Header;
