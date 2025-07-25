"use client";

import BoardHorizontal from "@/components/board-horizontal";
import BoardVertical from "@/components/board-vertical";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChat } from "@ai-sdk/react";
import { LightbulbIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Container() {
  const uuid = uuidv4();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const { messages, handleSubmit, setInput } = useChat({
    body: { id: uuid },
    initialMessages: [],
  });

  useEffect(() => {
    setInput("Sunda");
    setIsSubmitting(true);
  }, []);

  useEffect(() => {
    if (isSubmitting && !isSubmitted) {
      console.log("submit");
      handleSubmit(new Event("submit"));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  }, [isSubmitting, isSubmitted]);

  useEffect(() => {
    if (messages[messages?.length - 1]?.role === "assistant") {
      setContent(messages[messages?.length - 1]?.content);
    }
  }, [messages]);

  console.log(content);
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
                          <BoardHorizontal index={index} key={index} />
                        </div>
                      ))}
                    </div>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <BoardVertical index={index} key={index} />
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex h-full w-full items-center justify-center border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center p-8 pb-12 shadow-[8px_8px_0_0_var(--secondary)]">
                    <div>
                      <div>
                        <div className="relative">
                          <div className="bg-success/75 border-foreground mb-2 rounded-2xl border-2 px-8 py-8">
                            <p className="mb-2 text-center text-lg font-semibold">
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
                        <div className="bg-secondary/75 border-foreground rounded-2xl border-2 px-4 py-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center justify-center gap-2">
                              <div>
                                <p className="text-center text-lg font-normal">
                                  Pengetahuan kamu kurang disuku{" "}
                                  <span className="font-bold">SUNDA</span>
                                </p>
                                <div className="flex items-center justify-start gap-2">
                                  <p className="text-center text-lg font-normal">
                                    Info selengkapnya tentang suku ini,{" "}
                                  </p>
                                  <Dialog>
                                    <DialogTrigger asChild disabled={isLoading}>
                                      <p className="cursor-pointer text-lg font-normal underline">
                                        disini
                                      </p>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <DialogHeader>
                                        <DialogTitle>
                                          Detail tentang suku, SUNDA
                                        </DialogTitle>
                                        <DialogDescription>
                                          {content}
                                        </DialogDescription>
                                      </DialogHeader>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
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
