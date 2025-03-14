
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Lightbulb, Image, MessageSquare } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const features = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI-Powered Learning",
      description: "Get instant help with math, physics, and chemistry concepts using advanced AI."
    },
    {
      icon: <Image className="h-5 w-5" />,
      title: "Image Recognition",
      description: "Upload handwritten equations or diagrams for immediate analysis and solutions."
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Interactive Explanations",
      description: "Receive clear, step-by-step explanations tailored to your learning style."
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Subject Expertise",
      description: "Specialized knowledge in mathematics, physics, and chemistry for K-12 education."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex flex-col">
      <header className="w-full animate-fade-in">
        <div className="glass-panel px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium text-lg tracking-tight">CleverCompass</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => navigate('/hub')}>
            Launch App
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Learning Assistant
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Your Personal <span className="text-primary">AI Tutor</span> for Academic Success
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Get instant help with math, physics, and chemistry. Upload homework problems, ask questions, and receive step-by-step solutions.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button 
              size="lg" 
              className="h-12 px-8 rounded-full shadow-lg"
              onClick={() => navigate('/hub')}
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="w-full max-w-3xl mt-24"
          >
            <h2 className="text-2xl font-bold mb-8">Why Choose CleverCompass</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass-panel rounded-xl p-6 text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              CleverCompass AI Learning Assistant
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
