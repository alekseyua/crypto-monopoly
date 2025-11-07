import styles from './styles/BlockSheet.module.scss';
import React, { useState, useRef } from 'react';

interface IProps {
    children: React.ReactNode;
}

const BlockSheet: React.FC<IProps> = ({ children }) => {
    const [translateY, setTranslateY] = useState(0); // текущее смещение
    const [isOpen, setIsOpen] = useState(false); // открыта ли панель
    const startY = useRef(0);
    const currentY = useRef(0);
    const sheetHeight = 320; // высота, на которую поднимается панель
    const threshold = 100;   // расстояние для "открытия" или "закрытия"

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        currentY.current = e.touches[0].clientY;
        const diff = startY.current - currentY.current;

        // Ограничиваем тянутое расстояние (не выше sheetHeight)
        if (diff > 0) {
            setTranslateY(-Math.min(diff, sheetHeight));
        }
    };

    const handleTouchEnd = () => {
        const diff = startY.current - currentY.current;

        if (diff > threshold) {
            setIsOpen(true);
            setTranslateY(-sheetHeight);
        } else if (diff < -threshold) {
            setIsOpen(false);
            setTranslateY(0);
        } else {
            setTranslateY(isOpen ? -sheetHeight : 0);
        }
    };
    const customStyle: {[key: string]: string}= {};
    if(!!translateY){
        customStyle.marginBottom = '360px'
        customStyle.paddingBottom = '20px'
    }
    return (
        <div
            className={styles["bottom-sheet"]}
            style={{
                transform: `translateY(calc(100% + ${translateY}px))`,
                transition: 'transform 0.3s ease, margin-bottom o.5s ease', 
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
