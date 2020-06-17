const Router = require('koa-router');
var user = require('../models/user');
const page = new Router();

page.get('/test', async(ctx) =>{
    ctx.body = "test";
});


page.get('/', async(ctx) =>{
    const result = await user.findAll();
    ctx.body = result;
});

page.get('/register', async(ctx) =>{
    // 添加用户
    const addedUser = await user.addUser('jack'+ parseInt(Math.random() * 1000000 ,10), 'jack@163.com');

    if (addedUser) {
        const newUser = await user.findLastestItem();
        console.log(newUser);
        ctx.body = newUser;
    } else {
        ctx.body = "添加失败，重复了";
    }
});

page.get('/queryByPage', async (ctx, next) => {
    const limit = 2;
    const users = await user.findAndCountAll(0, limit);
    ctx.body = users;
});

page.get('/queryByPage/:page', async (ctx, next) => {
    const page = parseInt(ctx.params.page, 10)|| 1;
    const limit = 2;
    const offset = limit * (page - 1);

    const users = await user.findAndCountAll(offset, limit);
    ctx.body = users;
});


module.exports = page;
