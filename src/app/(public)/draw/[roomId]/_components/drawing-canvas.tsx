"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

interface DrawingCanvasProps {
  color?: string;
}

interface DrawingCanvasRef {
  clear: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  (props, ref) => {
    const internalCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const getContext = () => {
      const canvas = internalCanvasRef.current;
      return canvas
        ? canvas.getContext("2d", { willReadFrequently: true })
        : null;
    };

    useEffect(() => {
      const canvas = internalCanvasRef.current;
      const ctx = getContext();

      if (canvas && ctx) {
        const container = canvas.parentElement;
        if (container) {
          const dpr = window.devicePixelRatio || 1;
          const rect = container.getBoundingClientRect();
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, []);

    const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = internalCanvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const ctx = getContext();
      if (!ctx) return;

      const { x, y } = getCoords(e);
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const ctx = getContext();
      if (!ctx) return;

      const { x, y } = getCoords(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const ctx = getContext();
      if (!ctx) return;

      ctx.closePath();
      setIsDrawing(false);
    };

    useImperativeHandle(ref, () => ({
      clear: () => {
        console.log("clearing canvas . . .");
      },
    }));

    return (
      <canvas
        className="rounded-base size-full fill-white"
        ref={internalCanvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    );
  },
);
DrawingCanvas.displayName = "DrawingCanvas";
