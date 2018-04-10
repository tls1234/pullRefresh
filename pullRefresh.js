function PullRefresh (option) {
	this.option = option;
	this.moveCount = 1/4; //阻力系数
	this.flag = false;
	this._init();
}
PullRefresh.prototype._init = function() {
	this.touchEvent();
}
PullRefresh.prototype.touchEvent = function() {
	var that = this;
	this.addEvent(this.option.pullContainer, 'touchstart', touchstartHandle(that));
	this.addEvent(this.option.pullContainer, 'touchmove', touchmoveHandle(that));
	this.addEvent(this.option.pullContainer, 'touchend', touchendHandle(that));
}
function touchstartHandle(that) {
	touchstart = function(e) {
		that.startY = e.touches[0].clientY;		
		that.startScrollTop = document .documentElement.scrollTop ? document .documentElement.scrollTop : document.body.scrollTop;
	}
	return touchstart;
}
function touchmoveHandle(that) {
	//缓存变量
	var container = that.option.pullContainer;
	var loadingContent = that.option.loadingContent;
	var wholePullMode = that.option.wholePullMode;
	var	loadingBoxPullMode = that.option.loadingBoxPullMode;
	var loadingBefore = that.option.loadingBefore;
	var prepareLoading = that.option.prepareLoading;
	touchmove = function (e) {
		that.flag = true;
		that.moveY = e.touches[0].clientY;
		var hascroll = that.moveY - that.startY;
		//下拉距离
		that.translateY = (hascroll - that.startScrollTop) * that.moveCount;
		if(hascroll > that.startScrollTop ){
			e.preventDefault();
			//下拉的两种模式
			if(wholePullMode) {
				container.style.transform = 'translateY('+ that.translateY +'px)';
				container.style.transition = '';
			}
			if(loadingBoxPullMode) {
				loadingContent.style.transform = 'translateY('+ that.translateY +'px)';
				loadingContent.style.transition = '';
			}
			//下拉距离小于及大于临界值执行的dom操作
			loadingBefore(that.translateY);
			prepareLoading(that.translateY);
		}
	}
	return touchmove;
}

function touchendHandle(that) {
	touchend = function (e) {
		if(that.translateY > that.option.MaxLoadingHeight && that.flag){
			that.flag = false;
			//回弹动画
			transition0(that, that.option.MaxLoadingHeight)
			//刷新操作
			that.option.loading();
			//数据请求
			that.option.ajax();
			//刷新成功及回弹动画加入异步队列，保证在数据请求之后执行
			var timer1 = setTimeout(function(){
				that.option.loaded();
				var	timer2 = setTimeout(function(){
					transition0(that, 0)
				}, 300)
			}, 700)			
		} else {
			transition0(that, 0)
		}
	}
	return touchend;
}
function transition0(that, num) {
	if(that.option.wholePullMode) {
		that.option.pullContainer.style.transform = 'translateY('+ num +'px)';
		that.option.pullContainer.style.transition = 'all ' + that.option.transitionDuration + ' ' + that.option.transitionTimingFunction;
	}
	if(that.option.loadingBoxPullMode) {
		that.option.loadingContent.style.transform = 'translateY('+ num +'px)';
		that.option.loadingContent.style.transition = 'all ' + that.option.transitionDuration + ' ' + that.option.transitionTimingFunction;
	}
}
PullRefresh.prototype.addEvent = function(el, type, fn) {
	if(window.addEventListener) {
		el.addEventListener(type, fn, false);
	} else if(el.attachEvent) {
		el.attachEvent('on' + type, fn);
	} else {
		el['on' + type] = fn;
	}
}