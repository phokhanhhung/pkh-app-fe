import './App.css';
import LoginForm from './Components/LoginForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Chat from './Components/Chat';

function App() {
  return (
    <Router>
    <div className="app">
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />}/>
      <Route path="/chat" element={<Chat />} />
    </Routes>
      
    </div>
    </Router>
    
  );
}

export default App;
