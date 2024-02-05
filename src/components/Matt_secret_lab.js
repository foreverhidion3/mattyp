import React from 'react';
import { useState } from 'react';
import './Matt_secret_lab.css';
import { Link } from 'react-router-dom';
import game_img from "../images/mattyP_superhero_01.png"
import mattyp_img_1 from "../images/mattyP_superhero_01.png"
import mattyp_img_2 from "../images/mattyP_superhero_02.png"
import mattyp_img_3 from "../images/mattyP_superhero_03.png"

function Matt_secret_lab() {

  const [currentImage, setCurrentImage] = useState(mattyp_img_1);

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
  return (
    <div className="full_lab">
      <div className="space_station_background">
        <Link to="/game" className="game_img_container">
          <img src={game_img} alt="game_img" id="game_img" />
        </Link>
        <div className="mattyp_img_1_container" onClick={handleClick}>
          <img src={currentImage} alt="mattyp_img_1" className="mattyp_img_1" />
        </div>
        {/* <div className="mattyp_img_1_container">
              <img src= {mattyp_img_2} alt="mattyp_img_1" className= "mattyp_img_1" />
        </div>
        <div className="mattyp_img_1_container">
              <img src= {mattyp_img_3} alt="mattyp_img_1" className= "mattyp_img_1" />
        </div> */}
      </div>
    </div>
  );
}

export default Matt_secret_lab;