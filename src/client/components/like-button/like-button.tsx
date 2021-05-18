import React, {PureComponent} from 'react';
import {createCn} from 'bem-react-classname';

import './like-button.css';

interface Props {
    onClick: () => void;
}

interface State {
    liked: boolean;
}

export class LikeButton extends PureComponent<Props, State> {
    cn = createCn('like-button');

    state = {liked: false};

    handleButtonClick = () => {
        this.setState({liked: true});

        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        if (this.state.liked) {
            return 'liked';
        }

        return (
            <div className={this.cn()}>
                <div className={this.cn('icon')} />
                <button onClick={this.handleButtonClick}>
                    L_I_K_E
                </button>
            </div>
        );
    }
}
