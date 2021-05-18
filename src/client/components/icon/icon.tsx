import React, {PureComponent} from 'react';
import {createCn} from 'bem-react-classname';

import './icon.css';

interface Props {
    url: string;
    viewBox: string;
}

export class Icon extends PureComponent<Props, {}> {
    cn = createCn('icon');

    render() {
        return (
            <div className={this.cn()}>
                <svg
                    width="24"
                    height="24"
                    viewBox={this.props.viewBox}
                >
                    <use xlinkHref={this.props.url} />
                </svg>
            </div>
        );
    }
}
