import React from 'react';
import { useState } from 'react';
import './Matt_secret_lab.css';
import { Link } from 'react-router-dom';
import game_img from "../images/mattyP_superhero_01.png"
import mattyp_img_1 from "../images/mattyP_superhero_01.png"
import mattyp_img_2 from "../images/mattyP_superhero_02.png"
import mattyp_img_3 from "../images/mattyP_superhero_03.png"
import sidekick_boy_1 from "../images/Sidekick_Boy_1.png"
import sidekick_boy_2 from "../images/Sidekick_Boy_2.png"
import sidekick_boy_3 from "../images/Sidekick_Boy_3.png"
import sidekick_boy_4 from "../images/Sidekick_Boy_4.png"
import sidekick_boy_5 from "../images/Sidekick_Boy_5.png"
import title_img_4 from "../images/Title_4.png"
import title_img_5 from "../images/Title_5.png"
import title_img_6 from "../images/Title_6.png"
import back_2 from "../images/back_2.png"
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/MattyP_Theme.mp3'; // Import your audio file


function Matt_secret_lab() {

  const [currentImage, setCurrentImage] = useState(mattyp_img_1);
  const [sidekickcurrentImage, setsidekickCurrentImage] = useState(sidekick_boy_1);

  const handleClick = () => {
    // Switching logic
    if (currentImage === mattyp_img_1) {
      setCurrentImage(mattyp_img_2);
    } else if (currentImage === mattyp_img_2) {
      setCurrentImage(mattyp_img_3);
    } else {
      setCurrentImage(mattyp_img_1); // Go back to the first image
    }
  };
  const handleClick_2 = () => {
    // Switching logic
    if (sidekickcurrentImage === sidekick_boy_1) {
      setsidekickCurrentImage(sidekick_boy_2);
    } else if (sidekickcurrentImage === sidekick_boy_2) {
      setsidekickCurrentImage(sidekick_boy_3);
    } else if (sidekickcurrentImage === sidekick_boy_3) {
      setsidekickCurrentImage(sidekick_boy_4);
    } else if (sidekickcurrentImage === sidekick_boy_4) {
      setsidekickCurrentImage(sidekick_boy_5);
    } else if (sidekickcurrentImage === sidekick_boy_5) {
      setsidekickCurrentImage(sidekick_boy_1);
    }
  };
   
  return (
    <div className="full_lab">
      <div className="space_station_background">
        <div className="space_station_links">
          <div className="menu_2">
            <Link to="/matt_game_full" className="title_img_4_container">
                <img src={title_img_4} alt="title_img_4" id="title_img_4" /> 
            </Link>
            {/* <Link to="/story_mode" className="title_img_5_container">
                <img src={title_img_5} alt="title_img_5" id="title_img_5" />
            </Link> */}
            <Link to="/matt_photos" className="title_img_6_container">
                <img src={title_img_6} alt="title_img_6" id="title_img_6" />
            </Link>
          </div>
          <div className="mattyp_img_1_container" onClick={handleClick}>
            <img src={currentImage} alt="mattyp_img_1" className="mattyp_img_1" />
          </div>
          <div className="sidekick_boy_img_container" onClick={handleClick_2}>
            <img src={sidekickcurrentImage} alt="sidekick_boy_1" className="sidekick_boy_1" />
          </div>
          <Link to="/" className="back_container">
                <img src={back_2} alt="title_img_9" id="title_img_9" />
          </Link>
        </div>
        <div className="audio_player_container">
          <AudioPlayer audioFile={audioFile} />
        </div>
      </div>
    </div>
  );
}

export default Matt_secret_lab;