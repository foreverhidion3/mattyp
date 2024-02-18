import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Luke_Villain.css';
import villain_img from "../images/mm_image_flying_2.png";
import fireball_img from '../images/power_ball_12.gif';
// import collision_img from '../images/explosion_2.webp';

function Villain ({ heroPosition, villainPosition, setvillainPosition, onHitsCounted}) {
   

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
    // const [collisionCoordinates, setCollisionCoordinates] = useState(null);
    
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
                const speed = 0.7;  
    
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
          const fireballSpeed = .3;
        setFireballs((prevFireball) =>
            prevFireball.map((anything) => ({
              ...anything,
              x: anything.x + anything.xDirection * fireballSpeed,
              y: anything.y + anything.yDirection * fireballSpeed,
              xDirection:
              anything.x + anything.xDirection * fireballSpeed >= containerWidth - fireballWidth ||
              anything.x + anything.xDirection * fireballSpeed <= 0
                  ? anything.xDirection * -1
                  : anything.xDirection,
              yDirection:
              anything.y + anything.yDirection * fireballSpeed >= containerHeight - fireballHeight ||
              anything.y + anything.yDirection * fireballSpeed <= 0
                  ? anything.yDirection * -1
                  : anything.yDirection,
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
        if (fireballCount < 20) {
            
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
        const intervalId = setInterval(dropFireball, 20000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [fireballCount]); // Correct the dependency array

    const detectCollision = () => {
        fireballs.forEach((fireballs, index) => {
            const isCollision =
                heroPosition.x < fireballs.x + fireballsWidth &&
                heroPosition.x + 60 > fireballs.x &&
                heroPosition.y < fireballs.y + fireballsHeight &&
                heroPosition.y + 60 > fireballs.y;

            if (isCollision) {
                // updateCollisionCoordinates(fireballs.x, fireballs.y);
                onHitsCounted();
                // console.log("Collision detected with fireball at coordinates:", fireballs);
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
                                className='luke_fireball_img_2'
                                style={{ transform: `translate(${fireball.x}px, ${fireball.y}px)` }}
                                ref={fireballRef}
                            />
                        ))}
                        {/* Display the villain */}
                        <img
                            ref={villainRef}
                            src={villain_img}
                            id='luke_villain_img_2'
                            className={attack ? 'villain_attack' : ''}
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            // onClick={() => {
                            //     if (fireballs.length < 10 && !isAddingFireball) {
                            //         setAttack(true);
                            //         setAttackX(x);
                            //         setAttackY(y);
                            //         setIsAddingFireball(true);
                            //         addFireball(x, y);
                            //     }
                            // }}
                        />
                        {/* {collisionCoordinates && (
                            <img
                                src={collision_img}
                                alt='collision'
                                className='collision_img'
                                style={{ transform: `translate(${collisionCoordinates.x}px, ${collisionCoordinates.y}px)` }}
                            />
                        )} */}
        </div>
        
        
    );        
};
export default Villain;