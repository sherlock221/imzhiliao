/*****************************************************
 event分 start doing stop

 dx 水平移动量，小于是向左，否则向右
 dy 垂直移动量，小于向下，否则向上

 return false可以随时停止事件callback

 config.listen 可选：
 1、a：所有方向的事件
 2、x：监听x方向的事件
 3、y：监听y方向的事件

 example:
 ------------------------------------------------------
 $('#test').touchwipe({
    listen : 'x',
    start  :  function(result){
        alert('开始触屏了');
    },
    move   : function(result){
        alert('正在滑动:'+result.dx+"____"+result.dy);
    },
    stop   : function(result){
        alert('结束了');
    }
});
 version:1.0
 copyright: http://www.mjix.com，测试页面：http://test.mjix.com
 *******************************************************/

(function($) {
    $.fn.touchwipe = function(settings) {
        var startX, startY, isMoving=false;
        var dx = 0, dy = 0; var objs = this;
        var is_y = 0;

        var config = {
            listen : 'a', //监听所有事件 ，可选 x,y
            min_distance : 6, //最小触发距离
            start : function(){},
            move : function(){},
            stop : function(){}
        };

        if (settings) $.extend(config, settings);

        var has_winphone8 = window.navigator.msPointerEnabled;
        if(has_winphone8){ //如果是winphone8
            var START_EV = 'MSPointerDown',
                MOVE_EV = 'MSPointerMove',
                END_EV = 'MSPointerOut',
                CANCEL_EV = 'MSPointerUp';
        }else{
            var has_touch = 'ontouchstart' in window;
            var START_EV = has_touch ? 'touchstart': 'mousedown',
                MOVE_EV = has_touch ? 'touchmove': 'mousemove',
                END_EV = has_touch ? 'touchend': 'mouseup',
                CANCEL_EV = has_touch ? 'touchcancel': 'mouseout';
        }

        this.each(function() {
            var startX=0, startY=0, _stime=0, _etime=0, dx=0, dy=0, speed=0, du='', dr=0;

            var _start = function(e, undf){
                dx = dy = 0; du = '';
                this.prevent = true;

                if (e.pageX !== undf || e.targetTouches || (e.touches && e.touches.length == 1)) {
                    this.moving = true;

                    var xe = e.touches || e.targetTouches || [e];
                    startX = xe[0].pageX;
                    startY = xe[0].pageY;
                    _stime = new Date().getTime();

                    config.start.call(this, {'x':startX, 'y':startY, 'dx':dx, 'dy':dy, 'du':du});
                }

                e.stopPropagation();
            };

            var _moving = function(e, undf){
                if(!this.moving) return ;

                var xe = e.touches || e.targetTouches || [e];
                dx = startX - xe[0].pageX;
                dy = startY - xe[0].pageY;
                dr = Math.abs(dy) - Math.abs(dx);

                if(du == ''){
                    du = dr>0 ? 'y' : 'x';
                }

                if(config.listen == 'a' || du == config.listen){
                    var data = {'x':xe[0].pageX, 'y':xe[0].pageY, 'dx':dx, 'dy':dy, 'du':du};
                    if(Math.abs(data['d'+du]) > config.min_distance){
                        config.move.call(this, {'x':xe[0].pageX, 'y':xe[0].pageY, 'dx':dx, 'dy':dy, 'du':du});
                    }
                    if(this.prevent){
                        e.preventDefault();
                    }
                    return ;
                }

                e.stopPropagation();
            };

            var _stop = function(e){
                if(this.moving){
                    _etime = new Date().getTime();
                    speed = Math.sqrt((dx*dx + dy*dy), 2)*1000/(_etime-_stime);
                    config.stop.call(this, {'dx':dx, 'dy':dy, 'speed':speed});
                }
                this.moving = false;
            };

            $(this).on(START_EV, _start).on(MOVE_EV, _moving)
            $(this).on(END_EV, _stop).on(CANCEL_EV, _stop);
        });

    };
})($);
