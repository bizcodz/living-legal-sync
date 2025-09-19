import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalendarEvent {
  date: string;
  event: string;
  type: "payment" | "deadline" | "notice";
}

interface CalendarIntegrationProps {
  events: CalendarEvent[];
}

const CalendarIntegration = ({ events }: CalendarIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectCalendar = async () => {
    setIsConnecting(true);
    
    // Simulate calendar connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsConnected(true);
    setIsConnecting(false);
    
    toast({
      title: "Calendar connected!",
      description: `${events.length} events added to your calendar.`,
    });
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Calendar Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              Sync your agreement deadlines with Google Calendar
            </p>
            <Button
              onClick={handleConnectCalendar}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                "Connecting..."
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Google Calendar
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Calendar Connected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {events.length} events synced to your calendar
            </p>
            <div className="space-y-2">
              {events.slice(0, 3).map((event, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="truncate">{event.event}</span>
                  <span className="text-muted-foreground ml-2">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;