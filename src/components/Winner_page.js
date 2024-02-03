import React from 'react';
import './Winner_page.css';
import { Link } from 'react-router-dom';
import game_img from "../images/mm_image_heroic_2.png"

function Winner_page() {
  return (
    <div className="full_lab">
      <div className="lab_background">
        <div>
          <h2>YOU WIN!!!!!</h2>
        </div>
      </div>
    </div>
  );
}

export default Winner_page;