
import React, { useRef, useEffect } from 'react';
import { VerticalLine } from '../VerticalLine/VerticalLine';
import { TypingText } from '../TypingText/TypingText';
import '../../../styles/components/CanvasComponents/CanvasBackground1.scss';

const lineParams = [
    { xPercent: 0.75, yTopPercent: -0.1, widthMax: 20, heightPercent: 0.6, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: 0 },
    { xPercent: 0.80, yTopPercent: -0.2, widthMax: 25, heightPercent: 0.7, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI / 6 },
    { xPercent: 0.85, yTopPercent: -0.05, widthMax: 30, heightPercent: 0.65, skewPx: 15, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI / 3 },
    { xPercent: 0.90, yTopPercent: -0.15, widthMax: 35, heightPercent: 0.8, skewPx: 10, colorStart: '#77bb774f', colorEnd: '#1762244f', phaseOffset: Math.PI / 2 },
    { xPercent: 0.95, yTopPercent: -0.25, widthMax: 28, heightPercent: 0.75, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 2 / 3 },
    { xPercent: 1, yTopPercent: 0.5, widthMax: 32, heightPercent: 0.85, skewPx: 15, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 5 / 6 },
    { xPercent: 0.96, yTopPercent: 0.45, widthMax: 30, heightPercent: 0.7, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI },
    { xPercent: 0.92, yTopPercent: 0.55, widthMax: 35, heightPercent: 0.8, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 7 / 6 },
    { xPercent: 0.88, yTopPercent: 0.4, widthMax: 25, heightPercent: 0.75, skewPx: 15, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 4 / 3 },
    { xPercent: 0.73, yTopPercent: 0.1, widthMax: 20, heightPercent: 0.6, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: 0 },
    { xPercent: 0.78, yTopPercent: 0.2, widthMax: 25, heightPercent: 0.7, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI / 6 },
    { xPercent: 0.83, yTopPercent: 0.05, widthMax: 30, heightPercent: 0.65, skewPx: 15, colorStart: '#77bb774f', colorEnd: '#1762244f', phaseOffset: Math.PI / 3 },
    { xPercent: 0.88, yTopPercent: 0.15, widthMax: 35, heightPercent: 0.8, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#F24942', phaseOffset: Math.PI / 2 },
    { xPercent: 0.93, yTopPercent: 0.25, widthMax: 28, heightPercent: 0.75, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 2 / 3 },
    { xPercent: 0.98, yTopPercent: -0.5, widthMax: 32, heightPercent: 0.85, skewPx: 15, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 5 / 6 },
    { xPercent: 0.94, yTopPercent: -0.45, widthMax: 30, heightPercent: 0.7, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI },
    { xPercent: 0.9, yTopPercent: -0.55, widthMax: 35, heightPercent: 0.8, skewPx: 12, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 7 / 6 },
    { xPercent: 0.86, yTopPercent: -0.4, widthMax: 25, heightPercent: 0.75, skewPx: 15, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 4 / 3 },
    { xPercent: 0.84, yTopPercent: 0.6, widthMax: 40, heightPercent: 0.9, skewPx: 10, colorStart: '#e0e0e0', colorEnd: '#a0a0a0', phaseOffset: Math.PI * 3 / 2 },
];

export default function CanvasBackground1() {
    const canvasRef = useRef(null);
    const linesRef = useRef([]);
    const typerRef = useRef(null);
    const lastFrameRef = useRef(0);
    const isPausedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        linesRef.current = lineParams.map(params => new VerticalLine(params));

        typerRef.current = new TypingText({
            text: [
                { text: "function ", color: "#C792EA" },
                { text: "animate", color: "#82AAFF" },
                { text: "(timestamp) {\n", color: "#D6DEEB" },

                { text: "    if ", color: "#C792EA" },
                { text: "(isPaused) {\n", color: "#82AAFF" },
                { text: "        requestAnimationFrame", color: "#82AAFF" },
                { text: "(animate);\n", color: "#D6DEEB" },
                { text: "        return;\n", color: "#D6DEEB" },
                { text: "    }\n\n", color: "#D6DEEB" },

                { text: "    const ", color: "#C792EA" },
                { text: "delta", color: "#7FDBCA" },
                { text: " = timestamp - lastFrame;\n", color: "#D6DEEB" },
                { text: "    lastFrame = timestamp;\n\n", color: "#D6DEEB" },

                { text: "    ctx", color: "#7FDBCA" },
                { text: ".clearRect", color: "#82AAFF" },
                { text: "(0, 0, canvas.width, canvas.height);\n\n", color: "#D6DEEB" },

                { text: "    // линии\n", color: "#48AE5A" },
                { text: "    lines.forEach", color: "#82AAFF" },
                { text: "(line => {\n", color: "#D6DEEB" },
                { text: "        line.update();\n", color: "#D6DEEB" },
                { text: "        line.draw", color: "#82AAFF" },
                { text: "(ctx, canvas.width, canvas.height);\n", color: "#D6DEEB" },
                { text: "    });\n\n", color: "#D6DEEB" },

                { text: "    // текст\n", color: "#48AE5A" },
                { text: "    typer.update", color: "#82AAFF" },
                { text: "(delta);\n", color: "#D6DEEB" },
                { text: "    typer.draw", color: "#82AAFF" },
                { text: "(ctx);\n\n", color: "#D6DEEB" },

                { text: "    requestAnimationFrame", color: "#82AAFF" },
                { text: "(animate);\n", color: "#D6DEEB" },

                { text: "}\n\n", color: "#D6DEEB" }
            ],
            x: '30%',
            y: '50%',
            font: '12px monospace',
            color: '#D6DEEB',
            cursorColor: '#D6DEEB',
            speed: 40
        });

        const animate = (timestamp) => {
            if (isPausedRef.current) {
                requestAnimationFrame(animate);
                return;
            }

            const delta = timestamp - lastFrameRef.current;
            lastFrameRef.current = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            linesRef.current.forEach(line => {
                line.update();
                line.draw(ctx, canvas.width, canvas.height);
            });

            typerRef.current.update(delta);
            typerRef.current.draw(ctx, canvas);

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, display: 'block', zIndex: 1 }} />;
}
