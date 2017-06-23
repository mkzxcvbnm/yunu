$.fn.imgAuto = function(co){
	function letter (fn) {
		if (typeof arguments[0] != 'function') return;
		fn();
		var times = typeof arguments[1] != 'number'?300:arguments[1];
		var timer = null;
		var st = new Date().getTime();
		return function () {
			var et = new Date().getTime();
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
	};
	$(this).each(function(){
		var t = $(this);
		var cover = t.attr('img-Auto')=='cover'||co?true:false;
		var img = new Image();
		img.src = t.attr('src');
		t.css('opacity',0);
		if (t.attr('no-Box')) {
			var box = $('<div></div>');
			box.css({
				"width":t.attr('width'),
				"height":t.attr('height'),
				"text-align":'left',
				"overflow":'hidden'
			})
			t.wrapAll(box);
		} else{
			var box = t.parent();
		};
		function move (){
			if (img.width>0 || img.height>0) {
				if ( img.width/img.height < box.width()/box.height() ) {
					if (cover) {
						t.css({'width':'100%','height':'auto','margin':0}).css('margin-top', -(t.height()-box.height())/2)
						.parent().css('overflow', 'hidden');
					}else{
						t.css({'width':'auto','height':'100%','margin':0}).css('margin-left', (box.width()-t.width())/2);
					};
				}else{
					if (cover) {
						t.css({'width':'auto','height':'100%','margin':0}).css('margin-left', -(t.width()-box.width())/2)
						.parent().css('overflow', 'hidden');
					}else{
						t.css({'width':'100%','height':'auto','margin':0}).css('margin-top', (box.height()-t.height())/2);
					};
				};
			}else{
				setTimeout(move);
			}
		};
		move();
		var throttled = letter(move);
		$(window).resize(throttled);
		t.fadeTo(2000, 1);
	});
	return this;
};