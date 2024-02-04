import React from 'react';
import './Loser_page.css';
import { Link } from 'react-router-dom';
import game_img from "../images/mm_image_heroic_2.png"

function Loser_page() {
  return (
    <div className="game_over_1">
      {/* <div className="game_over_2"> */}
        <div>
          <h2>GAME OVER!!!!!</h2>
        </div>
      </div>
    // </div>
  );
}

export default Loser_page;