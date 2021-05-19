const {render} = require('out/shared.page.js');

export const renderSharedComponent = function(req: any, res: any, next: any) {
    res.send(render());
}
