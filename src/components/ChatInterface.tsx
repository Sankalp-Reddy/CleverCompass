
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Paperclip, Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from './MessageBubble';
import ImageUpload from './ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { fetchGeminiResponse } from '@/utils/geminiApi';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  subject: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  subject?: string;
  image?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ subject }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message based on selected subject
    let welcomeMessage = '';
    switch(subject) {
      case 'Math':
        welcomeMessage = "Hi there! I'm your Math tutor. I can help with algebra, calculus, geometry, and more. What would you like to learn about today? You can also upload images of math problems, and I'll help solve them.";
        break;
      case 'Physics':
        welcomeMessage = "Hello! I'm your Physics tutor. Whether you're studying mechanics, thermodynamics, or quantum physics, I'm here to help. Feel free to upload diagrams or problem images if you need specific help with them.";
        break;
      case 'Chemistry':
        welcomeMessage = "Welcome! I'm your Chemistry tutor. From atomic structure to organic reactions, I can help you understand chemical concepts. You can upload images of chemical equations or diagrams, and I'll help explain them.";
        break;
      default:
        welcomeMessage = "Hello! I'm your AI learning companion. Select a subject and let's start learning together! You can upload images of problems or diagrams for me to help with.";
    }

    setMessages([{
      id: uuidv4(),
      type: 'ai',
      content: welcomeMessage,
      subject,
    }]);
  }, [subject]);

  const handleSendMessage = async () => {
    if ((!input.trim() && !uploadedImage) || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: input.trim(),
      subject,
      image: uploadedImage || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedImage(null);
    setShowImageUpload(false);
    setIsLoading(true);

    try {
      const response = await fetchGeminiResponse(
        input.trim(), 
        subject, 
        uploadedImage || undefined
      );

      const aiMessage: Message = {
        id: uuidv4(),
        type: 'ai',
        content: response || "I'm sorry, I couldn't process that. Could you try rephrasing your question?",
        subject,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        type: 'ai',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        subject,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4 py-4 scroller">
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
                <RefreshCcw className="h-4 w-4 animate-spin" />
              </div>
              <div className="glass-panel rounded-xl px-4 py-3 text-sm">
                <div className="loading-dots">
                  Thinking<span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <AnimatePresence>
        {showImageUpload && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 border-t"
          >
            <ImageUpload onImageUploaded={handleImageUpload} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t px-4 py-2">
        {/* Add a clear file upload button at the top of input area */}
        <div className="flex justify-between items-center mb-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex items-center gap-1 text-xs"
            onClick={() => setShowImageUpload(!showImageUpload)}
          >
            <Image className="h-4 w-4" />
            {showImageUpload ? "Hide upload" : "Upload image"}
          </Button>
          
          {uploadedImage && (
            <div className="text-xs text-muted-foreground">
              Image ready to send
            </div>
          )}
        </div>
        
        <div className="relative flex items-center">
          <Textarea
            ref={inputRef}
            placeholder={uploadedImage ? "Describe the image or ask a question about it..." : "Ask me anything about your studies..."}
            className="min-h-12 resize-none px-3 py-3 rounded-xl glass-panel"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <Button
            type="button"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-white"
            onClick={handleSendMessage}
            disabled={isLoading || (!input.trim() && !uploadedImage)}
          >
            {isLoading ? (
              <Sparkles className="h-5 w-5 animate-pulse" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
