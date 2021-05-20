import React, {PureComponent} from 'react';

import {LikeButton} from './components/like-button/like-button';
import {BookMap} from './components/book-map/book-map';
import {IconFb} from './components/icon/fb/icon';
import {IconTw} from './components/icon/tw/icon';

import {MicroFrontend} from '../../packages/micro-f/micro-f';

import './app.css';

export class App extends PureComponent<{}, {}> {
    state = {showSvgs: false};

    render() {
        return (
            <div>
                Apppppppppp
                <MicroFrontend id="shared" />
                <IconTw view={this.state.showSvgs ? 'custom' : 'default'} />
                {this.state.showSvgs && <IconFb />}
                <LikeButton onClick={() => void this.setState({showSvgs: true})} />
                <BookMap />
            </div>
        );
    }
}
