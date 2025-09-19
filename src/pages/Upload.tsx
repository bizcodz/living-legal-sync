import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload as UploadIcon, FileText, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf" || selectedFile.type.startsWith("text/")) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or text document.",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store file info for dashboard
    localStorage.setItem("analyzedDocument", JSON.stringify({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }));
    
    toast({
      title: "Document analyzed successfully!",
      description: "Your living agreement is ready.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your Legal Document
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your static agreement into a living, intelligent assistant
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload a rental agreement, contract, or any legal document to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Drag and drop your document here
                  </p>
                  <p className="text-muted-foreground">or</p>
                  <div>
                    <Input
                      type="file"
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      className="hidden"
                      id="file-input"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-input")?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, TXT, DOC files up to 10MB
                  </p>
                </div>
              </div>

              {/* Selected File */}
              {file && (
                <Card className="bg-gradient-card border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!file || isUploading}
                className="w-full"
                size="lg"
              >
                {isUploading ? (
                  "Analyzing Document..."
                ) : (
                  <>
                    Analyze Document
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium">Smart Analysis</p>
                  <p className="text-xs text-muted-foreground">Extract key terms & dates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <UploadIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium">Live Dashboard</p>
                  <p className="text-xs text-muted-foreground">Interactive agreement view</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <ArrowRight className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium">Calendar Sync</p>
                  <p className="text-xs text-muted-foreground">Auto-schedule deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;