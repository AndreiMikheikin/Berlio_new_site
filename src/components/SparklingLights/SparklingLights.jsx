import React, { useEffect, useRef } from 'react';
import '../../styles/components/SparklingLights.scss';
import mainBlockJPG from '../../assets/images/mainBlock.jpg';


const SparklingLights = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width = 1180;
      const height = canvas.height = 464;
  
      const backgroundImage = new Image();
      backgroundImage.src = mainBlockJPG; // Замените на путь к вашему изображению
  
      // Координаты фонарей (примерные значения)
      const lightSources = [
        { x: 250, y: 10, radius: 9, opacity: Math.random(), speed: Math.random() * 0.02 + 0.01 },
        { x: 270, y: 13, radius: 12, opacity: Math.random(), speed: Math.random() * 0.02 + 0.01 },
        { x: 615, y: 129, radius: 25, opacity: Math.random(), speed: Math.random() * 0.02 + 0.01 },
      ];
  
      const drawLights = () => {
        ctx.clearRect(0, 0, width, height);
  
        // Отрисовка фонового изображения
        ctx.drawImage(backgroundImage, 0, 0, width, height);
  
        // Отрисовка мерцающих бликов фонарей
        lightSources.forEach(light => {
          light.opacity += light.speed;
          if (light.opacity > 1 || light.opacity < 0) {
            light.speed *= -1;
          }
  
          const gradient = ctx.createRadialGradient(
            light.x, light.y, 0,
            light.x, light.y, light.radius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${light.opacity * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${light.opacity * 0.4})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
          ctx.beginPath();
          ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
  
        requestAnimationFrame(drawLights);
      };
  
      backgroundImage.onload = () => {
        drawLights();
      };
  
      const resizeHandler = () => {
        canvas.width = 1180;
        canvas.height = 464;
        if (backgroundImage.complete) {
          ctx.drawImage(backgroundImage, 0, 0, width, height);
        }
      };
  
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }, []);
  
    return (
      <div className="aam_sparkling-container">
        <canvas ref={canvasRef} className="aam_canvas" />
      </div>
    );
  };
  
  export default SparklingLights;
