
import React from 'react';
import { Button } from "@/components/ui/button";
import { PiMathOperationsBold } from 'react-icons/pi';
import { TbAtom, TbMathFunction } from 'react-icons/tb';
import { motion } from 'framer-motion';

interface SubjectSelectorProps {
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  selectedSubject, 
  onSelectSubject 
}) => {
  const subjects = [
    { id: 'Math', icon: <TbMathFunction className="h-5 w-5" />, color: 'math' },
    { id: 'Physics', icon: <PiMathOperationsBold className="h-5 w-5" />, color: 'physics' },
    { id: 'Chemistry', icon: <TbAtom className="h-5 w-5" />, color: 'chemistry' }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="glass-panel rounded-2xl p-2 flex justify-between">
        {subjects.map((subject) => (
          <motion.div
            key={subject.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex-1"
          >
            <Button
              variant="ghost"
              className={`w-full h-12 relative z-10 rounded-xl subject-transition ${
                selectedSubject === subject.id
                  ? subject.id === 'Math'
                    ? 'text-math-dark border-math'
                    : subject.id === 'Physics'
                    ? 'text-physics-dark border-physics'
                    : 'text-chemistry-dark border-chemistry'
                  : 'text-gray-500'
              }`}
              onClick={() => onSelectSubject(subject.id)}
            >
              <div className="flex items-center justify-center gap-2">
                {subject.icon}
                <span className="font-medium">{subject.id}</span>
              </div>
            </Button>
            {selectedSubject === subject.id && (
              <motion.div
                layoutId="subject-highlight"
                className={`absolute inset-0 rounded-xl opacity-20 ${
                  subject.id === 'Math'
                    ? 'bg-math'
                    : subject.id === 'Physics'
                    ? 'bg-physics'
                    : 'bg-chemistry'
                }`}
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
