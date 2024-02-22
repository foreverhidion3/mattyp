import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Luke_Game_Container.css"
import back from "../images/back.png"
import Health_bar from "./Health_bar.js"
import Hero from "./Luke_Hero.js"
import Jewel from "./Luke_Jewel.js"
import Villain from "./Luke_Villain.js"
import Health_drop from "./Luke_Health_drop.js"
import Luke_travel from "./Luke_travel";
import Luke_loser_page from "./Luke_loser_page";
import blackhole_img from "../images/blackhole_img.gif";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Destroyer of worlds - Aaron Hibell José Vicente Plaza Edit Extended mix.mp3'; // Import your audio file

function Game_Container() {
    const containerRef = useRef(null); // Define a containerRef
    const [jewelsCollected, setJewelsCollected] = useState(0);
    const [jewelsStolen, setJewelsStolen] = useState(0);
    const [hitsCounted, sethitsCounted] = useState(0);
    const [hero_position, setHeroPosition] = useState({ x: 0, y: 0 }); // Define hero_position state
    const [ship, setShip] = useState([]);
    const [villain_position, setVillainPosition] = useState({ x: 300, y: 20 }); // Define villain_position state
    const [jewel_position, setJewelPosition] = useState([]); // Define jewel_position state
    const [fireballPositions, setFireballPositions] = useState([]);
    const [collisionTimestamp, setCollisionTimestamp] = useState(0);
    const [hitCounter, setHitCounter] = useState(0); // Initialize hit counter
    const navigate = useNavigate();
    const [gameOver, setGameOver] = useState(false); // Define gameOver state

    const maxHealth = 1000; // Define the maximum health

    useEffect(() => {
        // Get a reference to the game container element
        const gameContainer = document.querySelector('.game_container_2');
        containerRef.current = gameContainer; // Assign the game container element to containerRef

        // Set the initial dimensions for larger screens
        gameContainer.style.width = '500px';
        gameContainer.style.height = '800px';

        // Check if the screen width is less than or equal to 600px
        const adjustDimensions = () => {
            const gameContainer = containerRef.current;
            if (gameContainer) {
                if (window.matchMedia('(max-width: 600px)').matches) {
                    // Adjust dimensions for smaller screens
                    gameContainer.style.width = '375px';
                    gameContainer.style.height = '650px';
                } else {
                    // Adjust dimensions for larger screens
                    gameContainer.style.width = '500px';
                    gameContainer.style.height = '800px';
                }
            }
        };
        // Call adjustDimensions initially and add event listener for window resize
        adjustDimensions();
        window.addEventListener('resize', adjustDimensions);
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', adjustDimensions);
        };
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    const handleJewelCollected = (value) => {
        setJewelsCollected((prevCount) => prevCount + value);
    };

    const handleJewelStolen = (value) => {
        setJewelsStolen((prevCount) => prevCount + value);
    };
    
    const handleHitsCounted = () => {
        sethitsCounted((prevCount) => Math.max(0, prevCount + 0.5)); // Ensure hitsCounted never goes below 0
    };

    const handleHealth = () => {
        sethitsCounted((prevCount) => Math.max(0, prevCount - 100)); // Ensure health points never go below 0
    };

    useEffect(() => {
        if (jewelsCollected < 100 && hitsCounted >= 1000) {
            console.log("Game_Container Log", hitsCounted)
            console.log("jewelsCollected", jewelsCollected)
            setGameOver(true); // Set gameOver to true
            navigate('/luke_travel', { state: { hitsCounted, jewelsCollected } });
        }
    }, [hitsCounted, jewelsCollected, navigate]);

    useEffect(() => {
        if (jewelsCollected >= 100) {
            console.log("You Win")
            setGameOver(true); // Set gameOver to true
            navigate('/luke_win_travel');
        }
    }, [jewelsCollected, navigate]);

    // Black Hole Damage
    useEffect(() => {
        const handleBlackHoleDamage = () => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const heroBottom = hero_position.y + 120; // Assuming the height of the hero image is 120px
    
            // Calculate the distance between the hero and the bottom of the container
            const distanceToBottom = containerRect.bottom - heroBottom;
            console.log("Distance to bottom:", distanceToBottom);
    
            // Check if the hero is within a certain threshold to the bottom
            if (distanceToBottom <= 200) {
                // Apply damage to the player
                sethitsCounted((prevCount) => Math.max(0, prevCount + .3)); // Reduce health by 50 points
            }
        };
    
        const intervalId = setInterval(handleBlackHoleDamage, 1); // Check every 100ms for proximity to bottom
    
        return () => clearInterval(intervalId);
    }, [hero_position, hitsCounted]);

    return (
        <div className="body">
            <Link to="/luke_secret_lab"  className="back_container">
                <img src={back} alt="title_img_9" id="title_img_9" />
            </Link>
            <div className="game_body">
                <div className="game_background">
                    <div className='game_counters'>
                            <div>Fragments Collected: <span>{jewelsCollected}</span></div>
                            {/* <div>Fragments Stolen: <span>{jewelsStolen}</span></div> */}
                            {/* <div className={getHitsCounterColor(hitsCounted)}>Hits Taken: <span>{hitsCounted}</span></div> */}
                            <Health_bar handleHitsCounted={handleHitsCounted} hitsCounted={hitsCounted} maxHealth={maxHealth} />
                    </div>
                    <div className="game_container_2">
                        <Hero setPosition={setHeroPosition} jewelPositions={[]} onJewelCollected={handleJewelCollected} heroPosition={hero_position} fireballPositions={fireballPositions} />
                        <Jewel containerRef={containerRef} handleJewelCollected={handleJewelCollected} handleJewelStolen={handleJewelStolen} heroPosition={hero_position} />
                        <Villain heroPosition={hero_position} onHitsCounted={handleHitsCounted} villain_position={villain_position} setVillainPosition={setVillainPosition} /> 
                        <Health_drop containerRef={containerRef} ship={ship} setShip={setShip} hero_position={hero_position} handleJewelCollected={handleJewelCollected} handleHealth={handleHealth}/>
                    </div>
                    <div className="game_background_2">
                        <img
                            src={blackhole_img}
                            id='blackhole_img'
                        />
                    </div>
                    <div className="audio_player_container">
                        <AudioPlayer audioFile={audioFile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game_Container;



