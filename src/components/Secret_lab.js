import React from 'react';
import './Secret_lab.css';
import { Link } from 'react-router-dom';
import game_img from "../images/mm_image_heroic_2.png"

function Secret_lab() {
  return (
    <div className="full_lab">
      <div className="lab_background">
        {/* <div>
          <h2>This is the Secret Lab!</h2>
        </div> */}
        <Link to="/game" className="game_img_container">
            <img src={game_img} alt="game_img" id="game_img" />
        </Link>
      </div>
    </div>
  );
}

export default Secret_lab;