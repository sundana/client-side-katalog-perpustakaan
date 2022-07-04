import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/user/register';

function SignUp() {
  const navigate = useNavigate();

  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setNewUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUserData.password === newUserData.password2) {
      await axios
        .post(endpoint, {
          username: newUserData.username,
          email: newUserData.email,
          password: newUserData.password,
        })
        .then((res) => {
          alert(`Sign up success: ${res.data}`);
          navigate('/');
        })
        .catch((err) => {
          alert(err.response?.data?.message);
        });
    } else {
      alert('Password does not match');
    }
  };

  return (
    <>
      <div className='register'>
        <section className='form-heading'>
          <h1>Sign Up</h1>
        </section>
        <section className='form-container'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              placeholder='Enter your username'
              name='username'
              onChange={handleChange}
              required
            />
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
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm password'
              name='password2'
              onChange={handleChange}
              required
            />
            <button type='submit'>Sign Up</button>
          </form>
          <Link to='/login' className='btn btn-login'>
            Login
          </Link>
        </section>
      </div>
    </>
  );
}

export default SignUp;
