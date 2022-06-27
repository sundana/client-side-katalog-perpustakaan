import React from 'react';
import axios from 'axios';

function SearchBox() {
  const [bookData, setBookData] = React.useState([]);
  const [renderData, setRenderData] = React.useState([]);

  const endpoint = 'http://localhost:8000/api/catalogue?name=';

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios(endpoint);
      if (response.status === 200) {
        setBookData(response.data);
        console.log(response.data);
      } else {
        throw new Error('Cannot find the book');
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const filtered = bookData.filter((item) => item?.title === e.target.value);
    setRenderData(filtered);
  };

  return (
    <div className='search-box-container'>
      <section className='search-box-heading'>
        <h1>Search catalogue</h1>
      </section>
      <section className='search-form'>
        <input
          type='text'
          placeholder='Search book by name...'
          onChange={handleSearch}
        />
      </section>
      <section className='result'>
        {renderData.map((item, index) => {
          return <p key={index}>{item?.title}</p>;
        })}
      </section>
    </div>
  );
}

export default SearchBox;
