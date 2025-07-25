import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function DrawingGuesses() {
  return (
    <Card className="sm:col-span-1 xl:col-start-3 xl:row-start-2">
      <CardContent className="flex flex-col gap-6">
        <CardTitle>Tebakan</CardTitle>
        <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
          {[...Array(50).keys()].map((i) => (
            <div className="inline-flex items-center gap-2" key={i}>
              <span>Mister Potato:</span>
              <span>javanese kris batik</span>
            </div>
          ))}
        </div>
        <Input type="text" placeholder="Masukkan jawaban kamu . . ." />
      </CardContent>
    </Card>
  );
}
