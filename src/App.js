import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Edit from './pages/Edit';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:id/edit' element={<Edit />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
