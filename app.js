const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');

const db = require('./config/db.json');
const post = require('./routes/post.js');
const user = require('./routes/user.js');

const app = new Koa();

const router = new Router();

app.use(cors());
router.use('/api/user', user.routes(), user.allowedMethods());
router.use('/api/post', post.routes(), post.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(db.app.port, () => {
    console.log(`starting at port ${db.app.port}`);
});
