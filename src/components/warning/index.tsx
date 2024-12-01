import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface WarningProps {
  message: string;
  status: 'success' | 'failed'; 
  duration?: number;
}

const Warning: React.FC<WarningProps> = ({ message, status, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); 
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.warning} ${status === 'success' ? styles.success : styles.failed}`}
    >
      {message}
    </div>
  );
};

export default Warning;
