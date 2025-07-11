import React, {
  useEffect,
  useRef,
} from 'react';
import '../../styles/components/SparklingLights.scss';
import mainBlockJPG from '/assets/images/mainBlock.jpg';

function SparklingLights() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const lightSources = [
      {
        x: 250,
        y: 10,
        radius: 9,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01,
      },
      {
        x: 270,
        y: 13,
        radius: 12,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01,
      },
      {
        x: 615,
        y: 129,
        radius: 25,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01,
      },
    ];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 1180;
    const width = 1180;

    canvas.height = 464;
    const height = 464;

    const backgroundImage = new Image();
    backgroundImage.src = mainBlockJPG;
    backgroundImage.loading = 'eager';

    let lights = [...lightSources];

    const drawLights = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(backgroundImage, 0, 0, width, height);

      lights = lights.map((light) => {
        let newOpacity = light.opacity + light.speed;
        let newSpeed = light.speed;

        if (newOpacity > 1 || newOpacity < 0) {
          newSpeed = -newSpeed;
          newOpacity = light.opacity + newSpeed;
        }

        const updatedLight = { ...light, opacity: newOpacity, speed: newSpeed };

        const gradient = ctx.createRadialGradient(
          updatedLight.x,
          updatedLight.y,
          0,
          updatedLight.x,
          updatedLight.y,
          updatedLight.radius,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${updatedLight.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${updatedLight.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(updatedLight.x, updatedLight.y, updatedLight.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return updatedLight;
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
}

export default SparklingLights;
