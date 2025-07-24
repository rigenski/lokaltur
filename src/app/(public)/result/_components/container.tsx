"use client";

import Logo from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/classname";
import { CheckIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Container() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    const fullName = localStorage.getItem("fullName");

    if (fullName) {
      setFullName(fullName);
    } else {
      setFullName("Anak Indonesia");
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <main className="h-screen w-full">
      <section>
        <div className="mx-auto max-w-[90%] pt-10">
          <div className="w-full">
            <div className="flex h-40 items-center justify-center">
              <div className="flex -translate-y-8 items-center">
                <div className="relative rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    hasil
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-main font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      hasil
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-16 -rotate-4">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    akhir
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-secondary font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      akhir
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-foreground h-[calc(100vh-240px)] w-full">
              <div className="grid h-full w-full grid-cols-5 gap-8">
                <div className="col-span-2">
                  <div className="flex h-full flex-col justify-end gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div className="col-span-1" key={index}>
                          <div className="flex h-full flex-col items-center justify-end gap-4">
                            <div className="relative flex flex-col items-center gap-2">
                              <Avatar className="bg-main size-24">
                                <AvatarFallback className="bg-main text-3xl text-white">
                                  A
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-xl font-medium">Aliando</p>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <div
                                  className={cn(
                                    "border-foreground flex h-12 w-12 items-center justify-center rounded-full border-2",
                                    index === 0 && "bg-amber-600",
                                    index === 1 && "bg-yellow-400",
                                    index === 2 && "bg-gray-400",
                                  )}
                                >
                                  <p className="text-2xl font-bold text-white">
                                    {index === 0 && "3"}
                                    {index === 1 && "1"}
                                    {index === 2 && "2"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              className={cn(
                                `border-foreground h-16 w-full border-2 bg-white p-4 shadow-[8px_8px_0_0_var(--warning)]`,
                                index === 0 && "h-16",
                                index === 1 && "h-40",
                                index === 2 && "h-28",
                              )}
                            >
                              <div className="flex flex-col items-center justify-between">
                                <p className="text-lg font-bold">100pts</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        className="border-foreground border-2 bg-white p-4 shadow-[8px_8px_0_0_var(--warning)]"
                        key={index}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <h4 className="text-2xl font-bold">4</h4>
                            <Avatar className="bg-main size-12">
                              <AvatarFallback className="bg-main text-xl text-white">
                                A
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-lg font-medium">Aliando</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold">100pts</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex h-full w-full items-center justify-center border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center p-8 pb-12 shadow-[8px_8px_0_0_var(--secondary)]">
                    <div>
                      <div>
                        <div className="relative">
                          <div className="bg-success border-foreground rounded-2xl border-2 px-8 py-8">
                            <p className="mb-2 text-center text-lg font-medium">
                              Wah keren, kamu ternyata sipaling tau suku:
                            </p>
                            <h2
                              className="font-gaeilge-kids text-background text-center text-6xl"
                              style={{
                                WebkitTextStroke: "0.5px var(--foreground)",
                              }}
                            >
                              JAWA
                            </h2>
                          </div>
                          <div className="absolute -top-6 left-4">
                            <div className="border-foreground bg-background flex h-12 w-12 items-center justify-center rounded-full border-2">
                              <LightbulbIcon className="size-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-12">
                        <div className="border-foreground/10 w-full border-b-2"></div>
                      </div>
                      <div>
                        <div className="mb-12">
                          <Logo />
                        </div>
                        <div className="flex items-center justify-center gap-8">
                          <Button className="bg-secondary text-foreground h-16 rounded-full px-16 text-2xl font-bold">
                            Beranda
                          </Button>
                          <Button className="bg-main h-16 rounded-full px-16 text-2xl font-bold">
                            Main Lagi
                          </Button>
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
