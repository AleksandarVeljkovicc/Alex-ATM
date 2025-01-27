import { useEffect, useState } from "react";
import "../styles/ThankYouPage.css";
import { useNavigate } from "react-router-dom";

function ThankYouPage() {
  const navigate = useNavigate();
  const [thankYouMessage, setThankYouMessage] = useState("Hvala Vam što koristite Alex bank!"); // Podrazumevana poruka

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  useEffect(() => {
    const languageParam = JSON.parse(localStorage.getItem("selectedLanguage"))?.value || "en";
    const languageData = localStorage.getItem(`languageData_${languageParam}`);

    if (languageData) {
      const parsedData = JSON.parse(languageData);
      const message = parsedData.thank_you_message || "Thank you for using the ATM of Alex Bank";
      setThankYouMessage(message); 
    }
  }, []);

  return (
    <div className="thank-you-container">
      <h1 className="thank-you-text">{thankYouMessage}</h1>
    </div>
  );
}

export default ThankYouPage;
