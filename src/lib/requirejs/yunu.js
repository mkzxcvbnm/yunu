requirejs.config({
    paths: {
        jquery: 'jquery-1.12.4.min',
        lodash: 'lodash.min'
        //fancybox: 'lib/fancybox/js/jquery.fancybox'
        //"fancybox-thumbs": 'lib/fancybox/js/jquery.fancybox-thumbs.js'
    },
    shim: {
        '../lib/fancybox/js/jquery.fancybox': ['jquery'],
        '../lib/fancybox/js/jquery.fancybox-thumbs': ['jquery']
    }
});

requirejs([
        'jquery',
        'lodash',
        '../lib/fancybox/js/jquery.fancybox',
        '../lib/fancybox/js/jquery.fancybox-thumbs'
    ], function ($, _, fancybox){
        $('.fancybox-thumbs').fancybox({
            prevEffect : 'elastic',//动画切换效果 'elastic'左右渐入, 'fade'透明变化 or 'none'
            nextEffect : 'elastic',
            closeBtn  : true,//显示关闭按钮
            arrows    : true,//显示左右箭头
            nextClick : true,//显示切换按钮
            autoPlay  : false,//自动播放
            playSpeed : 3000,//幻灯片速度
            helpers : {
                thumbs : {
                    width  : 80,
                    height : 80
                }
            }
        });
});