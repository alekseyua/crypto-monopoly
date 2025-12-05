import { useState, useEffect } from 'react';

export function useWindowWidth(): {
  width: number;
  isMobile: boolean;
} {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
      if(window.innerWidth < 992){ 
        setIsMobile(true);
      }else{
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile
  };
}
