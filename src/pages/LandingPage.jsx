import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/catalogue/';

function LandingPage() {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    await axios(url, {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (loginUser) {
      fetchData(endpoint);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <SearchBox data={data} endpoint={endpoint} loginUser={loginUser} />
    </div>
  );
}

export default LandingPage;
