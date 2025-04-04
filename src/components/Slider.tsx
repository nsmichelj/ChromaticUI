import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  onValueChange?: (value: number) => void;
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
  const thumbRef = useRef<HTMLDivElement>(null); // Referencia para el thumb
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
    (clientX: number) => {
      if (!isDragging.current || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = ((clientX - rect.left) / rect.width) * 100;
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
    const handleMouseMove = (event: MouseEvent) => handleDrag(event.clientX);
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault(); // Prevenir el desplazamiento de la página
      handleDrag(event.touches[0].clientX);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false }); // Desactivar modo pasivo
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  const percentage = calculatePercentage(value);

  useEffect(() => {
    // Agregar listener nativo para onTouchStart
    const thumbElement = thumbRef.current;
    if (!thumbElement) return;

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault(); // Prevenir el desplazamiento de la página
      if (!disabled) isDragging.current = true;
    };

    thumbElement.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      thumbElement.removeEventListener("touchstart", handleTouchStart);
    };
  }, [disabled]);

  return (
    <div
      ref={trackRef}
      className={cn(
        `relative my-6 h-2.5 rounded-full cursor-pointer border border-gray-300`,
        { "opacity-50 cursor-not-allowed": disabled },
        props.className
      )}
      onClick={handleTrackClick}
      {...props}
    >
      <div
        ref={thumbRef} // Referencia para el thumb
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