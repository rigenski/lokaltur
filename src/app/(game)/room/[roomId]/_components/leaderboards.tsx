import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Leaderboards() {
  return (
    <Card className="col-span-full xl:col-span-1 xl:row-span-2">
      <CardContent className="flex flex-col gap-6">
        <CardTitle>Papan Peringkat</CardTitle>
        <div className="inline-flex items-center gap-4">
          <Avatar className="overflow-visible">
            <Badge
              variant="neutral"
              className="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              1
            </Badge>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p>Mister Potato</p>
            <p>90 pts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
