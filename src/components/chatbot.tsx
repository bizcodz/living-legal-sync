import { useState } from "react";
import { Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "../services/api"; // Assuming you have this service

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  agreementId: string;
}

const Chatbot = ({ agreementId }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "I have analyzed your agreement. Ask me anything about its contents." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await api.post(`/api/agreements/${agreementId}/ask`, { question: input });
      // Add the ': Message' type annotation here
      const botMessage: Message = { sender: "bot", text: res.data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Add the ': Message' type annotation here
      const errorMessage: Message = { sender: "bot", text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
              {msg.sender === "bot" && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "bot" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                {msg.text}
              </div>
              {msg.sender === "user" && <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your notice period..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;