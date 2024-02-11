import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Matt_Game_Container.css"
import Hero from "./Matt_Hero.js"
import Jewel from "./Matt_Jewel.js"
import Villain from "./Matt_Villain.js"
import blackhole_img from "../images/blackhole_img.gif";
import AudioPlayer from './Audio_player'; // Import the AudioPlayer component
import audioFile from '../audio/Matt_Game_Music_1.mp3'


function Game_Container() {
    const containerRef = useRef(null); // Define a containerRef
    const [jewelsCollected, setJewelsCollected] = useState(0);
    const [hitsCounted, sethitsCounted] = useState(0);
    const [hero_position, setHeroPosition] = useState({ x: 0, y: 0 }); // Define hero_position state
    const [villain_position, setVillainPosition] = useState({ x: 300, y: 20 }); // Define villain_position state
    const [jewel_position, setJewelPosition] = useState([]); // Define jewel_position state
    const [fireballPositions, setFireballPositions] = useState([]);
    const [collisionTimestamp, setCollisionTimestamp] = useState(0);
    const [hitCounter, setHitCounter] = useState(0); // Initialize hit counter
    const navigate = useNavigate();

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
        sethitsCounted((prevCount) => prevCount + 5);
    };
    useEffect(() => {
        if (hitsCounted >= 1000) {
            navigate('/game_over'); // Navigate to the game over route
        }
    }, [hitsCounted, navigate]);

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
                            {/* <div>Hits Taken: <span>{hitsCounted}</span></div> */}
                            {/* <div className="jewel_counter">Fragments Collected: <span>{jewelsCollected}</span></div>
                            <div className="hit_counter">Hits Taken: <span>{hitsCounted}</span></div> */}
                    </div>
                    
                        <div className="game_container_2">    
                            <Hero setPosition={setHeroPosition} jewelPositions={[]} onJewelCollected={handleJewelCollected} heroPosition={hero_position} fireballPositions={fireballPositions} />
                            <Jewel containerRef={containerRef} onJewelCollected={handleJewelCollected} heroPosition={hero_position} />
                            <Villain heroPosition={hero_position} onHitsCounted={handleHitsCounted} villainPosition={villain_position} setvillainPosition={setVillainPosition} /> 
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






