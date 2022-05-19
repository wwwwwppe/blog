//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require("bcrypt");
// 引入Joi模块
const Joi = require("joi");
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email : {
        type : String,
        //保证邮箱地址不重复
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    /*admin   超级管理员
    * normal 普通用户 */
    role:{
        type : String,
        required : true
    },
    /*如果为0就是启用
    * 如果为1就是禁用
    * */
    state:{
        type: Number,
        default: 0
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'yize',
        email: 'yize@163.com',
        password : pass,
        role: 'admin',
        state: 0
    })
}

//createUser();

//验证用户信息
const validateUser = user=> {
    //定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('昵称在2到12')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合')),
        password: Joi.string().regex(/^[a-zA-Z\d]{3,30}$/).required().error(new Error("密码格式不符合")),//  \d表示0-9
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    });

    // 实施验证
    return schema.validateAsync(user);
}

//将用户集合作为模块导出
module.exports = {
    User,
    validateUser
};