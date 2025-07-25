"use client";

import Logo from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CheckIcon,
  CirclePlusIcon,
  DoorOpenIcon,
  PencilIcon,
  UserSquareIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Container() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onSubmitName = () => {
    if (!fullName) {
      toast.error("Nama tidak boleh kosong!");
      return;
    }

    setIsEdit(false);
    toast.success("Namamu berhasil diganti!");
  };

  const onSubmitCode = () => {
    if (!code) {
      toast.error("Kode tidak boleh kosong!");
      return;
    }

    toast.success("Kode tim berhasil dimasukkan!");
  };

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
              <Logo />
            </div>
            <div className="h-[calc(100vh-240px)] w-full border-2 border-black bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center p-8 pb-12 shadow-[8px_8px_0_0_var(--main)]">
              <div className="grid h-full grid-cols-3">
                <div className="col-span-1 h-full">
                  <div className="flex h-full flex-col items-center justify-between">
                    <div className="relative">
                      <h2
                        className="text-success text-3xl text-nowrap"
                        style={{
                          WebkitTextStroke: "1px var(--foreground)",
                        }}
                      >
                        MAIN LANGSUNG
                      </h2>
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
                      <div className="relative flex items-center gap-2">
                        <Input
                          ref={inputRef}
                          placeholder="Masukkin nama kamu..."
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onSubmitName();
                            }
                          }}
                          disabled={!isEdit}
                          className="h-10 rounded-full py-6 pr-12 pl-4 text-lg disabled:opacity-100"
                        />
                        <div className="absolute top-0.5 right-0">
                          {isEdit ? (
                            <Button
                              size="icon"
                              variant="noShadow"
                              className="!bg-success size-12 !rounded-full"
                              onClick={onSubmitName}
                            >
                              <CheckIcon className="size-12 text-black" />
                            </Button>
                          ) : (
                            <Button
                              size="icon"
                              variant="noShadow"
                              className="size-12 !rounded-full"
                              onClick={() => {
                                setIsEdit(true);
                                inputRef.current?.focus();
                              }}
                            >
                              <PencilIcon className="size-12" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-center">
                      <Button className="bg-warning h-16 rounded-full px-16 text-2xl font-bold text-black">
                        <UserSquareIcon className="!size-6" />
                        <span>Sendiri</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 h-full">
                  <div className="flex h-full flex-col items-center justify-between">
                    <div className="relative">
                      <h2
                        className="text-warning text-3xl"
                        style={{
                          WebkitTextStroke: "1px var(--foreground)",
                        }}
                      >
                        RUANGAN
                      </h2>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-1/2">
                        <div className="flex flex-col items-center gap-2">
                          <div className="z-10">
                            <Image
                              src="/assets/home/drawing.png"
                              alt=""
                              height={480}
                              width={480}
                              className="h-32 w-auto"
                            />
                          </div>
                          <div className="bg-success/25 border-foreground -mt-12 rounded-2xl border-2 px-4 pt-6 pb-2">
                            <p className="font-gaeilge-kids text-foreground text-xl font-normal tracking-wider">
                              cocokkan gambar
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="flex flex-col items-center gap-2">
                          <div className="z-10">
                            <Image
                              src="/assets/home/drag-n-drop.png"
                              alt=""
                              height={480}
                              width={480}
                              className="h-32 w-auto"
                            />
                          </div>
                          <div className="bg-success/25 border-foreground -mt-12 rounded-2xl border-2 px-4 pt-6 pb-2">
                            <p className="font-gaeilge-kids text-foreground text-xl font-normal tracking-wider">
                              geser pilihanmu
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="flex flex-col items-center gap-2">
                          <div className="z-10">
                            <Image
                              src="/assets/home/quiz.png"
                              alt=""
                              height={480}
                              width={480}
                              className="h-32 w-auto"
                            />
                          </div>
                          <div className="bg-success/25 border-foreground -mt-12 rounded-2xl border-2 px-4 pt-6 pb-2">
                            <p className="font-gaeilge-kids text-foreground text-xl font-normal tracking-wider">
                              tebak berhadiah
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                      <Button className="bg-secondary h-16 rounded-full px-16 text-2xl font-bold text-black">
                        <CirclePlusIcon className="!size-6" />
                        <span>Buat</span>
                      </Button>

                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button className="bg-main h-16 rounded-full px-16 text-2xl font-bold">
                              <DoorOpenIcon className="!size-6" />
                              <span>Masuk</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Masuk Tim</DialogTitle>
                              <DialogDescription>
                                Masukkan kode tim yang kamu dapatkan dari temen
                                kamu.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Input
                                  id="code"
                                  name="code"
                                  placeholder="Masukkan kode tim"
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      onSubmitCode();
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  variant="neutral"
                                  className="rounded-full px-6 py-4"
                                >
                                  Tutup
                                </Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                className="rounded-full px-6 py-4"
                                onClick={onSubmitCode}
                              >
                                Masuk
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </form>
                      </Dialog>
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
