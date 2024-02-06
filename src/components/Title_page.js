import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Title_page.css';
import title_img from "../images/Title.png";
import matt_poster_img from "../images/mattyP_superhero_POSTER.jpg";
import luke_poster_img from "../images/luckylukeborg_supervillain_POSTER.jpg";
import title_img_3 from "../images/Title_3.png";
import matt_loading from "../images/matt_loading.jpg";
import luke_loading from "../images/luke_loading.jpg";

function Title() {
  const [showTemporaryImage, setShowTemporaryImage] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (destinationPath) => {
    // Determine imagePath based on destinationPath
    const imagePath = destinationPath === "/matt_secret_lab" ? matt_loading : luke_loading;

    setTemporaryImage(imagePath);
    setShowTemporaryImage(true);

    setTimeout(() => {
      setShowTemporaryImage(false);
      navigate(destinationPath);
    }, 4000);
  };

  return (
    <div className="title">
      <div className="title_image_container">
        <img src={title_img} alt="title_image" className="title_image" />
      </div>

      <div className="title_2">
        <div className="matt_poster_img_container" onClick={() => handleImageClick("/matt_secret_lab")}>
          <img src={matt_poster_img} alt="matt_poster_img" id="matt_poster_img" />
        </div>
        <div className="luke_poster_img_container" onClick={() => handleImageClick("/luke_secret_lab")}>
          <img src={luke_poster_img} alt="luke_poster_img" id="luke_poster_img" />
        </div>
      </div>

      <div className="title_image_container_2">
        <img src={title_img_3} alt="title_image" className="title_image_2" />
      </div>

      {showTemporaryImage && (
        <img src={temporaryImage} alt="temporary_image" className="temporary_images" />
      )}
    </div>
  );
}

export default Title;

// return (
//   <div className="title">
//         <div className="title_image_container">
//             <img src= {title_img} alt="title_image" className= "title_image" />
//         </div>
//       <div className="title_2">
//         {/* <p id="para">Test</p> */}
//         <Link to="/matt_secret_lab" className="matt_poster_img_container">
//             <img src={matt_poster_img} alt="matt_poster_img" id="matt_poster_img" />
//         </Link>
//         <Link to="/luke_secret_lab" className="luke_poster_img_container">
//             <img src={luke_poster_img} alt="luke_poster_img" id="luke_poster_img" />
//         </Link>
//       </div>
//         <div className="title_image_container_2">
//             <img src= {title_img_3} alt="title_image" className= "title_image_2" />
//         </div>
//   </div>
// );
// }

// export default Title;





