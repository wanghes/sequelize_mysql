const Router = require('koa-router');
const post = require('../models/post');

const router = new Router();

router.get('/', async(ctx) =>{
    const result = await post.findAllPosts();
    ctx.body= result;
});

router.get('/add',async(ctx) =>{
    const addRes = await post.newPost('post title', 'post content');
    console.log(addRes);
    const result = await post.findById(1);
    ctx.body= result;
});

//按照ID查询
router.get('/item/:id', async(ctx) =>{
    // console.log(ctx.query);
    const id = ctx.params.id;
    const result = await post.findById(id);
    ctx.body= result;
});

// 安分查询
router.get('/postsbyPages', async(ctx) =>{
    const page = parseInt(ctx.query.page, 10)|| 1;
    const limit = 2;
    const offset = limit * (page - 1);
    const result = await post.findAllPostsByPages(offset, limit);
    ctx.body= result;
});

module.exports = router;
