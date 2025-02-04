import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const ChipCardSVG = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const startPosition = useRef({ x: 0, y: 0 });
    const timerRef = useRef(null);
    const cardRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        targetRef.current = document.getElementById("bv");
        document.documentElement.style.touchAction = "none";

        return () => {
            document.documentElement.style.touchAction = "auto";
        }; 
    }, []);

    const checkOverlap = (chipRect, targetRect) => {
        return (
            chipRect.left < targetRect.right &&
            chipRect.right > targetRect.left &&
            chipRect.top < targetRect.bottom &&
            chipRect.bottom > targetRect.top
        );
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });

        const chipElement = cardRef.current;
        const targetElement = targetRef.current;

        if (chipElement && targetElement) {
            const chipRect = chipElement.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();

            if (checkOverlap(chipRect, targetRect)) {
                if (!timerRef.current) {
                    timerRef.current = setTimeout(() => {
                        console.log("Ваша карта прочитана");
                        setPosition(startPosition.current);
                        timerRef.current = null;
                    }, 1000);
                }
            } else {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            }
        }
    };

    const handleStop = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <Draggable nodeRef={cardRef} position={position} onDrag={handleDrag} onStop={handleStop}>
            <svg
                ref={cardRef}
                id="e"
                width="129"
                height="48"
                viewBox="0 0 11.377 4.2333"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Draggable Chip Card"
            >
                <g id="a">
                    <path
                        id="p"
                        d="m2.9955 0.71604c-0.054508 7.3191e-4 -0.10714 0.020146-0.14926 0.05505l-2.3701 1.965c-0.076474 0.063414-0.19028 0.17989-0.22168 0.27417-0.046167 0.13863-0.020278 0.27321 0.083302 0.40346 0.059678 0.07504 0.17765 0.17789 0.2518 0.23862 0.18654 0.15279 0.34099 0.21662 0.48686 0.25663 0.083584 0.022935 0.22288 0.035771 0.30951 0.034993l8.2165-0.073661c0.11159-9.851e-4 0.21908-0.042598 0.30266-0.11715l1.0281-0.91686c0.03066-0.027348 0.0424-0.070371 0.02994-0.10968l-0.55794-1.7601c-0.014175-0.044726-0.041798-0.11592-0.070238-0.15302-0.041484-0.054076-0.098658-0.097954-0.18567-0.12261-0.2575 0.005127-7.0361 0.026389-7.1537 0.025101zm-1.6538 2.0912c0.05068 7.575e-4 0.10514 0.00631 0.14383 0.014512 0.32481 0.068833 0.444 0.18261 0.50347 0.3094 0.028751 0.061297 0.021084 0.1679-0.018882 0.22235-0.09431 0.12847-0.24499 0.20011-0.44433 0.22271-0.070963 0.00808-0.18738 0.00443-0.25675-0.012413-0.21448-0.052135-0.33621-0.18336-0.38495-0.308-0.024147-0.06175-0.015953-0.17224 0.015549-0.23066 0.059807-0.11088 0.17354-0.18608 0.35913-0.21362 0.023466-0.00345 0.052524-0.00473 0.082932-0.00433z"
                        fill="#989898"
                        strokeWidth=".089916"
                        style={{ paintOrder: "markers stroke fill" }}
                    />
                    <ellipse
                        id="b"
                        cx="8.4378"
                        cy="1.9484"
                        rx="1.1608"
                        ry=".52064"
                        fill="#5e5e5e"
                        stroke="#5e5e5e"
                        strokeLinecap="round"
                        strokeWidth=".93911"
                        style={{ paintOrder: "markers stroke fill" }}
                    />
                    <ellipse
                        id="c"
                        cx="8.4362"
                        cy="1.2698"
                        rx="1.1608"
                        ry=".52064"
                        fill="#989898"
                        stroke="#5e5e5e"
                        strokeLinecap="round"
                        strokeWidth=".45563"
                        style={{ paintOrder: "markers stroke fill" }}
                    />
                </g>
            </svg>
        </Draggable>
    );
};

export default ChipCardSVG;