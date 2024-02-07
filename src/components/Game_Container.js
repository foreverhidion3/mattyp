import React, { useEffect, useRef, useState } from 'react';
import "./Game_Container.css"
import Hero from "./Hero.js"
import Jewel from "./Jewel.js"

function Game_Container() {
    const containerRef = useRef(null); // Define a containerRef
    const [jewelsCollected, setJewelsCollected] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Define position state
    const [jewelPositions, setJewelPositions] = useState([]); // Define jewelPositions state

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

    return (
        <div className="Test">
            <p style={{ color: 'red' }}>Jewels Collected: {jewelsCollected}</p> 
            <div className="game_container_2">    
                <Hero setPosition={setPosition} jewelPositions={[]} onJewelCollected={handleJewelCollected} />
                <Jewel containerRef={containerRef} onJewelCollected={handleJewelCollected} heroPosition={position} />  
            </div>
        </div>
    );
}
 
export default Game_Container;

























































