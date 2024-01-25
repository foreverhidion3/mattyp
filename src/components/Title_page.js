import './Title_page.css';
import { Link } from 'react-router-dom';
import title_img from "../images/Title.png"
import play_img from "../images/play_img_2.png"

function Title() {
  return (
    <div className="title">
        {/* <p id="para">Test</p> */}
        <div className="title_image_container">
            <img src= {title_img} alt="title_image" className= "title_image" />
        </div>
        <Link to="/secret_lab" className="play_img_container">
            <img src={play_img} alt="play_img" id="play_img" />
        </Link>
    </div>
  );
}

export default Title;
