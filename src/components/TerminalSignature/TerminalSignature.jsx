import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/TerminalSignature.scss';

const TerminalSignature = ({
  text = `// false !== exit(1)\nwhile (true) switch (case) { }`,
  eraseDelay = 1200,
  hiddenUntilHover = false
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(!hiddenUntilHover);

  const typingRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearAll = () => {
    clearInterval(typingRef.current);
    clearTimeout(timeoutRef.current);
  };

  const handleHover = (isEnter) => {
    if (isTyping) return;
    clearAll();
    setIsTyping(true);

    if (hiddenUntilHover && isEnter) setIsVisible(true);
    if (hiddenUntilHover && !isEnter)
      timeoutRef.current = setTimeout(() => setIsVisible(false), eraseDelay + 400);

    let i = isEnter ? 0 : text.length;

    const startTyping = () => {
      typingRef.current = setInterval(() => {
        setDisplayed((prev) => {
          if (isEnter) {
            if (i < text.length) {
              i++;
              return text.slice(0, i);
            } else {
              clearAll();
              setIsTyping(false);
              return prev;
            }
          } else {
            if (i > 0) {
              i--;
              return text.slice(0, i);
            } else {
              clearAll();
              setIsTyping(false);
              return '';
            }
          }
        });
      }, 35);
    };

    timeoutRef.current = setTimeout(startTyping, isEnter ? 500 : eraseDelay);
  };

  useEffect(() => clearAll, []);

  return (
    <code
      className={`aam_terminal ${
        hiddenUntilHover && !isVisible ? 'aam_terminal--hidden' : ''
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease'
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <span className="aam_terminal-text">{displayed}</span>
      <span className="aam_terminal-cursor"> </span>
    </code>
  );
};

export default TerminalSignature;
