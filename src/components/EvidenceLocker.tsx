import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Camera, 
  FileText, 
  Download,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EvidenceItem {
  id: string;
  type: "email" | "payment" | "photo" | "document";
  title: string;
  description: string;
  date: string;
  status: "verified" | "pending" | "auto-saved";
  relatedClause: string;
}

const EvidenceLocker = () => {
  const { toast } = useToast();
  const [evidenceItems] = useState<EvidenceItem[]>([
    {
      id: "1",
      type: "email",
      title: "Maintenance Request - Leaky Faucet",
      description: "Email sent to landlord regarding bathroom faucet repair",
      date: "2024-01-20",
      status: "auto-saved",
      relatedClause: "Clause 8.2 - Written maintenance requests"
    },
    {
      id: "2",
      type: "payment", 
      title: "January Rent Payment",
      description: "UPI payment of ₹25,000 via GPay",
      date: "2024-01-01",
      status: "verified",
      relatedClause: "Clause 4.1 - Monthly rent payment"
    },
    {
      id: "3",
      type: "photo",
      title: "Kitchen Damage Documentation",
      description: "Photos of kitchen cabinet damage reported",
      date: "2024-01-15",
      status: "verified",
      relatedClause: "Clause 9.1 - Property damage reporting"
    },
    {
      id: "4",
      type: "document",
      title: "Move-in Inspection Report",
      description: "Signed property condition report",
      date: "2024-01-01",
      status: "verified",
      relatedClause: "Clause 2.3 - Property condition documentation"
    }
  ]);

  const generateDisputePacket = () => {
    toast({
      title: "Generating Dispute Packet",
      description: "Compiling all evidence into a professional legal document...",
    });
    
    setTimeout(() => {
      toast({
        title: "Dispute Packet Ready",
        description: "Professional PDF with all evidence compiled and ready for download",
      });
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="w-4 h-4" />;
      case "payment": return <CheckCircle className="w-4 h-4" />;
      case "photo": return <Camera className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "auto-saved": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Evidence Locker
          </CardTitle>
          <Button onClick={generateDisputePacket} className="btn-gradient">
            <Download className="w-4 h-4 mr-2" />
            Generate Dispute Packet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {evidenceItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border bg-gradient-card hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Related to: {item.relatedClause}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{evidenceItems.length}</p>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {evidenceItems.filter(item => item.status === "verified").length}
            </p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {evidenceItems.filter(item => item.status === "auto-saved").length}
            </p>
            <p className="text-sm text-muted-foreground">Auto-Saved</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceLocker;