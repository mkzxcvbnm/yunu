"use strict";!function(t,i,e,o){i.yunu={letter:function(t){if("function"==typeof arguments[0]){t();var i="number"!=typeof arguments[1]?300:arguments[1],e=null,o=(new Date).getTime();return function(){var n=(new Date).getTime();n-o<i?(clearTimeout(e),e=setTimeout(function(){t()},i)):(clearTimeout(e),o=n,t())}}},throttle:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var o=arguments[2];if("function"==typeof e){switch(e(),e="function"==typeof _?_.throttle(e,300):this.letter(e,300),o){case"scroll":t(i).scroll(e);break;default:t(i).resize(e)}return this}}},t.fn.imgAuto=function(i,e){e=e||{};var o=function(t,i){"function"==typeof e[t]&&e[t](i)};return t(this).each(function(){var e=t(this),n=new Image,r=!("cover"!=e.attr("img-Auto")&&!i),a=e.attr("width"),u=e.attr("height"),h=e.attr("box-Scale"),c=void 0;e.css({display:"block",opacity:0}),n.src=e.attr("src"),!e.parent().hasClass("imgAuto_box")&&(e.attr("no-Box")||a&&u)&&((c=t('<div class="imgAuto_box"></div>')).css({width:a,height:u}),e.wrapAll(c)),(c=e.parent()).css("overflow","hidden"),h&&c.each(function(){var i=t(this);yunu.throttle(function(){i.height(i.width()/h)})});yunu.throttle(function t(){if(n.width>0||n.height>0){o("imgAutoStart",n);var i=n.width,a=n.height,u=c.width(),h=c.height();i/a<u/h===r?e.css({width:"100%",height:"auto",margin:-(u/(i/a)-h)/2+"px 0 0 0"}):e.css({width:"auto",height:"100%",margin:"0 0 0 "+-(h*(i/a)-u)/2+"px"}),o("callback",n)}else setTimeout(t)}),e.fadeTo("fast",1)}),this}}(jQuery,window,document);
//# sourceMappingURL=yunu.js.map
