import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    title: '',
    writer: '',
    publisher: '',
    year: 0,
  });

  useEffect(() => {
    fetchData(id);
  }, [data]);

  const fetchData = async (id) => {
    await axios('http://localhost:8000/api/catalogue/search?_id=' + id)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setNewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    await axios
      .put('http://localhost:8000/api/catalogue/' + id, newData)
      .then((res) => console.log(res.status, 'Document updated!'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <section className='edit-heading'>
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
        <button onClick={handleSave}>Submit</button>
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
