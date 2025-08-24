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
    ...props
}: IIcon) => {
    let customStyle = {}
    if(!!rotate){
        customStyle = {
            transform: `rotate(${rotate}deg)`,
        }
    }
    if(mr){ customStyle = {...customStyle,marginRight:mr,};}
    if(ml){ customStyle = {...customStyle,marginLeft:ml,}; }
    if(display){ customStyle = {...customStyle,display:display,}; }

    
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

