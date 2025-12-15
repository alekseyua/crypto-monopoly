import { ReactSVG } from 'react-svg';
import React from 'react';
import styles from './styles/icon.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

interface IIcon {
    src: string;
    backgroundFont?: boolean;
    style?: React.CSSProperties;
    className?: string;
    addClass?: string;
    onClick?: () => void;
    mr?: number | string;
    ml?: number | string;
    width?: string | number | [string | number, string | number];
    height?: string | number | [string | number, string | number];
    rotate?: number;
    display?: string;
    up?: number;
    down?: number;
    props?: any;

    // screen bounds (optional)
    minW?: number;
    maxW?: number;
}

const Icon: React.FC<IIcon> = ({
    src,
    style = {},
    className,
    addClass,
    onClick,

    mr,
    ml,
    display,
    backgroundFont,
    up,
    down,
    rotate = 0,

    width = 20,
    height = 20,

    minW = 320,
    maxW = 1920,

    ...props
}) => {

    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const screenWidth = useWindowWidth().width;
    const interpolate = (minVal: number, maxVal: number): number => {
        const w = Math.min(Math.max(screenWidth, minW), maxW);
        const progress = (w - minW) / (maxW - minW);
        return minVal + (maxVal - minVal) * progress;
    };

    const toPx = (val: string | number): number => {
        if (typeof val === "number") return val;
        if (val.endsWith("px")) return parseFloat(val);
        return parseFloat(val); // если "100%" просто число — не используем проценты
    };

    const calcSize = (val: any): string => {
        if (Array.isArray(val)) {
            const [minVal, maxVal] = val;
            const minPx = toPx(minVal);
            const maxPx = toPx(maxVal);
            return interpolate(minPx, maxPx) + "px";
        }

        if (typeof val === "number") return val + "px";
        return val;
    };

    const finalWidth = calcSize(width);
    const finalHeight = calcSize(height);

    let customStyle: React.CSSProperties | Record<string, string | number>= {
        transform: rotate && `rotate(${rotate}deg)`,
        transition: "width .2s ease, height .2s ease, transform .2s ease",
        // eslint-disable-next-line
        ['_']: 0,
    };

    if (mr) customStyle.marginRight = mr;
    if (ml) customStyle.marginLeft = ml;
    if (display) customStyle.display = display;

    if (up) customStyle["--bottom"] = `${up}px`;
    if (down) customStyle["--top"] = `${down}px`;

    return (
        <span
            className={`${styles.wrapIcon} ${backgroundFont && styles.backgroundFont}`}
            style={customStyle}
        >
            <ReactSVG
                src={src}
                onClick={onClick}
                wrapper="span"
                className={className}
                style={style}
                beforeInjection={(svg) => {
                    svg.setAttribute("style", `width: ${finalWidth}; height: ${finalHeight}`);
                }}
                {...props}
            />
        </span>
    );
};

export default Icon;
