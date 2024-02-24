import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import luke_nightmare from "../images/nightmare_4.webp";
import './Luke_win_travel.css';
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/hyperdrive-sound-effect-2-32320.mp3'; // Import your audio file

function Luke_travel() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hitsCounted = state && state.hitsCounted ? state.hitsCounted : 0;
  const jewelsCollected = state && state.jewelsCollected ? state.jewelsCollected : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to /luke_game_over after 3 seconds
      navigate('/luke_win');
    }, 10000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="luke_win_travel_container">
      <div className='nightmare_4'>
        <img src={luke_nightmare} alt="luke_nightmare" className="luke_nightmare" />
      </div>
      <div className="audio_player_container">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default Luke_travel;