"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export default function CanvasDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let points: Point[] = [];
    let mouse = { x: -1000, y: -1000 };
    const DOT_COUNT = 80;
    const MAX_DIST = 150;
    const DOT_RADIUS = 2;
    const MOUSE_REPEL = 120;
    const REPEL_FORCE = 3;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initPoints() {
      points = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        originX: 0,
        originY: 0,
      }));
      for (const p of points) {
        p.originX = p.x;
        p.originY = p.y;
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_REPEL && mdist > 0) {
          const force = (MOUSE_REPEL - mdist) / MOUSE_REPEL;
          p.vx += (mdx / mdist) * force * REPEL_FORCE * 0.1;
          p.vy += (mdy / mdist) * force * REPEL_FORCE * 0.1;
        }

        // Return to origin force
        const odx = p.originX - p.x;
        const ody = p.originY - p.y;
        p.vx += odx * 0.001;
        p.vy += ody * 0.001;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas!.width) { p.vx *= -1; p.x = Math.max(0, Math.min(canvas!.width, p.x)); }
        if (p.y < 0 || p.y > canvas!.height) { p.vy *= -1; p.y = Math.max(0, Math.min(canvas!.height, p.y)); }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(99, 102, 241, 0.5)";
        ctx!.fill();

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const opacity = 1 - dist / MAX_DIST;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    resize();
    initPoints();
    draw();

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", () => {
      resize();
      initPoints();
    });

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
