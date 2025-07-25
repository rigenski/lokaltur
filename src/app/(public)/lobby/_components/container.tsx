"use client";

import BoardVertical from "@/components/board-vertical";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import users from "../../../../data/user.json";

export default function Container() {
  const router = useRouter();

  const onCopy = () => {
    toast.success("Kode tim berhasil disalin!");
  };

  return (
    <main className="h-screen w-full">
      <section>
        <div className="mx-auto max-w-[90%] pt-10">
          <div className="w-full">
            <div className="flex h-40 items-center justify-center">
              <div className="flex -translate-y-8 items-center">
                <div className="relative">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    nungguin
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-main font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      nungguin
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-16">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    temen
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-warning font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      temen
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-[calc(100vh-240px)] max-w-[640px]">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="mb-8 flex items-center gap-4">
                  <div className="border-foreground rounded-[999px] border-2 bg-white p-4 pr-12 pb-2.5 pl-8">
                    <div className="flex items-end gap-4">
                      <div>
                        <p className="text-xs font-bold">KODE TIM:</p>
                        <h4 className="text-4xl">123412</h4>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="reverse"
                    className="size-20 rounded-full bg-white"
                    onClick={onCopy}
                  >
                    <CopyIcon className="text-foreground !size-8" />
                  </Button>
                </div>
                <div className="mb-12 grid w-full grid-cols-2 gap-4">
                  {users.map((_, index) => (
                    <div className="col-span-1" key={index}>
                      <BoardVertical
                        index={index}
                        isShowPoint={false}
                        item={users[index]}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-8">
                  <Button
                    className="bg-secondary text-foreground h-16 rounded-full px-16 text-2xl font-bold"
                    onClick={() => router.push("/")}
                  >
                    Beranda
                  </Button>
                  <Button
                    className="bg-main h-16 rounded-full px-16 text-2xl font-bold"
                    onClick={() => router.push("/drawing")}
                  >
                    Siap
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
