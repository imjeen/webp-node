import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Body from 'koa-body';
import * as path from 'path';
import * as fs from 'fs';
import * as render from 'koa-ejs';
import * as views from 'koa-views';

import router from './routes/index';

const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

app
    .use(views(path.resolve(__dirname, './views'), {
        // extension: 'ejs',
    }))
    .use(Body({ multipart: true }))
    .use(Static(path.join(__dirname, '../public')))
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000);


export default app;