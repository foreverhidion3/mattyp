import React from 'react';
import { Link } from 'react-router-dom';
import './Luke_Photos.css';
import back from "../images/back.png"
import Title_13 from "../images/Title_13.png";
import sis_1 from "../family_pictures/sis_1.jpg";
import sis_2 from "../family_pictures/sis_2.jpg";
import sis_3 from "../family_pictures/sis_3.jpg";
import sis_4 from "../family_pictures/sis_4.jpg";
import sis_5 from "../family_pictures/sis_5.jpg";
// import sis_6 from "../family_pictures/sis_6.png";
// import sis_7 from "../family_pictures/sis_7.jpg";

function Luke_Photos() {
  return (
    <div className="photos_background">
      <Link to="/luke_secret_lab"  className="back_container">
                <img src={back} alt="title_img_9" id="title_img_9" />
      </Link>
        <div className="matt_photo_container">
          <img src={Title_13} alt="title_13_img" className="title_13_img"  />
          <img src={sis_4} alt="sis_1_img" className="sis_imgs" />
          <img src={sis_3} alt="sis_2_img" className="sis_imgs" />
          <img src={sis_2} alt="sis_3_img" className="sis_imgs" />
          <img src={sis_1} alt="sis_4_img" className="sis_imgs" />
          <img src={sis_5} alt="sis_5_img" className="sis_imgs" />
          {/* <img src={sis_6} alt="sis_6_img" className="sis_imgs" />
          <img src={sis_7} alt="sis_7_img" className="sis_imgs" /> */}
        </div>
      </div>
    
  );
}

export default Luke_Photos;