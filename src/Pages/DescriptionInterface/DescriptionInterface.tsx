import React, { useEffect, useRef, useState } from 'react'
import { icons } from '../../assets';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';
import { Offset } from '../../shared/UI';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useZoomPan } from '../../hooks/useZoomPan';

const DescriptionInterface: React.FC = () => {
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
    const width = useWindowWidth();
    const containerRef = useRef<HTMLDivElement>(null);
    const contentWidth = width;
    const contentHeight = 400;

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setContainerSize({ w: clientWidth, h: clientHeight });
        }
    }, []);

    const { scale, position, dragging, eventHandlers } = useZoomPan({
        minScale: 1,
        maxScale: 2,
        contentWidth,
        contentHeight,
        containerWidth: containerSize.w,
        containerHeight: containerSize.h,
        bounceSpeed: 0.15,
    });
    return (
        <BlockWrapper>
            <Offset mt={40} />
            <div
                ref={containerRef}
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    touchAction: "none",
                    cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default",
                }}
                {...eventHandlers}
            >
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: "center center",
                        transition: dragging ? "none" : "transform 0.1s ease-out",
                    }}
                >
                    <img src={icons.interFace} alt="Description Interface" />
                </div>
            </div>
        </BlockWrapper>
    )
}

export default DescriptionInterface;