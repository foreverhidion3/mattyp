import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Title_page.css';
import title_img from "../images/Title.png";
import matt_poster_img from "../images/mattyP_superhero_POSTER.jpg";
import luke_poster_img from "../images/luckylukeborg_supervillain_POSTER.jpg";
import title_img_3 from "../images/Title_3.png";

function Title() {
  const navigate = useNavigate();

  const handleImageClick = (destinationPath) => {
    // Navigate to the respective secret lab based on the clicked image
    navigate(destinationPath);
  };

  const handlePlayButtonClick = () => {
    // Navigate to the game page when the play button is clicked
    navigate("/war"); // Adjust the path as needed
  };

  return (
    <div className="title">
      <div className="title_image_container">
        <img src={title_img} alt="title_image" className="title_image" />
      </div>

      <div className="title_2">
        <div className="matt_poster_img_container" onClick={() => handleImageClick("/matt_loading")}>
          <img src={matt_poster_img} alt="matt_poster_img" id="matt_poster_img" />
        </div>
        <div className="luke_poster_img_container" onClick={() => handleImageClick("/luke_loading")}>
          <img src={luke_poster_img} alt="luke_poster_img" id="luke_poster_img" />
        </div>
      </div>

      <div className="title_image_container_2">
        <img src={title_img_3} alt="title_image" className="title_image_2" />
      </div>

      {/* Button to play the game */}
      <button className="play_button" onClick={handlePlayButtonClick}>
        Play Game
      </button>
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





