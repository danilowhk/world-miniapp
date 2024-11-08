// src/hooks/useTimer.ts
import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (limitInSeconds: number, onTimeLimit: () => void) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startTimer = useCallback(() => {
    console.log('startTimer called');
    setIsActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    console.log('stopTimer called');
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resetTimer = useCallback(() => {
    console.log('resetTimer called');
    stopTimer();
    setTime(0);
  }, [stopTimer]);

  useEffect(() => {
    console.log('Timer effect running, isActive:', isActive);
    
    if (isActive) {
      console.log('Setting up interval');
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          console.log('Timer tick:', newTime);
          if (newTime >= limitInSeconds) {
            stopTimer();
            onTimeLimit();
            return limitInSeconds;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        console.log('Cleaning up interval');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isActive, limitInSeconds, onTimeLimit, stopTimer]);

  const formatTime = useCallback(() => {
    if (time >= limitInSeconds) {
      return "Session Finished";
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time, limitInSeconds]);

  return {
    time,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime
  };
};