/**
 * 首页js
 */


define(function (require, exports, module) {

    //暴露全局
    window.$  = require("$");

    //引入翻页
    require("full-page")($);

    var UI = {
        $zhiliaoPage :  $("#zhiliaoPage")
    };

    var Event = {
        init : function(){

            //初始化全屏
            UI.$zhiliaoPage.fullpage({

                navigation : true,
                navigationPosition: 'right',

                onLeave : function(){
                    //console.log("leave...");
                }

            });

        }
    }



    var Ajax = {

    }

    Event.init();
});


