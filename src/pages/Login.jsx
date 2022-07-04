import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/user/login';

function Login() {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(endpoint, input)
      .then((res) => {
        alert(`Login success: ${res.message}`);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className='register'>
        <section className='form-heading'>
          <h1>Login</h1>
        </section>
        <section className='form-container'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              onChange={handleChange}
              required
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              name='password'
              onChange={handleChange}
              required
            />
            <button type='submit'>Sign In</button>
          </form>
          <Link to='/sign-up' className='btn btn-login'>
            Sign Up
          </Link>
        </section>
      </div>
    </>
  );
}

export default Login;
