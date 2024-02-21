import React from 'react';
import { Link } from 'react-router-dom';
import './Matt_Photos.css';
import back_2 from "../images/back_2.png"
import Title_12 from "../images/Title_12.png";
import paul_1 from "../family_pictures/paul_1.jpg";
import paul_2 from "../family_pictures/paul_2.jpg";
import paul_3 from "../family_pictures/paul_3.jpg";
import paul_4 from "../family_pictures/paul_4.jpg";
import paul_5 from "../family_pictures/paul_5.jpg";
import paul_6 from "../family_pictures/paul_6.png";
import paul_7 from "../family_pictures/paul_7.jpg";

function Matt_Photos() {
  return (
    <div className="photos_background">
        <div className="matt_photo_container">
        <Link to="/" className="back_container">
                <img src={back_2} alt="title_img_9" id="title_img_9" />
        </Link>
          <img src={Title_12} alt="title_12_img" className="title_12_img" />
          <img src={paul_4} alt="paul_1_img" className="paul_imgs" />
          <img src={paul_3} alt="paul_2_img" className="paul_imgs" />
          <img src={paul_2} alt="paul_3_img" className="paul_imgs" />
          <img src={paul_1} alt="paul_4_img" className="paul_imgs" />
          <img src={paul_5} alt="paul_5_img" className="paul_imgs" />
          <img src={paul_6} alt="paul_6_img" className="paul_imgs" />
          <img src={paul_7} alt="paul_7_img" className="paul_imgs" />
        </div>
      </div>
    
  );
}

export default Matt_Photos;


