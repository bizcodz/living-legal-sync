import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Camera, 
  CreditCard, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplianceAction {
  id: string;
  type: "maintenance" | "payment" | "notice" | "documentation";
  title: string;
  description: string;
  dueDate?: string;
  clause: string;
  automated: boolean;
  status: "pending" | "completed" | "overdue";
}

const ComplianceActions = () => {
  const { toast } = useToast();
  const [actions] = useState<ComplianceAction[]>([
    {
      id: "1",
      type: "maintenance",
      title: "Request Maintenance",
      description: "Submit written maintenance request as per Clause 8.2",
      clause: "All maintenance requests must be submitted in writing",
      automated: true,
      status: "pending"
    },
    {
      id: "2", 
      type: "payment",
      title: "February Rent Payment",
      description: "Monthly rent payment of ₹25,000",
      dueDate: "2024-02-01",
      clause: "Rent due on 1st of each month",
      automated: true,
      status: "pending"
    },
    {
      id: "3",
      type: "notice",
      title: "Lease Renewal Notice",
      description: "60-day advance notice required for lease changes",
      dueDate: "2024-10-01",
      clause: "60 days advance notice required",
      automated: true,
      status: "pending"
    }
  ]);

  const handleMaintenanceRequest = () => {
    toast({
      title: "Opening Gmail Draft",
      description: "Pre-populated maintenance request email ready to send",
    });
    
    // Simulate opening Gmail with pre-filled content
    setTimeout(() => {
      toast({
        title: "Evidence Logged",
        description: "Maintenance request automatically saved to your Evidence Locker",
      });
    }, 2000);
  };

  const handlePaymentAction = () => {
    toast({
      title: "Payment Options",
      description: "Redirecting to UPI/GPay for automated rent payment",
    });
  };

  const handleNoticeAction = () => {
    toast({
      title: "Notice Template Ready",
      description: "Legal notice template generated and ready to send",
    });
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "maintenance": return <Mail className="w-5 h-5" />;
      case "payment": return <CreditCard className="w-5 h-5" />;
      case "notice": return <FileText className="w-5 h-5" />;
      case "documentation": return <Camera className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const handleAction = (action: ComplianceAction) => {
    switch (action.type) {
      case "maintenance":
        handleMaintenanceRequest();
        break;
      case "payment":
        handlePaymentAction();
        break;
      case "notice":
        handleNoticeAction();
        break;
      default:
        toast({
          title: "Action Initiated",
          description: `${action.title} workflow started`,
        });
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary" />
          Smart Compliance Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="p-4 rounded-xl border bg-gradient-card hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{action.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clause: {action.clause}
                    </p>
                    {action.dueDate && (
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Due: {new Date(action.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(action.status)}>
                    {action.status}
                  </Badge>
                  {action.automated && (
                    <Badge variant="outline" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Auto
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  onClick={() => handleAction(action)}
                  className="btn-gradient"
                >
                  Execute Action
                </Button>
                <Button variant="outline" size="sm">
                  View Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceActions;