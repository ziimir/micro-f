import React, {PureComponent} from 'react';

import {Icon} from '../icon';

import svg from './images/tw.svg';
import svg2 from './images/tw-custom.svg';

interface Props {
    view: 'default' | 'custom';
}

export class IconTw extends PureComponent<Props, {}> {
    static defaultProps = {
        view: 'default'
    }

    render() {
        const icon = this.props.view === 'default' ? svg : svg2;

        return <Icon url={icon.url} viewBox={icon.viewBox} />;
    }
}
