import React from 'react';
import ReactDOM from 'react-dom';

import {Test} from './components/test';

(window as any).render_shared = (containerId: string) => {
    ReactDOM.hydrate(
        <Test initial={2} />,
        document.getElementById(containerId),
    );
};

(window as any).unmount_shared = (containerId: string) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
