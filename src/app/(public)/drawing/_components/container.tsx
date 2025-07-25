"use client";

import { useEffect, useRef, useState } from "react";
import Leaderboard from "@/components/leaderboar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Container() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const startDrawing = (e: MouseEvent) => {
      isDrawingRef.current = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "#000"; // warna garis
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, []);

  return (
    <main className="h-screen w-full">
      <section>
        <div className="mx-auto max-w-[90%] pt-10">
          <div className="w-full">
            <div className="flex h-40 items-center justify-center">
              <div className="flex -translate-y-8 items-center">
                <div className="relative rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    cocokkan
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-secondary font-gaeilge-kids text-7xl"
                      style={{ WebkitTextStroke: "0.5px var(--foreground)" }}
                    >
                      cocokkan
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-12 -rotate-4">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    gambar
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-success font-gaeilge-kids text-7xl"
                      style={{ WebkitTextStroke: "0.5px var(--foreground)" }}
                    >
                      gambar
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-foreground h-[calc(100vh-240px)] w-full">
              <div className="grid h-full w-full grid-cols-4 gap-8">
                <div className="col-span-1">
                  <Leaderboard />
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-8">
                    <div className="flex w-full border-2 bg-white shadow-[8px_8px_0_0_var(--secondary)]">
                      <div className="h-[520px] w-full">
                        <canvas
                          ref={canvasRef}
                          className="h-full w-full touch-none"
                          style={{ cursor: "crosshair" }}
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center px-8 pt-4 pb-4 shadow-[8px_8px_0_0_var(--secondary)]">
                      <div className="w-full">
                        <div className="bg-main mb-2 w-full p-1">
                          <h2 className="text-center text-lg text-white">
                            Kata Kunci
                          </h2>
                        </div>
                        <div className="mb-4">
                          <Image
                            src="https://nowbuzz.co.id/wp-content/uploads/2023/05/6.jpeg"
                            alt=""
                            height={480}
                            width={480}
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-center text-lg font-bold">
                            Wayang Kulit
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center px-8 pt-4 pb-4 shadow-[8px_8px_0_0_var(--secondary)]">
                      <div className="w-full">
                        <div className="bg-main mb-2 w-full p-1">
                          <h2 className="text-center text-lg text-white">
                            Jawaban
                          </h2>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index}>
                              <p className="text-foreground text-sm font-normal">
                                <span className="text-main font-semibold">
                                  Aliando:{" "}
                                </span>
                                Wayang Golek
                              </p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <Input placeholder="Masukkan tebakkanmu" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
