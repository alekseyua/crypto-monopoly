import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';
import { getPadding } from '../../../../../../../helpers/helper';

interface IProps {
    children?: React.ReactNode;
    p?: number | string | number[] | string[];
    style?: React.CSSProperties;
    center?: boolean;
}   

const ContainerInfoBodyGIB:React.FC<IProps> = ({
    p,
    style,
    center,
    children,
}: IProps) => {
    let customStyle: CSSProperties= {};
    if(p) {customStyle.padding = getPadding(p)}
    if(center){customStyle = {...customStyle, justifyContent:'center', alignItems: 'center'}}
    return (
        <div 
            className={styles['gib__container-info-body']}
            style={{...style,...customStyle}}
        >
            {children}
        </div>
    )
}

export default ContainerInfoBodyGIB;