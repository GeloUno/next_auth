import React from 'react';
import styles from './center.module.css'
interface ICenterContainerProps {
    children: React.ReactChild
}
function CenterContainer({ children }: ICenterContainerProps) {
    return (
        <div className={styles.center}>
            {children}
        </div>
    );
}

export default CenterContainer;