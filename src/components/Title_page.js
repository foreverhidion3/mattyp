import './Title_page.css';
import { Link } from 'react-router-dom';
import title_img from "../images/Title.png"
import matt_poster_img from "../images/mattyP_superhero_POSTER.jpg"
import luke_poster_img from "../images/luckylukeborg_supervillain_POSTER.jpg"
import title_img_3 from "../images/Title_3.png"

function Title() {
  return (
    <div className="title">
          <div className="title_image_container">
              <img src= {title_img} alt="title_image" className= "title_image" />
          </div>
        <div className="title_2">
          {/* <p id="para">Test</p> */}
          <Link to="/matt_secret_lab" className="matt_poster_img_container">
              <img src={matt_poster_img} alt="matt_poster_img" id="matt_poster_img" />
          </Link>
          <Link to="/luke_secret_lab" className="luke_poster_img_container">
              <img src={luke_poster_img} alt="luke_poster_img" id="luke_poster_img" />
          </Link>
        </div>
          <div className="title_image_container_2">
              <img src= {title_img_3} alt="title_image" className= "title_image_2" />
          </div>
    </div>
  );
}

export default Title;
