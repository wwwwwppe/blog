const {Article} = require("../../model/article");

module.exports = async (req, res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 获取到地址栏中的id参数
    const {message, id} = req.query;

    if (id) {
        //修改操作
        let article = await Article.findOne({_id: id});


        // 渲染用户编辑页面（修改）
        res.render('admin/article-edit.art', {
            message: message,
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    }else {
        //添加操作
        res.render('admin/article-edit.art',{
            message: message,
            link : '/admin/article-add',
            button : '添加'
        });
    }


}