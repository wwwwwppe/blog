// 引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(5).required().error(new Error('不符合，重新输入')),
    birth: Joi.number().min(1900).max(2021).error(new Error('输入真实出生日期'))
});


async function run() {
    try {
        // 实施验证
        await schema.validateAsync({username : 'ab',birth: 1800}) ;
    }catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}

run();