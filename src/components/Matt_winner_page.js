import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Matt_winner_page.css';
import title_img_11 from "../images/Title_11.png";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from "../audio/Most Beautiful Music Ever Everdream by Epic Soul Factory.mp3"; // Import your audio file

function Matt_winner_page() {
  const location = useLocation();
  const hitsCounted = location.state ? location.state.hitsCounted : 0;
  const jewelsCollected = location.state ? location.state.jewelsCollected : 0;

  return (
    <div className="matt_win_background">
        
      <div className= "matt_win_center_piece">
        <h2>CONGRATULATIONS!</h2>
        <p>You Win!</p>
        <Link to="/matt_secret_lab" className="title_img_11_container">
            <img src={title_img_11 } alt="title_img_11" id="title_img_11" />
        </Link>
      </div>
      <div className="audio_player_container">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default Matt_winner_page;