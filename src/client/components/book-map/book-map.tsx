import React, {PureComponent} from 'react';
import {createCn} from 'bem-react-classname';

import map from './images/map.jpg';

export class BookMap extends PureComponent {
    cn = createCn('book-map');

    render() {
        return (
            <div className={this.cn()}>
                <img width="100%" src={map} />
            </div>
        );
    }
}
