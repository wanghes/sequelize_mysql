const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = Sequelize.Op;

const Post = sequelize.define('post', {
    // 文章标题
    title: {
        type: Sequelize.STRING
    },
    // 文章内容
    content: {
        type: Sequelize.STRING
    },
    // 文章发表时间
    create_at: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: false
});

var post = Post.sync({ force: false });

// 发表新文章
exports.newPost = function(title, content) {
    return post.then(function() {
        Post.create({
            title: title,
            content: content,
            create_at: Date.now()
        });
    });
};

// 查找所以文章
exports.findAllPosts = function() {
    return Post.findAll();
};

// 通过 ID 查找文章
exports.findById = function(id) {
    return Post.findByPk(id);
};

exports.findAllPostsByPages = function(offset, limit) {
    return Post.findAndCountAll({
        offset: offset,
        limit: limit
    });
};
