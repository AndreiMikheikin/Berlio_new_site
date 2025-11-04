import React, { useRef, useEffect } from 'react';

const CanvasPill = ({
  color = 'red',
  size = 60,
  pulseSpeed = 0.02,
  phase = 0,
  minRadiusRatio = 0.4, // минимальный радиус от size
  maxRadiusRatio = 0.5  // максимальный радиус от size
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let t = phase;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // радиус пульсации по синусоиде между min и max
      const radius =
        minRadiusRatio * size +
        (Math.sin(t * Math.PI * 2) + 1) / 2 * (maxRadiusRatio - minRadiusRatio) * size;

      // свечение
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        radius / 2,
        size / 2,
        size / 2,
        radius
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      t += pulseSpeed;

      requestAnimationFrame(draw);
    };

    draw();
  }, [color, size, pulseSpeed, phase, minRadiusRatio, maxRadiusRatio]);

  return <canvas ref={canvasRef} width={size} height={size} style={{ cursor: 'pointer' }} />;
};

export default CanvasPill;
