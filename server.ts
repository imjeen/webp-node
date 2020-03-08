import * as moduleAlias from 'module-alias';
import * as path from "path";
moduleAlias.addAliases({
    '@root': path.resolve(__dirname, './'),
    '@app': path.resolve(__dirname, './app'),
});
import app from './app/main';


const SERVER = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 7000,
};

app.listen(SERVER.PORT, () => {
    console.info(`
        ##################
        # ==> The server is running.
        # ==> Link: http://${SERVER.HOST}:${SERVER.PORT}
        # ==> REST: http://${SERVER.HOST}:${SERVER.PORT}/api
        ##################
    `);
});

process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});
