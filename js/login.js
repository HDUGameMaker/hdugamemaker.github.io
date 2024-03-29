//https://open.feishu.cn/document/common-capabilities/sso/web-application-sso/qr-sdk-documentation
$(document).ready(function (){

    var QRLoginObj = QRLogin({
        id:"login_container",
        goto: "https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=cli_a558bd2400ba900e&redirect_uri=https://hdugamemaker.github.io/&response_type=code&state=s0",
        width: "256px",
        height: "256px",
        style: "width:100%;"//可选的，二维码html标签的style属性
    });

    var handleMessage = function (event) {
        // 使用 matchOrigin 和 matchData 方法来判断 message 和来自的页面 url 是否合法
        //alert("origin: " + event.origin)
        if(QRLoginObj.matchOrigin(event.origin) && QRLoginObj.matchData(event.data)) {
            var loginTmpCode = event.data.tmp_code;
            // alert("loginTmpCode: " + loginTmpCode)
            // 在授权页面地址上拼接上参数 tmp_code，并跳转
            window.location.href = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=cli_a558bd2400ba900e&redirect_uri=https://hdugamemaker.github.io/&response_type=code&state=s0&tmp_code=${loginTmpCode}`;
        }
    };
    if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', handleMessage, false);}
    else if (typeof window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', handleMessage);
    }

});