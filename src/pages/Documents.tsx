import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Shield, 
  Calendar,
  Mail,
  Camera,
  CheckCircle,
  AlertTriangle,
  Upload,
  Plus
} from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  type: "rental" | "employment" | "service" | "purchase";
  status: "active" | "expired" | "pending";
  uploadDate: string;
  nextAction?: {
    type: "payment" | "notice" | "maintenance" | "renewal";
    date: string;
    description: string;
  };
  complianceScore: number;
  evidenceCount: number;
}

const Documents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Whitefield Apartment Lease",
      type: "rental",
      status: "active",
      uploadDate: "2024-01-15",
      nextAction: {
        type: "payment",
        date: "2024-02-01",
        description: "Monthly rent payment due"
      },
      complianceScore: 95,
      evidenceCount: 12
    },
    {
      id: "2", 
      name: "Tech Corp Employment Contract",
      type: "employment",
      status: "active",
      uploadDate: "2023-06-01",
      nextAction: {
        type: "renewal",
        date: "2024-06-01",
        description: "Contract renewal review"
      },
      complianceScore: 100,
      evidenceCount: 8
    },
    {
      id: "3",
      name: "Internet Service Agreement",
      type: "service", 
      status: "active",
      uploadDate: "2023-12-01",
      complianceScore: 88,
      evidenceCount: 5
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "expired": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "rental": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "employment": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "service": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "purchase": return "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Contract Guardian
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Your AI-powered compliance dashboard
              </p>
            </div>
            <Button onClick={() => navigate("/upload")} className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterType === "rental" ? "default" : "outline"}
                onClick={() => setFilterType("rental")}
                size="sm"
              >
                Rental
              </Button>
              <Button
                variant={filterType === "employment" ? "default" : "outline"}
                onClick={() => setFilterType("employment")}
                size="sm"
              >
                Employment
              </Button>
              <Button
                variant={filterType === "service" ? "default" : "outline"}
                onClick={() => setFilterType("service")}
                size="sm"
              >
                Service
              </Button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="shadow-elegant hover:shadow-glow transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <CardDescription>
                          Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <Badge className={getTypeColor(doc.type)}>
                      {doc.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Compliance Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Compliance Score</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          doc.complianceScore >= 90 ? 'bg-green-500' : 
                          doc.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm font-bold">{doc.complianceScore}%</span>
                      </div>
                    </div>

                    {/* Evidence Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Evidence Items</span>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-primary" />
                        <span className="text-sm font-bold">{doc.evidenceCount}</span>
                      </div>
                    </div>

                    {/* Next Action */}
                    {doc.nextAction && (
                      <div className="p-3 rounded-lg bg-gradient-card border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Next Action</span>
                          <Badge variant="outline" className="text-xs">
                            {new Date(doc.nextAction.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {doc.nextAction.description}
                        </p>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/dashboard?doc=${doc.id}`)}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Upload your first document to get started"}
              </p>
              <Button onClick={() => navigate("/upload")} className="btn-gradient">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Documents;