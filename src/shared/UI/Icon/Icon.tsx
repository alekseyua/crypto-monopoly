import { ReactSVG } from 'react-svg';
import styles from './styles/icon.module.scss';

interface IIcon {
    src: string;
    backgroundFont?: boolean;
    style?: React.CSSProperties;
    className?: string;
    addClass?: string;
    onClick?: () => void;
    mr?: number | string;
    ml?: number | string;
    width?: string;
    height?: string;
    rotate?: number; // rotation angle in degrees
    display?: string;
    props?: any;
    up?: number;
    down?: number;
    // additional props for svg tag
}

const Icon:React.FC<IIcon> = ({
    src,
    style = {},
    className,
    addClass,
    onClick,
    width='20px',
    height='20px',
    rotate = 0,
    mr,
    ml,
    backgroundFont,
    display,
    up,
    down,
    ...props
}: IIcon) => {
    let customStyle: React.CSSProperties & Record<string, string | number> = {};
    if(!!rotate){
        customStyle = {
            transform: `rotate(${rotate}deg)`,
        }
    }
    if(mr){ customStyle = {...customStyle,marginRight:mr,};}
    if(ml){ customStyle = {...customStyle,marginLeft:ml,}; }
    if(display){ customStyle = {...customStyle,display:display,}; }
    if(up) customStyle = {
        ...customStyle,
        "--bottom": `${up}px`
    }
   if(down) customStyle = {
        ...customStyle,
        "--top": `${down}px`
    }
    
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
                beforeInjection={async(svg) => {
                    svg.classList.add('svg-class-' + addClass)
                    svg.setAttribute('style', `width: ${width}; height: ${height}`)
                }}
                {...props}
            />
        </span>
    )
}

export default Icon

