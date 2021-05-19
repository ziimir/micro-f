import React from 'react';
import ReactDOM from 'react-dom';

import {Test} from './components/test';

(window as any).renderHeader = (containerId: string, history: any) => {
    ReactDOM.render(
        <Test initial={2} />,
        document.getElementById(containerId),
    );
};

(window as any).unmountHeader = (containerId: any) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
