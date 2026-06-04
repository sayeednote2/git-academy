"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  color = "#3B82F6",
  maxOpacity = 0.3,
  flickerChance = 0.3,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let squares: { x: number; y: number; opacity: number; speed: number }[] = [];
    let animationFrameId: number;

    const rgbColor = hexToRgb(color);

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.floor(width / (squareSize + gridGap));
      rows = Math.floor(height / (squareSize + gridGap));

      squares = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < flickerChance) {
            squares.push({
              x: i * (squareSize + gridGap),
              y: j * (squareSize + gridGap),
              opacity: Math.random() * maxOpacity,
              speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      squares.forEach((sq) => {
        sq.opacity += sq.speed;
        if (sq.opacity >= maxOpacity) {
          sq.opacity = maxOpacity;
          sq.speed = -Math.abs(sq.speed);
        } else if (sq.opacity <= 0) {
          sq.opacity = 0;
          sq.speed = Math.abs(sq.speed);
        }

        ctx.fillStyle = `rgba(${rgbColor}, ${sq.opacity})`;
        ctx.fillRect(sq.x, sq.y, squareSize, squareSize);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none w-full h-full", className)}
    />
  );
}

function hexToRgb(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const h = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "255, 255, 255";
}
