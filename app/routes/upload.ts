import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';
import UtilDate from '@app/utils/date'


const router = new Router({
    // prefix: '/'
});

router
    .get('/upload', async (ctx, next) => {
        const { req, res } = ctx;
        const list = fs.readdirSync(path.join(__dirname, '../../public/upload/'), {
            encoding: 'utf8'
        }).map(name => path.join('/upload/', name))

        await ctx.render("upload", { list });
    })
    .post('/api/upload', async (ctx, next) => {
        const file = ctx.request.files.file;

        if (!file.name) return await next();

        // console.log(file.name, file.size);
        const target = path.join(__dirname, '../../public/upload/', new UtilDate().format('yyyyMMdd_hhmmsss') + path.extname(file.name));
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(target);
        reader.pipe(stream);
        console.log('uploading %s -> %s', file.name, stream.path);
        ctx.redirect('/upload');
    });


export default router;

