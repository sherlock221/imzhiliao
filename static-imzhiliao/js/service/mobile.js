/**
 * mobilejs
 * @autor sherlock221b
 */


define(function (require, exports, module) {


    var  Util  = {
        checkPlatform: function () {
            var ua = window.navigator.userAgent.toLowerCase();

            if (ua.indexOf("qq/") > -1) {
                return {"message": "qq下载请点击右上角在浏览器中打开", "type": "tx"}
            }
            else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return {"message": "微信下载请点击右上角在浏览器中打开", "type": "tx"}
            }
            else{
               return   {"type" : "other"};
            }
        },

        checkMobile : function(){
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                return {"type": "iOS"};
            }
            else if (navigator.userAgent.match(/Android/i)) {
                return {"type": "Android"};
            }
            else{
                return   {"type" : "other"};
            }
        }

    }


    //全局配置
    var  androidUrl  ="http://imzhiliao.com/zhiliao.apk";
    var iosUrl = "https://itunes.apple.com/cn/app/id948591472?mt=8";
    var  treasure =  "http://a.app.qq.com/o/simple.jsp?pkgname=com.cicada.cicada";



    var  UI = {
        DowloadBtn : document.querySelectorAll(".btn-dw")
    }
    //当前os
    var  currentSys = Util.checkMobile();
    var  currentPlatForm = Util.checkPlatform();


    Array.prototype.forEach.call(UI.DowloadBtn, function(obj) {
        if(currentSys.type == "iOS"){
            obj.innerHTML = "iOS下载";
        }
        else if(currentSys.type == "Android"){
             obj.innerHTML = "Android下载";
        }
        else{
            obj.innerHTML = "其它下载";
        }

        //添加下载监听
        obj.addEventListener("touchstart",function(){
            //平台监测
            if(currentPlatForm.type == "tx"){
               window.location.href = treasure;
            }
            //IOS下载
            else if(currentSys.type == "iOS"){
                window.location.href = iosUrl;
            }
            else{
                window.location.href = androidUrl;
            }
        },false);

    });


});


