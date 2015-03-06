/**
 * 首页js
 * @autor sherlock221b
 */


define(function (require, exports, module) {

    //暴露全局
    window.$  = require("$");
    //引入翻页
    require("full-page")($);


    //检测手机类型
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        }
    };


    //全局配置
    var  androidUrl  ="http://imzhiliao.com/zhiliao.apk";
    var iosUrl = "https://itunes.apple.com/cn/app/id948591472?mt=8";



    var UI = {
        $zhiliaoPage :  $("#zhiliaoPage"),
        $sendVoice   : $(".send-voice"),
        $sendTime   : $(".send-time"),
        $zhiliaoNav : $("#zhiliao-nav"),
        $inputWrap : $("#iphone-wrap"),
        $pointer01  : $("#pointer01"),
        $pointer0102 : $("#pointer01-02"),
        $pointer02   : $("#pointer02"),
        $type02 : $("#typing-2"),
        downHref  : $("#downHref")
    };



    var pages = UI.$zhiliaoPage.children(".section")

    //动画切换的算法
    var getPage = function(index){
        var temp;

        for(var i=0; i<pages.length;i++){
            var p =  pages[i];
            if(p.id == "page0"+index){
                temp = $(p);
                temp.addClass("animated");
            }
            else{
                $(p).removeClass("animated");
            }
        }

    }

    var toggleSlide = function(num){
        var lis  =  UI.$zhiliaoNav.find("li");
        lis.removeClass("active");
        lis.eq(num).addClass("active");
    }

    window.downFn = function(type){
        if(type =="ios"){
            window.location.href = iosUrl;
        }
        else{
            window.location.href = androidUrl;
        }


    }



    var Event = {
        init : function(){

            //初始化全屏
            UI.$zhiliaoPage.fullpage({

                navigation : true,
                navigationPosition: 'right',

                onLeave : function(){
                    console.log("leave...");
                },
                afterLoad : function(anchorLink,index){
                     getPage(index);

                     //3幅图片hack
                     if(index == "2" || index == "4"){
                         UI.$sendVoice.removeClass("send-voice-ani-02").addClass("send-voice-ani-01");
                         UI.$sendTime.removeClass("send-time-ani-02").addClass("send-time-ani-01");
                     }

                     if(index == "1" || index == "3"){
                         toggleSlide(0);
                         UI.$inputWrap.removeClass("bg-02-slide").addClass("bg-02-slide-rev");
                     }
                },
                afterRender : function(){
                    console.log("render...");
                }
            });
            UI.downHref.click(function(){
                $.fn.fullpage.moveTo(6);
            });
        }
    }



    var Ajax = {
    }


    var AnimEnd   = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd';
    var AnimStart   = 'animationstart webkitAnimationStart mozAnimationStart MSAnimationStart oAnimationStart';





    //animation
    var sendVoiceAnimation  = function(){
        console.log("set");
        UI.$sendVoice.removeClass("send-voice-ani-01")
            .addClass("send-voice-ani-02");
    }


    var sendTimeAnimation  = function(){
        console.log("执行完成...");
        UI.$sendTime.removeClass("send-time-ani-01")
            .addClass("send-time-ani-02");
    }


    //滑动animation pointer01
    var   slideAnimation = function(event){
        toggleSlide(1);
        UI.$inputWrap.removeClass("bg-02-slide-rev").addClass("bg-02-slide");

    }

    //滑动animation pointer02
    var   slideAnimation02 = function(event){
        toggleSlide(0);
        UI.$inputWrap.removeClass("bg-02-slide").addClass("bg-02-slide-rev");

    }





    UI.$sendTime.bind(AnimEnd,sendTimeAnimation);
    //第二张图片切换 第一步与第二步
    UI.$pointer01.bind(AnimEnd,slideAnimation);
    UI.$pointer0102.bind(AnimEnd,slideAnimation02);

    //第三图片点
    UI.$pointer02.bind(AnimEnd,sendVoiceAnimation);


    Event.init();
});


