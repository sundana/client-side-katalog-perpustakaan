import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';

function LandingPage() {
  const endpoint = 'http://localhost:8000/api/catalogue/';
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(endpoint);
  }, []);

  const fetchData = async (url) => {
    await axios(url)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <SearchBox data={data} endpoint={endpoint} />
    </div>
  );
}

export default LandingPage;
