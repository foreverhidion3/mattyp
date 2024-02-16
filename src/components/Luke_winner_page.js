import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Luke_winner_page.css';
import title_img_10 from "../images/Title_10.png";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from "../audio/Aaron Hibell - destroyer of worlds  OPPENHEIMER.mp3"; // Import your audio file

function Luke_winner_page() {
  const location = useLocation();
  const hitsCounted = location.state ? location.state.hitsCounted : 0;
  const jewelsCollected = location.state ? location.state.jewelsCollected : 0;

  return (
    <div className="luke_win_background">
        
      <div className= "luke_win_center_piece">
        <h2>CONGRATULATIONS!</h2>
        <p>You Win!</p>
        <Link to="/luke_secret_lab" className="title_img_10_container">
            <img src={title_img_10 } alt="title_img_10" id="title_img_10" />
        </Link>
      </div>
      <div className="audio_player_container">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default Luke_winner_page;