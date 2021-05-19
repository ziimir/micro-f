import React from 'react';

export class MicroFrontend extends React.Component {
    componentDidMount() {
        const scriptId = 'micro-frontend-script-header';

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = 'http://localhost:3000/assets/shared.js';
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
    }

    componentWillUnmount() {
        (window as any)['unmountHeader']('header-container');
    }

    renderMicroFrontend = () => {
        (window as any)['renderHeader']('header-container');
    };

    render() {
        return (
            <div id="header-container">
                {typeof window === 'undefined' ? 'MICROFRONTEND-NODE-PLACEHOLDER' : ''}
            </div>
        );
    }
}
