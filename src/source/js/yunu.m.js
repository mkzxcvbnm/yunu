;(($, window, document, undefined) => {
    window.yunu = {
        letter(fn) {
            if (typeof arguments[0] != 'function') return;
            fn();
            let times = typeof arguments[1] != 'number'?300:arguments[1],
                timer = null,
                st = new Date().getTime();
            return function () {
                let et = new Date().getTime();
                if (et - st < times) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        //return fn.apply(this,arguments);
                        fn();
                    }, times);
                } else{
                    clearTimeout(timer);
                    st = et;
                    fn();
                };
            };
        },
        throttle(fn, timer = 300, type) {
            if (typeof fn != 'function') return;
            fn();

            typeof _ == 'function'?
            fn = _.throttle(fn, 300):
            fn = this.letter(fn, 300);

            switch (type) {
                case "scroll":
                    $(window).scroll(fn);
                    break;
                default:
                    $(window).resize(fn);
            }
            return this;
        },
        rem(size = 750) {
            let html = document.getElementsByTagName('html')[0],
                setSize = () => {
                let _w = document.documentElement.clientWidth;
                _w = _w > size ? size: _w;
                html.style.fontSize = _w/size * 100 + 'px';
            };
            setSize();
            window.onresize = setSize;
            return this;
        },
        nav() {
            let menu = $('#menu'),
                nav = $('#nav'),
                btn = $('#nav>ul>li>a').filter(function (index) {
                    return $(this).css({'animation-delay': (index/10)+'s'})
                    .next('ul').children().length;
                });
            menu.click(function () {
                nav.hasClass('active')?nav.removeClass('active'):nav.addClass('active');
            });
            btn.each(function () {
                $(this).prop('href', 'javascript:;').append('<i class="fa fa-angle-down"></i>');
            })
            .click(function (event) {
                let t = $(this);
                btn.next('ul').slideUp('fast');
                if (t.hasClass('active')) {
                    t.removeClass('active');
                } else {
                    t.addClass('active').next('ul').slideDown('fast');
                }
            });
            return this;
        },
        gotop() {
            let gotop = $("#gotop"),
                timer = null,
                px = 0,
                body = $('html,body'),
                $window = $(window);

            gotop.click(() => {
                event.stopPropagation();
                event.preventDefault();
                body.animate({
                    scrollTop: 0
                });
            });

            yunu.throttle(() => {
                $window.scrollTop() > 50?gotop.fadeIn():gotop.fadeOut();
            }, 300, 'scroll');
            return this;
        },
        //获取缓存中的数据
        getDbJson(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        //写入缓存数据
        setDbJson(key, val) {
            //记录数据存储的时间
            //val.datatime = Math.round(new Date().getTime()/1000);
            localStorage.setItem(key, JSON.stringify(val));
        },
        loadMore(config={}){
            config = $.extend(true, {
                key: true, // load开关
                url: '', // api url
                type: 'POST',
                btn: $('#load_more_btn'), // 加载更多按钮
                box: $('#list>ul'), // 加载内容的容器
                data: { // api接口配置参数
                    pages: 1,
                    limit: 5
                },
                beforeSend: ()=>{}, // 发送请求前
                done: ()=>{}, // 请求成功
                fail: ()=>{}, // 请求失败
                always: ()=>{}, // 请求完成
                load_icon: true, // 是否开启请求等待图标样式
                load_icon_class: '', // 图标尺寸样式 可选: la-sm / la-2x / la-3x
                loading: $('<div class="la-ball-fall"><div></div><div></div><div></div><div></div></div>'), // 按钮load icon元素
                load_more_none: $('<p class="load_more_none tac c_red mt20">没有了</p>') // 没有内容时显示的元素
            }, config);
            var load = function(){
                alert(config.data.pages);
                $.ajax({
                    url: config.url,
                    type: config.type,
                    data: config.data,
                    dataType: "jsonp",
                    beforeSend: function(XMLHttpRequest) {
                        config.beforeSend(XMLHttpRequest);
                        config.btn.attr('disabled',true);
                    }
                })
                .done(function(res, textStatus, XMLHttpRequest) {
                    config.done(res, textStatus, XMLHttpRequest);
                    if (!res.data.length) {
                        config.btn.replaceWith(config.load_more_none);
                    }
                })
                .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                    config.fail(XMLHttpRequest, textStatus, errorThrown);
                })
                .always(function(XMLHttpRequest, textStatus, errorThrown) {
                    config.always(XMLHttpRequest, textStatus, errorThrown);
                    config.key = true;
                    config.btn.attr('disabled',false);
                });
            }
            if (config.load_icon) {
                $(config.loading).addClass(config.load_icon_class); // 设置图标大小
                config.btn.after(config.loading); // 装载图标动画
            }
            config.btn.click(function(){
                if (!config.key) return;
                config.key = false;
                config.data.pages++;
                load();
            });
        }
    };

    yunu.rem();
    $(() => {
        yunu.nav().gotop();
    });

    $.fn.imgAuto = (co, fn) => {
        fn = fn || {};
        let fncall = (name, arg) => {
            if (typeof fn[name] === 'function') fn[name](arg);
        };
        $(this).each(() => {
            let t = $(this),
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
                box.each(() => {
                    let t = $(this);
                    yunu.throttle(() => {
                        t.height(t.width()/boxScale);
                    });
                });
            };
            let move = () => {
                if (img.width>0 || img.height>0) {
                    fncall('imgAutoStart', img);
                    let i_w = img.width,//原图宽
                        i_h = img.height,//原图高
                        b_w = box.width(),//父元素宽
                        b_h = box.height();//父元素高
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
            yunu.throttle(move);
            t.fadeTo('fast', 1);
        });
        return this;
    };
})(jQuery, window, document);
