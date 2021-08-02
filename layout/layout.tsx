import React, { Fragment } from 'react';
import MainNavigation from './main-navigation';

interface ILayoutPageProps {
    children: React.ReactNode
}
function LayoutPage({ children }: ILayoutPageProps) {
    return (
        <Fragment>
            <MainNavigation />
            <main>{children}</main>
        </Fragment>
    );
}

export default LayoutPage;