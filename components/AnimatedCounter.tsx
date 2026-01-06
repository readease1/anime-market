'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    // If value is a string with special characters (like $, K, M), extract number
    const numericValue = typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.]/g, ''))
      : value;

    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const startValue = 0;
    const endValue = numericValue;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      if (typeof value === 'string') {
        // Preserve original formatting
        const formatted = value.replace(/[0-9.]+/, currentValue.toFixed(value.includes('.') ? 1 : 0));
        setDisplayValue(formatted);
      } else {
        setDisplayValue(Math.floor(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [value, duration]);

  return <span>{displayValue}</span>;
}
