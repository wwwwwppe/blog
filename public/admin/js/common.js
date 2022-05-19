function serializeToJson(form) {
    const result = {};
    //[{name:'email', value: 用户输入的内容}]
    const f = form.serializeArray();
    f.forEach(function (item){
        // result.email
        result[item.name] = item.value;
    });
    return result;
}