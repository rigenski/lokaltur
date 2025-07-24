"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, PencilIcon } from "lucide-react";
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
    <main>
      <section>
        <div className="mx-auto mt-16 max-w-[90%]">
          <div className="w-full">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <h2
                    className="font-gaeilge-kids text-7xl text-black"
                    style={{
                      WebkitTextStroke: "1px var(--foreground)",
                    }}
                  >
                    lokaltur
                  </h2>
                  <div className="absolute -top-1 left-1">
                    <h2
                      className="font-gaeilge-kids text-warning text-7xl"
                      style={{
                        WebkitTextStroke: "1px var(--foreground)",
                      }}
                    >
                      lokaltur
                    </h2>
                  </div>
                </div>
                <p className="text-xl font-medium">
                  Mainkan permainan dengan belajar kultur Indonesia
                </p>
              </div>
            </div>
            <div className="h-[calc(100vh-240px)] w-full rounded-2xl border border-black/25 bg-white p-8 pb-12">
              <div className="grid h-full grid-cols-3">
                <div className="col-span-1 h-full">
                  <div className="flex h-full flex-col items-center justify-between">
                    <div>
                      <h4 className="text-main text-3xl font-bold">BIODATA</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-6 rounded-full border-4 border-black p-1">
                        <Avatar className="bg-main size-32">
                          <AvatarFallback className="bg-main text-4xl text-white">
                            {fullName
                              .split(" ")
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((word) => word.charAt(0))
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          ref={inputRef}
                          placeholder="Masukkin nama kamu..."
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setIsEdit(false);
                            }
                          }}
                          disabled={!isEdit}
                          className="disabled:opacity-100"
                        />
                        {isEdit ? (
                          <Button
                            size="icon"
                            variant="noShadow"
                            className="!bg-success px-4"
                            onClick={() => setIsEdit(false)}
                          >
                            <CheckIcon className="size-4 text-black" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="noShadow"
                            className="px-4"
                            onClick={() => {
                              setIsEdit(true);
                              inputRef.current?.focus();
                            }}
                          >
                            <PencilIcon className="size-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-center border-r-2 border-black/10">
                      <Button className="bg-warning h-16 rounded-full px-16 text-2xl font-bold text-black">
                        Sendiri
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 h-full">
                  <div className="flex h-full flex-col items-center justify-between">
                    <div>
                      <h4 className="text-main text-3xl font-bold">RUANGAN</h4>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                      <Button className="bg-secondary h-16 rounded-full px-16 text-2xl font-bold text-black">
                        Buat
                      </Button>
                      <Button className="bg-main h-16 rounded-full px-16 text-2xl font-bold">
                        Masuk
                      </Button>
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
