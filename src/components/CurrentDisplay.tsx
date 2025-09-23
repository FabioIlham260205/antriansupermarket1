import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";

interface CurrentDisplayProps {
  activeNumber: number | null;
  waitingCount: number;
}

export const CurrentDisplay = ({ activeNumber, waitingCount }: CurrentDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Active Number Display */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <Users className="h-5 w-5 text-success" />
            Nomor Antrian Aktif
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {activeNumber ? (
            <div className="space-y-2">
              <div className="text-6xl md:text-8xl font-bold text-success bg-gradient-success bg-clip-text text-transparent animate-pulse">
                #{activeNumber.toString().padStart(3, '0')}
              </div>
              <Badge className="bg-success text-success-foreground">
                Silakan ke kasir
              </Badge>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl font-bold text-muted-foreground">
                -
              </div>
              <Badge variant="secondary">
                Tidak ada antrian aktif
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Waiting Count Display */}
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-warning" />
            Antrian Menunggu
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-6xl font-bold text-warning">
              {waitingCount}
            </div>
            <Badge className="bg-warning text-warning-foreground">
              {waitingCount === 0 ? 'Tidak ada antrian' : 
               waitingCount === 1 ? '1 orang menunggu' : 
               `${waitingCount} orang menunggu`}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};