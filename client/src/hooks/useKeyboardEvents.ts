import { useEffect } from 'react';

export const useKeyboardEvents = (handleKeyPress: (e: KeyboardEvent) => void, handleEscape: () => void) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, handleEscape]);
};
