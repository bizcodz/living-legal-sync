import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, Shield, FileText, Clock, DollarSign, Users, ArrowLeft, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import CalendarIntegration from "@/components/CalendarIntegration";
import ComplianceActions from "@/components/ComplianceActions";
import EvidenceLocker from "@/components/EvidenceLocker";
import Chatbot from "@/components/chatbot";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

// --- FINAL, CORRECTED INTERFACES ---
interface DocumentInfo {
  name: string;
  size: number;
  type: string;
  uploadDate: string;
}

interface AnalysisData {
  keyTerms: Array<{
    term: string;
    description: string;
    type: "financial" | "timeline" | "responsibility" | "warning";
  }>;
  timeline: Array<{
    date: string;
    event: string;
    type: "payment" | "deadline" | "notice";
  }>;
  financials: {
    monthlyRent: number;
    securityDeposit: number;
    maintenanceCharges: number;
  };
  risks: Array<{
    clause: string;
    risk: string;
    severity: "low" | "medium" | "high";
  }>;
  parties: Array<{
    name: string;
    role: string;
  }>;
}

const Dashboard = () => {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const navigate = useNavigate();
  const { id: agreementId } = useParams();

  useEffect(() => {
    const storedDoc = localStorage.getItem("analyzedDocument");
    if (!storedDoc) {
      navigate("/upload");
      return;
    }

    const docInfo: DocumentInfo = JSON.parse(storedDoc);
    setDocumentInfo(docInfo);

    // Simulate AI analysis results
    const mockAnalysis: AnalysisData = {
      keyTerms: [
        { term: "Lease Duration", description: "11-month rental agreement from Jan 1, 2024 to Nov 30, 2024", type: "timeline" },
        { term: "Monthly Rent", description: "₹25,000 due on the 1st of each month", type: "financial" },
        { term: "Security Deposit", description: "₹50,000 refundable deposit (2 months rent)", type: "financial" },
        { term: "Notice Period", description: "1-month advance notice required for termination", type: "responsibility" }
      ],
      timeline: [
        { date: "2024-02-01", event: "Rent Payment Due", type: "payment" },
        { date: "2024-03-01", event: "Rent Payment Due", type: "payment" },
        { date: "2024-10-30", event: "Notice Period Deadline", type: "deadline" },
        { date: "2024-11-30", event: "Lease Expiry", type: "deadline" }
      ],
      financials: {
        monthlyRent: 25000,
        securityDeposit: 50000,
        maintenanceCharges: 2000
      },
      risks: [
        { clause: "Maintenance charges can be increased with 30-day notice", risk: "Potential unexpected cost increases", severity: "medium" },
        { clause: "No pets allowed clause with ₹10,000 penalty", risk: "High penalty for pet ownership", severity: "high" }
      ],
      parties: [
        { name: "Priya Sharma", role: "Tenant" },
        { name: "Rajesh Kumar", role: "Landlord" }
      ]
    };
    setAnalysisData(mockAnalysis);
  }, [navigate, agreementId]);

  if (!documentInfo || !analysisData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate("/documents")}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Documents
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold">
                Your Living Agreement
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                {documentInfo.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                    Active Agreement
                </Badge>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask AI Assistant
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Agreement Assistant</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">
                      <Chatbot agreementId={agreementId!} />
                    </div>
                  </DrawerContent>
                </Drawer>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Key Terms & Obligations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {analysisData.keyTerms.map((term, index) => (
                      <div key={index} className="p-4 rounded-xl border bg-gradient-card">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{term.term}</h4>
                            <p className="text-muted-foreground mt-1">{term.description}</p>
                          </div>
                          <Badge variant={term.type === "warning" ? "destructive" : "secondary"} className="ml-2">
                            {term.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant">
                  <CardHeader>
                      <CardTitle className="flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Risk Assessment & Warnings
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {analysisData.risks.map((risk, index) => (
                              <div key={index} className={`p-4 rounded-xl border-l-4 ${risk.severity === "high" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}>
                                  <div className="flex items-start">
                                      <AlertTriangle className={`w-5 h-5 mr-3 mt-0.5 ${risk.severity === "high" ? "text-red-500" : "text-yellow-500"}`} />
                                      <div>
                                          <p className="font-medium">{risk.clause}</p>
                                          <p className="text-sm text-muted-foreground mt-1">{risk.risk}</p>
                                          <Badge variant={risk.severity === "high" ? "destructive" : "secondary"} className="mt-2">
                                              {risk.severity} risk
                                          </Badge>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CalendarIntegration events={analysisData.timeline} />
              <ComplianceActions />
              <EvidenceLocker />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;