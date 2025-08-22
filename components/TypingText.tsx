'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 500,
  showCursor = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      {showCursor && (
        <span 
          className={`inline-block w-0.5 h-6 bg-indigo-600 ml-1 ${
            isComplete ? 'animate-pulse' : 'animate-pulse'
          }`}
          style={{
            animation: isComplete 
              ? 'blink-caret 1s linear infinite' 
              : 'blink-caret 1s linear infinite'
          }}
        />
      )}
    </span>
  );
};

export default TypingText;
