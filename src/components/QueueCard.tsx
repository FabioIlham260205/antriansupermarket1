import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle } from "lucide-react";
import { QueueItem } from "@/store/queueStore";

interface QueueCardProps {
  queueItem: QueueItem;
  isActive?: boolean;
}

export const QueueCard = ({ queueItem, isActive = false }: QueueCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-warning text-warning-foreground';
      case 'called':
        return 'bg-success text-success-foreground animate-pulse';
      case 'served':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="h-4 w-4" />;
      case 'called':
        return <Users className="h-4 w-4" />;
      case 'served':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Menunggu';
      case 'called':
        return 'Dipanggil';
      case 'served':
        return 'Selesai';
      default:
        return status;
    }
  };

  return (
    <Card className={`transition-smooth ${isActive ? 'shadow-glow bg-gradient-card' : 'shadow-card'}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`text-2xl font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
              #{queueItem.number.toString().padStart(3, '0')}
            </div>
            <div className="text-sm text-muted-foreground">
              {queueItem.timestamp.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <Badge className={`${getStatusColor(queueItem.status)} flex items-center gap-2`}>
            {getStatusIcon(queueItem.status)}
            {getStatusText(queueItem.status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};