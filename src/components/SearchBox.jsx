import axios from 'axios';
import { useState } from 'react';
import './SearchBox.css';
import { Link } from 'react-router-dom';

function SearchBox({ endpoint }) {
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value.replace(' ', '+'));
  };

  const handleSearch = async () => {
    if (!input) {
      alert('Please input the title');
    }
    await axios(`${endpoint}search?title=${input}`).then((res) =>
      setSearchData(res.data)
    );
  };

  const handleDelete = async (e) => {
    await axios
      .delete(endpoint + e.target.value)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    await axios(`${endpoint}search?title=${input}`).then((res) =>
      setSearchData(res.data)
    );
  };

  return (
    <div className='search-box-container'>
      <section className='search-box-heading'>
        <h1>Search catalogue</h1>
      </section>
      <section className='search-form'>
        <input
          type='text'
          name='search'
          placeholder='Search book title...'
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </section>
      <section className='result'>
        {searchData.map((item) => {
          return (
            <div key={item._id} className='result-card'>
              <p>ID: {item._id}</p>
              <p>Book Title: {item.title}</p>
              <p>Author: {item.writer}</p>
              <p>Publisher: {item.publisher}</p>
              <p>Year: {item.year}</p>
              <button value={item._id} onClick={handleDelete}>
                Delete Book
              </button>
              <button>
                <Link to={`/${item._id}/edit`}>Edit</Link>
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default SearchBox;
