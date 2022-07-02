import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        alert(`Login success: ${res.data}`);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
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
        </section>
      </div>
    </>
  );
}

export default Login;
