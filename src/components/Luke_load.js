import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import luke_loading from "../images/luke_loading.jpg";
import './Luke_load.css';

function Luke_load() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to /luke_secret_lab after 3 seconds
      navigate('/luke_secret_lab');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigate]); // useEffect dependency to include navigate function

  return (
    <div className="luke_load">
      {/* <img src={luke_loading} alt="luke_load" id="luke_load_poster_img" /> */}
    </div>  
  );
}

export default Luke_load;
































