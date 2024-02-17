import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Luke_Game_Container.css"
import Hero from "./Luke_Hero.js"
import Jewel from "./Luke_Jewel.js"
import Villain from "./Luke_Villain.js"
import Health_drop from "./Health_drop.js"
import Luke_travel from "./Luke_travel";
import Luke_loser_page from "./Luke_loser_page";
import blackhole_img from "../images/blackhole_img.gif";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Destroyer of worlds - Aaron Hibell José Vicente Plaza Edit Extended mix.mp3'; // Import your audio file

function Game_Container() {
    const containerRef = useRef(null); // Define a containerRef
    const [jewelsCollected, setJewelsCollected] = useState(0);
    const [hitsCounted, sethitsCounted] = useState(0);
    const [hero_position, setHeroPosition] = useState({ x: 0, y: 0 }); // Define hero_position state
    const [ship, setShip] = useState([{ x: 0, y: 0 }], [{ x: 0, y: 0 }]);
    const [villain_position, setVillainPosition] = useState({ x: 300, y: 20 }); // Define villain_position state
    const [jewel_position, setJewelPosition] = useState([]); // Define jewel_position state
    const [fireballPositions, setFireballPositions] = useState([]);
    const [collisionTimestamp, setCollisionTimestamp] = useState(0);
    const [hitCounter, setHitCounter] = useState(0); // Initialize hit counter
    const navigate = useNavigate();
    const [gameOver, setGameOver] = useState(false); // Define gameOver state

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

    const handleJewelCollected = () => {
        setJewelsCollected((prevCount) => prevCount + 1);
    };
    const handleHitsCounted = () => {
        sethitsCounted((prevCount) => prevCount + .5);
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
    }, [navigate]);

    const getHitsCounterColor = (hitsCount) => {
        if (hitsCount >= 800) {
            return 'hits_red';
        } else if (hitsCount >= 400) {
            return 'hits_yellow';
        } else {
            return 'hits_green';
        }
    };

    return (
        <div className="body">
            <div className="game_body">
                <div className="game_background">
                    <div className='game_counters'>
                            <div>Fragments Collected: <span>{jewelsCollected}</span></div>
                            <div className={getHitsCounterColor(hitsCounted)}>Hits Taken: <span>{hitsCounted}</span></div>
                    </div>
                    <div className="game_container_2">
                        <Hero setPosition={setHeroPosition} jewelPositions={[]} onJewelCollected={handleJewelCollected} heroPosition={hero_position} fireballPositions={fireballPositions} />
                        <Jewel containerRef={containerRef} onJewelCollected={handleJewelCollected} heroPosition={hero_position} />
                        <Villain heroPosition={hero_position} onHitsCounted={handleHitsCounted} villainPosition={villain_position} setvillainPosition={setVillainPosition} /> 
                        <Health_drop containerRef={containerRef} shipPositions={ship} setShipPositions={setShip} />
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



//works best

// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Game_Container.css"
// import Hero from "./Hero.js"
// import Jewel from "./Jewel.js"
// import Villain from "./Villain.js"

// function Game_Container() {
//     const containerRef = useRef(null); // Define a containerRef
//     const [jewelsCollected, setJewelsCollected] = useState(0);
//     const [hitsCounted, sethitsCounted] = useState(0);
//     const [hero_position, setHeroPosition] = useState({ x: 0, y: 0 }); // Define hero_position state
//     const [villain_position, setVillainPosition] = useState({ x: 300, y: 20 }); // Define villain_position state
//     const [jewel_position, setJewelPosition] = useState([]); // Define jewel_position state
//     const [fireballPositions, setFireballPositions] = useState([]);
//     const [collisionTimestamp, setCollisionTimestamp] = useState(0);
//     const [hitCounter, setHitCounter] = useState(0); // Initialize hit counter
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Get a reference to the game container element
//         const gameContainer = document.querySelector('.game_container_2');
//         containerRef.current = gameContainer; // Assign the game container element to containerRef

//         // Set the initial dimensions for larger screens
//         gameContainer.style.width = '500px';
//         gameContainer.style.height = '800px';

//         // Check if the screen width is less than or equal to 600px
//         const adjustDimensions = () => {
//             const gameContainer = containerRef.current;
//             if (gameContainer) {
//                 if (window.matchMedia('(max-width: 600px)').matches) {
//                     // Adjust dimensions for smaller screens
//                     gameContainer.style.width = '375px';
//                     gameContainer.style.height = '650px';
//                 } else {
//                     // Adjust dimensions for larger screens
//                     gameContainer.style.width = '500px';
//                     gameContainer.style.height = '800px';
//                 }
//             }
//         };
//         // Call adjustDimensions initially and add event listener for window resize
//         adjustDimensions();
//         window.addEventListener('resize', adjustDimensions);
//         // Cleanup function to remove the event listener
//         return () => {
//             window.removeEventListener('resize', adjustDimensions);
//         };
//     }, []); // Empty dependency array ensures the effect runs only once after initial render

//     const handleJewelCollected = () => {
//         setJewelsCollected((prevCount) => prevCount + 1);
//     };
//     const handleHitsCounted = () => {
//         sethitsCounted((prevCount) => prevCount + 5);
//     };
//     useEffect(() => {
//         if (hitsCounted >= 1000) {
//             navigate('/game_over'); // Navigate to the game over route
//         }
//     }, [hitsCounted, navigate]);

//     return (
//         <div className="Test">
//             <p style={{ color: 'red' }}>Jewels Collected: {jewelsCollected}</p> 
//             <p style={{ color: 'blue' }}>Hits: {hitsCounted}</p> {/* Display hit counter */}
//             <div className="game_container_2">    
//                 <Hero setPosition={setHeroPosition} jewelPositions={[]} onJewelCollected={handleJewelCollected} heroPosition={hero_position} fireballPositions={fireballPositions} />
//                 <Jewel containerRef={containerRef} onJewelCollected={handleJewelCollected} heroPosition={hero_position} />
//                 <Villain heroPosition={hero_position} onHitsCounted={handleHitsCounted} villainPosition={villain_position} setvillainPosition={setVillainPosition} /> 
//             </div>
//         </div>
//     );
// }

// export default Game_Container;






