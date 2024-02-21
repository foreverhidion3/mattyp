import React from 'react';
import './Luke_Game_full.css';
import { Link } from 'react-router-dom';
import play_img_2 from "../images/play_img_2.png";
import back from "../images/back.png"

function Luke_Game_full() {
  return (
    <div className="game_full_background">
      <Link to="/luke_secret_lab"  className="back_container">
                <img src={back} alt="title_img_9" id="title_img_9" />
      </Link>
      <div className="instructions_container">
        <h2>Instructions:</h2>
        <div id="background">Background:</div>
        <p>
          MattyP and Lucky LukeBorg are at war. 
        </p>
        <p>  
          The LukeBorg (MattyP's long lost brother) has stolen MattyP's niece "Baby Bug" and turned her into the "BuggyBorg"...a hedious monster of unspeakable evil. 
          On top of this insult, LukeBorg has also pitted MattyP's own pups against him, turning our hero's once loved pets into a two-headed demon dog named "Pup-0bot".
        </p>
        <p>
          As leader of a cult that worships the idea of becoming one with machines, LukeBorg is on a mission to collect the fragments of a space rock near a dying star in the Elysium Nebula. 
          These rocks are highly radioactive but full of dark-matter and LukeBorg intends to use their energy to "perfect" nature by making all things one with The Singularity.
        </p>
        <p>
          Despite the pure love he holds in his heart for his brother, Our Hero is determined to stop the evil cyborg at all costs, rescue his neice, and take revenge for the loss of his beloved animals.
        </p>
        <div id="instructions">Instructions:</div>
        <p>Be the first to gather <span id="hundred">100</span>  fragments to win the game.</p>
        <p>Move via point and click. Allow your hero or villain to drift toward your desired location.</p>
        <p>Dodge and avoid the enemies' attacks.</p>
        <p>Fragments nearer the dying star are worth twice the points. But be careful, the closer you get to the star, the higher the level of radiation.</p>
        <p>Each player has a helper character to drop health or shield-energy. But, you have to catch them first!</p>
        <p>Have fun!</p>
      </div>
      <div className="play_img_2_container">
        <Link to="/luke_war">
          <img src={play_img_2} alt="play_img_2" id="play_img_2" />
        </Link>
      </div>
    </div>
  );
}

export default Luke_Game_full;
