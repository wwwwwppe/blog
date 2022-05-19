const guard = (req,res,next) =>{
    //判断用户访问的是否登录界面
    //判断用户的登录状态
    //如果用户是登录的
    //如果用户不是登录的
    if (req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login');
    }else {
        // 如果用户是登录状态放行
        next();
    }
}

module.exports = guard;