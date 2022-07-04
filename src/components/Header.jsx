import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const loginUser = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      setIsLogin(true);
    }
  }, [loginUser]);

  const logOut = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <>
      <header className='header'>
        <div className='header-container'>
          <div className='logo'>
            <h1>
              <NavLink to={'/'}>Katalog Perpustakaan</NavLink>
            </h1>
          </div>
          <div className='header-btn'>
            {isLogin && (
              <Link to={'/register'}>
                <button>Add</button>
              </Link>
            )}
            {isLogin && <button onClick={logOut}>Logout</button>}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
