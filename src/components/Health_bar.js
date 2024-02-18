import React, { useEffect, useState } from 'react';
import './Health_bar.css';

const HealthBar = ({ hitsCounted, maxHealth }) => {
    const [healthWidth, setHealthWidth] = useState(`${(hitsCounted / maxHealth) * 100}%`);

    useEffect(() => {
        // Update the health bar width whenever hitsCounted or maxHealth changes
        setHealthWidth(`${(hitsCounted / maxHealth) * 100}%`);
    }, [hitsCounted, maxHealth]);

    return (
        <div className="health_container">
            <div className="health_border">
                <div className="health_bar" style={{ width: healthWidth }}></div>
            </div>
        </div>
    );
};

export default HealthBar;










