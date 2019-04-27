# pullRefresh.js  
pullRefresh.js 是一款下拉刷新插件，开放一些钩子函数，可以在刷新的各种状态中做一些操作，包括刷新中的动画及dom操作，另外开放下拉框的实时下拉数据，可以完全自定义自己的下拉组件，做出不同下拉动画效果。

pullRefresh.js 支持两种下拉模式，一种是整体下拉，一种是loading框下拉，如下     
demo1   https://tls1234.github.io/pullRefresh/demo1/index1.html   
demo2   https://tls1234.github.io/pullRefresh/demo2/index2.html    

# html 结构
```js
<div class="container" style="margin-top:-60px;">
		<div class="loadingContainer">
			<div class="content">
				<div class="arrowIcon"></div>
				<div class="loadingIcon" style="display:none"></div>
				<span class="text">下拉刷新</span>
			</div>
		</div>
		<ul class="list">
			<li class="item1">item1</li>
			<li class="item2">item2</li>
			<li class="item3">item3</li>
			<li class="item4">item4</li>
			<li class="item5">item5</li>
			<li class="item6">item6</li>
			<li class="item7">item7</li>
			<li class="item8">item8</li>
			<li class="item9">item9</li>
			<li class="item10">item10</li>
		</ul>
	</div>
```
## 用法  
只需要new一个 PullRefresh()对象
> new PullRefresh( ) 
## 参数  

```js
var flag1 = true;
var flag2 = true;　　　／／这两个变量为了防抖，不要更改
var pullRefresh = new PullRefresh({
			pullContainer: container,　　　　　　　　／／父元素容器节点
			loadingContent: loadingContainer,　　　／／刷新框节点
			wholePullMode: true,　　　　　　　　　　　／／整体下拉模式，如上边demo1
			loadingBoxPullMode: false,　　　　　　　　／／刷新框下拉模式，如上边demo２
			MaxLoadingHeight: 60,　　　　　　　　　　　／／下拉刷新的临界值和下拉框的高度一致
			transition: '.3s ease',　　　　　　　　　　／／回弹过渡效果
			loadingBefore: function(hasScroll) {　　／／小于刷新临界值时执行的函数，其中 hasScroll为下拉的距离，可以根据距离自定义动画效果
				if(hasScroll < 60){　　　　　　　　　　　／／小于刷新临界值时执行
					if(flag1 == true){　　　　　　　
						／／在这里执行dom操作
					}
					flag1 = false;　
					flag2 = true;
				}
			},
			prepareLoading: function(hasScroll) {　　／／大于刷新临界值时执行的函数
				if(hasScroll > 60){　　　　　　　　　　　　／／大于刷新临界值时执行
					if(flag2 == true){　　　　　　　　　　
						／／在这里执行dom操作
					}
					flag2 = false;　　
					flag1 = true;
				}
			},
			loading: function() {    //刷新  
				／／刷新时的dom操作
			},
			ajax: function() {
				／／ajax请求及插入列表
			},
			loaded: function(hasScroll) {
				／／加载完成的dom操作
			}
		})
```
