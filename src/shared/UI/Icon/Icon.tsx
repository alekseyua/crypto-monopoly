import { ReactSVG } from 'react-svg';
import cls from './styles/icon.module.scss';

interface IIcon {
    src: string;
    style?: React.CSSProperties;
    className?: string;
    addClass?: string;
    onClick?: () => void;
    mr?: number | string;
    ml?: number | string;
    width?: string;
    height?: string;
    rotate?: number; // rotation angle in degrees
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

    
    return (
        <div 
            className={cls.wrapIcon}
            style={customStyle}    
        >
            <ReactSVG
                src={src}
                onClick={onClick}
                className={className}
                style={style}
                beforeInjection={async(svg) => {
                    svg.classList.add('svg-class-' + addClass)
                    svg.setAttribute('style', `width: ${width}; height: ${height}`)
                }}
                {...props}
            />
        </div>
    )
}

export default Icon

