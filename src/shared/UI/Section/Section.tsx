import React from 'react'
import styles from './styles/section.module.scss';

interface IProps {
    children: React.ReactNode,
    isScroll?: boolean;
    isShadowBottom?: boolean
}

const Section:React.FC<IProps> = ({
    children,
    isScroll=true,
  isShadowBottom,
}) => {
    const [isMobile] = React.useState(window.innerWidth <= 768);
  
  return (
    <section
      className={
        isMobile ? `${styles.containerMobileWrapper} ${isShadowBottom && styles.shadowBottom}` : `${styles.containerWrapper} ${isScroll && styles['scroll']}`
      }
    >
      {children}
    </section>
  );
}

export default Section;