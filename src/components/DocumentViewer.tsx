import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentViewerProps {
  documentName: string;
  uploadDate: string;
}

const DocumentViewer = ({ documentName, uploadDate }: DocumentViewerProps) => {
  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Document Details
          </div>
          <Badge variant="secondary">Original</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium">{documentName}</p>
            <p className="text-sm text-muted-foreground">
              Uploaded on {new Date(uploadDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentViewer;