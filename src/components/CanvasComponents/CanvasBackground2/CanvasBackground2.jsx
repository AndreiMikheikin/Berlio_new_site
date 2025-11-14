import React, { useRef, useEffect, useCallback } from 'react';
import { paths } from '../../../data/logoPath';
import { Edge } from '../Edge/Edge';
import { Vertex } from '../Vertex/Vertex';

// Константы
const GLOBAL_SPEED = 75;
const TOTAL_POINTS = 1500;
const MAX_EDGE_RADIUS = 75;
const MAX_EDGES_PER_VERTEX = 7;

// HSL цвета для градиентов
const redHSL = { h: 3, s: 75, l: 55 };
const greenHSL = { h: 140, s: 55, l: 50 };

// Тип градиента для каждого path
const pathColorsConfig = [
    redHSL, redHSL, greenHSL, redHSL, redHSL, redHSL, greenHSL
];

export default function CanvasBackground2({
    scale = 0.8,
    position = 'relative',
    top = '-70px',
    left = 0,
    width = '100%',
    height = '100%',
    zIndex = 1
}) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const stateRef = useRef({
        GLOBAL_SPEED,
        vertices: [],
        edges: [],
        colorHue: 180,
        scale: scale, // начальное значение из пропсов
        offsetX: 0,
        offsetY: 0,
        lastTime: 0,
        EDGE_RADIUS: 55,
        currentMaxEdges: 1,
        mode: 'idle',
        edgesVisible: false,
        canvas: null,
        pathColors: []
    });

    // Создаём массив цветов для вершин каждого path
    const initializePathColors = useCallback(() => {
        const pathColors = paths.map((p, i) => {
            const temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            temp.setAttribute('d', p);
            const pathLength = temp.getTotalLength();
            const totalLength = paths.reduce((sum, path) => {
                const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                tempPath.setAttribute('d', path);
                return sum + tempPath.getTotalLength();
            }, 0);

            const numPoints = Math.max(10, Math.floor(TOTAL_POINTS * (pathLength / totalLength)));
            const baseColor = pathColorsConfig[i] || { h: 180, s: 50, l: 50 };

            const colors = [];
            for (let j = 0; j <= numPoints; j++) {
                const t = j / numPoints;
                const hueVariation = (Math.random() - 0.5) * 15;
                const saturationVariation = (Math.random() - 0.5) * 15;
                const lightnessVariation = (Math.random() - 0.5) * 20;

                const h = baseColor.h + hueVariation;
                const s = Math.max(30, Math.min(90, baseColor.s + saturationVariation));
                const l = Math.max(35, Math.min(75, baseColor.l + lightnessVariation));

                colors.push(`hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`);
            }
            return colors;
        });

        stateRef.current.pathColors = pathColors;
    }, []);

    const getPointsFromPath = useCallback((pathStr, numPoints, currentScale, offsetX, offsetY) => {
        const temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        temp.setAttribute('d', pathStr);
        const len = temp.getTotalLength();
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const p = temp.getPointAtLength((i / numPoints) * len);
            points.push({ 
                x: p.x * currentScale + offsetX, 
                y: p.y * currentScale + offsetY 
            });
        }
        return points;
    }, []);

    const initVertices = useCallback((currentScale, currentOffsetX, currentOffsetY) => {
        const state = stateRef.current;
        const lengths = paths.map(p => {
            const temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            temp.setAttribute('d', p);
            return temp.getTotalLength();
        });
        const totalLength = lengths.reduce((a, b) => a + b, 0);

        state.vertices = [];

        paths.forEach((p, pathIndex) => {
            const portion = lengths[pathIndex] / totalLength;
            const count = Math.max(10, Math.floor(TOTAL_POINTS * portion));
            const points = getPointsFromPath(p, count, currentScale, currentOffsetX, currentOffsetY);

            points.forEach((point, pointIndex) => {
                const vertex = new Vertex(point.x, point.y, state);
                if (state.pathColors[pathIndex] && state.pathColors[pathIndex][pointIndex]) {
                    vertex.color = state.pathColors[pathIndex][pointIndex];
                } else {
                    vertex.color = `hsl(${pathColorsConfig[pathIndex]?.h || 180}, ${pathColorsConfig[pathIndex]?.s || 50}%, ${pathColorsConfig[pathIndex]?.l || 50}%)`;
                }
                state.vertices.push(vertex);
            });
        });
    }, [getPointsFromPath]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const state = stateRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        state.canvas = canvas;

        const logoWidth = 272;
        const logoHeight = 66;

        // Используем актуальный scale из stateRef
        const targetWidth = canvas.width * state.scale;
        const calculatedScale = targetWidth / logoWidth;

        // Обновляем offset с новым scale
        state.offsetX = (canvas.width - logoWidth * calculatedScale) / 2;
        state.offsetY = (canvas.height - logoHeight * calculatedScale) / 2;

        // Переинициализируем вершины с новыми параметрами
        initVertices(calculatedScale, state.offsetX, state.offsetY);

        updateEdgeRadius();
    }, [initVertices]);

    const updateEdgeRadius = useCallback(() => {
        const state = stateRef.current;
        const canvas = state.canvas;
        if (!canvas) return;

        const diag = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
        const minRadius = 15;
        const maxRadius = MAX_EDGE_RADIUS;
        const minDiag = 500;
        const maxDiag = 2000;

        let newRadius = minRadius + (diag - minDiag) * (maxRadius - minRadius) / (maxDiag - minDiag);
        state.EDGE_RADIUS = Math.max(minRadius, Math.min(maxRadius, newRadius));
    }, []);

    const findEdges = useCallback(() => {
        const state = stateRef.current;
        const edgesList = [];

        state.vertices.forEach(v => v.edgeCount = 0);

        for (let i = 0; i < state.vertices.length; i++) {
            const a = state.vertices[i];

            for (let j = i + 1; j < state.vertices.length; j++) {
                const b = state.vertices[j];

                if (!a.isMoving && !b.isMoving) continue;
                if ((a.isMoving && !b.isMoving) || (!a.isMoving && b.isMoving)) continue;

                if (a.edgeCount >= state.currentMaxEdges || b.edgeCount >= state.currentMaxEdges) continue;

                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);

                if (dist <= state.EDGE_RADIUS) {
                    const edge = new Edge(a, b);
                    const alpha = 1 - dist / state.EDGE_RADIUS;

                    edgesList.push({ edge, alpha });

                    a.edgeCount++;
                    b.edgeCount++;
                }
            }
        }

        return edgesList;
    }, []);

    const drawLogo = useCallback((ctx) => {
        const state = stateRef.current;
        ctx.save();
        ctx.translate(state.offsetX, state.offsetY);
        ctx.scale(state.scale, state.scale);
        ctx.strokeStyle = `hsla(${state.colorHue}, 50%, 30%, 0.1)`;
        ctx.lineWidth = 0.4;
        paths.forEach(p => ctx.stroke(new Path2D(p)));
        ctx.restore();
    }, []);

    const drawEdges = useCallback((ctx) => {
        const state = stateRef.current;
        const edges = findEdges();
        edges.forEach(({ edge, alpha }) => edge.draw(ctx, alpha * 0.6));
    }, [findEdges]);

    const startCycle = useCallback(() => {
        const state = stateRef.current;
        state.mode = 'scatter';
        state.edgesVisible = false;

        state.vertices.forEach(v => {
            const angle = Math.random() * 2 * Math.PI;
            v.vx = Math.cos(angle);
            v.vy = Math.sin(angle);
            v.speed = state.GLOBAL_SPEED * (0.8 + Math.random() * 0.4);
            v.returning = false;
            v.bounceCount = 0;
            v.hasMoved = false;
            v.isMoving = false;
            v.startDelay = Math.random() * 900 + 100;
            v.delayElapsed = 0;
            v.canStart = false;
            v.startProgress = 0;
            v.initialized = false;

            v.x = v.original.x + (Math.random() - 0.5) * 2;
            v.y = v.original.y + (Math.random() - 0.5) * 2;
        });

        setTimeout(() => {
            state.edgesVisible = true;
        }, 1000);
    }, []);

    const resetCycle = useCallback(() => {
        const state = stateRef.current;
        state.mode = 'idle';
        state.edgesVisible = false;

        state.vertices.forEach(v => {
            v.x = v.original.x;
            v.y = v.original.y;
            v.vx = 0;
            v.vy = 0;
            v.speed = 0;
            v.returning = false;
            v.bounceCount = 0;
            v.hasMoved = false;
            v.isMoving = false;
            v.startDelay = Math.random() * 900 + 100;
            v.delayElapsed = 0;
            v.canStart = false;
            v.startProgress = 0;
            v.initialized = false;
        });

        setTimeout(startCycle, 3000);
    }, [startCycle]);

    const autoChangeColor = useCallback(() => {
        const state = stateRef.current;
        state.colorHue = (state.colorHue + 0.1) % 360;
    }, []);

    const animate = useCallback((timestamp) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const state = stateRef.current;
        const now = timestamp || performance.now();
        const dt = Math.min((now - state.lastTime) / 1000, 0.1);
        state.lastTime = now;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLogo(ctx);

        state.vertices.forEach(v => v.update(dt));
        state.vertices.forEach(v => v.draw(ctx));

        if (state.edgesVisible) drawEdges(ctx);

        const allHome = state.vertices.every(v => v.isAtOrigin);
        if (allHome && state.mode !== 'idle') {
            resetCycle();
        }

        autoChangeColor();
        animationRef.current = requestAnimationFrame(animate);
    }, [drawLogo, drawEdges, resetCycle, autoChangeColor]);

    // Основной эффект для инициализации
    useEffect(() => {
        initializePathColors();
        resizeCanvas();

        const state = stateRef.current;

        // Увеличиваем максимальное количество рёбер каждую секунду
        const edgeInterval = setInterval(() => {
            if (state.currentMaxEdges < MAX_EDGES_PER_VERTEX) {
                state.currentMaxEdges++;
            }
        }, 1000);

        // Запускаем первый цикл через секунду
        const startTimeout = setTimeout(startCycle, 1000);

        // Запускаем анимацию
        animationRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(edgeInterval);
            clearTimeout(startTimeout);
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initializePathColors, resizeCanvas, startCycle, animate]);

    // Эффект для обновления scale при изменении пропса
    useEffect(() => {
        stateRef.current.scale = scale;
        resizeCanvas(); // Пересчитываем при изменении scale
    }, [scale, resizeCanvas]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position,
                top,
                left,
                width,
                height,
                display: 'block',
                zIndex
            }}
        />
    );
}