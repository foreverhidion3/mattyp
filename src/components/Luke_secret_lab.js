import React from 'react';
import './Luke_secret_lab.css';
import { Link } from 'react-router-dom';
import space_ship_img from "../images/spaceship_img.png"
import luke_img_1 from "../images/luckylukeborg_supervillain.png"
import title_img_4 from "../images/Title_4.png"
import title_img_5 from "../images/Title_5.png"
import title_img_6 from "../images/Title_6.png"

function Luke_secret_lab() {
  return (
    <div className="full_lab">
      <div className="lab_background">
        {/* <div>
          <h2>This is the Secret Lab!</h2>
        </div> */}
        <Link to="/game" className="game_img_container">
            <img src={space_ship_img} alt="game_img" id="game_img" />
        </Link>
        <div className="menu">
          <Link to="/game_full" className="title_img_4_container">
              <img src={title_img_4} alt="title_img_4" id="title_img_4" />
          </Link>
          <Link to="/story_mode" className="title_img_5_container">
              <img src={title_img_5} alt="title_img_5" id="title_img_5" />
          </Link>
          <Link to="/photos" className="title_img_6_container">
              <img src={title_img_6} alt="title_img_6" id="title_img_6" />
          </Link>
        </div>
        <div className="luke_img_1_container">
          <img src={luke_img_1} alt="luke_img_1" className="luke_img_1" />
        </div>
      </div>
    </div>
  );
}

export default Luke_secret_lab;