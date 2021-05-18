import React, {PureComponent} from 'react';

import {
    renderIf,
    hasProp
} from '../../utils/render-if-decorator';

interface Props {
    some: string | boolean;
}

interface State {
    is: boolean;
}

export class DecoreatedComponent extends PureComponent<Props, State> {
    state = {is: false};

    @renderIf(hasProp('some'))
    renderFunctionProp = () => {
        return 'BBBBBb';
    };

    @renderIf(hasProp('some'))
    renderSome() {
        return (
            <div>AAAAAAA</div>
        );
    }

    render() {
        return (
            <div>
                New Component
                {this.renderSome()}
                {this.renderFunctionProp()}
            </div>
        );
    }
}
