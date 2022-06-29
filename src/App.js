import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Edit from './pages/Edit';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:id/edit' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
