import React, { useState, useEffect } from 'react';
import regularJewelImage from "../images/power_ball_2.gif";
import valuableJewelImage from "../images/battery_3.webp"; 

const Jewel = ({ containerRef, handleJewelCollected, heroPosition, villain_position, handleJewelStolen }) => {
    const [jewels, setJewels] = useState([]);
    const [jewelWidth, setJewelWidth] = useState(20);
    const [jewelHeight, setJewelHeight] = useState(20);

    const MAX_JEWELS = 1000; // Maximum number of jewels allowed

    const generateRandomPosition = () => {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const randomX = Math.floor(Math.random() * (containerWidth - jewelWidth));
        const randomY = Math.floor(Math.random() * (containerHeight - jewelHeight));
        return { x: randomX, y: randomY };
    };

    const addJewel = () => {
        setJewels(prevJewels => {
            if (prevJewels.length < MAX_JEWELS) {
                const newJewel = generateRandomPosition();
                return [...prevJewels, newJewel];
            }
            return prevJewels;
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            addJewel();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const checkCollisions = () => {
        jewels.forEach((jewel, index) => {
            const isCollision =
                heroPosition.x < jewel.x + jewelWidth &&
                heroPosition.x + 100 > jewel.x &&
                heroPosition.y < jewel.y + jewelHeight &&
                heroPosition.y + 100 > jewel.y;

            if (isCollision) {
                // console.log("Collision detected with jewel at coordinates:", jewel);
                // handleJewelCollected();
                collectJewel(index);
            }
        });
    };

    const collectJewel = (index) => {
        setJewels((prevJewels) => {
            const collectedJewel = prevJewels[index];
            const isNearBottom = collectedJewel.y > (containerRef.current.clientHeight - 200); // Adjust 200 to your preferred distance
    
            let jewelValue; // Define the jewelValue variable
    
            // Determine the value of the collected jewel based on its position
            if (isNearBottom) {
                jewelValue = 2; // If near the bottom, assign a value of 20
            } else {
                jewelValue = 1; // Otherwise, assign a value of 1
            }
    
            // console.log("Is near bottom:", isNearBottom);
            // console.log("Jewel value:", jewelValue);
    
            // Update the total value of collected jewels
            handleJewelCollected(jewelValue);
    
            // Remove the collected jewel from the jewels array
            return prevJewels.filter((_, i) => i !== index);
        });
    };

    
    const checkVillainCollisions = () => {
        jewels.forEach((jewel, index) => {
            if (villain_position && villain_position.x !== undefined && villain_position.y !== undefined) {
                const isCollision =
                    villain_position.x < jewel.x + jewelWidth &&
                    villain_position.x + 100 > jewel.x &&
                    villain_position.y < jewel.y + jewelHeight &&
                    villain_position.y + 100 > jewel.y;
    
                if (isCollision) {
                    console.log("Villain stole jewel at coordinates:", jewel);
                    // handleJewelCollected();
                    stealJewel(index);
                }
            }
        });
    };

    const stealJewel = (index) => {
        setJewels((prevJewels) => {
            const stealJewel = prevJewels[index];
            const isNearBottom = stealJewel.y > (containerRef.current.clientHeight - 200); // Adjust 200 to your preferred distance
    
            let jewelValue; // Define the jewelValue variable
    
            // Determine the value of the collected jewel based on its position
            if (isNearBottom) {
                jewelValue = 2; // If near the bottom, assign a value of 20
            } else {
                jewelValue = 1; // Otherwise, assign a value of 1
            }
    
            // console.log("Is near bottom:", isNearBottom);
            // console.log("Jewel value:", jewelValue);
    
            // Update the total value of collected jewels
            handleJewelStolen(jewelValue);
    
            // Remove the collected jewel from the jewels array
            return prevJewels.filter((_, i) => i !== index);
        });
    };

    // const collectJewel = (index) => {
    //     setJewels((prevJewels) => {
    //         const collectedJewel = prevJewels[index];
    //         const isNearBottom = collectedJewel.y > (containerRef.current.clientHeight - 200); // Adjust 200 to your preferred distance
    
    //         let jewelValue; // Define the jewelValue variable
    
    //         // Determine the value of the collected jewel based on its position
    //         if (isNearBottom) {
    //             jewelValue = 2; // If near the bottom, assign a value of 20
    //         } else {
    //             jewelValue = 1; // Otherwise, assign a value of 1
    //         }
    
    //         console.log("Is near bottom:", isNearBottom);
    //         console.log("Jewel value:", jewelValue);
    
    //         // Update the total value of collected jewels
    //         handleJewelCollected(jewelValue);
    
    //         // Remove the collected jewel from the jewels array
    //         return prevJewels.filter((_, i) => i !== index);
    //     });
    // };
    
    
    
    
    

    // const collectJewel = (index) => {
    //     setJewels((prevJewels) => prevJewels.filter((_, i) => i !== index));
    // };

    useEffect(() => {
        checkCollisions();
    }, [jewels, heroPosition]);

    useEffect(() => {
        checkVillainCollisions();
        console.log('Villain position:', villain_position);
    }, [jewels, villain_position]);

    return (
        <>
            {jewels.map((jewel, index) => (
                <img
                    key={index}
                    src={jewel.y > (containerRef.current.clientHeight - 200) ? valuableJewelImage : regularJewelImage}
                    alt="jewel"
                    className="jewel"
                    style={{ position: 'absolute', left: jewel.x, top: jewel.y, width: jewelWidth, height: jewelHeight, zIndex: 1 }}
                />
                // <img
                //     key={index}
                //     src={regularJewelImage}
                //     alt="jewel"
                //     className="jewel"
                //     style={{ position: 'absolute', left: jewel.x, top: jewel.y, width: jewelWidth, height: jewelHeight, zIndex: 1 }}
                // />
            ))}
        </>
    );
};

export default Jewel;




