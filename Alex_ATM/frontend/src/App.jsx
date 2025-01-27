import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Language from './components/Language';
import InsertCard from './components/InsertCard';
import SelectOption from './components/SelectOption';
import EnterPin from './components/EnterPin';
import Transaction from './components/Transaction';
import ThankYouPage from './components/ThankYouPage';
import TransactionComplete from './components/TransactionComplete';
import LastPage from './components/LastPage';
import Header from './components/Header'; 
import SetLanguage from './components/protectedRoutes/SetLanguage';
import InputCard from './components/protectedRoutes/InputCard';



function App() {

  return (
    <Router>
      <HeaderWithLocation />
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Language />} />
            
          <Route element={<SetLanguage/>}>
              <Route path="/card-input" element={<InsertCard />} />
          </Route>

          <Route element={<InputCard/>}>
              <Route path="/pin-code" element={<EnterPin  />} />
              <Route path="/select-option" element={<SelectOption />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/transaction-complete" element={<TransactionComplete />} />
              <Route path="/bill" element={<LastPage /> } />
          </Route>
         
        </Routes>
      </div>
    </Router>
  );
}

// if not "/" route, show flag
function HeaderWithLocation() {
  const location = useLocation();
  return location.pathname !== '/' ? <Header /> : null;
}

export default App;
