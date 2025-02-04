import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Required props
  value?: number;
  onValueChange?: (value: number) => void;

  // Optional props with default values
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  thumbProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  onValueChange,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  thumbProps,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const calculatePercentage = useCallback(
    (currentValue: number) => {
      return ((currentValue - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const calculateValue = useCallback(
    (percentage: number) => {
      const rawValue = (percentage * (max - min)) / 100 + min;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    },
    [min, max, step]
  );

  const handleTrackClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      const newValue = calculateValue(percentage);

      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [disabled, calculateValue, onValueChange]
  );

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      const newValue = calculateValue(Math.max(0, Math.min(100, percentage)));

      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [calculateValue, onValueChange]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  const percentage = calculatePercentage(value);


  return (
    <div
      ref={trackRef}
      className={cn(
        `relative my-6 h-2.5 rounded-full cursor-pointer border border-gray-300
        }`,
        { "opacity-50 cursor-not-allowed": disabled },
        props.className
      )}
      onClick={handleTrackClick}
      {...props}
    >
      <div
        className={cn(
          `absolute h-5 w-5 -translate-y-1/2 -translate-x-1/2 top-1/2 bg-white rounded-full shadow-lg border-2 border-white cursor-grab active:cursor-grabbing`,
          thumbProps?.className
        )}
        style={{ left: `${percentage}%`, ...thumbProps?.style }}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!disabled) isDragging.current = true;
        }}
      />
    </div>
  );
};

export default Slider;