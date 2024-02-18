import React, { useState, useEffect, useRef } from 'react';
import './Matt_Health_drop.css'; 
import dropShipImage from "../images/Sidekick_Boy_3.png";
import healthImage from "../images/heart_1.gif";

const Health_drop = ({ containerRef, ship, setShip, hero_position, handleJewelCollected, handleHealth }) => {
    const [shipWidth, setShipWidth] = useState(28);
    const [shipHeight, setShipHeight] = useState(40);
    const [showShip, setShowShip] = useState(false);
    const [dropshipCount, setDropshipCount] = useState(0);
    //for dropping health
    const [health, setHealth] = useState([]);
    const [healthWidth, setHealthWidth] = useState(30);
    const [healthHeight, setHealthHeight] = useState(30);
    const [injured, setInjured] = useState(false);
    const [injuredX, setInjuredX] = useState(0);
    const [injuredY, setInjuredY] = useState(0);
    const [showHealth, setShowHealth] = useState(false); 
    const [isAddingHealth, setIsAddingHealth] = useState(false); 

    const healthRef = useRef(null); // Ref for health image
    const animationFrameshipRef = useRef(null);
    const shipRef = useRef(null);

    // Maximum number of ships allowed
    const MAX_SHIPS = 10;

    // Function to add a new ship
    const addShip = () => {
        
            // Generate random initial direction for the ship
            const initialXDirection = Math.random() < 0.5 ? 1 : -1;
            const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
            // Set the starting position of the ship
            const shipStartX = 100;
            const shipStartY = 100;
    
            setShip((prevShip) => [
                ...prevShip,
                {
                    x: shipStartX,
                    y: shipStartY,
                    xDirection: initialXDirection,
                    yDirection: initialYDirection,
                },
            ]);
            setDropshipCount(dropshipCount + 1); 
            if (!showShip) {
                setShowShip(true);
            }
        
    };
    const dropShip = () => {
        if (dropshipCount < MAX_SHIPS) {
            addShip();
            // Schedule the removal of the ship after ten seconds
            setTimeout(() => {
                setShip([]);
            }, 20000); // 10000 milliseconds = 10 seconds
        }
    };

    // Set up interval to add ships every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(dropShip, 30000); //60000

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [dropshipCount]);

    // Animate ships
    useEffect(() => {
        const animateShip = () => {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const shipSpeed = 1;

            setShip((prevShip) =>
                prevShip.map((ship) => ({
                    ...ship,
                    x: ship.x + ship.xDirection * shipSpeed,
                    y: ship.y + ship.yDirection * shipSpeed,
                    xDirection:
                        ship.x + ship.xDirection * shipSpeed >= containerWidth - shipWidth ||
                        ship.x + ship.xDirection * shipSpeed <= 0
                            ? ship.xDirection * -1
                            : ship.xDirection,
                    yDirection:
                        ship.y + ship.yDirection * shipSpeed >= containerHeight - shipHeight ||
                        ship.y + ship.yDirection * shipSpeed <= 0
                            ? ship.yDirection * -1
                            : ship.yDirection,
                }))
            );
            animationFrameshipRef.current = requestAnimationFrame(animateShip);
        };

        if (showShip && ship.length > 0) {
            animationFrameshipRef.current = requestAnimationFrame(animateShip);
        }

        return () => cancelAnimationFrame(animationFrameshipRef.current);
    }, [showShip, ship]);

    const generateRandomPosition = () => {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const randomX = Math.floor(Math.random() * (containerWidth - healthWidth));
        const randomY = Math.floor(Math.random() * (containerHeight - healthHeight));
        return { x: randomX, y: randomY };
    };

    const addHealth = () => {
        setHealth(prevHealth => {
            if (prevHealth.length < 1) {
                const newHealth = generateRandomPosition();
                return [...prevHealth, newHealth];  
            }
            setShowHealth(true);
            return prevHealth;
            
        });
    };

    //is injured? drop health
    useEffect(() => {
        console.log("Is Adding Health:", isAddingHealth);
        if (injured) {
        setShowHealth(true); 
        const resetInjured = setTimeout(() => {
            setInjured(false);  
            setIsAddingHealth(false);   
            addHealth(injuredX, injuredY);    
        }, 500); 
        return () => clearTimeout(resetInjured);
        } else { 
        setIsAddingHealth(false); 
        }
    }, [injured, injuredX, injuredY]);

    const checkCollisions = () => {
        health.forEach((option, index) => {
            const isCollision =
                hero_position.x < option.x + healthWidth &&
                hero_position.x + 20 > option.x &&
                hero_position.y < option.y + healthHeight &&
                hero_position.y + 20 > option.y;

            if (isCollision) {
                console.log("Collision detected with jewel at coordinates:", health);
                // handleJewelCollected();
                collectHeart(index);
                handleHealth();
            }
        });
    };

    const collectHeart = (index) => {
        setHealth((prevHealth) => prevHealth.filter((_, i) => i !== index));
    };

    useEffect(() => {
        checkCollisions();
    }, [health, hero_position]);


    return (
        <>
            {showShip &&
                ship.map((ship, index) => (
                    <img
                        key={index}
                        src={dropShipImage}
                        alt="ship"
                        className="ship"
                        style={{
                            position: 'absolute',
                            left: `${ship.x}px`,
                            top: `${ship.y}px`,
                            width: shipWidth,
                            height: shipHeight,
                            zIndex: 2,
                            cursor: 'pointer', // Add pointer cursor for better UX
                        }}
                        onClick={() => {
                            if (health.length < 1) {
                                setInjured(true);
                                setIsAddingHealth(true);
                                addHealth();
                                setShip([]);

                            }
                        }}
                    />
                ))     
            }
            {showHealth &&
                health.map((health_var, index) => (
                    <img
                        key={index}
                        src={healthImage}
                        alt='health'
                        className='health_img'
                        style={{ 
                            position: 'absolute', 
                            left: health_var.x, 
                            top: health_var.y, 
                            width: healthWidth, 
                            height: healthHeight, 
                            zIndex: 1 }}
                    />
                ))
            }
        </>
    );
};

export default Health_drop;