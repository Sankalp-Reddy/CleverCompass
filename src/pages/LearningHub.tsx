
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SubjectSelector from '@/components/SubjectSelector';
import ChatInterface from '@/components/ChatInterface';

const LearningHub = () => {
  const [subject, setSubject] = useState('Math');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header subject={subject} />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[calc(100vh-10rem)]"
        >
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
              Your Personal Learning Companion
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Ask questions, upload images, and get step-by-step explanations
            </p>
          </div>
          
          <SubjectSelector 
            selectedSubject={subject} 
            onSelectSubject={setSubject} 
          />
          
          <div className="glass-panel rounded-2xl flex-1 overflow-hidden">
            <ChatInterface subject={subject} />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LearningHub;
