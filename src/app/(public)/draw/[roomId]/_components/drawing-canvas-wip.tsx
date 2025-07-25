import { useRef, useEffect, useState } from "react";

interface DrawingCanvasWIPProps {
  isDrawing: boolean;
  onDraw: ({ x, y }: { x: number; y: number }) => void;
  drawingData: Array<{ x: number; y: number }>;
}

export function DrawingCanvasWIP({
  isDrawing,
  onDraw,
  drawingData = [],
}: DrawingCanvasWIPProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || drawingData.length === 0) return;

    ctx.clearRect(0, 0, canvas?.width, canvas?.height);
    drawingData.forEach(({ x, y }) => {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    });
  }, [drawingData]);

  const draw = (e: React.MouseEvent) => {
    if (!drawing || !isDrawing) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onDraw({ x, y });
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="rounded-base border"
      onMouseDown={() => setDrawing(true)}
      onMouseUp={() => setDrawing(false)}
      onMouseOut={() => setDrawing(false)}
      onMouseMove={draw}
    />
  );
}
