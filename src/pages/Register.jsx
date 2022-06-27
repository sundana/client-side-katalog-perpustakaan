import React from 'react';
import axios from 'axios';

function Register() {
  const [bookData, setBookData] = React.useState({
    title: '',
    writer: '',
    publisher: '',
    year: null,
  });
  const [registerStatus, setRegisterStatus] = React.useState(null);

  const handleChange = (e) => {
    setBookData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/catalogue/register',
        bookData
      );
      if (response.status === 200) {
        setRegisterStatus(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className='register'>
      <section className='form-heading'>
        <h1>Register Book</h1>
      </section>
      <section className='form-container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            onChange={handleChange}
            placeholder='e.g. Sapiens'
          />
          <label htmlFor='writer'>Author</label>
          <input
            type='text'
            name='writer'
            id='writer'
            onChange={handleChange}
            placeholder='e.g. Yuval Noah Harari'
          />
          <label htmlFor='publisher'>Publisher</label>
          <input
            type='text'
            name='publisher'
            id='publisher'
            onChange={handleChange}
            placeholder='e.g. Penerbit Gramedia'
          />
          <label htmlFor='year'>Year</label>
          <input
            type='number'
            name='year'
            id='year'
            onChange={handleChange}
            placeholder='e.g. 2018'
          />
          <button type='submit'>Add to catalogue</button>
          {registerStatus ? <span className='status'>Registered!</span> : null}
        </form>
      </section>
      <section className='new-book'>
        {registerStatus ? (
          <div>
            <p>Title: {bookData.title}</p>
            <p>Author: {bookData.writer}</p>
            <p>Publisher: {bookData.publisher}</p>
            <p>Year: {bookData.year}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Register;
