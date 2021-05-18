import React, {PureComponent} from 'react';

import {Icon} from '../icon';

import svg from './images/fb.svg';

export class IconFb extends PureComponent<{}, {}> {
    render() {
        return <Icon url={svg.url} viewBox={svg.viewBox} />;
    }
}
