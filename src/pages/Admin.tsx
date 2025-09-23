import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { QueueCard } from "@/components/QueueCard";
import { CurrentDisplay } from "@/components/CurrentDisplay";
import { useQueueStore } from "@/store/queueStore";
import { 
  LogIn, 
  LogOut, 
  Phone, 
  Users, 
  BarChart3, 
  Home,
  Volume2,
  CheckCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { 
    queue, 
    isLoggedIn, 
    login, 
    logout, 
    callNext, 
    markAsServed,
    getCurrentWaiting,
    getActiveNumber,
    totalServed
  } = useQueueStore();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [callSuccess, setCallSuccess] = useState(false);

  const waitingCount = getCurrentWaiting();
  const activeNumber = getActiveNumber();
  const waitingQueue = queue.filter(item => item.status === 'waiting');
  const calledQueue = queue.filter(item => item.status === 'called');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Username atau password salah");
    }
  };

  const handleCallNext = () => {
    const nextItem = callNext();
    if (nextItem) {
      setCallSuccess(true);
      // Play notification sound (you can implement this with Web Audio API)
      console.log(`🔔 Memanggil nomor antrian: #${nextItem.number.toString().padStart(3, '0')}`);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setCallSuccess(false);
      }, 3000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5 text-primary" />
              Login Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
              </div>
              
              {loginError && (
                <Alert className="border-destructive bg-destructive/10">
                  <AlertDescription className="text-destructive">
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" variant="queue" className="w-full">
                <LogIn className="h-4 w-4" />
                Login
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo credentials:</p>
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-card shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground">Kelola sistem antrian</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4" />
                  Kembali
                </Button>
              </Link>
              <Button onClick={logout} variant="destructive" size="sm">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Success Alert */}
        {callSuccess && (
          <Alert className="mb-6 border-success bg-success/10">
            <Volume2 className="h-4 w-4 text-success" />
            <AlertDescription className="text-success font-medium">
              🔔 Nomor antrian berhasil dipanggil! Pelanggan akan segera menuju kasir.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Status */}
        <CurrentDisplay activeNumber={activeNumber} waitingCount={waitingCount} />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                  <p className="text-2xl font-bold text-warning">{waitingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dilayani Hari Ini</p>
                  <p className="text-2xl font-bold text-success">{totalServed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Antrian</p>
                  <p className="text-2xl font-bold text-primary">{queue.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mt-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Kontrol Antrian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleCallNext}
                variant="success"
                size="lg"
                className="flex-1"
                disabled={waitingCount === 0}
              >
                <Phone className="h-5 w-5" />
                Panggil Antrian Selanjutnya
              </Button>
              
              {calledQueue.length > 0 && (
                <Button 
                  onClick={() => markAsServed(calledQueue[0].id)}
                  variant="outline"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5" />
                  Tandai Selesai
                </Button>
              )}
            </div>
            
            {waitingCount === 0 && (
              <p className="text-center text-muted-foreground mt-4 text-sm">
                Tidak ada antrian yang menunggu
              </p>
            )}
          </CardContent>
        </Card>

        {/* Queue List */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Waiting Queue */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-warning" />
                  Antrian Menunggu
                </span>
                <Badge className="bg-warning text-warning-foreground">
                  {waitingCount}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {waitingQueue.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Tidak ada antrian yang menunggu
                </p>
              ) : (
                waitingQueue.map((item) => (
                  <QueueCard key={item.id} queueItem={item} />
                ))
              )}
            </CardContent>
          </Card>

          {/* Called/Active Queue */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-success" />
                  Antrian Aktif
                </span>
                <Badge className="bg-success text-success-foreground">
                  {calledQueue.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calledQueue.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Tidak ada antrian yang sedang dipanggil
                </p>
              ) : (
                calledQueue.map((item) => (
                  <QueueCard key={item.id} queueItem={item} isActive />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;