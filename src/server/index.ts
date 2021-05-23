import "core-js";
import "regenerator-runtime/runtime";

import path from 'path';
import express from 'express';
import config from 'config';

import winston from 'winston';
import expressWinston from 'express-winston';
import got from 'got';

import mainPageTemplate from './views/main.pug';

import {renderSharedComponent} from '../../services/shared-component/server/render';

const {render} = require('out/server.page.js');
const manifest = require('out/manifest.json');

const app = express();
const port = 3000;

const rootDir = path.resolve(__dirname, '../../');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface AppAssets {
    js: string[];
    css: string[];
}

function getAssets(): AppAssets {
    const JS_ASSET_NAME_REGEXP = /\.js$/;
    const CSS_ASSET_NAME_REGEXP = /\.css$/;
    const css: string[] = [];
    const js: string[] = [];

    Object.keys(manifest).forEach((assetName) => {
        const assetsPath = manifest[assetName];

        if (JS_ASSET_NAME_REGEXP.test(assetName)) {
            js.push(`${assetsPath}${IS_PRODUCTION ? '.gz' : ''}`);
        }

        if (CSS_ASSET_NAME_REGEXP.test(assetName)) {
            css.push(`${assetsPath}${IS_PRODUCTION ? '.gz' : ''}`);
        }
    });

    return {js, css};
};

const assets = getAssets();

app.use(
    '/assets',
    express.static(
        path.join(rootDir, config.get('build.clientOutput')),
        {
            setHeaders: (response, path, stat) => {
                if (IS_PRODUCTION && (/\.(js|css)\.gz$/i).test(path)) {
                    response.set('Content-Encoding', 'gzip')
                }
            }
        }
    )
);

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    requestWhitelist: [
        'method',
        'url',
        'query'
    ]
}));

app.get('/', async function (req, res) {
    let reactAppHtml = render();

    // todo: получать регекспом из reactAppHtml
    const shared: string[] = ['shared'];
    const sharedWindowStore: {name: string, html: string}[] = [];

    const fetchingComponents = shared
        .map((s) => got('http://localhost:3000/micro-frontend/shared-component', {resolveBodyOnly: true}));

    const components = await Promise.all(fetchingComponents);
    shared.forEach((s, index) => {
        const sharedHtml = components[index];

        reactAppHtml = reactAppHtml.replace(`{{MICROFRONTEND-NODE-PLACEHOLDER-FOR_${s}}}`, sharedHtml);
        sharedWindowStore.push({name: s, html: sharedHtml});
    });

    res.send(mainPageTemplate({
        js: assets.js,
        css: assets.css,
        title: 'Hey!',
        message: 'Hello there!',
        reactApp: reactAppHtml,
        shared: sharedWindowStore
    }));
});

app.get('/micro-frontend/shared-component', renderSharedComponent);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
