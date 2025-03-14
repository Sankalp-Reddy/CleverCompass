
import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: {
    id: string;
    type: 'user' | 'ai';
    content: string;
    subject?: string;
    image?: string;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAi = message.type === 'ai';
  
  const getSubjectStyles = () => {
    if (!message.subject) return '';
    switch(message.subject) {
      case 'Math':
        return 'border-math/40';
      case 'Physics':
        return 'border-physics/40';
      case 'Chemistry':
        return 'border-chemistry/40';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {isAi ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      
      <div className={`flex-1 space-y-2 overflow-hidden px-1`}>
        <div
          className={`w-fit max-w-[80%] rounded-xl px-4 py-3 text-sm
            ${isAi 
              ? `glass-panel border ${getSubjectStyles()}` 
              : 'bg-primary text-primary-foreground ml-auto'}`}
        >
          {message.image && (
            <div className="mb-3 rounded-md overflow-hidden">
              <img 
                src={message.image} 
                alt="Message attachment" 
                className="max-w-full h-auto"
              />
            </div>
          )}
          <div className="prose prose-sm dark:prose-invert">
            {message.content.split('\n').map((paragraph, i) => (
              <p key={i} className={`${i > 0 ? 'mt-2' : 'mt-0'} mb-0`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
