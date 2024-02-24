import React from 'react';
import { useState } from 'react';
import './Luke_win.css';
import { Link } from 'react-router-dom';
import space_ship_img from "../images/spaceship_img.png"
import luke_img_1 from "../images/luckylukeborg_supervillain.png"
import title_img_7 from "../images/Title_7.png"
import title_img_8 from "../images/Title_8.png"
import title_img_9 from "../images/Title_9.png"
import back from "../images/back.png"
// import fire_ball_img from "../images/fire_2.webp"
import final_ball_img from "../images/power_ball_2.gif"
import buggy_img_gif from "../images/babyborg_04.png"
import buggy_img_gif_2 from "../images/babyborg_03.png"
import puppups from "../images/amos 'n' Ruger.png"
import hover from "../images/lazer_1.gif"
import fire from "../images/fire_1.gif"
import smoke from "../images/smoke_1.webp"
import ship from "../images/spaceship_img.png"
import title_img_10 from "../images/Title_10.png";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Aaron Hibell - destroyer of worlds  OPPENHEIMER.mp3'; 

function Luke_win() {

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
    <div className="full_win">
      <div className="win_background">
        <div className="fire_backgroud">
            <div className= "luke_win_center_piece">
              <h2>CONGRATULATIONS!</h2>
              <p>You Win!</p>
              <Link to="/luke_secret_lab" className="title_img_10_container">
                  <img src={title_img_10 } alt="title_img_10" id="title_img_10" />
              </Link>
            </div>
            <div className="spaceship_img_container" >
                    <img src={ship} alt="ship_img" className="ship_img" />
            </div>
            <div className="puppups_img_container_2" >
                    <img src={puppups} alt="puppups_img" className="puppups_img" />
                    <img src={hover} alt="hover_img" className="hover_img" />
            </div>
            <div className="lab_links_2">
                {/* <div className="spaceship_img_container" >
                        <img src={ship} alt="ship_img" className="ship_img" />
                </div> */}
                <div className="buggy_img_gif_container" onClick={handleClick}>
                    <img src={Image} alt="buggy_img_gif" className="buggy_img_gif" />
                </div>
                <div className="luke_img_1_container">
                    <img src={luke_img_1} alt="luke_img_1" className="luke_img_1" />
                    <img src={final_ball_img} alt="final_ball_img" className="final_ball_img" />
                </div>
                <Link to="/" className="back_container">
                        <img src={back} alt="title_img_9" id="title_img_9" />
                </Link>
            </div>
            <div className="fire_container">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
            {/* <div className="smoke_container">
              <img src={smoke} alt="smoke_img_1" className="fire_img_1" />
              <img src={smoke} alt="smoke_img_2" className="smoke_img_2" />
              <img src={smoke} alt="smoke_img_3" className="smoke_img_3" />
              <img src={smoke} alt="smoke_img_4" className="smoke_img_4" />
              <img src={smoke} alt="smoke_img_5" className="smoke_img_5" />
            </div> */}
            <div className="fire_container_2">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
            <div className="fire_container_3">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
            <div className="fire_container_4">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
            <div className="fire_container_5">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
            <div className="fire_container_6">
              <img src={fire} alt="fire_img_1" className="fire_img_1" />
              <img src={fire} alt="fire_img_2" className="fire_img_2" />
              <img src={fire} alt="fire_img_3" className="fire_img_3" />
              <img src={fire} alt="fire_img_4" className="fire_img_4" />
              <img src={fire} alt="fire_img_5" className="fire_img_5" />
            </div>
        </div>
        <div className="audio_player_container">
          <AudioPlayer audioFile={audioFile} />
        </div>
      </div>
    </div>
  );
}

export default Luke_win;