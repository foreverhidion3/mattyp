import React, { useState, useEffect, useRef } from 'react';
import hero_img from "../images/spaceship_img.png";

const Hero = ({ setPosition, heroPosition, jewelPositions, fireballPositions, onJewelCollected }) => {
    const [driftDirection, setDriftDirection] = useState({ x: 1, y: 1 });
    const [speed, setSpeed] = useState(.8);

    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const moveHero = () => {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const heroWidth = 120;
            const heroHeight = 120;

            setPosition((prevPosition) => {
                let newX = prevPosition.x + driftDirection.x * speed;
                let newY = prevPosition.y + driftDirection.y * speed;

                if (newX >= containerWidth - heroWidth || newX <= 0) {
                    setDriftDirection((prevDirection) => ({ ...prevDirection, x: prevDirection.x * -1 }));
                    newX = Math.max(0, Math.min(containerWidth - heroWidth, newX));
                }
                if (newY >= containerHeight - heroHeight || newY <= 0) {
                    setDriftDirection((prevDirection) => ({ ...prevDirection, y: prevDirection.y * -1 }));
                    newY = Math.max(0, Math.min(containerHeight - heroHeight, newY));
                }

                return { x: newX, y: newY };
            });

            animationFrameRef.current = requestAnimationFrame(moveHero);
        };

        animationFrameRef.current = requestAnimationFrame(moveHero);

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [driftDirection, speed, setPosition]);

    useEffect(() => {
        const handleContainerClick = (event) => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;
        
            const dx = mouseX - heroPosition.x;
            const dy = mouseY - heroPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
        
            if (distance > 1) {
                const newDriftDirection = {
                    x: dx / distance,
                    y: dy / distance,
                };
        
                setDriftDirection(newDriftDirection);
            }
        };

        const container = containerRef.current;
        container.addEventListener('click', handleContainerClick);

        return () => {
            container.removeEventListener('click', handleContainerClick);
        };
    }, [heroPosition]);

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'crosshair', zIndex: 2 }}
        >
            <img
                src={hero_img}
                alt="Hero"
                style={{
                    position: 'absolute',
                    left: `${heroPosition.x}px`,
                    top: `${heroPosition.y}px`,
                    width: '120px',
                    height: '120px',
                    zIndex: 2,
                }}
            />
        </div>
    );
};

export default Hero;