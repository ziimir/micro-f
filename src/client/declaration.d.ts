declare module '*.jpg' {
    const path: string;
    export default path;
};

declare module '*.svg' {
    const svg: {url: string, viewBox: string};
    export default svg;
};
