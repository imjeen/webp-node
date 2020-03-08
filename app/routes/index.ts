import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';
// import home from '../controllers/home';

const basename = path.basename(module.filename);
const router = new Router();

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        let route = require(path.join(__dirname, file)).default;
        // console.log('file', file);
        // console.log('route', route);
        router.use(route.routes(), route.allowedMethods());
    });

router.get('/', (ctx, next) => {
    ctx.body = 'hello';
    next();
});

export default router;
