function login()
{
    window.location.href = "login.html";
}
class user
{
    tmp_code = '';
    user_name = '';
    constructor(tmp_code) {
        this.tmp_code = tmp_code;
    }
    //https://open.feishu.cn/document/server-docs/authentication-management/login-state-management/get
    get_info()
    {
        const that = this;
        let xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) =>
        {
            xhr.open("post", `https://open.feishu.cn/open-apis/authen/v1/user_info`, true)
            xhr.setRequestHeader("Authorization", `Bearer ${this.tmp_code}`);
            xhr.onreadystatechange = function ()
            {
                if (xhr.readyState === 4)
                    if (xhr.status === 200)
                    {
                        let result = JSON.parse(xhr.responseText);
                        that.user_name = result.data.name;
                        console.log("Get UserName Success");
                        return resolve();
                    }
                else
                    {
                        alert("Get UserName failed");
                        return reject();
                    }
            }
            xhr.send();
        });
    }
}
$(document).ready(function ()
{
    let params = new URLSearchParams(window.location.search);
    let tmp_code = params.get('code');
    if (tmp_code === null)
    {
        // 显示错误消息或者重定向用户
        console.error('未能获取到 logintmpcode');
    }
    else
    {
        console.log('logintmpcode: ' + tmp_code);
        let login_div = $('.login');
        window.user = new user(tmp_code);
        window.user.get_info()
            .then(() =>
            {
                login_div.empty();
                login_div.append(`<h1>欢迎！${window.user.user_name}</h1>`);
            })
            .then(() =>
            {

            });
    }
});
