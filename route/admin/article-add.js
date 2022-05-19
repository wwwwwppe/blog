// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const {Article} = require("../../model/article");

module.exports = (req, res) => {
    /*// 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2. 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    这种写法后缀名并没有生效
    */

    const form = formidable({
        multiples: true,
        uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'),
        keepExtensions: true
    })
    // 4. 解析表单
    form.parse(req, async (err, fields, files) => {
        // 1. err错误对象 如果表单解析失败 err里面储存错误信息 如果表单解析成功，err将会是NULL
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据
        //res.send(files.cover.path.split('public')[1]);
        let file = files.cover.filepath.split('public')[1];
        let types = file.split('uploads\\')[1];
        // console.log(types);
        // console.log(file);
        // if (!/(PNG|JPG|JPEG)/i.test(types.type)) {
        //         file = null;
        // }
        // 根据名称获取文件后缀名
        const index = types.lastIndexOf('.') // 根据文件名找到最后一个‘.’的索引
        const suffixName = types.substring(index) // 根据索引截取，得到后缀名

        /**
         正则表达式
         $：表示以前面的字母结尾
         i：表示忽略大小写
         */
        const verifyImg = /.(jpg|jpeg|gif|bmp|png)$/i // 验证
        if (!verifyImg.test(suffixName)) {
            file = null;
        }// 为真表示验证通过


        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: file,
            content: fields.content,
        });
        //cover 中的值和视频的并不一样
        //res.send(files);
        // 将页面重定向对文章列表页面
        res.redirect('/admin/article');
    });

}