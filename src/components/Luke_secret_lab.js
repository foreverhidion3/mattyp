import React from 'react';
import { useState } from 'react';
import './Luke_secret_lab.css';
import { Link } from 'react-router-dom';
import space_ship_img from "../images/spaceship_img.png"
import luke_img_1 from "../images/luckylukeborg_supervillain.png"
import title_img_7 from "../images/Title_7.png"
import title_img_8 from "../images/Title_8.png"
import title_img_9 from "../images/Title_9.png"
import back from "../images/back.png"
import fire_ball_img from "../images/fireball_3.gif"
import buggy_img_gif from "../images/babyborg_01.png"
import buggy_img_gif_2 from "../images/babyborg_02.png"
// import buggy_img_gif from "../images/babyborg_01.png"
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Luke_Theme.mp3'; // Import your audio file

function Luke_secret_lab() {

  const [Image, setImage] = useState(buggy_img_gif);

  const handleClick = () => {
    console.log("click")
    // Switching logic
    if (Image === buggy_img_gif) {
      setImage(buggy_img_gif_2);
    } else if (Image === buggy_img_gif_2) {
      setImage(buggy_img_gif);
    };
    console.log("click_2")
  };
  return (
    <div className="full_lab">
      <div className="lab_background">
        <Link to="/luke_war" className="game_img_container">
            <img src={space_ship_img} alt="game_img" id="game_img" />
        </Link>
        {/* <div className="buggy_img_gif_container">
            <img src={buggy_img_gif} alt="buggy_img_gif" className="buggy_img_gif" />
            <img src={fire_ball_img_2} alt="fire_ball_img_2" className="fire_ball_img_2" style={{ transform: 'scaleX(-1)' }} />  
        </div> */}
        {/* <div className="buggy_img_gif_container">
              <img src={buggy_img_gif} alt="buggy_img_gif" className="buggy_img_gif" />
        </div> */}
        <div className="lab_links">
          <div className="menu">
            <Link to="/game_full" className="title_img_7_container">
                <img src={title_img_7} alt="title_img_7" id="title_img_7" /> 
            </Link>
            <Link to="/story_mode" className="title_img_8_container">
                <img src={title_img_8} alt="title_img_8" id="title_img_8" />
            </Link>
            <Link to="/photos" className="title_img_9_container">
                <img src={title_img_9} alt="title_img_9" id="title_img_9" />
            </Link>
          </div>
          <div className="buggy_img_gif_container" onClick={handleClick}>
              <img src={Image} alt="buggy_img_gif" className="buggy_img_gif" />
          </div>
          {/* <div className="buggy_img_gif_container">
              <img src={buggy_img_gif} alt="buggy_img_gif" className="buggy_img_gif" />
              <img src={fire_ball_img_2} alt="fire_ball_img_2" className="fire_ball_img_2" style={{ transform: 'scaleX(-1)' }} />  
          </div> */}
          <div className="luke_img_1_container">
            <img src={luke_img_1} alt="luke_img_1" className="luke_img_1" />
            <img src={fire_ball_img} alt="fire_ball_img" className="fire_ball_img" />
          </div>
          <Link to="/" className="back_container">
                <img src={back} alt="title_img_9" id="title_img_9" />
          </Link>
        </div>
        <div className="audio_player_container">
          <AudioPlayer audioFile={audioFile} />
        </div>
      </div>
    </div>
  );
}

export default Luke_secret_lab;
