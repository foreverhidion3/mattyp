import React, { useState, useEffect, useRef } from 'react';
import './Game.css';
import villain_img from "../images/villain_img.png";
import fireball_img from '../images/power_ball_5.gif';
import hero_img from "../images/mm_image_flying_2.png";
// import jewel_1 from "../images/jewel_1.gif";
import blackhole_img from "../images/blackhole_img.gif";
// import lab_img from "../images/secret_lab.png"

function Game() {
    const useDebounce = (callback, delay) => {
        //Create a reference to store the timer ID for the debounce
        const timeoutRef = useRef(null);
        //Return a new debounced function that wraps the original callback
        return (...args) => {
          //Clear the previous timer (if any) whenever the debounced function is called
          clearTimeout(timeoutRef.current);
          //Start a new timer using the setTimeout function
          //The timer will execute the callback after the specified delay
          timeoutRef.current = setTimeout(() => {
            //Invoke the original callback with the provided arguments
            callback(...args);
          }, delay);
        };
    };  
    //set states
    const [x, setX] = useState(0);
    const [y, setY] = useState(100);
    const [herox, setheroX] = useState(0);
    const [heroy, setheroY] = useState(100);
    const [xDirection, setXDirection] = useState(1);
    const [yDirection, setYDirection] = useState(1);
    const [heroxDirection, setheroXDirection] = useState(1);
    const [heroyDirection, setheroYDirection] = useState(1);
    const [targetHeroX, setTargetHeroX] = useState(null);
    const [targetHeroY, setTargetHeroY] = useState(null);
    const [attack, setAttack] = useState(false);
    const [attackX, setAttackX] = useState(0);
    const [attackY, setAttackY] = useState(0);
    const [fireball, setFireball] = useState([]);
    //Declare fireball state
    const [showfireball, setShowFireball] = useState(false); 
    //New state to track adding fireball status
    const [isAddingFireball, setIsAddingFireball] = useState(false);
    // const [jewels, setJewels] = useState([]); 

    const villainRef = useRef(null);
    const heroRef = useRef(null);
    const fireballRef = useRef(null);
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const animationFrameHeroRef = useRef(null);
    const animationFrameFireBallRef = useRef(null);

    useEffect(() => {
        console.log("Container dimensions:", containerRef.current.clientWidth, containerRef.current.clientHeight);
    }, []);

    //Set villain
    useEffect(() => {
        const containerWidth = containerRef.current.clientWidth;
        // Set the initial x value based on container width
        setX(containerWidth - 200);
    }, []);

     //add fireball
    const addFireball = (x, y) => {
        if (!isAddingFireball && fireball.length < 100) {
          // Generate random initial direction for the fireball
          const initialXDirection = Math.random() < 0.5 ? 1 : -1;
          const initialYDirection = Math.random() < 0.5 ? 1 : -1;
    
          //set the starting position of the fireball relative to the villian
          //Half of the villian's width
          const fireballStartX = x + villainRef.current.width / 4;
          //Half of the vilian's height
          //Does this look good at all sizes? 
          const fireballStartY = y + villainRef.current.height / 2; 
    
          setFireball((prevfireball) => [
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
    
    //animate villian
    useEffect(() => {
        //console.log for villian position
        // console.log("Villian position:", { x, y });
        const animate = () => {
          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = containerRef.current.clientHeight;
          const villainWidth = villainRef.current.width;
          const villainHeight = villainRef.current.height;
          const speed = .4;
        //   console.log("Villain Width:", villainWidth);  // Log villain width
    
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
    
          animationFrameRef.current = requestAnimationFrame(animate);
        };
    
        animationFrameRef.current = requestAnimationFrame(animate);
    
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [x, y, xDirection, yDirection]);
    
    //animate fireball
    useEffect(() => {
        //console.log for fireball array
        // console.log("Fireballs:", fireball);
        const animateFireball = () => {
          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = containerRef.current.clientHeight;
          const fireballWidth = fireballRef.current.width;
          const fireballHeight = fireballRef.current.height;
          const fireballSpeed = .6;
        setFireball((prevFireball) =>
            prevFireball.map((fireball) => ({
              ...fireball,
              x: fireball.x + fireball.xDirection * fireballSpeed,
              y: fireball.y + fireball.yDirection * fireballSpeed,
              xDirection:
                fireball.x + fireball.xDirection * fireballSpeed >= containerWidth - fireballWidth ||
                fireball.x + fireball.xDirection * fireballSpeed <= 0
                  ? fireball.xDirection * -1
                  : fireball.xDirection,
              yDirection:
                fireball.y + fireball.yDirection * fireballSpeed >= containerHeight - fireballHeight ||
                fireball.y + fireball.yDirection * fireballSpeed <= 0
                  ? fireball.yDirection * -1
                  : fireball.yDirection,
            }))
        );
            animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
        };
    
        if (showfireball && fireball.length > 0) {
            animationFrameFireBallRef.current = requestAnimationFrame(animateFireball);
        }
    
        return () => cancelAnimationFrame(animationFrameFireBallRef.current);
          
    }, [showfireball, fireball]);

    //animate hero
    // Update hero direction based on the target position
    useEffect(() => {
        const handleMouseClick = (event) => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            // Set the target position towards the mouse click
            setTargetHeroX(mouseX);
            setTargetHeroY(mouseY);
        };

        containerRef.current.addEventListener('click', handleMouseClick);

        // Cleanup function
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('click', handleMouseClick);
            }
        };
    }, []); // No dependencies needed

    // Move hero towards the target position
    useEffect(() => {
        const moveHeroTowardsTarget = () => {
            const driftSpeed = 0.8;
            const targetDirectionX =
                targetHeroX !== null ? (targetHeroX > herox ? 1 : -1) : heroxDirection;
            const targetDirectionY =
                targetHeroY !== null ? (targetHeroY > heroy ? 1 : -1) : heroyDirection;

            // Set the hero direction based on the target direction
            setheroXDirection(targetDirectionX);
            setheroYDirection(targetDirectionY);

            // Move hero in the drifting direction
            setheroX((prevheroX) => {
                const nextHeroX = prevheroX + heroxDirection * driftSpeed;

                // Bounce off the walls
                if (nextHeroX >= containerRef.current.clientWidth - heroRef.current.width || nextHeroX <= 0) {
                    setheroXDirection((prevDirection) => prevDirection * -1);
                }

                return Math.max(0, Math.min(containerRef.current.clientWidth - heroRef.current.width, nextHeroX));
            });

            setheroY((prevheroY) => {
                const nextHeroY = prevheroY + heroyDirection * driftSpeed;

                // Bounce off the walls
                if (nextHeroY >= containerRef.current.clientHeight - heroRef.current.height || nextHeroY <= 0) {
                    setheroYDirection((prevDirection) => prevDirection * -1);
                }

                return Math.max(0, Math.min(containerRef.current.clientHeight - heroRef.current.height, nextHeroY));
            });

            // Check if hero reached the target position
            if (
                (targetHeroX !== null && Math.abs(herox - targetHeroX) < driftSpeed) ||
                (targetHeroY !== null && Math.abs(heroy - targetHeroY) < driftSpeed)
            ) {
                // Reset target position when hero reaches it
                setTargetHeroX(null);
                setTargetHeroY(null);
            }

            animationFrameHeroRef.current = requestAnimationFrame(moveHeroTowardsTarget);
        };

        animationFrameHeroRef.current = requestAnimationFrame(moveHeroTowardsTarget);

        return () => cancelAnimationFrame(animationFrameHeroRef.current);
    }, [herox, heroy, heroxDirection, heroyDirection, targetHeroX, targetHeroY, containerRef, heroRef]);


    //is attack? drop fireball
    useEffect(() => {
        // console.log("Is Adding Fireball:", isAddingFireball);
        if (attack) {
          setShowFireball(true); 
            const resetAttack = setTimeout(() => {
            setAttack(false);
            //Reset adding fireball status 
            setIsAddingFireball(false);
            //Add fireball near the villian on attack 
            addFireball(attackX, attackY);
            //Delay in milliseconds before resetting attack state 
          }, 500); 
      
          return () => clearTimeout(resetAttack);
        } else {
          //Reset adding fireball status when the villian is not attacking
          setIsAddingFireball(false); 
        }
      }, [attack, attackX, attackY]);
    
    //debounce to use later
    const addFireballWithDebounce = useDebounce(addFireball, 500);  
    
        
  return (
    <div className="body">
    <div className="game_background">
      <div className='game_container' ref={containerRef}>
        {showfireball &&
          fireball.map((fireball, index) => (
            <img
              key={index}
              src={fireball_img}
              alt='fireball'
              className='fireball_img'
              style={{ transform: `translate(${fireball.x}px, ${fireball.y}px)` }}
              ref={fireballRef}
            />
          ))}
        <img
          ref={villainRef}
          src={villain_img}
          id='villain_img'
          className={attack ? 'villain_attack' : ''}
          style={{ transform: `translate(${x}px, ${y}px)` }}
          onClick={() => {
            if (fireball.length < 10 && !isAddingFireball) {
              setAttack(true);
              setAttackX(x);
              setAttackY(y);
              setIsAddingFireball(true);
              addFireballWithDebounce(x, y);
            }
          }}
        />
        <img
          ref={heroRef}
          src={hero_img}
          id='hero_img'
          style={{ transform: `translate(${herox}px, ${heroy}px) translateX(-100%)` }}  
        />
        {/* {jewels.map((jewel, index) => (
            <img
                id="jewel"
                key={index}
                src={jewel_1}
                alt="jewel"
                style={{ transform: `translate(${jewel.x}px, ${jewel.y}px)` }}
                onClick={() => checkCollision(jewel) && collectItem(index)}
            />
        ))} */}
        
      </div>
        <div className="game_background_2">
            <img
                src={blackhole_img}
                id='blackhole_img'
                //   style={{ transform: `translate(${herox}px, ${heroy}px) translateX(-100%)` }}  
            />
        </div>
    </div>
    </div>
  );
}

export default Game;

//animate hero (bounce)
    // useEffect(() => {
    //     //console.log for hero position
    //     // console.log("Hero position:", { x, y });
    //     const animateHero = () => {
    //       const containerWidth = containerRef.current.clientWidth;
    //       const containerHeight = containerRef.current.clientHeight;
    //       const heroWidth = heroRef.current.width;
    //       const heroHeight = heroRef.current.height;
    //       const speed = 2;
    //     //   console.log("Hero Width:", heroWidth);  // Log hero width
    //     // console.log("Hero position:", { herox, heroy });
    
    //       setheroX((prevheroX) => {
    //         const nextheroX = prevheroX + heroxDirection * speed;
    //         if (nextheroX >= containerWidth - heroWidth || nextheroX <= 0) {
    //           setheroXDirection((prevheroDirection) => prevheroDirection * -1);
    //         }
    //         return nextheroX;
    //       });
    
    //       setheroY((prevheroY) => {
    //         const nextheroY = prevheroY + heroyDirection * speed;
    //         if (nextheroY >= containerHeight - heroHeight || nextheroY <= 0) {
    //           setheroYDirection((prevheroDirection) => prevheroDirection * -1);
    //         }
    //         return nextheroY;
    //       });
    
    //       animationFrameHeroRef.current = requestAnimationFrame(animateHero);
    //     };
    
    //     animationFrameHeroRef.current = requestAnimationFrame(animateHero);
    
    //     return () => cancelAnimationFrame(animationFrameHeroRef.current);
    // }, [herox, heroy, heroxDirection, heroyDirection]);


    //Jewel Ideas
    // const generateRandomPosition = () => {
    //     const containerWidth = containerRef.current.clientWidth;
    //     const containerHeight = containerRef.current.clientHeight;

    //     const randomX = Math.random() * (containerWidth - jewelWidth);
    //     const randomY = Math.random() * (containerHeight - jewelHeight);

    //     return { x: randomX, y: randomY };
    // };

    // // Function to add a new jewel to the state
    // const addJewel = () => {
    //     const newJewel = generateRandomPosition();
    //     setJewels((prevJewels) => [...prevJewels, newJewel]);
    // };

    // // Collision detection logic for jewels
    // const checkCollision = (jewel) => {
    //     const heroRect = heroRef.current.getBoundingClientRect();
    //     const jewelRect = {
    //     left: jewel.x,
    //     top: jewel.y,
    //     right: jewel.x + jewelWidth,
    //     bottom: jewel.y + jewelHeight,
    //     };
    
    //     return (
    //     heroRect.right > jewelRect.left &&
    //     heroRect.left < jewelRect.right &&
    //     heroRect.bottom > jewelRect.top &&
    //     heroRect.top < jewelRect.bottom
    //     );
    // };
  
    // // Function to handle jewel collection
    // const collectJewel = (jewelIndex) => {
    //     setJewels((prevJewels) => prevJewels.filter((_, index) => index !== jewelIndex));
    //     // Update score or perform other actions
    // };