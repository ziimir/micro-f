import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {Test} from './components/test';

export const render = () => ReactDOMServer.renderToString(<Test initial={2} />);
