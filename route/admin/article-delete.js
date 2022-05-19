const {Article} = require('../../model/article');

module.exports = async (req, res) => {
    //res.send(req.query.id);
    console.log(req.query.id)
    await Article.findOneAndDelete({_id: req.query.id});
    // 重定向到用户列表页面
    res.redirect('/admin/article');
};