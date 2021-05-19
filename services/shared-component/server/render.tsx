const {render} = require('out/headerService.page.js');

export const renderHeader = function(req: any, res: any, next: any) {
    res.send(render());
}
