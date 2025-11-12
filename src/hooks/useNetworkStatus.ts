import { useEffect, useState } from 'react';

type NetworkInformation = {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export function useNetworkStatus(interval = 10000) {
  const connection = (navigator as any).connection as NetworkInformation | undefined;

  const [status, setStatus] = useState({
    online: navigator.onLine,
    quality: 'unknown' as 'good' | 'bad' | 'offline' | 'unknown',
    type: connection?.effectiveType || 'unknown',
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, online: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const updateConnectionInfo = () => {
      if (connection) {
        setStatus(prev => ({
          ...prev,
          type: connection.effectiveType || 'unknown',
        }));
      }
    };

    connection?.addEventListener?.('change', updateConnectionInfo);

    // 🔍 Quality checker
    const checkQuality = async () => {
      const start = Date.now();
      try {
        // lightweight fetch — uses Google favicon as a ping target
        await fetch('https://monopoly-game.fun/api/v1/user/get-user/by-email/?email=alekseyuadnepr%40gmail.com', {
          mode: 'no-cors',
          cache: 'no-store',
        });
        const duration = Date.now() - start;

        setStatus(prev => ({
          ...prev,
          quality: duration > 2000 ? 'bad' : 'good',
          online: true,
        }));
      } catch {
        setStatus(prev => ({
          ...prev,
          quality: 'offline',
          online: false,
        }));
      }
    };

    checkQuality();
    const timer = setInterval(checkQuality, interval);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      connection?.removeEventListener?.('change', updateConnectionInfo);
      clearInterval(timer);
    };
  }, [interval, connection]);

  return status;
}
