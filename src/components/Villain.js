import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Villain.css';
import villain_img from "../images/spaceship_img.png";
import fireball_img from '../images/power_ball_5.gif';

function Villain ({ heroPosition, villainPosition, setvillainPosition, onHitsCounted}) {
    // const useDebounce = (callback, delay) => {
    //     const timeoutRef = useRef(null);
    //     return (...args) => {
    //       clearTimeout(timeoutRef.current);
    //       timeoutRef.current = setTimeout(() => {
    //         callback(...args);
    //       }, delay);
    //     };
    // };

    const navigate = useNavigate()

    useEffect(() => {
        const gameContainer = document.querySelector('.game_container_2');
        containerRef.current = gameContainer;
    }, []);
      
    //set states
    const [x, setX] = useState(200);
    const [y, setY] = useState(20);

    const [fireballs, setFireballs] = useState([]);
    const [fireballsWidth, setfireballsWidth] = useState(20);
    const [fireballsHeight, setfireballsHeight] = useState(20);

    const [xDirection, setXDirection] = useState(1);
    const [yDirection, setYDirection] = useState(1);
    const [attack, setAttack] = useState(false);
    const [attackX, setAttackX] = useState(0);
    const [attackY, setAttackY] = useState(0);
    
    //Declare fireball state
    const [showfireball, setShowFireball] = useState(false); 
    //New state to track adding fireball status
    const [isAddingFireball, setIsAddingFireball] = useState(false); 
    const [hitCount, setHitCount] = useState(0);
    // const [showGIF, setShowGIF] = useState(false);
    const villainRef = useRef(null);
    const heroRef = useRef(null);
    const fireballRef = useRef(null);
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    // const animationFrameHeroRef = useRef(null);
    const animationFrameFireBallRef = useRef(null);
    // const navigate = useNavigate();
    const [fireballCount, setFireballCount] = useState(0);
    
    useEffect(() => {
        setvillainPosition({ x: 400, y: 20 })
    }, []);
    
    //animate villian
    useEffect(() => {
        const animate = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;
                const villainWidth = villainRef.current.width;
                const villainHeight = villainRef.current.height;
                const speed = 0.4;  
    
                setX((prevX) => {
                    const nextX = prevX + xDirection * speed;
                    if (nextX >= containerWidth - villainWidth || nextX <= 0) {
                        setXDirection((prevDirection) => prevDirection * -1);
                    }
                    return nextX;
                });
    
                setY((prevY) => {
                    const nextY = prevY + yDirection * speed;
                    if (nextY >= containerHeight - villainHeight || nextY <= 0) {
                        setYDirection((prevDirection) => prevDirection * -1);
                    }
                    return nextY;
                });
            }
        };
    
        animationFrameRef.current = requestAnimationFrame(animate);
    
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [x, y, xDirection, yDirection, containerRef.current]);
    

    //add fireball
    const addFireball = (x, y) => {
        if (!isAddingFireball) {
            // Generate random initial direction for the fireball
            const initialXDirection = Math.random() < 0.5 ? 1 : -1;
            const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
            // Set the starting position of the fireball relative to the villain
            // Place the fireball closer to the center of the villain
            const fireballStartX = x + villainRef.current.width / 24; // Half of the villain's width
            const fireballStartY = y + villainRef.current.height / 24; // Adjust to move closer to the center
    
            setFireballs((prevfireball) => [
                ...prevfireball,
                {
                    x: fireballStartX,
                    y: fireballStartY,
                    xDirection: initialXDirection,
                    yDirection: initialYDirection,
                },
            ]);
            setShowFireball(true);
        }
    };
    //animate fireball
    useEffect(() => {
        const animateFireball = () => {
          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = containerRef.current.clientHeight;
          const fireballWidth = fireballRef.current.width;
          const fireballHeight = fireballRef.current.height;
          const fireballSpeed = .4;
        setFireballs((prevFireball) =>
            prevFireball.map((fireballs) => ({
              ...fireballs,
              x: fireballs.x + fireballs.xDirection * fireballSpeed,
              y: fireballs.y + fireballs.yDirection * fireballSpeed,
              xDirection:
                fireballs.x + fireballs.xDirection * fireballSpeed >= containerWidth - fireballWidth ||
                fireballs.x + fireballs.xDirection * fireballSpeed <= 0
                  ? fireballs.xDirection * -1
                  : fireballs.xDirection,
              yDirection:
                fireballs.y + fireballs.yDirection * fireballSpeed >= containerHeight - fireballHeight ||
                fireballs.y + fireballs.yDirection * fireballSpeed <= 0
                  ? fireballs.yDirection * -1
                  : fireballs.yDirection,
            }))
        );
            animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
        };
    
        if (showfireball && fireballs.length > 0) {
            animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
        }
    
        return () => cancelAnimationFrame(animationFrameFireBallRef.current);
          
    }, [showfireball, fireballs]);

    const dropFireball = () => {
        if (fireballCount < 10) {
            
            const villainRect = villainRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            
            const villainCenterX = villainRect.left + villainRect.width / 2;
            const villainCenterY = villainRect.top + villainRect.height / 2;
            
            addFireball(villainCenterX - containerRect.left, villainCenterY - containerRect.top);
            
            setFireballCount(fireballCount + 1);
        }
    };

    // drop fireballs every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(dropFireball, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [fireballCount]); // Correct the dependency array

    const detectCollision = () => {
        fireballs.forEach((fireballs, index) => {
            const isCollision =
                heroPosition.x < fireballs.x + fireballsWidth &&
                heroPosition.x + 30 > fireballs.x &&
                heroPosition.y < fireballs.y + fireballsHeight &&
                heroPosition.y + 30 > fireballs.y;

            if (isCollision) {
                onHitsCounted();
                console.log("Collision detected with fireball at coordinates:", fireballs);
            }
        });
    };

    useEffect(() => {
        detectCollision();
    }, [fireballs, heroPosition]);
    
    return (
        
        <div className="villain_container">
            {/* <div className="jewel_counter">Fragments Collected: <span>{jewelCounter}</span></div> */}
                        {/* Display fireballs */}
                        {showfireball &&
                        fireballs.map((fireball, index) => (
                            <img
                                key={index}
                                src={fireball_img}
                                alt='fireball'
                                className='fireball_img_2'
                                style={{ transform: `translate(${fireball.x}px, ${fireball.y}px)` }}
                                ref={fireballRef}
                            />
                        ))}
                        {/* Display the villain */}
                        <img
                            ref={villainRef}
                            src={villain_img}
                            id='villain_img_2'
                            className={attack ? 'villain_attack' : ''}
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            onClick={() => {
                                if (fireballs.length < 10 && !isAddingFireball) {
                                    setAttack(true);
                                    setAttackX(x);
                                    setAttackY(y);
                                    setIsAddingFireball(true);
                                    addFireball(x, y);
                                }
                            }}
                        />
        </div>
        
        
    );        
};
export default Villain;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Villain.css';
// import villain_img from "../images/spaceship_img.png";
// import fireball_img from '../images/power_ball_5.gif';

// function Villain ({ heroPosition, fireballs, setFireballs }) {
//     const useDebounce = (callback, delay) => {
//         const timeoutRef = useRef(null);
//         return (...args) => {
//           clearTimeout(timeoutRef.current);
//           timeoutRef.current = setTimeout(() => {
//             callback(...args);
//           }, delay);
//         };
//     };
//     useEffect(() => {
//         const gameContainer = document.querySelector('.game_container_2');
//         containerRef.current = gameContainer;
//     }, []);
      
//     //set states
//     const [x, setX] = useState(200);
//     const [y, setY] = useState(20);
//     const [xDirection, setXDirection] = useState(1);
//     const [yDirection, setYDirection] = useState(1);
//     const [attack, setAttack] = useState(false);
//     const [attackX, setAttackX] = useState(0);
//     const [attackY, setAttackY] = useState(0);
//     const [fireball, setFireball] = useState([]);
//     //Declare fireball state
//     const [showfireball, setShowFireball] = useState(false); 
//     //New state to track adding fireball status
//     const [isAddingFireball, setIsAddingFireball] = useState(false); 
//     const [hitCount, setHitCount] = useState(0);
//     // const [showGIF, setShowGIF] = useState(false);
//     const villainRef = useRef(null);
//     const heroRef = useRef(null);
//     const fireballRef = useRef(null);
//     const containerRef = useRef(null);
//     const animationFrameRef = useRef(null);
//     // const animationFrameHeroRef = useRef(null);
//     const animationFrameFireBallRef = useRef(null);
//     // const navigate = useNavigate();
//     const [fireballCount, setFireballCount] = useState(0);

//     //animate villian
//     useEffect(() => {
//         const animate = () => {
//             if (containerRef.current) {
//                 const containerWidth = containerRef.current.clientWidth;
//                 const containerHeight = containerRef.current.clientHeight;
//                 const villainWidth = villainRef.current.width;
//                 const villainHeight = villainRef.current.height;
//                 const speed = 0.4;  
    
//                 setX((prevX) => {
//                     const nextX = prevX + xDirection * speed;
//                     if (nextX >= containerWidth - villainWidth || nextX <= 0) {
//                         setXDirection((prevDirection) => prevDirection * -1);
//                     }
//                     return nextX;
//                 });
    
//                 setY((prevY) => {
//                     const nextY = prevY + yDirection * speed;
//                     if (nextY >= containerHeight - villainHeight || nextY <= 0) {
//                         setYDirection((prevDirection) => prevDirection * -1);
//                     }
//                     return nextY;
//                 });
//             }
//         };
    
//         animationFrameRef.current = requestAnimationFrame(animate);
    
//         return () => cancelAnimationFrame(animationFrameRef.current);
//     }, [x, y, xDirection, yDirection, containerRef.current]);
    

//     //add fireball
//     const addFireball = (x, y) => {
//         if (!isAddingFireball && fireball.length < 1) {
//             // Generate random initial direction for the fireball
//             const initialXDirection = Math.random() < 0.5 ? 1 : -1;
//             const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
//             // Set the starting position of the fireball relative to the villain
//             // Place the fireball closer to the center of the villain
//             const fireballStartX = x + villainRef.current.width / 24; // Half of the villain's width
//             const fireballStartY = y + villainRef.current.height / 24; // Adjust to move closer to the center
    
//             setFireball((prevfireball) => [
//                 ...prevfireball,
//                 {
//                     x: fireballStartX,
//                     y: fireballStartY,
//                     xDirection: initialXDirection,
//                     yDirection: initialYDirection,
//                 },
//             ]);
//             setShowFireball(true);
//         }
//     };

//     //Villain Attack
//     useEffect(() => {
//         // console.log("Is Adding Fireball:", isAddingFireball);
//         if (attack) {
//           setShowFireball(true); 
//             const resetAttack = setTimeout(() => {
//             setAttack(false);
//             //Reset adding fireball status 
//             setIsAddingFireball(false);
//             //Add fireball near the villian on attack 
//             addFireball(attackX, attackY);
//             //Delay in milliseconds before resetting attack state 
//           }, 500); 
      
//           return () => clearTimeout(resetAttack);
//         } else {
//           //Reset adding fireball status when the villian is not attacking
//           setIsAddingFireball(false); 
//         }
//       }, [attack, attackX, attackY]);
    
//     //debounce to use later
//     const addFireballWithDebounce = useDebounce(addFireball, 500);

//     //animate fireball
//     useEffect(() => {
//         const animateFireball = () => {
//           const containerWidth = containerRef.current.clientWidth;
//           const containerHeight = containerRef.current.clientHeight;
//           const fireballWidth = fireballRef.current.width;
//           const fireballHeight = fireballRef.current.height;
//           const fireballSpeed = .4;
//         setFireball((prevFireball) =>
//             prevFireball.map((fireball) => ({
//               ...fireball,
//               x: fireball.x + fireball.xDirection * fireballSpeed,
//               y: fireball.y + fireball.yDirection * fireballSpeed,
//               xDirection:
//                 fireball.x + fireball.xDirection * fireballSpeed >= containerWidth - fireballWidth ||
//                 fireball.x + fireball.xDirection * fireballSpeed <= 0
//                   ? fireball.xDirection * -1
//                   : fireball.xDirection,
//               yDirection:
//                 fireball.y + fireball.yDirection * fireballSpeed >= containerHeight - fireballHeight ||
//                 fireball.y + fireball.yDirection * fireballSpeed <= 0
//                   ? fireball.yDirection * -1
//                   : fireball.yDirection,
//             }))
//         );
//             animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
//         };
    
//         if (showfireball && fireball.length > 0) {
//             animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
//         }
    
//         return () => cancelAnimationFrame(animationFrameFireBallRef.current);
          
//     }, [showfireball, fireball]);

    
//    // Function to drop a fireball at the center of the villain
//     // const dropFireball = () => {
//     //     const villainRect = villainRef.current.getBoundingClientRect();
//     //     const containerRect = containerRef.current.getBoundingClientRect();
        
//     //     // Calculate the center of the villain
//     //     const villainCenterX = villainRect.left + villainRect.width / 2;
//     //     const villainCenterY = villainRect.top + villainRect.height / 2;
        
//     //     // Add a fireball at the center of the villain
//     //     addFireball(villainCenterX - containerRect.left, villainCenterY - containerRect.top);
//     // };
//     const dropFireball = () => {
//         if (fireballCount < 1) {
//             // Add a new fireball only if the fireball count is less than 10
//             const villainRect = villainRef.current.getBoundingClientRect();
//             const containerRect = containerRef.current.getBoundingClientRect();
            
//             // Calculate the center of the villain
//             const villainCenterX = villainRect.left + villainRect.width / 2;
//             const villainCenterY = villainRect.top + villainRect.height / 2;
            
//             // Add a fireball at the center of the villain
//             addFireball(villainCenterX - containerRect.left, villainCenterY - containerRect.top);
            
//             // Update the fireball count
//             setFireballCount(fireballCount + 1);
//         }
//     };

//     // drop fireballs every 3 seconds
//     useEffect(() => {
//         const intervalId = setInterval(dropFireball, 10000);

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, [fireballCount]); // Correct the dependency array

//     // const detectCollision = () => {
//     //     const heroWidth = 50; // Width of the hero element
//     //     const heroHeight = 50; // Height of the hero element
    
//     //     const heroRect = {
//     //         left: heroPosition.x,
//     //         right: heroPosition.x + heroWidth,
//     //         top: heroPosition.y,
//     //         bottom: heroPosition.y + heroHeight
//     //     };
    
//     //     let newHitCount = hitCount; // Initialize a new hit count variable
    
//     //     fireballs.forEach((fireball) => {
//     //         const fireballWidth = 40; // Width of the fireball element
//     //         const fireballHeight = 40; // Height of the fireball element
    
//     //         const fireballRect = {
//     //             left: fireball.x,
//     //             right: fireball.x + fireballWidth,
//     //             top: fireball.y,
//     //             bottom: fireball.y + fireballHeight
//     //         };
    
//     //         // Check for intersection between hero and fireball bounding boxes
//     //         if (
//     //             heroRect.right > fireballRect.left &&
//     //             heroRect.left < fireballRect.right &&
//     //             heroRect.bottom > fireballRect.top &&
//     //             heroRect.top < fireballRect.bottom
//     //         ) {
//     //             // Increment the new hit count
//     //             newHitCount++;
//     //         }
//     //     });
    
//     //     // Update the hit count state
//     //     setHitCount(newHitCount);
    
//     //     // Check if the hit count exceeds the losing threshold
//     //     if (newHitCount >= 100) {
//     //         // Game over logic here
//     //         console.log("Game over");
//     //         // Trigger game over state or action
//     //     }
//     // };
    
//     // // Call detectCollision within a useEffect hook
//     // useEffect(() => {
//     //     detectCollision();
//     // }, [heroPosition, fireballs]);
    

    
//     return (
        
//         <div className="villain_container">
//             {/* <div className="jewel_counter">Fragments Collected: <span>{jewelCounter}</span></div> */}
//                         {/* Display fireballs */}
//                         {showfireball &&
//                         fireball.map((fireball, index) => (
//                             <img
//                                 key={index}
//                                 src={fireball_img}
//                                 alt='fireball'
//                                 className='fireball_img_2'
//                                 style={{ transform: `translate(${fireball.x}px, ${fireball.y}px)` }}
//                                 ref={fireballRef}
//                             />
//                         ))}
//                         {/* Display the villain */}
//                         <img
//                             ref={villainRef}
//                             src={villain_img}
//                             id='villain_img_2'
//                             className={attack ? 'villain_attack' : ''}
//                             style={{ transform: `translate(${x}px, ${y}px)` }}
//                             onClick={() => {
//                                 if (fireball.length < 10 && !isAddingFireball) {
//                                     setAttack(true);
//                                     setAttackX(x);
//                                     setAttackY(y);
//                                     setIsAddingFireball(true);
//                                     addFireballWithDebounce(x, y);
//                                 }
//                             }}
//                         />
//         </div>
        
        
//     );        
// }
// export default Villain;


//hmm
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Villain.css';
// import villain_img from "../images/spaceship_img.png";
// import fireball_img from '../images/power_ball_5.gif';

// function Villain () {
//     const useDebounce = (callback, delay) => {
//         const timeoutRef = useRef(null);
//         return (...args) => {
//           clearTimeout(timeoutRef.current);
//           timeoutRef.current = setTimeout(() => {
//             callback(...args);
//           }, delay);
//         };
//     };
//     useEffect(() => {
//         const gameContainer = document.querySelector('.game_container_2');
//         containerRef.current = gameContainer;
//     }, []);
      
//     //set states
//     const [x, setX] = useState(200);
//     const [y, setY] = useState(20);
//     const [xDirection, setXDirection] = useState(1);
//     const [yDirection, setYDirection] = useState(1);
//     const [attack, setAttack] = useState(false);
//     const [attackX, setAttackX] = useState(0);
//     const [attackY, setAttackY] = useState(0);
//     const [fireball, setFireball] = useState([]);
//     //Declare fireball state
//     const [showfireball, setShowFireball] = useState(false); 
//     //New state to track adding fireball status
//     const [isAddingFireball, setIsAddingFireball] = useState(false); 
//     // const [hitCount, setHitCount] = useState(0);
//     // const [showGIF, setShowGIF] = useState(false);
//     const villainRef = useRef(null);
//     // const heroRef = useRef(null);
//     const fireballRef = useRef(null);
//     const containerRef = useRef(null);
//     const animationFrameRef = useRef(null);
//     // const animationFrameHeroRef = useRef(null);
//     const animationFrameFireBallRef = useRef(null);
//     // const navigate = useNavigate();

//     //animate villian
//     useEffect(() => {
//         const animate = () => {
//             if (containerRef.current) {
//                 const containerWidth = containerRef.current.clientWidth;
//                 const containerHeight = containerRef.current.clientHeight;
//                 const villainWidth = villainRef.current.width;
//                 const villainHeight = villainRef.current.height;
//                 const speed = 0.4;  
    
//                 setX((prevX) => {
//                     const nextX = prevX + xDirection * speed;
//                     if (nextX >= containerWidth - villainWidth || nextX <= 0) {
//                         setXDirection((prevDirection) => prevDirection * -1);
//                     }
//                     return nextX;
//                 });
    
//                 setY((prevY) => {
//                     const nextY = prevY + yDirection * speed;
//                     if (nextY >= containerHeight - villainHeight || nextY <= 0) {
//                         setYDirection((prevDirection) => prevDirection * -1);
//                     }
//                     return nextY;
//                 });
//             }
//         };
    
//         animationFrameRef.current = requestAnimationFrame(animate);
    
//         return () => cancelAnimationFrame(animationFrameRef.current);
//     }, [x, y, xDirection, yDirection, containerRef.current]);
    

//     //add fireball
//     const addFireball = (x, y) => {
//         if (!isAddingFireball && fireball.length < 100) {
//           // Generate random initial direction for the fireball
//           const initialXDirection = Math.random() < 0.5 ? 1 : -1;
//           const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
//           //set the starting position of the fireball relative to the villian
//           //Half of the villian's width
//           const fireballStartX = x + villainRef.current.width / 4;
//           //Half of the vilian's height
//           //Does this look good at all sizes? 
//           const fireballStartY = y + villainRef.current.height / 2; 
    
//           setFireball((prevfireball) => [
//             ...prevfireball,
//             {
//               x: fireballStartX,
//               y: fireballStartY,
//               xDirection: initialXDirection,
//               yDirection: initialYDirection,
//             },
//           ]);
//           setShowFireball(true);
//         }
//     };

//     //Villain Attack
//     useEffect(() => {
//         // console.log("Is Adding Fireball:", isAddingFireball);
//         if (attack) {
//           setShowFireball(true); 
//             const resetAttack = setTimeout(() => {
//             setAttack(false);
//             //Reset adding fireball status 
//             setIsAddingFireball(false);
//             //Add fireball near the villian on attack 
//             addFireball(attackX, attackY);
//             //Delay in milliseconds before resetting attack state 
//           }, 500); 
      
//           return () => clearTimeout(resetAttack);
//         } else {
//           //Reset adding fireball status when the villian is not attacking
//           setIsAddingFireball(false); 
//         }
//       }, [attack, attackX, attackY]);
    
//     //debounce to use later
//     const addFireballWithDebounce = useDebounce(addFireball, 500);

//     //animate fireball
//     useEffect(() => {
//         const animateFireball = () => {
//           const containerWidth = containerRef.current.clientWidth;
//           const containerHeight = containerRef.current.clientHeight;
//           const fireballWidth = fireballRef.current.width;
//           const fireballHeight = fireballRef.current.height;
//           const fireballSpeed = .4;
//         setFireball((prevFireball) =>
//             prevFireball.map((fireball) => ({
//               ...fireball,
//               x: fireball.x + fireball.xDirection * fireballSpeed,
//               y: fireball.y + fireball.yDirection * fireballSpeed,
//               xDirection:
//                 fireball.x + fireball.xDirection * fireballSpeed >= containerWidth - fireballWidth ||
//                 fireball.x + fireball.xDirection * fireballSpeed <= 0
//                   ? fireball.xDirection * -1
//                   : fireball.xDirection,
//               yDirection:
//                 fireball.y + fireball.yDirection * fireballSpeed >= containerHeight - fireballHeight ||
//                 fireball.y + fireball.yDirection * fireballSpeed <= 0
//                   ? fireball.yDirection * -1
//                   : fireball.yDirection,
//             }))
//         );
//             animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
//         };
    
//         if (showfireball && fireball.length > 0) {
//             animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
//         }
    
//         return () => cancelAnimationFrame(animationFrameFireBallRef.current);
          
//     }, [showfireball, fireball]);

//     // Function to drop a fireball by the villain
//     const dropFireball = () => {
//         if (!isAddingFireball && fireball.length < 100) {
//             const villainRect = villainRef.current.getBoundingClientRect();
//             const containerRect = containerRef.current.getBoundingClientRect();
            
//             // Calculate the center of the villain
//             const villainCenterX = villainRect.left + villainRect.width / 2;
//             const villainCenterY = villainRect.top + villainRect.height / 2;
            
//             // Calculate the maximum distances to the edges of the container
//             const maxDistanceX = containerRect.width / 2 - villainRect.width / 2;
//             const maxDistanceY = containerRect.height / 2 - villainRect.height / 2;
            
//             // Generate random initial direction for the fireball
//             const initialXDirection = Math.random() < 0.5 ? 1 : -1;
//             const initialYDirection = Math.random() < 0.5 ? 1 : -1;
            
//             // Calculate the starting position of the fireball relative to the villain
//             const distance = 10; // Adjust the distance as needed
//             let fireballStartX = villainCenterX + distance * initialXDirection;
//             let fireballStartY = villainCenterY + distance * initialYDirection;
            
//             // Ensure the fireball stays within the boundaries of the container
//             fireballStartX = Math.max(villainRect.width / 2, Math.min(fireballStartX, containerRect.width - villainRect.width / 2));
//             fireballStartY = Math.max(villainRect.height / 2, Math.min(fireballStartY, containerRect.height - villainRect.height / 2));
            
//             // Add a fireball near the villain's position
//             addFireball(fireballStartX, fireballStartY);
//         }
//     };
    
    
    

//     // drop fireballs every 3 seconds
//     useEffect(() => {
//         const intervalId = setInterval(dropFireball, 1000);

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     // const detectCollision = () => {
//     //     const heroRect = heroRef.current.getBoundingClientRect();
//     //     let newHitCount = hitCount; // Initialize a new hit count variable
    
//     //     fireball.forEach((fireball) => {
//     //         const fireballRect = fireballRef.current.getBoundingClientRect();
//     //         if (
//     //             heroRect.right > fireballRect.left &&
//     //             heroRect.left < fireballRect.right &&
//     //             heroRect.bottom > fireballRect.top &&
//     //             heroRect.top < fireballRect.bottom
//     //         ) {
//     //             // Increment the new hit count
//     //             newHitCount++;
//     //         }
//     //     });
    
//     //     // Update the hit count state
//     //     setHitCount(newHitCount);
    
//     //     // Check if the hit count exceeds the losing threshold
//     //     if (newHitCount >= 100) {
//     //         // Game over logic here
//     //         gameOver();
//     //     }
//     // }; 
    
//     return (
        
//         <div className="villain_container">
//             {/* <div className="jewel_counter">Fragments Collected: <span>{jewelCounter}</span></div> */}
//                         {/* Display fireballs */}
//                         {showfireball &&
//                         fireball.map((fireball, index) => (
//                             <img
//                                 key={index}
//                                 src={fireball_img}
//                                 alt='fireball'
//                                 className='fireball_img_2'
//                                 style={{ transform: `translate(${fireball.x}px, ${fireball.y}px)` }}
//                                 ref={fireballRef}
//                             />
//                         ))}
//                         {/* Display the villain */}
//                         <img
//                             ref={villainRef}
//                             src={villain_img}
//                             id='villain_img_2'
//                             className={attack ? 'villain_attack' : ''}
//                             style={{ transform: `translate(${x}px, ${y}px)` }}
//                             onClick={() => {
//                                 if (fireball.length < 10 && !isAddingFireball) {
//                                     setAttack(true);
//                                     setAttackX(x);
//                                     setAttackY(y);
//                                     setIsAddingFireball(true);
//                                     addFireballWithDebounce(x, y);
//                                 }
//                             }}
//                         />
//         </div>
        
        
//     );        
// }
// export default Villain;