import { useState, useRef, useCallback, useEffect } from "react";

interface UseZoomPanProps {
  minScale?: number;
  maxScale?: number;
  zoomSpeed?: number;
  contentWidth: number;
  contentHeight: number;
  containerWidth: number;
  containerHeight: number;
  bounceSpeed?: number;
}

export function useZoomPan({
  minScale = 1,
  maxScale = 5,
  zoomSpeed = 0.1,
  contentWidth,
  contentHeight,
  containerWidth,
  containerHeight,
  bounceSpeed = 0.1,
}: UseZoomPanProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const getBounds = useCallback(() => {
    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;
    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
    return { maxX, maxY };
  }, [scale, contentWidth, contentHeight, containerWidth, containerHeight]);

  const clampPosition = useCallback(
    (x: number, y: number) => {
      const { maxX, maxY } = getBounds();
      return {
        x: Math.min(Math.max(x, -maxX), maxX),
        y: Math.min(Math.max(y, -maxY), maxY),
      };
    },
    [getBounds]
  );

  const isOutOfBounds = useCallback(() => {
    const { maxX, maxY } = getBounds();
    return (
      position.x < -maxX ||
      position.x > maxX ||
      position.y < -maxY ||
      position.y > maxY
    );
  }, [position, getBounds]);

  const bounceBack = useCallback(() => {
    cancelAnimationFrame(animationRef.current!);
    const step = () => {
      const { maxX, maxY } = getBounds();
      const target = {
        x: Math.min(Math.max(position.x, -maxX), maxX),
        y: Math.min(Math.max(position.y, -maxY), maxY),
      };

      const dx = target.x - position.x;
      const dy = target.y - position.y;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        setPosition(target);
        return;
      }

      setPosition((p) => ({
        x: p.x + dx * bounceSpeed,
        y: p.y + dy * bounceSpeed,
      }));

      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }, [position, getBounds, bounceSpeed]);

  /** Ctrl + Scroll Zoom (desktop) */
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
      setScale((s) => {
        const next = Math.min(Math.max(s + delta, minScale), maxScale);
        if (next === 1) setPosition({ x: 0, y: 0 }); // сбрасываем позицию при масштабе 1
        return next;
      });
    },
    [zoomSpeed, minScale, maxScale]
  );

  /** Mouse drag */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return; // запрет перемещения без увеличения
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, [scale]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || scale <= 1) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setPosition((p) => ({ x: p.x + dx, y: p.y + dy }));
    },
    [dragging, scale]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  /** Touch support */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDistance.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      lastPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (lastDistance.current) {
          const delta = (distance - lastDistance.current) / 200;
          setScale((s) => {
            const next = Math.min(Math.max(s + delta, minScale), maxScale);
            if (next === 1) setPosition({ x: 0, y: 0 });
            return next;
          });
        }
        lastDistance.current = distance;
      } else if (e.touches.length === 1 && scale > 1) {
        const touch = e.touches[0];
        const dx = touch.clientX - lastPos.current.x;
        const dy = touch.clientY - lastPos.current.y;
        lastPos.current = { x: touch.clientX, y: touch.clientY };
        setPosition((p) => ({ x: p.x + dx, y: p.y + dy }));
      }
    },
    [minScale, maxScale, scale]
  );

  const onTouchEnd = useCallback(() => {
    lastDistance.current = null;
  }, []);

  /** При отпускании — возврат в границы */
  useEffect(() => {
    if (!dragging && isOutOfBounds()) {
      bounceBack();
    }
  }, [dragging, isOutOfBounds, bounceBack]);

  return {
    scale,
    position: clampPosition(position.x, position.y),
    dragging,
    eventHandlers: {
      onWheel,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
