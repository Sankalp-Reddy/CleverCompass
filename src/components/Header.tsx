
import React from 'react';
import { BookOpen, Menu, Bell, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  subject: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ subject, onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full animate-fade-in">
      <div className="glass-panel border-b px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            className="flex items-center gap-2 px-2 py-1 hover:bg-accent/50 rounded-md transition-colors"
            onClick={handleLogoClick}
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium text-lg tracking-tight">CleverCompass</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {subject && (
            <div className={`hidden sm:flex px-3 py-1 rounded-full text-sm font-medium
              ${subject === 'Math' ? 'math-accent' : 
                subject === 'Physics' ? 'physics-accent' : 
                subject === 'Chemistry' ? 'chemistry-accent' : ''}
            `}>
              {subject}
            </div>
          )}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm font-medium">AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
