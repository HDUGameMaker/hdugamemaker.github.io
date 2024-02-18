function login()
{
    window.location.href = "login.html";
}

$(document).ready(function (){
    let params = new URLSearchParams(window.location.search);
    let tmp_code = params.get('tmp_code');
    if (tmp_code === null) {
        // 显示错误消息或者重定向用户
        console.error('未能获取到 logintmpcode');
    }
    else {
        console.log('logintmpcode: ' + tmp_code);
    }
});
