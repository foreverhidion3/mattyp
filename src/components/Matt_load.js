import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import matt_loading from "../images/matt_loading.jpg";
import './Matt_load.css';

function Matt_load() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to /matt_secret_lab after 3 seconds
      navigate('/matt_secret_lab');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigate]); // useEffect dependency to include navigate function

  return (
    <div className="matt_load">
      {/* <img src={matt_loading} alt="matt_load" id="matt_load_poster_img" /> */}
    </div>
  );
}

export default Matt_load;
