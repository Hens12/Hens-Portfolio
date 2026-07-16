import { useState, useEffect, useCallback, useRef } from 'react';

interface TypingOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypingEffect({
  texts,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2000,
  loop = true,
}: TypingOptions) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const currentFullText = texts[textIndex];

    if (!isDeleting) {
      // Typing forward
      const nextText = currentFullText.slice(0, displayText.length + 1);
      setDisplayText(nextText);

      if (nextText === currentFullText) {
        if (!loop && textIndex === texts.length - 1) {
          setIsComplete(true);
          return;
        }
        // Pause at end of text before deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }
      timeoutRef.current = setTimeout(tick, typingSpeed);
    } else {
      // Deleting backward
      const nextText = currentFullText.slice(0, displayText.length - 1);
      setDisplayText(nextText);

      if (nextText === '') {
        setIsDeleting(false);
        const nextIndex = (textIndex + 1) % texts.length;
        setTextIndex(nextIndex);
        timeoutRef.current = setTimeout(tick, 500);
        return;
      }
      timeoutRef.current = setTimeout(tick, deletingSpeed);
    }
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, typingSpeed]);

  return { displayText, isComplete };
}
