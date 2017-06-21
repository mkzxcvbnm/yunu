$.fn.imgAuto = function(co, fn){
    fn = fn || {};
    var fncall = function(name, arg){
        if (typeof fn[name] === 'function') fn[name](arg);
    };
    $(this).each(function(){
        var t = $(this),
            img = new Image(),
            cover = t.attr('img-Auto') == 'cover'||co?true:false,
            _w = t.attr('width'),
            _h = t.attr('height'),
            boxScale = t.attr('box-Scale'),
            box;
        t.css({'display':'block','opacity':0});
        img.src = t.attr('src');
        if ( !t.parent().hasClass('imgAuto_box') && ( t.attr('no-Box') || _w && _h ) ) {
            box = $('<div class="imgAuto_box"></div>');
            box.css({
                "width":_w,
                "height":_h
            });
            t.wrapAll(box);
        }
        box = t.parent();
        box.css('overflow', 'hidden');
        if (boxScale) {
            box.each(function () {
                var t = $(this);
                t.height(t.width()/boxScale);
                $(window).resize(function () {
                    t.height(t.width()/boxScale);
                });
            });
        };
        function move (){
            if (img.width>0 || img.height>0) {
                fncall('imgAutoStart', img);
                var i_w = img.width;//原图宽
                var i_h = img.height;//原图高
                var b_w = box.width();//父元素宽
                var b_h = box.height();//父元素高
                if ( i_w/i_h < b_w/b_h === cover ) {
                    t.css({'width':'100%','height':'auto','margin':-(b_w / (i_w/i_h) - b_h)/2 + 'px 0 0 0'});
                }else{
                    t.css({'width':'auto','height':'100%','margin':'0 0 0 ' + -(b_h * (i_w/i_h) - b_w)/2 + 'px'});
                }
                fncall('callback', img);
            }else{
                setTimeout(move);
            }
        }
        if (typeof _ == 'function') {
            var throttled = _.throttle(move, 300);
            $(window).resize(throttled);
        }else{
            $(window).resize(move);
        }
        t.fadeTo('fast', 1);
    });
    return this;
};