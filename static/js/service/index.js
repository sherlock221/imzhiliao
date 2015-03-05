/**
 * 首页js
 * @autor sherlock221b
 */


define(function (require, exports, module) {

    //暴露全局
    window.$  = require("$");

    //引入翻页
    require("full-page")($);

    var UI = {
        $zhiliaoPage :  $("#zhiliaoPage")
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


    var Event = {
        init : function(){

            //初始化全屏
            UI.$zhiliaoPage.fullpage({

                navigation : true,
                navigationPosition: 'right',

                onLeave : function(){
//                    console.log("leave...");
                },
                afterLoad : function(anchorLink,index){
                     getPage(index);
                }
            });

        }
    }



    var Ajax = {

    }

    Event.init();
});


