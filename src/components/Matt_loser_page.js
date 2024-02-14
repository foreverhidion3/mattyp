import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Matt_loser_page.css';
import title_img_11 from "../images/Title_11.png";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Matt_Lose_Music.mp3'; // Import your audio file

function Matt_loser_page() {
  const location = useLocation();
  const hitsCounted = location.state ? location.state.hitsCounted : 0;
  const jewelsCollected = location.state ? location.state.jewelsCollected : 0;

  return (
    <div className="matt_game_over_background">
      <div className= "matt_center_piece">
        <h2>GAME OVER</h2>
        <p>SCORE: <p2>{jewelsCollected}</p2> FRAGMENTS</p>
        {/* <p>Hits Counted: {hitsCounted}</p> */}
        <Link to="/matt_secret_lab" className="title_img_11_container">
            <img src={title_img_11} alt="title_img_11" id="title_img_11" />
        </Link>
        {/* <Link to="/luke_secret_lab">Return to Lab</Link> */}
      </div>
      <div className="audio_player_container">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default Matt_loser_page;