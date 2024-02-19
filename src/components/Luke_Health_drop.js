import React, { useState, useEffect, useRef } from 'react';
import './Luke_Health_drop.css'; 
import dropShipImage from "../images/amos 'n' Ruger.png";
import healthImage from "../images/battery_6.gif";

const Health_drop = ({ containerRef, ship, setShip, hero_position, handleJewelCollected, handleHealth }) => {
    const [shipWidth, setShipWidth] = useState(40);
    const [shipHeight, setShipHeight] = useState(28);
    const [showShip, setShowShip] = useState(false);
    const [dropshipCount, setDropshipCount] = useState(0);
    //for dropping health
    const [health, setHealth] = useState([]);
    const [healthWidth, setHealthWidth] = useState(40);
    const [healthHeight, setHealthHeight] = useState(40);
    const [injured, setInjured] = useState(false);
    const [injuredX, setInjuredX] = useState(0);
    const [injuredY, setInjuredY] = useState(0);
    const [showHealth, setShowHealth] = useState(false); 
    const [isAddingHealth, setIsAddingHealth] = useState(false); 

    const healthRef = useRef(null); // Ref for health image
    const animationFrameshipRef = useRef(null);
    const shipRef = useRef(null);

    // Maximum number of ships allowed
    const MAX_SHIPS = 13;

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
        //console.log for isAddingBanana state
        console.log("Is Adding Health:", isAddingHealth);
        if (injured) {
        setShowHealth(true); 
    
        const resetInjured = setTimeout(() => {
            setInjured(false);
            //Reset adding banana status 
            setIsAddingHealth(false);
            //Add banana near the monkey when it gets injured 
            addHealth(injuredX, injuredY);
            //Delay in milliseconds before resetting injured state 
        }, 500); 
    
        return () => clearTimeout(resetInjured);
        } else {
        //Reset adding banana status when the monkey is not injured
        setIsAddingHealth(false); 
        }
    }, [injured, injuredX, injuredY]);

    const checkCollisions = () => {
        health.forEach((option, index) => {
            const isCollision =
                hero_position.x < option.x + healthWidth &&
                hero_position.x + 100 > option.x &&
                hero_position.y < option.y + healthHeight &&
                hero_position.y + 100 > option.y;

            if (isCollision) {
                console.log("Collision detected with jewel at coordinates:", health);
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











//add health
    // const addHealth = (x, y) => {
    //     if (health.length < 1) {
    //     // Generate random initial direction for the health
    //     const initialXDirection = Math.random() < 0.5 ? 1 : -1;
    //     const initialYDirection = Math.random() < 0.5 ? 1 : -1;

    //     //set the starting position of the health relative to the ship
    //     //Half of the ship's width
    //     const healthStartX = x + shipRef.current.width / 4;
    //     //Half of the ship's height
    //     //Does this look good at all sizes? 
    //     const healthStartY = y + shipRef.current.height / 2; 

    //     setHealth((prevHealth) => [
    //         ...prevHealth,
    //         {
    //         x: healthStartX,
    //         y: healthStartY,
    //         xDirection: initialXDirection,
    //         yDirection: initialYDirection,
    //         },
    //     ]);
    //     setShowHealth(true);
    //     setHealth(health + 1)
    //     }
    // };



// import React, { useState, useEffect, useRef } from 'react';
// import './Health_drop.css'; 
// import dropShipImage from "../images/amos.png";

// const Health_drop = ({ containerRef, ship, setShip }) => {
//     const [shipWidth, setShipWidth] = useState(30);
//     const [shipHeight, setShipHeight] = useState(15);
//     const [showShip, setShowShip] = useState(false);
//     const [dropshipCount, setDropshipCount] = useState(0);

//     const shipRef = useRef(null);
//     const animationFrameshipRef = useRef(null);

//     // Maximum number of ships allowed
//     const MAX_SHIPS = 4;

//     // Function to add a new ship
//     const addShip = () => {
        
//             // Generate random initial direction for the ship
//             const initialXDirection = Math.random() < 0.5 ? 1 : -1;
//             const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
//             // Set the starting position of the ship
//             const shipStartX = 100;
//             const shipStartY = 100;
    
//             setShip((prevShip) => [
//                 ...prevShip,
//                 {
//                     x: shipStartX,
//                     y: shipStartY,
//                     xDirection: initialXDirection,
//                     yDirection: initialYDirection,
//                 },
//             ]);
//             setDropshipCount(dropshipCount + 1); 
//             if (!showShip) {
//                 setShowShip(true);
//             }
        
//     };
//     const dropShip = () => {
//         if (dropshipCount < MAX_SHIPS) {
            
//             addShip();
            
//         }
//     };

//     // Set up interval to add ships every 5 seconds
//     useEffect(() => {
//         const intervalId = setInterval(dropShip, 5000);

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, [dropshipCount]);

//     // Animate ships
//     useEffect(() => {
//         const animateShip = () => {
//             const containerWidth = containerRef.current.clientWidth;
//             const containerHeight = containerRef.current.clientHeight;
//             const shipSpeed = 0.3;

//             setShip((prevShip) =>
//                 prevShip.map((ship) => ({
//                     ...ship,
//                     x: ship.x + ship.xDirection * shipSpeed,
//                     y: ship.y + ship.yDirection * shipSpeed,
//                     xDirection:
//                         ship.x + ship.xDirection * shipSpeed >= containerWidth - shipWidth ||
//                         ship.x + ship.xDirection * shipSpeed <= 0
//                             ? ship.xDirection * -1
//                             : ship.xDirection,
//                     yDirection:
//                         ship.y + ship.yDirection * shipSpeed >= containerHeight - shipHeight ||
//                         ship.y + ship.yDirection * shipSpeed <= 0
//                             ? ship.yDirection * -1
//                             : ship.yDirection,
//                 }))
//             );
//             animationFrameshipRef.current = requestAnimationFrame(animateShip);
//         };

//         if (showShip && ship.length > 0) {
//             animationFrameshipRef.current = requestAnimationFrame(animateShip);
//         }

//         return () => cancelAnimationFrame(animationFrameshipRef.current);
//     }, [showShip, ship]);

//     return (
//         <>
//             {showShip &&
//                 ship.map((ship, index) => (
//                     <img
//                         key={index}
//                         src={dropShipImage}
//                         alt="ship"
//                         className="ship"
//                         style={{
//                             position: 'absolute',
//                             left: `${ship.x}px`,
//                             top: `${ship.y}px`,
//                             width: '30px',
//                             height: '15px',
//                             zIndex: 2,
//                         }}
//                     />
//                 ))}
//         </>
//     );
// };

// export default Health_drop;




//ships up to four appear...then trouble

// import React, { useState, useEffect, useRef } from 'react';
// import './Health_drop.css'; 
// import dropShipImage from "../images/babyborg_03.png";

// const Health_drop = ({ containerRef }) => {
//     const [ships, setShips] = useState([]);
//     const [shipWidth, setShipWidth] = useState(30);
//     const [shipHeight, setShipHeight] = useState(40);
//     const [driftDirections, setDriftDirections] = useState([]);

//     const MAX_SHIPS = 4;

//     const generateRandomPosition = () => {
//         if (containerRef.current) {
//             const containerWidth = containerRef.current.clientWidth;
//             const containerHeight = containerRef.current.clientHeight;
//             const randomX = Math.floor(Math.random() * (containerWidth - shipWidth));
//             const randomY = Math.floor(Math.random() * (containerHeight - shipHeight));
//             return { x: randomX, y: randomY };
//         }
//         return { x: 0, y: 0 }; // Return a default position if containerRef is not yet set
//     };

//     const addShip = () => {
//         if (ships.length < MAX_SHIPS) {
//             setShips(prevShips => {
//                 const newShips = [...prevShips, generateRandomPosition()];
//                 setDriftDirections(prevDirections => [...prevDirections, { x: 1, y: 1 }]); // Add a new drift direction for the new ship
//                 return newShips;
//             });
//         }
//     };

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             addShip();
//         }, 5000);

//         return () => clearInterval(intervalId);
//     }, []);
    
//     useEffect(() => {
//         const moveShips = () => {
//             setShips(prevShips => {
//                 if (prevShips.length < MAX_SHIPS) {
//                     console.log("huh")
//                 }
        
//                 return prevShips.map((ship, index) => {
//                     if (driftDirections[index] && prevShips.length < MAX_SHIPS) {
//                         let newX = ship.x + driftDirections[index].x;
//                         let newY = ship.y + driftDirections[index].y;
        
//                         const containerWidth = containerRef.current.clientWidth;
//                         const containerHeight = containerRef.current.clientHeight;
        
//                         // Reverse direction if ship reaches the container boundaries
//                         if (newX >= containerWidth - shipWidth || newX <= 0) {
//                             setDriftDirections(prevDirections => {
//                                 const newDirections = [...prevDirections];
//                                 newDirections[index].x *= -1;
//                                 return newDirections;
//                             });
//                         }
//                         if (newY >= containerHeight - shipHeight || newY <= 0) {
//                             setDriftDirections(prevDirections => {
//                                 const newDirections = [...prevDirections];
//                                 newDirections[index].y *= -1;
//                                 return newDirections;
//                             });
//                         }
        
//                         // Update ship position after handling boundaries
//                         newX = Math.max(0, Math.min(containerWidth - shipWidth, newX));
//                         newY = Math.max(0, Math.min(containerHeight - shipHeight, newY));
        
//                         return { x: newX, y: newY };
//                     } else {
//                         return ship; // Return the ship unchanged if drift direction is undefined
//                     }
//                 });
//             });
//         };

//     const animationFrameId = requestAnimationFrame(moveShips);

//     return () => cancelAnimationFrame(animationFrameId);
// }, [driftDirections, containerRef, ships, addShip]); // Include addShip in the dependencies array

    

//     return (
//         <>
//             {ships.map((ship, index) => (
//                 <img
//                     key={index}
//                     src={dropShipImage}
//                     alt="ship"
//                     className="ship"
//                     style={{
//                         position: 'absolute',
//                         left: `${ship.x}px`,
//                         top: `${ship.y}px`,
//                         width: '30px',
//                         height: '40px',
//                         zIndex: 2,
//                     }}
//                 />
//             ))}
//         </>
//     );
// };

// export default Health_drop;






