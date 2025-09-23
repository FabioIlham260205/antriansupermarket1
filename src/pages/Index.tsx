import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CurrentDisplay } from "@/components/CurrentDisplay";
import { useQueueStore } from "@/store/queueStore";
import { Ticket, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { takeNumber, getCurrentWaiting, getActiveNumber } = useQueueStore();
  const [lastTicket, setLastTicket] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const waitingCount = getCurrentWaiting();
  const activeNumber = getActiveNumber();

  const handleTakeNumber = () => {
    const ticket = takeNumber();
    setLastTicket(ticket);
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-card shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sistem Antrian Supermarket</h1>
                <p className="text-muted-foreground">Ambil nomor antrian Anda</p>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="admin" size="sm">
                <Settings className="h-4 w-4" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Success Alert */}
        {showSuccess && lastTicket && (
          <Alert className="mb-6 border-success bg-success/10">
            <Ticket className="h-4 w-4 text-success" />
            <AlertDescription className="text-success font-medium">
              Nomor antrian Anda: <span className="font-bold">#{lastTicket.number.toString().padStart(3, '0')}</span>
              {" "}berhasil diambil! Mohon tunggu hingga nomor Anda dipanggil.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Status Display */}
        <CurrentDisplay activeNumber={activeNumber} waitingCount={waitingCount} />

        {/* Take Number Section */}
        <div className="mt-8 flex justify-center">
          <Card className="w-full max-w-md shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Users className="h-5 w-5 text-primary" />
                Ambil Nomor Antrian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Klik tombol di bawah untuk mengambil nomor antrian Anda
                </p>
                <Badge variant="outline" className="text-xs">
                  Gratis & Mudah
                </Badge>
              </div>

              <Button 
                onClick={handleTakeNumber}
                variant="queue"
                size="lg"
                className="w-full text-lg py-6"
              >
                <Ticket className="h-5 w-5" />
                Ambil Nomor Antrian
              </Button>

              {lastTicket && (
                <div className="text-center space-y-2 p-4 bg-gradient-card rounded-lg border">
                  <p className="text-sm text-muted-foreground">Nomor terakhir Anda:</p>
                  <div className="text-2xl font-bold text-primary">
                    #{lastTicket.number.toString().padStart(3, '0')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Diambil pada {lastTicket.timestamp.toLocaleTimeString('id-ID')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Ambil Nomor</h3>
              <p className="text-sm text-muted-foreground">
                Klik tombol untuk mendapatkan nomor antrian Anda
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Tunggu Giliran</h3>
              <p className="text-sm text-muted-foreground">
                Perhatikan layar untuk nomor antrian yang dipanggil
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Menuju Kasir</h3>
              <p className="text-sm text-muted-foreground">
                Segera menuju kasir ketika nomor Anda dipanggil
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
