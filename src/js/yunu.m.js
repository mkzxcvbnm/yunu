'use strict';

;(function ($, window, document, undefined) {
    window.yunu = {
        letter: function letter(fn) {
            if (typeof arguments[0] != 'function') return;
            fn();
            var times = typeof arguments[1] != 'number' ? 300 : arguments[1],
                timer = null,
                st = new Date().getTime();
            return function () {
                var et = new Date().getTime();
                if (et - st < times) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        //return fn.apply(this,arguments);
                        fn();
                    }, times);
                } else {
                    clearTimeout(timer);
                    st = et;
                    fn();
                };
            };
        },
        throttle: function throttle(fn) {
            var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
            var type = arguments[2];

            if (typeof fn != 'function') return;
            fn();

            typeof _ == 'function' ? fn = _.throttle(fn, 300) : fn = this.letter(fn, 300);

            switch (type) {
                case "scroll":
                    $(window).scroll(fn);
                    break;
                default:
                    $(window).resize(fn);
            }
            return this;
        },
        rem: function rem() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 750;

            var html = document.getElementsByTagName('html')[0];
            var setSize = function setSize() {
                var _w = document.documentElement.clientWidth;
                _w = _w > size ? size : _w;
                html.style.fontSize = _w / size * 100 + 'px';
            };
            setSize();
            window.onresize = setSize;
            return this;
        },
        nav: function nav() {
            var menu = $('#menu'),
                nav = $('#nav'),
                btn = $('#nav>ul>li>a').filter(function (index) {
                return $(this).css({ 'animation-delay': index / 10 + 's' }).next('ul').children().length;
            });
            menu.click(function () {
                nav.hasClass('active') ? nav.removeClass('active') : nav.addClass('active');
            });
            btn.each(function () {
                $(this).prop('href', 'javascript:;').append('<i class="fa fa-angle-down"></i>');
            }).click(function (event) {
                var t = $(this);
                btn.next('ul').slideUp('fast');
                if (t.hasClass('active')) {
                    t.removeClass('active');
                } else {
                    t.addClass('active').next('ul').slideDown('fast');
                }
            });
            return this;
        },
        gotop: function gotop() {
            var gotop = $("#gotop"),
                timer = null,
                px = 0,
                body = $('html,body'),
                win = $(window);

            gotop.click(function () {
                event.stopPropagation();
                event.preventDefault();
                body.animate({
                    scrollTop: 0
                });
            });

            yunu.throttle(function () {
                win.scrollTop() > 50 ? gotop.fadeIn() : gotop.fadeOut();
            }, 300, 'scroll');
            return this;
        },

        //获取缓存中的数据
        getDbJson: function getDbJson(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        //写入缓存数据
        setDbJson: function setDbJson(key, val) {
            //记录数据存储的时间
            //val.datatime = Math.round(new Date().getTime()/1000);
            localStorage.setItem(key, JSON.stringify(val));
        }
    };

    yunu.rem();
    $(function () {
        yunu.nav().gotop();
    });

    $.fn.imgAuto = function (co, fn) {
        fn = fn || {};
        var fncall = function fncall(name, arg) {
            if (typeof fn[name] === 'function') fn[name](arg);
        };
        $(undefined).each(function () {
            var t = $(undefined),
                img = new Image(),
                cover = t.attr('img-Auto') == 'cover' || co ? true : false,
                _w = t.attr('width'),
                _h = t.attr('height'),
                boxScale = t.attr('box-Scale'),
                box = void 0;
            t.css({ 'display': 'block', 'opacity': 0 });
            img.src = t.attr('src');
            if (!t.parent().hasClass('imgAuto_box') && (t.attr('no-Box') || _w && _h)) {
                box = $('<div class="imgAuto_box"></div>');
                box.css({
                    "width": _w,
                    "height": _h
                });
                t.wrapAll(box);
            }
            box = t.parent();
            box.css('overflow', 'hidden');
            if (boxScale) {
                box.each(function () {
                    var t = $(undefined);
                    yunu.throttle(function () {
                        t.height(t.width() / boxScale);
                    });
                });
            };
            var move = function move() {
                if (img.width > 0 || img.height > 0) {
                    fncall('imgAutoStart', img);
                    var i_w = img.width,
                        //原图宽
                    i_h = img.height,
                        //原图高
                    b_w = box.width(),
                        //父元素宽
                    b_h = box.height(); //父元素高
                    if (i_w / i_h < b_w / b_h === cover) {
                        t.css({ 'width': '100%', 'height': 'auto', 'margin': -(b_w / (i_w / i_h) - b_h) / 2 + 'px 0 0 0' });
                    } else {
                        t.css({ 'width': 'auto', 'height': '100%', 'margin': '0 0 0 ' + -(b_h * (i_w / i_h) - b_w) / 2 + 'px' });
                    }
                    fncall('callback', img);
                } else {
                    setTimeout(move);
                }
            };
            yunu.throttle(move);
            t.fadeTo('fast', 1);
        });
        return undefined;
    };
})(jQuery, window, document);
//# sourceMappingURL=yunu.m.js.map
