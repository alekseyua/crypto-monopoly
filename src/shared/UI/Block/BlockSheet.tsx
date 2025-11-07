import styles from './styles/BlockSheet.module.scss';
import React, { useState, useRef, useEffect } from 'react';

interface IProps {
    children: React.ReactNode;
}

const BlockSheet: React.FC<IProps> = ({ children }) => {
    const [translateY, setTranslateY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const startY = useRef(0);
    const currentWrapRef = useRef(null);
    const currentY = useRef(0);
    const [sheetHeight, setSheetHeight] = useState(0);
    const threshold = 80; // расстояние для открытия/закрытия (увеличено для стабильности)

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };

    useEffect(()=>{
        if (currentWrapRef.current){
            const heightWrap = (currentWrapRef.current as HTMLElement).clientHeight;
            setSheetHeight(heightWrap - 100);
        }
    },[])

    const handleTouchMove = (e: React.TouchEvent) => {
        currentY.current = e.touches[0].clientY;
        const diff = startY.current - currentY.current;

        // Если панель закрыта — свайп только вверх
        if (!isOpen && diff > 0) {
            setTranslateY(-Math.min(diff, sheetHeight));
        }

        // Если панель открыта — свайп только вниз
        if (isOpen && diff < 0) {
            setTranslateY(-sheetHeight - diff);
        }
    };

    const handleTouchEnd = () => {
        const diff = startY.current - currentY.current;

        // если панель была закрыта и свайп вверх достаточно большой
        if (!isOpen && diff > threshold) {
            setIsOpen(true);
            setTranslateY(-sheetHeight);
        }
        // если панель открыта и свайп вниз достаточно большой
        else if (isOpen && diff < -threshold) {
            setIsOpen(false);
            setTranslateY(0);
        }
        // иначе — возвращаем в текущее состояние
        else {
            setTranslateY(isOpen ? -sheetHeight : 0);
        }
    };

    const customStyle: React.CSSProperties = {};
    if (translateY < 0) {
        // customStyle.marginBottom = '360px';
        customStyle.paddingBottom = '20px';
    }

    return (
        <div
            className={styles['bottom-sheet']}
            ref={currentWrapRef}
            style={{
                transform: `translateY(calc(100% + ${translateY}px))`,
                transition: 'transform 0.3s ease',
                ...customStyle,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {children}
        </div>
    );
};

export default BlockSheet;
