import React from 'react';

export class MicroFrontend extends React.Component<{id: string}> {
    componentDidMount() {
        const scriptId = `${this.props.id}_script`;

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
        (window as any)['unmount_' + this.props.id](this.props.id);
    }

    renderMicroFrontend = () => {
        (window as any)['render_' + this.props.id](this.props.id);
    };

    render() {
        const id = this.props.id;

        return (
            <div
                id={id}
                dangerouslySetInnerHTML={{
                    __html: typeof window === 'undefined' ?
                        `\{\{MICROFRONTEND-NODE-PLACEHOLDER-FOR_${id}\}\}` :
                        (window as any)[id]
                }}
            />
        );
    }
}
