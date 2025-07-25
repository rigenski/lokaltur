"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Container() {
  const router = useRouter();

  function handleJoin() {
    router.push(`/draw/${nanoid()}?userId=${nanoid()}`);
  }

  return (
    <section className="mx-auto flex h-svh min-h-svh items-center justify-center p-8">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Masukkan nama . . ." />
        <Button variant="noShadow" type="submit" onClick={handleJoin}>
          Join
        </Button>
      </div>
    </section>
  );
}
