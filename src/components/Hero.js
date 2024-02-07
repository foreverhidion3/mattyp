import React, { useState, useEffect, useRef } from 'react';
import hero_img from "../images/mm_image_flying_2.png";

const Hero = ({ setPosition, onJewelCollected }) => {
    const [position, setPositionState] = useState({ x: 0, y: 0 });
    const [driftDirection, setDriftDirection] = useState({ x: 1, y: 1 });
    const [speed, setSpeed] = useState(1);

    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const moveHero = () => {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const heroWidth = 50;
            const heroHeight = 50;

            setPositionState((prevPosition) => {
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
    }, [driftDirection, speed]);

    useEffect(() => {
        const handleContainerClick = (event) => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;
        
            const dx = mouseX - position.x;
            const dy = mouseY - position.y;
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
    }, [position]);

    useEffect(() => {
        setPosition(position);
    }, [position, setPosition]);

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
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: '50px',
                    height: '50px',
                }}
            />
        </div>
    );
};

export default Hero;

































