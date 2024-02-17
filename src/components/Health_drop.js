// import React, { useState, useEffect, useRef } from 'react';
// import './Health_drop.css'; 
// import dropShipImage from "../images/amos.png";

// const Health_drop = ({ containerRef, ship, setShip}) => {
//     // const [ships, setShips] = useState([]);
//     const [shipWidth, setShipWidth] = useState(30);
//     const [shipHeight, setShipHeight] = useState(40);
//     const [driftDirections, setDriftDirections] = useState([]);
//     const [dropshipCount, setDropshipCount] = useState(0);


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

//     const dropShip = () => {
//         if (dropshipCount < MAX_SHIPS) {
//             setShip(prevShips => {
//                 const newShips = [...prevShips, generateRandomPosition()];
//                 setDriftDirections(prevDirections => [...prevDirections, { x: 1, y: 1 }]); // Add a new drift direction for the new ship
//                 return newShips;
//             });
//             setDropshipCount(dropshipCount + 1)
//         }
//     };

//     // dropship every 1 min
//     useEffect(() => {
//         const intervalId = setInterval(dropShip, 5000); //60000

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []); // Correct the dependency array
    
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
//     useEffect (() => {
//         if (ship < MAX_SHIPS) {
//             moveShips() 
//         }
//     }) 
//     const animationFrameId = requestAnimationFrame(moveShips);

//     return () => cancelAnimationFrame(animationFrameId);
// }, [driftDirections, containerRef, ship, addShip]); // Include addShip in the dependencies array

    

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






