
import { useEffect, useState } from 'react';

export function useAnimateOnScroll() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const ref = (element: Element | null) => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  };
  
  return [ref, isIntersecting] as const;
}

export function useDelayedAnimation(delay: number = 0) {
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return shouldShow;
}

export type AnimationVariant = 
  | 'fade-in'
  | 'fade-in-up'
  | 'fade-in-down'
  | 'slide-in-right'
  | 'slide-in-left';

export function getAnimationClass(variant: AnimationVariant, delay: number = 0): string {
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  return `animate-${variant} ${delayClass}`;
}
