import React, { useEffect, useRef } from 'react';

const CanvasBackground3 = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const timeRef = useRef(0);
  const mouseMoveTimerRef = useRef(null);

  // Географические координаты реальных городов Беларуси
  const belarusCities = [
    // Столица (и центр Минской области)
    { name: 'Минск', lat: 53.9045, lon: 27.5615, population: 2009786, isCapital: true, region: 'Минская' },
    
    // Областные центры
    { name: 'Гомель', lat: 52.4453, lon: 30.9842, population: 535229, isRegionalCenter: true, region: 'Гомельская' },
    { name: 'Могилёв', lat: 53.9006, lon: 30.3325, population: 381353, isRegionalCenter: true, region: 'Могилёвская' },
    { name: 'Витебск', lat: 55.1848, lon: 30.2029, population: 369933, isRegionalCenter: true, region: 'Витебская' },
    { name: 'Гродно', lat: 53.6694, lon: 23.8131, population: 368710, isRegionalCenter: true, region: 'Гродненская' },
    { name: 'Брест', lat: 52.0975, lon: 23.6877, population: 350616, isRegionalCenter: true, region: 'Брестская' },
    
    // Города Минской области
    { name: 'Борисов', lat: 54.2279, lon: 28.5050, population: 143000, region: 'Минская' },
    { name: 'Солигорск', lat: 52.7896, lon: 27.5212, population: 106000, region: 'Минская' },
    { name: 'Молодечно', lat: 54.3089, lon: 26.8120, population: 95000, region: 'Минская' },
    { name: 'Жодино', lat: 54.0988, lon: 28.3331, population: 64000, region: 'Минская' },
    { name: 'Слуцк', lat: 53.0278, lon: 27.5597, population: 62000, region: 'Минская' },
    { name: 'Дзержинск', lat: 53.6833, lon: 27.1389, population: 28000, region: 'Минская' },
    
    // Города Гомельской области
    { name: 'Мозырь', lat: 52.0493, lon: 29.2456, population: 112000, region: 'Гомельская' },
    { name: 'Жлобин', lat: 52.8920, lon: 30.0362, population: 76000, region: 'Гомельская' },
    { name: 'Светлогорск', lat: 52.6299, lon: 29.7441, population: 69000, region: 'Гомельская' },
    { name: 'Речица', lat: 52.3706, lon: 30.3916, population: 66000, region: 'Гомельская' },
    { name: 'Калинковичи', lat: 52.1278, lon: 29.3298, population: 39000, region: 'Гомельская' },
    { name: 'Рогачёв', lat: 53.0958, lon: 30.0491, population: 34000, region: 'Гомельская' },
    
    // Города Могилёвской области
    { name: 'Бобруйск', lat: 53.1384, lon: 29.2214, population: 217000, region: 'Могилёвская' },
    { name: 'Орша', lat: 54.5153, lon: 30.4115, population: 116000, region: 'Могилёвская' },
    { name: 'Осиповичи', lat: 53.2997, lon: 28.6425, population: 32000, region: 'Могилёвская' },
    
    // Города Витебской области
    { name: 'Орша', lat: 54.5153, lon: 30.4115, population: 116000, region: 'Витебская' },
    { name: 'Полоцк', lat: 55.4851, lon: 28.7966, population: 85000, region: 'Витебская' },
    { name: 'Новополоцк', lat: 55.5315, lon: 28.6637, population: 103000, region: 'Витебская' },
    
    // Города Гродненской области
    { name: 'Лида', lat: 53.8872, lon: 25.3028, population: 101000, region: 'Гродненская' },
    { name: 'Слоним', lat: 53.0869, lon: 25.3211, population: 49000, region: 'Гродненская' },
    { name: 'Волковыск', lat: 53.1634, lon: 24.4692, population: 44000, region: 'Гродненская' },
    { name: 'Сморгонь', lat: 54.4808, lon: 26.4026, population: 37000, region: 'Гродненская' },
    
    // Города Брестской области
    { name: 'Барановичи', lat: 53.1290, lon: 25.9933, population: 179000, region: 'Брестская' },
    { name: 'Пинск', lat: 52.1228, lon: 26.0951, population: 138000, region: 'Брестская' },
    { name: 'Кобрин', lat: 52.2139, lon: 24.3564, population: 52000, region: 'Брестская' },
    { name: 'Берёза', lat: 52.5343, lon: 24.9829, population: 29000, region: 'Брестская' },
    { name: 'Лунинец', lat: 52.2475, lon: 26.8045, population: 24000, region: 'Брестская' },
  ];

  // Конвертация географических координат в координаты canvas
  const convertToCanvasCoords = (lat, lon, canvasWidth, canvasHeight) => {
    const minLat = 51.0;
    const maxLat = 56.5;
    const minLon = 23.0;
    const maxLon = 32.5;
    
    const normX = (lon - minLon) / (maxLon - minLon);
    const normY = 1 - (lat - minLat) / (maxLat - minLat);
    
    const padding = 0.1;
    const paddedX = padding + normX * (1 - 2 * padding);
    const paddedY = padding + normY * (1 - 2 * padding);
    
    return {
      x: paddedX * canvasWidth,
      y: paddedY * canvasHeight
    };
  };

  // Определение цвета узла по иерархии
  const getNodeColor = (node) => {
    if (node.isCapital) return '#DC2626'; // Красный для столицы
    if (node.isRegionalCenter) return '#059669'; // Изумрудный для областных центров
    if (node.population > 100000) return '#10B981'; // Зеленый для крупных городов
    if (node.population > 50000) return '#34D399'; // Светло-зеленый для средних
    return '#6EE7B7'; // Очень светлый для малых
  };

  // Определение базового размера по иерархии
  const getNodeSize = (node) => {
    if (node.isCapital) return 18;
    if (node.isRegionalCenter) return 14;
    if (node.population > 100000) return 10;
    if (node.population > 50000) return 8;
    return 6;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Установка размеров
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSystem();
    };

    // Инициализация системы
    const initSystem = () => {
      nodesRef.current = [];
      connectionsRef.current = [];
      particlesRef.current = [];
      
      // Создаем узлы по городам
      belarusCities.forEach((city, i) => {
        const coords = convertToCanvasCoords(city.lat, city.lon, canvas.width, canvas.height);
        
        const node = {
          id: i,
          name: city.name,
          lat: city.lat,
          lon: city.lon,
          population: city.population,
          region: city.region,
          x: coords.x,
          y: coords.y,
          baseSize: getNodeSize(city),
          size: getNodeSize(city),
          color: getNodeColor(city),
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.01,
          glow: 0,
          energy: Math.random() * 0.3,
          isCapital: city.isCapital || false,
          isRegionalCenter: city.isRegionalCenter || false,
          regionCenterId: null // Заполним позже
        };
        nodesRef.current.push(node);
      });
      
      // Определяем региональные центры
      const regionalCenters = nodesRef.current.filter(n => n.isRegionalCenter || n.isCapital);
      
      // Связываем города с их региональными центрами
      nodesRef.current.forEach(node => {
        if (!node.isRegionalCenter && !node.isCapital) {
          const regionCenter = regionalCenters.find(rc => rc.region === node.region);
          if (regionCenter) {
            node.regionCenterId = regionCenter.id;
          }
        } else {
          node.regionCenterId = node.id; // Центры ссылаются на себя
        }
      });
      
      // Создаем связи
      nodesRef.current.forEach(node => {
        if (node.isRegionalCenter && !node.isCapital) {
          // Связь областного центра со столицей
          const minskNode = nodesRef.current.find(n => n.isCapital);
          if (minskNode) {
            connectionsRef.current.push({
              id: `${minskNode.id}-${node.id}`,
              from: minskNode,
              to: node,
              isMainConnection: true,
              width: 3,
              energy: 0,
              pulse: Math.random() * Math.PI * 2,
              particleProgress: Math.random(),
              particleSpeed: 0.003,
              particles: []
            });
          }
        }
        
        // Связь города со своим областным центром
        if (node.regionCenterId !== null && node.regionCenterId !== node.id) {
          const regionCenter = nodesRef.current.find(n => n.id === node.regionCenterId);
          if (regionCenter) {
            connectionsRef.current.push({
              id: `${regionCenter.id}-${node.id}`,
              from: regionCenter,
              to: node,
              isMainConnection: false,
              width: 1.5,
              energy: 0,
              pulse: Math.random() * Math.PI * 2,
              particleProgress: Math.random(),
              particleSpeed: 0.002 + Math.random() * 0.002,
              particles: []
            });
          }
        }
      });
    };

    // Создание частицы для связи
    const createConnectionParticle = (connection, progress) => {
      const x = connection.from.x + (connection.to.x - connection.from.x) * progress;
      const y = connection.from.y + (connection.to.y - connection.from.y) * progress;
      
      return {
        x,
        y,
        progress,
        size: connection.isMainConnection ? 4 : 2.5,
        color: connection.isMainConnection ? '#DC2626' : connection.from.color,
        speed: connection.isMainConnection ? 0.0015 : 0.001,
        direction: Math.random() > 0.5 ? 1 : -1,
        life: 1,
        decay: 0.001
      };
    };

    // Обработка движения мыши
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      mouseRef.current.isMoving = true;
      
      // Активация узлов при движении мыши рядом с ними
      nodesRef.current.forEach(node => {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const intensity = 1 - (distance / 120);
          node.energy = Math.min(1, node.energy + intensity * 0.2);
          node.glow = Math.min(1, node.glow + intensity * 0.3);
        }
      });
      
      // Сбрасываем таймер неактивности
      clearTimeout(mouseMoveTimerRef.current);
      mouseMoveTimerRef.current = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 200);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    // Обновление системы
    const update = () => {
      timeRef.current += 0.016;
      
      // Обновляем узлы
      nodesRef.current.forEach(node => {
        // Пульсация размера (не влияет на положение текста)
        node.pulse += node.pulseSpeed;
        const pulseFactor = Math.sin(node.pulse) * 0.05;
        node.size = node.baseSize * (1 + pulseFactor);
        
        // Постепенное затухание
        node.glow *= 0.97;
        node.energy *= 0.99;
        
        // Автогенерация энергии для крупных городов
        if (node.population > 100000 && Math.random() > 0.99) {
          node.energy = Math.min(1, node.energy + 0.03);
        }
      });
      
      // Обновляем связи
      connectionsRef.current.forEach(conn => {
        conn.pulse += 0.01;
        
        // Энергия связи - среднее от энергии концевых узлов
        conn.energy = (conn.from.energy + conn.to.energy) / 2;
        
        // Бегущая точка
        conn.particleProgress += conn.particleSpeed;
        if (conn.particleProgress > 1) conn.particleProgress = 0;
        
        // Создаем частицы при высокой энергии
        if (conn.energy > 0.4 && Math.random() > 0.92) {
          const startProgress = conn.isMainConnection ? 0 : Math.random();
          const particle = createConnectionParticle(conn, startProgress);
          conn.particles.push(particle);
        }
        
        // Обновляем частицы
        conn.particles.forEach((particle, index) => {
          particle.progress += particle.speed * particle.direction * (1 + conn.energy * 0.3);
          particle.life -= particle.decay;
          
          // Отскок от концов или удаление
          if (particle.progress > 1 || particle.progress < 0) {
            if (Math.random() > 0.6) {
              particle.direction *= -1;
              particle.progress = Math.max(0, Math.min(1, particle.progress));
            } else {
              conn.particles.splice(index, 1);
              return;
            }
          }
          
          // Обновляем позицию
          particle.x = conn.from.x + (conn.to.x - conn.from.x) * particle.progress;
          particle.y = conn.from.y + (conn.to.y - conn.from.y) * particle.progress;
          
          if (particle.life <= 0) {
            conn.particles.splice(index, 1);
          }
        });
        
        // Ограничиваем количество частиц
        if (conn.particles.length > 10) {
          conn.particles = conn.particles.slice(-10);
        }
      });
    };

    // Рендеринг
    const render = () => {
      // Светлый фон
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#f8fafc');
      bgGradient.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Очень тонкая сетка
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Сначала рисуем все связи
      connectionsRef.current.forEach(conn => {
        const energy = conn.energy;
        
        // Цвет связи
        let lineColor;
        if (conn.isMainConnection) {
          lineColor = `rgba(220, 38, 38, ${0.2 + energy * 0.4})`; // Красный
        } else {
          // Цвет региона
          lineColor = `rgba(5, 150, 105, ${0.1 + energy * 0.3})`; // Зеленый
        }
        
        // Линия связи
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.lineWidth = conn.width * (0.8 + energy * 0.5);
        ctx.strokeStyle = lineColor;
        ctx.stroke();
        
        // Бегущая точка
        if (energy > 0.1) {
          const progress = conn.particleProgress;
          const pointX = conn.from.x + (conn.to.x - conn.from.x) * progress;
          const pointY = conn.from.y + (conn.to.y - conn.from.y) * progress;
          
          const pointSize = conn.isMainConnection ? 5 : 3;
          
          // Свечение точки
          ctx.beginPath();
          ctx.arc(pointX, pointY, pointSize * 2, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            pointX, pointY, 0,
            pointX, pointY, pointSize * 2
          );
          
          if (conn.isMainConnection) {
            glowGradient.addColorStop(0, 'rgba(220, 38, 38, 0.5)');
          } else {
            glowGradient.addColorStop(0, 'rgba(5, 150, 105, 0.4)');
          }
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Сама точка
          ctx.beginPath();
          ctx.arc(pointX, pointY, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = conn.isMainConnection ? '#ffffff' : '#f0fdf4';
          ctx.fill();
        }
        
        // Частицы
        conn.particles.forEach(particle => {
          const alpha = particle.life * 0.8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        });
      });
      
      // Затем рисуем узлы (поверх связей)
      nodesRef.current.forEach(node => {
        const currentSize = node.size;
        
        // Внешнее свечение
        const glowSize = currentSize * (2 + node.glow * 5 + node.energy * 4);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        
        glowGradient.addColorStop(0, `${node.color}${Math.floor((node.glow * 80 + node.energy * 80)).toString(16).padStart(2, '0')}`);
        glowGradient.addColorStop(0.3, `${node.color}22`);
        glowGradient.addColorStop(0.5, `${node.color}00`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Основной узел
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentSize
        );
        
        nodeGradient.addColorStop(0, '#ffffff');
        nodeGradient.addColorStop(0.3, node.color);
        nodeGradient.addColorStop(1, `${node.color}dd`);
        
        ctx.fillStyle = nodeGradient;
        ctx.fill();
        
        // Внутренняя подсветка
        if (node.energy > 0.2) {
          const innerSize = currentSize * 0.6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, innerSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + node.energy * 0.4})`;
          ctx.fill();
        }
        
        // Центральная точка
        const centerSize = currentSize * 0.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, centerSize, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Подписи городов (стабильные, не зависят от пульсации)
        const fontSize = node.isCapital ? 16 : 
                        node.isRegionalCenter ? 14 : 
                        node.population > 100000 ? 12 : 10;
        
        const fontWeight = node.isCapital ? 'bold' : node.isRegionalCenter ? '600' : 'normal';
        ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
        
        // Цвет текста в зависимости от иерархии
        let textColor;
        if (node.isCapital) {
          textColor = `rgba(220, 38, 38, ${0.9})`;
        } else if (node.isRegionalCenter) {
          textColor = `rgba(5, 150, 105, ${0.8})`;
        } else if (node.population > 100000) {
          textColor = `rgba(16, 185, 129, ${0.7})`;
        } else {
          textColor = `rgba(34, 211, 153, ${0.6})`;
        }
        
        // Текстовая подсветка при энергии
        if (node.energy > 0.3) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 15 * node.energy;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // Смещение текста используем БАЗОВЫЙ размер, а не пульсирующий
        const textOffset = node.baseSize + 8;
        ctx.fillText(node.name, node.x, node.y + textOffset);
        
        // Сбрасываем тень
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      });
      
      update();
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveTimerRef.current) {
        clearTimeout(mouseMoveTimerRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2
      }}
    />
  );
};

export default CanvasBackground3;