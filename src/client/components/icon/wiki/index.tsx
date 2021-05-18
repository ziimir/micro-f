import React, {PureComponent} from 'react';

import {Icon} from '../icon';

import svg from './images/wiki.svg';

export class IconTw extends PureComponent<{}, {}> {
    render() {
        return <Icon url={svg.url} viewBox={svg.viewBox} />;
    }
}
