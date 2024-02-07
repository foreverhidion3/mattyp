import React, { useState, useEffect } from 'react';
import power_ball_img from "../images/power_ball_2.gif";

const Jewel = ({ containerRef, onJewelCollected, heroPosition }) => {
    const [jewels, setJewels] = useState([]);
    const [jewelWidth, setJewelWidth] = useState(20);
    const [jewelHeight, setJewelHeight] = useState(20);

    const MAX_JEWELS = 100; // Maximum number of jewels allowed

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
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const checkCollisions = () => {
        jewels.forEach((jewel, index) => {
            const isCollision =
                heroPosition.x < jewel.x + jewelWidth &&
                heroPosition.x + 30 > jewel.x &&
                heroPosition.y < jewel.y + jewelHeight &&
                heroPosition.y + 30 > jewel.y;

            if (isCollision) {
                console.log("Collision detected with jewel at coordinates:", jewel);
                onJewelCollected();
                collectJewel(index);
            }
        });
    };

    const collectJewel = (index) => {
        setJewels((prevJewels) => prevJewels.filter((_, i) => i !== index));
    };

    useEffect(() => {
        checkCollisions();
    }, [jewels, heroPosition]);

    return (
        <>
            {jewels.map((jewel, index) => (
                <img
                    key={index}
                    src={power_ball_img}
                    alt="jewel"
                    className="jewel"
                    style={{ position: 'absolute', left: jewel.x, top: jewel.y, width: jewelWidth, height: jewelHeight, zIndex: 1 }}
                />
            ))}
        </>
    );
};

export default Jewel;





















