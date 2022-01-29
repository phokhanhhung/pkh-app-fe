import './App.css';
import LoginForm from './Components/LoginForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Chat from './Components/Chat';
import VideoCall from './Pages/VideoCall';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video-call" element={<VideoCall />} />
      </Routes>
    </Router>
    
  );
}

export default App;
