import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function Register() {
  const navigate = useNavigate();
  const loginUser = localStorage.getItem('user');

  useEffect(() => {
    if (!loginUser) {
      navigate('/login');
    }
  }, [loginUser, navigate]);

  return (
    <div className='register'>
      <section className='form-heading'>
        <h1>Register Book</h1>
      </section>
      <RegisterForm />
    </div>
  );
}

export default Register;
