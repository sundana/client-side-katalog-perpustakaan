import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${loginUser?.token}` } };
  const endpoint = 'http://localhost:8000/api/catalogue/';
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    title: '',
    writer: '',
    publisher: '',
    year: 0,
  });

  useEffect(() => {
    if (loginUser) {
      fetchData(id);
    } else {
      navigate('/login');
    }
  }, [data]);

  const fetchData = async (id) => {
    await axios(endpoint + `search?_id=${id}`, config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err.message));
  };

  const handleChange = (e) => {
    setNewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await axios
      .put(endpoint + id, newData, config)
      .then((res) => alert('Document updated!' + res.status))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <section className='form-heading'>
        <h1>Edit Book Data</h1>
      </section>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <p>Title: {item.title}</p>
            <p>Author: {item.writer}</p>
            <p>Publisher: {item.publisher}</p>
            <p>Year: {item.year}</p>
          </div>
        );
      })}
      <section className='edit-form'>
        <div className='form-container'>
          <form onSubmit={handleSave}>
            <label htmlFor='title'>Title: </label>
            <input
              id='title'
              name='title'
              type='text'
              placeholder={data?.title}
              onChange={handleChange}
            />
            <label htmlFor='author'>Author: </label>
            <input
              id='author'
              name='writer'
              type='text'
              placeholder={data?.writer}
              onChange={handleChange}
            />
            <label htmlFor='publisher'>Publisher: </label>
            <input
              id='publisher'
              name='publisher'
              type='text'
              placeholder={data?.publisher}
              onChange={handleChange}
            />
            <label htmlFor='year'>Year: </label>
            <input
              id='year'
              name='year'
              type='text'
              placeholder={data?.year}
              onChange={handleChange}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </section>
      <section className='new-data'>
        <p>Title: {newData.title}</p>
        <p>Author: {newData.writer}</p>
        <p>Publisher: {newData.publisher}</p>
        <p>Year: {newData.year}</p>
      </section>
    </div>
  );
}

export default Edit;
