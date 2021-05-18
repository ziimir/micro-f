import React, {PureComponent} from 'react';

import {LikeButton} from './components/like-button/like-button';
import {BookMap} from './components/book-map/book-map';
import {IconFb} from './components/icon/fb/icon';
import {IconTw} from './components/icon/tw/icon';
import {DecoreatedComponent} from './components/decorated-component/decoreated-component';

import './app.css';

export class App extends PureComponent<{}, {}> {
    state = {showSvgs: false};

    render() {
        return (
            <div>
                Apppppppppp
                <DecoreatedComponent some={this.state.showSvgs && 'other'} />
                <IconTw view={this.state.showSvgs ? 'custom' : 'default'} />
                {this.state.showSvgs && <IconFb />}
                <LikeButton onClick={() => void this.setState({showSvgs: true})} />
                <BookMap />
            </div>
        );
    }
}
