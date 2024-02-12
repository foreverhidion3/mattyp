import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Luke_loser_page.css';
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Ludwig Görensson - Destroyer Of Worlds slowed to perfection  reverb.mp3'; // Import your audio file

function Luke_loser_page() {
  const location = useLocation();
  const hitsCounted = location.state ? location.state.hitsCounted : 0;
  const jewelsCollected = location.state ? location.state.jewelsCollected : 0;

  return (
    <div className="luke_game_over_background">
      <div>
        <h2>GAME OVER!!!!!</h2>
        <p>Score: {jewelsCollected}</p>
        {/* <p>Hits Counted: {hitsCounted}</p> */}
        <Link to="/luke_secret_lab">Return to Lab</Link>
      </div>
      <div className="audio_player_container">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default Luke_loser_page;

// import React from 'react';
// import './Luke_loser_page.css';
// import { Link } from 'react-router-dom';
// // import game_img from "../images/mm_image_heroic_2.png"

// function Luke_loser_page() {
//   return (
//     <div className="luke_game_over_background">
//         <div>
//           <h2>GAME OVER!!!!!</h2>
//         </div>
//       </div>
//     // </div>
//   );
// }

// export default Luke_loser_page;