---
title: imooc-blog项目开发-下(uniapp)
tags:
  - 小程序
  - Vue
  - uniapp
categories:
  - 慕课网
  - 项目开发
abbrlink: 320d3645
date: 2021-10-30 21:05:05
---

## 文章详情 - 点击进入文章详情页面

1. 在 `subpkg/pages` 下创建 **文章详情页面** `blog-detail`（注意会有bug，导致blog-detail被创建到 pages同级目录）

2. 修改根目录下的 pages.json

```json
{
    ...
    "subPackages": [
        {
            "root": "subpkg",
            "name": "sub-1",
            "pages": [
                ...
                {
                    "path": "pages/blog-detail/blog-detail",
                    "style": {
                        "navigationBarTitleText": "文章详情"
                    }
                }
            ]
        }
    ]
}
```

3. 为首页的数据添加跳转

**`hot-list-item.vue`**

```html
<template>
	<view class="item-container" @click="$emit('click')">
        ...
	</view>
</template>
```

**`hot.vue`**

```html
<template>
	...
	<view class="hot-container">
		<swiper
			class="swiper"
			:current="currentIndex"
			:style="{ height: currentSwiperHeight + 'px' }"
			@animationfinish="onSwiperEnd"
			@change="onSwiperChange"
		>
			<!-- swiperItem 的数量，需要由 tabData 进行决定 -->
			<swiper-item
				class="swiper-item"
				v-for="(tabItem, tabIndex) in tabData"
				:key="tabIndex"
			>
				<view>
					<!-- 加载动画 -->
					<uni-load-more status="loading" v-if="isLoading" />
					<!-- 列表 -->
					<block v-else>
						<!-- 列表循环数据的索引值由currentIndex 改为 tabIndex -->
						<hot-list-item
							:class="'hot-list-item-' + tabIndex"
							v-for="(item, index) in listData[tabIndex]"
							:key="index"
							:data="item"
							:ranking="index + 1"
							@click="onItemClick(item)"
						>
						</hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 热搜列表 item 点击事件
		 */
		onItemClick(item) {
			uni.navigateTo({ url: "/subpkg/pages/blog-detail/blog-detail" });
		},
	},
};
```

<div class="success">

> 此处同时也可以将hot中的@click改为@click.native。这样就不需要再在子组件中定义事件。

</div>

4. 为搜索结果添加跳转

**`search-result-list.vue`**

```html
<template>
	<view class="search-result-list-container">
        ...
		<mescroll-body
			v-else
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<block v-for="(item, index) in resultList" :key="index">
				<view class="search-result-item-box" @click="onItemClick(item)">
					<search-result-item-theme-1
						v-if="!item.pic_list || item.pic_list.length === 0"
						:data="item"
					/>
					<search-result-item-theme-2
						v-else-if="item.pic_list.length === 1"
						:data="item"
					/>
					<search-result-item-theme-3 v-else :data="item" />
				</view>
			</block>
		</mescroll-body>
	</view>
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * item 点击事件
		 */
		onItemClick(item) {
			uni.navigateTo({ url: "/subpkg/pages/blog-detail/blog-detail" });
		},
	},
};
```

## 文章详情 - 获取文章详情数据

查看**接口文档** 我们知道，想要获取文章详情需要传递两个参数：

1. `author`：作者名
2. `articleId`：文章 id

这两个参数需要在 **跳转到文章详情页面时进行传递** ，所以我们需要修改下 `navigateTo` 的方法：

**`search-result-list.vue`**

```html
<script>
export default {
	methods: {
		/**
		 * item 点击事件
		 */
		onItemClick(item) {
			uni.navigateTo({
				url: `/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`,
			});
		},
	},
};
</script>
```

**`hot.vue`**

```html
<script>
export default {
	methods: {
		/**
		 * 热搜列表 item 点击事件
		 */
		onItemClick(item) {
			uni.navigateTo({
				url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`,
			});
		},
	},
};
</script>
```

修改完后，进行接口请求：

**`api/article.js`**

```javascript
import request from '../utils/request'

/**
 * 获取文章详情
 */
export function getArticleDetail(data) {
    return request({
        url: '/article/details',
        data
    })
}
```

**`blog-detail.vue`**

```html
<script>
import { getArticleDetail } from "api/article";
export default {
	data() {
		return {
			// 作者名
			author: "",
			// 文章 id
			articleId: "",
			// 文章详情
			articleData: null,
		};
	},
	onLoad(options) {
		this.author = options.author;
		this.articleId = options.articleId;
		this.loadArticleDetail();
		// console.log(this.author);
		// console.log(this.articleId);
	},
	methods: {
		/**
		 * 获取文章详情数据
		 */
		async loadArticleDetail() {
			// 展示一个加载框
			uni.showLoading({
				title: "加载中",
			});
			const { data: res } = await getArticleDetail({
				author: this.author,
				articleId: this.articleId,
			});
			this.articleData = res.data;
		},
	},
};
</script>
```

**`utils/request.js`**

```javascript
function request({ url, data, method }) {
    return new Promise((resolve, reject) => {
        uni.request({
            ...
            // 请求结束之后的回调
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}
export default request
```

## 文章详情 - 分析并渲染文章详情的基本结构

整个文章详情可以被分为三个部分实现：

1. 文章内容区
2. 评论列表区
3. 底部功能区

我们先来实现  **文章内容区**：

```html
<template>
	<view class="detail-container">
		<!-- 文章内容区 -->
		<block>
			<!-- 标题 -->
			<view class="title">{{ aticleData.articleTitles }}</view>
			<!-- 作者信息 -->
			<view class="detail-info">
				<view class="detail-left">
					<view class="avatar-box">
						<!-- 头像 -->
						<image class="avatar" :src="articleData.avatar" />
					</view>
					<view class="author-box">
						<!-- 作者 -->
						<text class="author">{{ articleData.nickName }}</text>
						<!-- 发布时间 -->
						<text class="release-time">{{ articleData.date }}</text>
					</view>
				</view>
				<view class="detail-right">
					<!-- 关注按钮 -->
					<button class="follow" size="mini">关注</button>
				</view>
			</view>
			<!-- 文章内容 -->
			<rich-text :nodes="articleData.content"></rich-text>
		</block>
	</view>
</template>
```

## 文章内容 - 美化文章内容区域

**`blog-detail.vue`**

```html
<style lang="scss">
.detail-container {
	padding: $uni-spacing-col-base $uni-spacing-row-base;
	.title {
		font-size: $uni-font-size-title;
		color: $uni-text-color-title;
		font-weight: bold;
	}
	.detail-info {
		padding: $uni-spacing-col-base 0;
		display: flex;
		justify-content: space-between;
		.detail-left {
			display: flex;
			.author-box {
				margin-left: $uni-spacing-row-base;
				display: flex;
				flex-direction: column;
				.author {
					font-size: $uni-font-size-base;
					font-weight: bold;
					color: $uni-text-color-title;
				}
				.release-time {
					font-size: $uni-spacing-row-sm;
					color: $uni-text-color-grey;
				}
			}
		}
		.detail-right {
			display: flex;
			align-items: center;
		}
	}
}
</style>
```

**`global.scss`**

```scss
// 头像
.avatar{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #e5e5e5;
}
```

## 文章内容 - 分析文章内容的样式实现

目前我们虽然已经完成了基本的 `html` 和 `css` ，但是我们可以发现，现在的 **文章内容** 部分与完成之后的项目差距其实挺大的。那么怎么解决这个问题呢？

想要解决这个问题，我们需要先明确一点：**所有和样式相关的问题，都需要通过 `css` 进行解决！**

明确了这点之后，我们就知道，想要解决这个问题，那么还是必须要从 `css` 进行着手。

回忆一下我们之前解决 **搜索结果高亮关键字的功能**，我们知道 对于 `rich-text` 来说，它并不会把 **富文本** 渲染为真实 `DOM` ，放入到 `DOM` 中，所以我们如果直接通过 `css` 指定样式，那么是没有效果的。

所以我们当时通过了 **行内样式** 的形式进行了 **高亮文本的展示**。

但是这样的一种方案，放入到我们当前的场景中是否合适呢？

答案是：**不合适的**。

因为对于 **文章内容** 来说，它涉及到了非常多的 `html标签`，每个 `html 标签` 设计到的样式也非常复杂，如果我们还期望通过 **行内样式** 来去解决的话，那么未免 **太不现实** 了。

可行方案：

1. 把包含 `html` 的富文本，转化为 **小程序可识别的 元素 进行展示**
2. 获取网络中现有的，用来处理文章详情的 `css`，对该 `css` 进行改造
3. 为每个元素添加对应的类名，使其可拥有更完美的样式

通过以上三步即可实现。

## 文章内容 - 实现文章内容的样式渲染

在上一章中我们明确了 **文章内容样式渲染的实现方案**，一共分为三步：

1. 把包含 `html` 的富文本，转化为 **小程序可识别的 元素 进行展示**
2. 获取网络中现有的，用来处理文章详情的 `css`，对该 `css` 进行改造
3. 为每个元素添加对应的类名，使其可拥有更完美的样式

那么这一章节，我们就一步一步来进行实现。

**1：把包含 `html` 的富文本，转化为 小程序可识别的 元素 进行展示**

想要实现这个功能，我们需要借助一个现有的第三方库 [mp-html](https://ext.dcloud.net.cn/plugin?id=805) 

 [mp-html](https://ext.dcloud.net.cn/plugin?id=805) 是一个专门用来解决 **富文本渲染的一个库** ，它的解决方案就是 **把包含 `html` 的富文本，转化为 小程序可识别的 元素 进行展示**，正好符合我们的需求。

导入并使用 [mp-html](https://ext.dcloud.net.cn/plugin?id=805) ：

1. 点击进入 [mp-html](https://ext.dcloud.net.cn/plugin?id=805)，点击 **使用 `HBuilderX 导入插件`**
2. 在 `blog-detail` 中导入组件，并使用

```html
<template>
	<view class="detail-container">
		<!-- 文章内容区 -->
		<!-- 由于获取文章内容是异步的，此处确保文章有内容在渲染，否则会报错 -->
		<block v-if="articleData">	
			<!-- 文章内容 -->
			<mp-html
				class="markdown_views"
				:content="addClassFromHtml(articleData.content)"
				scroll-table
			></mp-html>
		</block>
	</view>
</template>
```

通过 **微信小程序** 查看渲染之后的 `DOM` 树，可以发现所有的 **富文本** 已经被真实渲染了。



**2：获取网络中现有的，用来处理文章详情的 `css`，对该 `css` 进行改造**

那么现在，我们就只需要增加对应的 `css` 样式就可以了。那么 `css` 样式从哪里来呢？

获取 `css` 的样式大家可以直接从：[theme](https://theme.typora.io/) 网站去进行下载，然后进行导入：

1. 下载对应的 css 压缩包

2. 在 `styles` 中新建 `article-detail.scss` 文件

3. 复制下载的 `css` 到 样式文件

4. 在 `blog-detail.vue` 中导入 `css`

```scss
<style lang="scss">
@import "~@/styles/article-detail.scss";
</style>
```

**3：为每个元素添加对应的类名，使其可拥有更完美的样式**

现在虽然 `DOM` 虽然已经被渲染出来了，但是其实现在距离我们最终的样式还是又一些差距的。

因为在导入的 `css` 中，很多的样式都是根据 `p` 标签，`span` 标签 这样的，标签选择器进行的样式指定，而我们被渲染出来的 `dom` 是不包含这些选择器的，所以我们需要给不同的标签增加不同的类名，然后修改对应的 `css` 使其可以通过 **类名选择器** 覆盖样式。

**为 `dom` 增加类名**

想要添加类名比较简单，我们可以直接通过 **正则进行选取替换：**

```html
<template>
  <view class="detail-container">
    <!-- 文章内容区域 -->
    <block v-if="articleData">
      ...
      <!-- 文章内容 -->
      <mp-html
        // 必须为 mp-html 增加 markdown_views 的类名
        class="markdown_views"
        :content="addClassFromHTML(articleData.content)"
        scroll-table
      />
    </block>
  </view>
</template>

<script>
export default {
 ...
  methods: {
    /**
     * 为所有的 DOM 增加类名
     */
    addClassFromHTML(info) {
      // 先替换 blockquote
      return info.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">');
    },
...
  }
};
</script>

```

现在查看 `DOM` 结构，我们就可以发现，在部分被渲染为 `view` 组件的元素上，已经多了一个 `class` 为 `blockquote-cls` 了。

**为 `css` 修改类名选择器**

在 `css` 文件中，全局搜索 `blockquote` ，将其修改为 `.blockquote-cls`。

即可发现样式已经被渲染成功了：

![](imooc-blog项目开发-下(uniapp)/2.jpg)

接下来我们就可以为 **所有的标签增加类名** ，同时为 **`css` 修改对应的样式**

```js
addClassFromHTML(info) {
      return info
        .replace(/<p>/gi, '<p class="p-cls">')
        .replace(/<a>/gi, '<a class="a-cls">')
        .replace(/<h1>/gi, '<h1 class="h1-cls">')
        .replace(/<h2>/gi, '<h2 class="h2-cls">')
        .replace(/<h3>/gi, '<h3 class="h3-cls">')
        .replace(/<h4>/gi, '<h4 class="h4-cls">')
        .replace(/<h5>/gi, '<h5 class="h5-cls">')
        .replace(/<h6>/gi, '<h6 class="h6-cls">')
        .replace(/<ul>/gi, '<ul class="ul-cls">')
        .replace(/<li>/gi, '<li class="li-cls">')
        .replace(/<ol>/gi, '<ol class="ol-cls">')
        .replace(/<td>/gi, '<td class="td-cls">')
        .replace(/<th>/gi, '<th class="th-cls">')
        .replace(/<tr>/gi, '<tr class="tr-cls">')
        .replace(/<dl>/gi, '<dl class="dl-cls">')
        .replace(/<dd>/gi, '<dd class="dd-cls">')
        .replace(/<hr>/gi, '<hr class="hr-cls">')
        .replace(/<pre>/gi, '<pre class="pre-cls">')
        .replace(/<strong>/gi, '<strong class="strong-cls">')
        .replace(/<input>/gi, '<input class="input-cls">')
        .replace(/<table>/gi, '<table class="table-cls">')
        .replace(/<details>/gi, '<details class="details-cls">')
        .replace(/<code>/gi, '<code class="code-cls">')
        .replace(/<kbd>/gi, '<kbd class="kbd-cls">')
        .replace(/<summary>/gi, '<summary class="summary-cls">')
        .replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
        .replace(/<img/gi, '<img class="img-cls"');
    }
```

 

```css
html {
  font-size: 52px;
}
body {
  font-size: 16px;
}
.markdown_views {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    WenQuanYi Micro Hei, sans-serif, SimHei, SimSun;
  font-size: 16px;
  width: 710rpx;
  overflow-x: hidden;
}
.markdown_views .p-cls {
  font-size: 0.32rem;
  color: #4f4f4f;
  font-weight: normal;
  line-height: 0.52rem;
  margin: 0 0 0.32rem 0;
}
.markdown_views .strong-cls {
  font-weight: bold;
}
.markdown_views i,
cite,
em,
var,
address,
dfn {
  font-style: italic;
}
.markdown_views * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#content_views.night .h1-cls,
#content_views.night .h2-cls,
#content_views.night .h3-cls,
#content_views.night .h4-cls,
#content_views.night .h5-cls,
#content_views.night .h6-cls {
  color: #4f4f4f;
  margin-top: 0 !important;
  font-weight: bold;
}
.markdown_views .ul-cls,
.markdown_views .ol-cls {
  margin: 0 0 0.48rem 0;
  padding: 0;
}
.markdown_views .ul-cls .ol-cls {
  margin: 0 0 0.48rem 0.64rem;
}
.markdown_views .ul-cls .li-cls {
  list-style-type: disc;
  margin: 0.16rem 0 0 0.64rem;
}
.markdown_views .ol-cls .li-cls {
  list-style-type: decimal;
  margin-left: 0.8rem;
  margin-top: 0.16rem;
}
.markdown_views .img-cls {
  max-width: 100%;
  vertical-align: baseline;
}
html .htmledit_views .h1-cls,
html .markdown_views .h1-cls {
  font-size: 0.4rem;
  line-height: 0.6rem;
}
html .htmledit_views .h2-cls,
html .markdown_views .h2-cls {
  font-size: 0.38rem;
  line-height: 0.6rem;
}
html .htmledit_views .h3-cls,
html .markdown_views .h3-cls {
  font-size: 0.36rem;
  line-height: 0.6rem;
}
html .htmledit_views .h4-cls,
html .markdown_views .h4-cls {
  font-size: 0.34rem;
  line-height: 0.54rem;
}
html .htmledit_views .h5-cls,
html .markdown_views .h5-cls {
  font-size: 0.32rem;
  line-height: 0.54rem;
}
html .htmledit_views .h6-cls,
html .markdown_views .h6-cls {
  font-size: 0.3rem;
  line-height: 0.54rem;
}
.markdown_views .h1-cls .code-cls {
  font-size: 0.56rem;
}
.markdown_views .h2-cls .code-cls {
  font-size: 0.48rem;
}
.markdown_views .h3-cls .code-cls {
  font-size: 0.44rem;
}
.markdown_views .h4-cls .code-cls {
  font-size: 0.4rem;
}
.markdown_views .h5-cls .code-cls {
  font-size: 0.36rem;
}
.markdown_views .h6-cls .code-cls {
  font-size: 0.32rem;
}
.markdown_views .blockquote-cls {
  display: block;
  padding: 0.32rem;
  margin: 0 0 0.48rem 0;
  border-left: 0.16rem solid #dddfe4;
  background: #eef0f4;
  overflow: auto;
  overflow-scrolling: touch;
  word-wrap: break-word;
}
.markdown_views .blockquote-cls .ul-cls,
.markdown_views .blockquote-cls .ol-cls {
  margin-bottom: 0;
  padding: 0;
  font-size: 0.28rem;
  line-height: 0.44rem;
}
.markdown_views .blockquote-cls .ul-cls .li-cls {
  margin-bottom: 0;
}
.markdown_views .blockquote-cls .ol-cls .li-cls {
  margin-bottom: 0;
}
.markdown_views .blockquote-cls p {
  font-size: 0.28rem;
  line-height: 0.44rem;
  color: #999;
  font-weight: normal;
  margin-bottom: 0;
}
.markdown_views .hr-cls {
  margin: 0.48rem 0;
  border: none;
  border-bottom: solid #ddd 0.02rem;
}
.markdown_views tbody {
  border: 0;
}
.markdown_views .table-cls .tr-cls {
  border: 0;
  border-top: 0.02rem solid #ddd;
  background-color: #fff;
}
.table-box {
  max-width: 100%;
  overflow-x: auto;
}
.markdown_views .table-cls {
  border-collapse: collapse;
  display: table;
  width: 100%;
  text-align: center;
  margin-bottom: 0.48rem;
}
.markdown_views tbody {
  border: 0;
}
.markdown_views .table-cls .tr-cls:nth-child(2n) {
  background-color: #f7f7f7;
}
.markdown_views .table-cls .tr-cls .th-cls,
.markdown_views .table-cls .tr-cls .td-cls {
  font-size: 0.24rem !important;
  color: #4f4f4f;
  line-height: 0.44rem;
  border: 0.02rem solid #ddd;
  padding: 0.16rem 0.16rem;
  text-align: left;
  word-break: normal;
  vertical-align: middle;
}
.markdown_views .table-cls .tr-cls .th-cls .code-cls,
.markdown_views .table-cls .tr-cls .td-cls .code-cls {
  white-space: normal;
  word-wrap: break-word;
}
.markdown_views .table-cls .tr-cls .th-cls {
  font-weight: bold;
  background-color: #eff3f5;
}
.markdown_views .dl-cls {
  margin: 0.48rem;
}
.markdown_views .dl-cls .dt-cls {
  margin: 0.16rem;
  font-weight: bold;
}
.markdown_views .dl-cls .dt-cls .dd-cls {
  margin: 0.16rem;
}
.markdown_views abbr[title],
.markdown_views abbr[data-original-title] {
  cursor: help;
  border-bottom: 0.02rem dotted #999;
}
.markdown_views .initialism {
  font-size: 90%;
  text-transform: uppercase;
}
.markdown_views .pre-cls {
  margin-bottom: 0.48rem;
  background-color: #282c34;
  color: #fff;
  width: 100%;
  overflow-x: scroll;
  padding: 4px 8px;
}
.markdown_views .a-cls {
  color: #4ea1db;
  text-decoration: none;
}
.markdown_views .a-cls:hover,
.markdown_views .a-cls:focus {
  color: #ca0c16;
}
.markdown_views .a-cls:visited {
  color: #6795b5;
}
.markdown_views .footnote {
  vertical-align: top;
  position: relative;
  top: -0.08rem;
  font-size: 0.24rem;
}
.markdown_views .footnotes .ol-cls .li-cls {
  font-size: 0.28rem;
  line-height: 0.44rem;
  margin: 0 0 0.16rem 0.48rem;
}
.markdown_views .sequence-diagram,
.markdown_views .flow-chart {
  text-align: center;
  margin-bottom: 0.48rem;
}
.markdown_views .sequence-diagram,
.markdown_views .flow-chart {
  text-align: center;
  margin-bottom: 0.48rem;
  font-size: 0.28rem !important;
}
.markdown_views .sequence-diagram [fill='#000'],
.markdown_views .flow-chart [fill='#000'],
.markdown_views .sequence-diagram [fill='#000000'],
.markdown_views .flow-chart [fill='#000000'],
.markdown_views .sequence-diagram [fill='black'],
.markdown_views .flow-chart [fill='black'] {
  fill: #4f4f4f;
}
.markdown_views .sequence-diagram [stroke='#000000'],
.markdown_views .flow-chart [stroke='#000000'] {
  stroke: #4f4f4f;
}
.markdown_views .MathJax_SVG_Display {
  text-align: center;
  margin: 0.48rem 0;
  font-size: 0.36rem;
  font-weight: 400;
  color: #4f4f4f;
  position: relative;
  text-indent: 0;
  max-width: none;
  max-height: none;
  min-width: 0;
  min-height: 0;
  width: 100%;
}
.markdown_views .toc {
  font-size: 0.32rem;
  line-height: 0.48rem;
  margin: 0 0 0.48rem 0;
  padding: 0;
}
.markdown_views .toc .ul-cls {
  margin: 0 0 0.16rem 0;
  padding: 0;
}
.markdown_views .toc .ul-cls .li-cls {
  list-style-type: none;
  margin: 0.16rem 0 0 0.48rem;
}
.markdown_views .pre-numbering .li-cls {
  padding: 0 0.16rem;
  list-style: none;
  margin: 0;
}
.markdown_views .dl-cls .dd-cls {
  margin: 0 0 0.16rem 0.8rem;
}
.markdown_views .kbd-cls {
  padding: 0.04rem 0.16rem;
  border: 0.02rem solid rgba(63, 63, 63, 0.25);
  -webkit-box-shadow: 0 0.02rem 0 rgba(63, 63, 63, 0.25);
  box-shadow: 0 0.02rem 0 rgba(63, 63, 63, 0.25);
  background-color: #fff;
  color: #333;
  border-radius: 0.08rem;
  display: inline-block;
  margin: 0 0.04rem;
  white-space: nowrap;
}
.markdown_views mark {
  color: #555963;
}
.markdown_views .katex-display,
.markdown_views .MathJax_Display {
  overflow-y: hidden;
  overflow-x: auto;
}
.markdown_views .pre-cls .code-cls {
  display: block;
  font-size: 14px;
  line-height: 22px;
  overflow-x: auto;
  padding: 0 !important;
  color: #000;
  white-space: pre;
  word-wrap: normal;
  word-break: normal !important;
  background-color: #f6f8fa;
  border-radius: 4px;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .markdown_views .pre-cls .code-cls {
    min-width: 94%;
  }
}
.markdown_views .pre-cls.prettyprint,
.markdown_views .prettyprint {
  margin: 0 0 24px 0;
  padding: 8px 16px 6px 56px;
  background-color: #f6f8fa;
  border: none;
}
.prettyprint {
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
}
.markdown_views .prettyprint .pre-numbering {
  position: absolute;
  width: 48px;
  background-color: #eef0f4;
  top: 0;
  left: 0;
  margin: 0;
  padding: 10px 0 8px;
  list-style: none;
  text-align: right;
}
.markdown_views .pre-numbering .li-cls {
  padding: 0 8px;
  list-style: none;
  margin: 0;
}
.markdown_views.prism-atom-one-dark .pre-cls .code-cls {
  background-color: #282c34;
  color: #abb2bf;
}
.markdown_views.prism-atom-one-dark .pre-cls .code-cls.hljs * {
  color: #abb2bf;
}
.markdown_views.prism-atom-one-dark .prettyprint,
.markdown_views.prism-atom-one-dark .pre-cls.prettyprint {
  background-color: #282c34;
}
.markdown_views.prism-atom-one-dark .prettyprint .pre-numbering {
  background-color: #282c34;
}
.markdown_views.prism-atom-one-dark .pre-numbering .li-cls {
  color: #abb2bf !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-atom-one-light .pre-cls .code-cls {
  background-color: #fafafa;
}
.markdown_views.prism-atom-one-light .prettyprint,
.markdown_views.prism-atom-one-light .pre-cls.prettyprint {
  background-color: #fafafa;
}
.markdown_views.prism-atom-one-light .prettyprint .pre-numbering {
  background-color: #fafafa;
}
.markdown_views.prism-atom-one-light .pre-numbering .li-cls {
  color: #383a42 !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-tomorrow-night .pre-cls .code-cls {
  background-color: #1d1f21;
  color: #c5c8c6;
}
.markdown_views.prism-tomorrow-night .pre-cls .code-cls.hljs * {
  color: #c5c8c6;
}
.markdown_views.prism-tomorrow-night .prettyprint,
.markdown_views.prism-tomorrow-night .pre-cls.prettyprint {
  background-color: #1d1f21;
}
.markdown_views.prism-tomorrow-night .prettyprint .pre-numbering {
  background-color: #1d1f21;
}
.markdown_views.prism-tomorrow-night .pre-numbering .li-cls {
  color: #c5c8c6 !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-dracula .pre-cls .code-cls {
  background-color: #282a36;
  color: #f8f8f2;
}
.markdown_views.prism-dracula .pre-cls .code-cls.hljs * {
  color: #f8f8f2;
}
.markdown_views.prism-dracula .prettyprint,
.markdown_views.prism-dracula .pre-cls.prettyprint {
  background-color: #282a36;
}
.markdown_views.prism-dracula .prettyprint .pre-numbering {
  background-color: #282a36;
}
.markdown_views.prism-dracula .pre-numbering .li-cls {
  color: #f8f8f2 !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-github-gist .pre-cls .code-cls {
  background-color: #f3f4f5;
}
.markdown_views.prism-github-gist .prettyprint,
.markdown_views.prism-github-gist .pre-cls.prettyprint {
  background-color: #f3f4f5;
}
.markdown_views.prism-github-gist .prettyprint .pre-numbering {
  background-color: #f3f4f5;
}
.markdown_views.prism-github-gist .prettyprint .prism {
  background-color: #f3f4f5;
}
.markdown_views.prism-github-gist .pre-numbering .li-cls {
  color: #5e6687 !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-kimbie-light .pre-cls .code-cls {
  background-color: #fbebd4;
}
.markdown_views.prism-kimbie-light .prettyprint,
.markdown_views.prism-kimbie-light .pre-cls.prettyprint {
  background-color: #fbebd4;
}
.markdown_views.prism-kimbie-light .prettyprint .pre-numbering {
  background-color: #fbebd4;
}
.markdown_views.prism-kimbie-light .pre-numbering .li-cls {
  color: #84613d !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-tomorrow-night-eighties .pre-cls .code-cls {
  background-color: #2d2d2d;
  color: #ccc;
}
.markdown_views.prism-tomorrow-night-eighties .pre-cls .code-cls.hljs * {
  color: #ccc;
}
.markdown_views.prism-tomorrow-night-eighties .prettyprint,
.markdown_views.prism-tomorrow-night-eighties .pre-cls.prettyprint {
  background-color: #2d2d2d;
}
.markdown_views.prism-tomorrow-night-eighties .prettyprint .pre-numbering {
  background-color: #2d2d2d;
}
.markdown_views.prism-tomorrow-night-eighties .pre-numbering .li-cls {
  color: #ccc !important;
  border-right: 1px solid #c5c5c5;
}
.markdown_views.prism-atelier-sulphurpool-light .pre-cls .code-cls {
  background-color: #f5f7ff;
}
.markdown_views.prism-atelier-sulphurpool-light .prettyprint,
.markdown_views.prism-atelier-sulphurpool-light .pre-cls.prettyprint {
  background-color: #f5f7ff;
}
.markdown_views.prism-atelier-sulphurpool-light .prettyprint .pre-numbering {
  background-color: #f5f7ff;
}
.markdown_views.prism-atelier-sulphurpool-light .pre-numbering .li-cls {
  color: #5e6687 !important;
  border-right: 1px solid #c5c5c5;
}
html body.night-body,
.night {
  background-color: #2a2d33;
}
html body.night-body .img-cls.mathcode {
  -webkit-filter: invert(1);
  filter: invert(1);
}
.night .h1-cls,
.night .h2-cls,
.night .h3-cls,
.night .h4-cls,
.night .h5-cls,
.night .h6-cls,
.night p,
.night p span,
.night .li-cls,
.night .dl-cls,
.night .dt-cls,
.night .dd-cls,
.night .strong-cls,
.night .table-cls,
.night .table-cls .tr-cls,
.night .table-cls .tr-cls .th-cls,
.night .table-cls .tr-cls .td-cls,
.night .table-cls .tr-cls:nth-child(2n) {
  color: #dadfe8 !important;
}
.night .p-cls,
.night .strong-cls,
.night .h1-cls,
.night .h2-cls,
.night .h3-cls,
.night .h4-cls,
.night .h5-cls,
.night .h6-cls,
.night .ol-cls .li-cls,
.night .ul-cls .li-cls {
  background-color: #2a2d33 !important;
}
.night .code-cls .ol-cls,
.night .code-cls .ul-cls,
.night .prettyprint .li-cls {
  color: #888e99 !important;
}
.night .blockquote-cls .p-cls,
.night .blockquote-cls {
  background-color: #25272b !important;
}
.night .blockquote-cls {
  border-left: 4px solid #34373d;
}
.night .blockquote-cls .p-cls {
  color: #888e99;
}
.night .code-cls .ol-cls .li-cls div.hljs-ln-numbers {
  border-right-style: none;
}
.night .prettyprint .pre-numbering,
.night .prettyprint .pre-numbering .li-cls,
.night .code-cls .ol-cls .li-cls div.hljs-ln-numbers .hljs-ln-line {
  background: #34373d !important;
}
.night .prettyprint .pre-numbering,
.night .prettyprint .pre-numbering .li-cls {
  border-right-style: none;
}
.night .code-cls .ol-cls,
.night .code-cls .ul-cls {
  padding-left: 0;
  background-color: #25272b;
}
.night .table-cls .tr-cls,
.night .table-cls .tr-cls .th-cls,
.night .table-cls .tr-cls:nth-child(2n) {
  background-color: #2a2d33;
}
.night .table-cls .tr-cls,
.night .table-cls .tr-cls .th-cls,
.night .table-cls .tr-cls .td-cls,
.night .table-cls .tr-cls:nth-child(2n) {
  border: 1px solid #555963 !important;
}
.night .hljs {
  padding: 0;
}
.article_content.night {
  background-color: #2a2d33;
}
.night .pre-cls .code-cls {
  color: #fff;
  background-color: #25272b !important;
}
.night .hljs,
.night .pre-cls.prettyprint,
.night .pre-cls {
  background-color: #25272b;
}
.night svg {
  background-color: #fff;
}
.night .prettyprint .prism,
.night .prettyprint div[style] {
  background-color: #25272b !important;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 8px;
}
.night .prettyprint .prism .token.comment {
  color: #999aaa;
}
.night .pre-cls .code-cls .ol-cls .li-cls {
  background-color: #25272b !important;
}
.night .markdown_views .code-cls {
  background-color: transparent;
}
.night .markdown_views .hr-cls {
  border-bottom-color: #555963 !important;
}
.night .markdown_views .prettyprint .pre-numbering {
  top: 0;
}
.night .markdown_views .pre-cls.prettyprint,
.night .markdown_views .prettyprint {
  padding: 0 16px 6px 50px;
}
.night .markdown_views mark {
  color: #2a2d33;
}
.mermaid {
  line-height: initial;
}
.mermaid span.edgeLabel {
  font-size: inherit !important;
}

```

替换之后得到如下页面：

![](imooc-blog项目开发-下(uniapp)/1.jpg)

## 文章内容 - 解决字体过小的问题

查看我们的 `css` 可以发现，**文章内容** 中所有的 **文字大小** 都是由  `rem` 进行指定的。

同时我们知道 `rem` 的大小取决于 `html` 根目录的 `font-size` 大小，那么明白了这个之后，问题应该就好解决了对不对。只需要给 **`html` 根标签添加一个对应的 `font-size` 就可以了**。

所以我们可以到 `article-detail.scss` 顶部，但是我们发现它这里已经有了对应的 `css` 了！！

![](imooc-blog项目开发-下(uniapp)/4.jpg)

既然已经有了这个 `css` 那为什么还不能生效呢？？

---

原因其实非常简单，因为现在是在 **微信小程序** 中，**微信小程序** 中没有 `html` 标签吗

所以通过指定 `html` 样式的形式是无法解决 **微信小程序** 中的字体大小问题的。

**微信小程序字体大小解决方案：**

在 `uniapp` 中，为我们提供了一个单独的组件  [page-meta](https://uniapp.dcloud.io/component/page-meta?id=page-meta) 。

[page-meta](https://uniapp.dcloud.io/component/page-meta?id=page-meta) 是一个特殊的标签，有点类似 `html` 里的`header`标签。页面的背景色、原生导航栏的参数，都可以写在这里。我们可以通过 `root-font-size` 属性指定页面的 **`根font-size`（类似于 `html` 根元素的 `font-size`）**

所以，我们可以直接使用 <page-meta> 包裹元素：

```html
<template>
  <page-meta root-font-size="52px">
    <view class="detail-container">
      ...
    </view>
  </page-meta>
</template>
```

此时，在返回模拟器，即可发现 **文字大小问题已经解决**

**注意：目前文章详情还无法在 浏览器 中进行展示，具体原因我们会在后面 【适配方案】 中进行讲解！！**

## 评论列表 - 获取评论列表数据

定义接口 `article.js`

```javascript
/**
 * 获取文章评论列表
 */
export function getArticleCommentList(data) {
    return request({
        url: '/article/comment/list',
        data
    })
}
```

创建新的组件 `article-comment-list`

```html
<template>
	<view> </view>
</template>

<script>
import { getArticleCommentList } from "api/article";
export default {
	name: "article-comment-list",
	props: {
		// 文章 ID
		articleId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			// 当前页数
			page: 1,
			// 每页的评论数
			pageSize: 5,
		};
	},
	created() {
		this.loadCommentList();
	},
	methods: {
		/**
		 * 获取评论列表数据
		 */
		async loadCommentList() {
			// if (!this.articleId) return;
			const { data: res } = await getArticleCommentList({
				articleId: this.articleId,
				page: this.page,
				size: this.pageSize,
			});
			console.log(res);
		},
	},
	watch: {
		// 由于articleId 是在父元素中通过网络请求获取的，所以有可能为空，所以可以采取如下写法
		// 但由于此处在父元素中通过了 v-if 对请求的数据是否有值进行判断。所以可以省略
		articleId: {
			handler() {
				this.loadCommentList();
			},
		},
	},
};
</script>

<style lang="scss">
</style>
```

`blog-detail`

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
			<!-- 文章内容区 -->
			<!-- 由于获取文章内容是异步的，此处确保文章有内容在渲染，否则会报错 -->
			<block v-if="articleData">
                ...
				<!-- 评论列表 -->
				<view class="comment-box">
					<article-comment-list :articleId="articleId"></article-comment-list>
				</view>
			</block>
		</view>
	</page-meta>
</template>
```

[vue中子组件的created、mounted钩子中获取不到props中的值问题](https://www.cnblogs.com/taohuaya/p/11413178.html)

## 评论列表 - 渲染评论列表（精简评论）

对于评论列表，包含两部分的内容：

1. 精简评论
2. 全部评论（包含分页）

`article-comment-list.vue`

```html
<template>
	<!-- 精简评论 -->
	<view class="comment-limit-container">
		<view class="comment-title">精简评论</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<!-- item 项的组件 -->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<!-- 查看更多评论 -->
		<view class="show-more">查看更多评论</view>
	</view>
</template>
```

`article-comment-item.vue`

```html
<template>
	<view class="comment-item-container">
		<!-- 头像 -->
		<view>
			<image class="avatar" :src="data.avatar" />
		</view>
		<view class="info-box">
			<!-- 评论人 -->
			<text class="comment-user">{{ data.nickName || data.userName }}</text>
			<!-- 评论内容 -->
			<text class="comment-info">{{ data.content }}</text>
			<!-- 评论时间 -->
			<text class="comment-time">{{ data.postTime | relativeTime }}</text>
		</view>
	</view>
</template>
<script>
export default {
    ...
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
};
</script>
```

## 评论列表 - 美化评论列表

`article-comment-list.vue`

```html
<template>
	<!-- 精简评论 -->
	<view class="comment-limit-container">
		<view class="comment-title">精简评论</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<!-- item 项的组件 -->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<!-- 查看更多评论 -->
		<view class="show-more">查看更多评论</view>
	</view>
</template>
<style lang="scss" scoped>
.comment-title {
	font-weight: bold;
	color: $uni-text-color-title;
	font-size: $uni-font-size-lg;
	margin: $uni-spacing-col-lg 0;
}
.comment-limit-container {
	.show-more {
		color: $uni-text-color-more;
		font-size: $uni-font-size-base;
		margin: $uni-spacing-col-lg;
		text-align: center;
	}
}
</style>
```

`article-comment-item.vue`

```html
<template>
	<view class="comment-item-container">
		<!-- 头像 -->
		<view>
			<image class="avatar" :src="data.avatar" />
		</view>
		<view class="info-box">
			<!-- 评论人 -->
			<text class="comment-user">{{ data.nickName || data.userName }}</text>
			<!-- 评论内容 -->
			<text class="comment-info">{{ data.content }}</text>
			<!-- 评论时间 -->
			<text class="comment-time">{{ data.postTime | relativeTime }}</text>
		</view>
	</view>
</template>
<style lang="scss" scoped>
.comment-item-container {
	padding: $uni-spacing-col-lg 0;
	display: flex;
	.info-box {
		margin-left: $uni-spacing-row-sm;
		display: flex;
		flex-direction: column;
		.comment-user {
			font-size: $uni-font-size-sm;
			font-weight: bold;
			color: $uni-text-color;
		}
		.comment-info {
			margin-top: $uni-spacing-col-sm;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}
		.comment-time {
			margin-top: $uni-spacing-col-sm;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
	}
}
</style>
```

## 评论列表 - 渲染全部评论列表

`article-comment-list.vue`

```html
<template>
	<!-- 精简评论 -->
	<view class="comment-limit-container" v-if="!isShowAllComment">
		<view class="comment-title">精简评论</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<!-- item 项的组件 -->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<!-- 查看更多评论 -->
		<view class="show-more" @click="onMoreClick">查看更多评论</view>
	</view>
	<!-- 全部评论 -->
	<view class="comment-all-container" v-else>
		<view class="comment-title">全部评论</view>
		<!-- 1. 通过 mescroll-body 包裹列表，指定 ref 为 么scrollRef，监听 @init，@down，@up 事件 -->
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@up="upCallback"
			:down="{
				use: false,
			}"
		>
			<block v-for="(item, index) in commentList" :key="index">
				<!-- item 项的组件 -->
				<article-comment-item :data="item.info"></article-comment-item>
			</block>
		</mescroll-body>
	</view>
</template>
<script>
// 2. 导入对应的 mixins
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
	// 3. 注册 mixins
	mixins: [MescrollMixin],
	data() {
		return {
             ...
			// 是否展示全部评论
			isShowAllComment: false,
		};
	},
	methods: {
		/**
		 * 首次加载
		 */
		mescrollInit() {},
		/**
		 * 上拉加载更多
		 */
		upCallback() {},
		/**
			查看全部评论的点击事件
		 */
		onMoreClick() {
			this.isShowAllComment = true;
		},
        ...
	},
    ...
};
</script>
```

**`blog-detail.vue`**

```html
<template>
<!-- 评论列表 -->
<!-- 1. 给 mescroll-body 的组件添加专门的ref :ref="mescrollItem" (mescrollItem) 是固定的不可以变化-->
	<view class="comment-box">
    	<article-comment-list
              ref="mescrollItem"
              :articleId="articleId"
         ></article-comment-list>
    </view>
</template>
<script>
// 2. 引入 mescroll-comp.js
import MescrollCompMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js";
export default {
	// 3. 注册 mixins
	mixins: [MescrollCompMixin],
    ...
};
</script>
```

`article-comment-list`

```html
<template>
	<!-- 精简评论 -->
	<view class="comment-limit-container" v-if="!isShowAllComment">
		<view class="comment-title">精简评论</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<!-- item 项的组件 -->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<!-- 查看更多评论 -->
		<view class="show-more" @click="onMoreClick">查看更多评论</view>
	</view>
	<!-- 全部评论 -->
	<view class="comment-all-container" v-else>
		<view class="comment-title">全部评论</view>
		<!-- 1. 通过 mescroll-body 包裹列表，指定 ref 为 么scrollRef，监听 @init，@down，@up 事件 -->
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@up="upCallback"
			:down="{
				use: false,
			}"
		>
			<block v-for="(item, index) in commentList" :key="index">
				<!-- item 项的组件 -->
				<article-comment-item :data="item.info"></article-comment-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
// 2. 导入对应的 mixins
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
    ...
	// 3. 注册 mixins
	mixins: [MescrollMixin],
	data() {
		return {
			// 当前页数
			page: 1,
			// 每页的评论数
			pageSize: 5,
			// 数据源
			commentList: [],
			// 是否展示全部评论
			isShowAllComment: false,
			// 是否为首次 init
			isInit: true,
			// 组件的实例
			mescroll: null,
		};
	},
	created() {
		this.loadCommentList();
	},
	methods: {
		/**
		 * 首次加载
		 */
		async mescrollInit() {
			// 此处需要重新加载数据（也可以将this.getMescroll().endSuccess()放在一个延迟0的计时器中），调用this.getMescroll 时才能获取到 mescroll 实例对象，进而才能调用endSuccess()方法。否则由于组件还未渲染完，无法直接使用endSuccess方法。
             // 同时，此处不知道为何，upCallback会等到mescrollInit中的代码全部执行完后才执行。导致upCallback中的if 判断失效。此处建议将配置:up属性：{auto:false}来代替if判断，但这样下一章的endBySize调用时会出现问题
			await this.loadCommentList();
			this.isInit = false;
			// 结束 上拉加载 && 下拉刷新
			this.getMescroll().endSuccess();
		},
		/**
		 * 上拉加载更多
		 */
		async upCallback() {
			if (this.isInit) return;
			this.page += 1;
			await this.loadCommentList();
			// 结束 上拉加载 && 下拉刷新
			this.getMescroll().endSuccess();
		},
		/**
		 * 获取评论列表数据
		 */
		async loadCommentList() {
			// if (!this.articleId) return;
			const { data: res } = await getArticleCommentList({
				articleId: this.articleId,
				page: this.page,
				size: this.pageSize,
			});
			// 判断是否为第一页数据
			if (this.page === 1) {
				this.commentList = res.list;
			} else {
				this.commentList = [...this.commentList, ...res.list];
			}
		},
		/**
		 * 返回 mescroll 实例对象
		 */
		getMescroll() {
			if (!this.mescroll) {
				this.mescroll = this.$refs.mescrollRef.mescroll;
			}
			return this.mescroll;
		},
	},
};
</script>
```

<div class="danger">

> 注意：此处的up回调会在init回调全部执行后在执行，无法遵循await 的消息队列原则。具体原因未知~！

</div>



## 评论列表 - 处理数据加载完成的提示

服务端会返回评论的总数量，如果当前评论数量 === 总数量 则表示 **数据已全部加载！**

在 `mescroll` 中提供了对应的对比方法：`mescroll.endBySize(当前数据量，总数据量)`

`article-comment-list`

```html
<script>
export default {
  data() {
    return {
      // 评论总数
      commentListTotal: 0,
    };
  },
  methods: {
    /**
     * 获取评论列表
     */
    async loadCommentList() {
      ...
      // 获取总数量
      this.commentListTotal = res.count;
      // 判断是否为第一页数据
      ...
    },
    /**
     * 首次加载
     */
    async mescrollInit() {
      ...
      // 判断数据是否加载完成
      this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
    },
    /**
     * 上拉加载更多
     */
    async upCallback() {
      ...
      // 判断数据是否加载完成
      this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
    },
  }
};
</script>

```

想要修改结束的提示，可以直接通过配置修改：

```html
<mescroll-body
               :up="{
                    textNoMore: '-- 我也是有底线的！ --'
                    }"
               >
```

<div class="danger">

> 注意：此处使用endBySize 并不能将所有的评论加载完，故无法达到效果。未来开发请谨慎使用。

</div>

## 功能区域 - 封装功能组件

底部功能区域包含三个部分：

1. 输入框
2. 点赞按钮
3. 收藏按钮

创建底部功能组件：`article-operate`

```html
<template>
	<view class="operator-container">
		<!-- 输入框 -->
		<view class="comment-box">
			<my-search placeholderText="评论一句，前排打call..."></my-search>
		</view>
		<!-- 点赞 -->
		<view class="options-box">
			<article-praise></article-praise>
		</view>
		<!-- 收藏 -->
		<view class="options-">
			<article-collect></article-collect>
		</view>
	</view>
</template>

<script>
export default {
	name: "article-operate",
	data() {
		return {};
	},
};
</script>

<style lang="scss">
</style>
```

输入框使用 `my-search` 组件

创建点赞组件：`article-praise`

```html
<template>
	<view class="praise-box">
		<image class="img" src="/static/images/un-praise.png" />
		<text class="txt">点赞</text>
	</view>
</template>

<script>
export default {
	name: "article-praise",
	data() {
		return {};
	},
};
</script>

<style lang="scss">
</style>
```

创建收藏组件：`article-collect`

```html
<template>
	<view class="collect-box">
		<image class="img" src="/static/images/un-collect.png" />
		<text class="txt">收藏</text>
	</view>
</template>

<script>
export default {
	name: "article-collect",
	data() {
		return {};
	},
};
</script>

<style lang="scss">
</style>
```

在 `blog-detail`中使用该组件

```html
<!-- 文章内容区 -->
...
<!-- 底部功能区 -->
<article-operate></article-operate>
```

## 功能区域 - 样式美化

**`article-operate.vue`**

```html
<template>
	<view class="operator-container">
		<!-- 输入框 -->
		<view class="comment-box">
			<my-search placeholderText="评论一句，前排打call..."></my-search>
		</view>
		<!-- 点赞 -->
		<view class="options-box">
			<article-praise></article-praise>
		</view>
		<!-- 收藏 -->
		<view class="options-box">
			<article-collect></article-collect>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.operator-container {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $uni-bg-color;
	padding: 4px 6px 32px 6px;
	display: flex;
	border-top: 1px solid $uni-bg-color-grey;
	align-items: center;
	.comment-box {
		flex-grow: 2;
	}
	.options-box {
		flex-grow: 1;
	}
}
</style>
```

**`article-praise.vue`**

```html
<template>
	<view class="praise-box">
		<image class="img" src="/static/images/un-praise.png" />
		<text class="txt">点赞</text>
	</view>
</template>

<style lang="scss" scoped>
.praise-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
		color: $uni-text-color;
	}
	.txt {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
}
</style>
```

**`article-collect.vue`**

```html
<template>
	<view class="collect-box">
		<image class="img" src="/static/images/un-collect.png" />
		<text class="txt">收藏</text>
	</view>
</template>

<style lang="scss" scoped>
.collect-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
		color: $uni-text-color;
	}
	.txt {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
}
</style>
```

## 功能区域 - 增加 `my-search` 的样式适配

**`my-search.vue`**

```html
<template>
		...
		<!-- 搜索按钮 -->
		<view
			class="my-search-box"
			:style="{
				backgroundColor: config.backgroundColor,
				height: config.height + 'px',
				border: config.border,
			}"
			v-else
		>
			<!-- 搜索图标 -->
			<image :src="config.icon" class="icon" />
			<!-- placeholder -->
			<text
				class="placeholder"
				:style="{
					color: config.textColor,
				}"
				>{{ placeholderText }}</text
			>
		</view>
	</view>
</template>
```

**`article-operate.vue`**

```html
<template>
	<view class="operator-container">
		<!-- 输入框 -->
		<view class="comment-box">
			<my-search
				placeholderText="评论一句，前排打call..."
				:config="{
					height: 28,
					backgroundColor: '#eeedf4',
					icon: '/static/images/input-icon.png',
					textColor: '#a6a5ab',
					border: 'none',
				}"
			></my-search>
		</view>
	</view>
</template>
```

## 用户登录 - 登录页面基本样式

```html
<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<block>
			<image
				class="avatar avatar-img"
				src="/static/images/default-avatar.png"
				mode="scaleToFill"
			/>
			<view class="login-desc">登录后可同步数据</view>
			<button class="login-btn" type="primary" @click="getUserInfo">
				微信用户一键登录
			</button>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.my-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 25%;
	.avatar-img {
		height: 78px;
		width: 78px;
	}
	.login-desc {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-col-big;
	}
	.login-btn {
		margin-top: $uni-spacing-col-big;
		width: 85%;
	}
}
</style>
```

## 用户登录 - 封装登录组件

由于我们会在多个地方实现登录，所以为了复用登录的 `UI`，我们可以把 登录的 `UI` 封装成为一个组件

**`创建登录组件 my-login`** 

```html
<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<block>
			<image
				class="avatar avatar-img"
				src="/static/images/default-avatar.png"
				mode="scaleToFill"
			/>
			<view class="login-desc">登录后可同步数据</view>
			<button class="login-btn" type="primary" @click="getUserInfo">
				微信用户一键登录
			</button>
		</block>
	</view>
</template>

<script>
export default {
	name: "my-login",
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.my-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 25%;
	.avatar-img {
		height: 78px;
		width: 78px;
	}
	.login-desc {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-col-big;
	}
	.login-btn {
		margin-top: $uni-spacing-col-big;
		width: 85%;
	}
}
</style>
```

## 用户登录 - 明确登录的思路

对于登录来说，我们会分为两个不同的端来进行适配实现：

1. 微信小程序
2. 非微信小程序（在讲解适配时实现）

我们这里先只讲解 【微信小程序的实现】，【非微信小程序】的实现将在后面的 **适配环节进行**。

**微信小程序：**

1. 想要实现登录功能，那么我们需要调用登录接口来进行实现，而登录接口所需要的参数，我们可以直接通过 `getUserProfile` 方法进行获取。
2. 调用登录接口成功，服务端会返回用户的 `token`，这个 `token` 为当前的用户身份令牌。（拥有 token） 则表示用户已经登录了。
3. 而此处的 `token`，我们需要在多个组件中进行使用，所以 `token` 需要被保存到 `全局状态管理工具 - vuex` 中，同时需要保存的还有通过 `getUserProfile` 获取到的用户基本信息。
4. 而当前的用户登录状态，我们希望可以一直保存（PS：不需要每次都进行登录）。所以在登录完成后，我们需要把 **`token` && `userinfo`** 保存到 **本地存储中**
5. 最后，为了实现 **数据与组件的分离**，我们需要把与 **与登录相关的逻辑** 都封装在 `vuex` 中进行。

这些业务是 **前端用户登录的标准逻辑**，大家在以后的前端登录业务处理中，也可以按照此逻辑进行。

## 用户登录 - 封装 action 调用登录接口

首先我们需要先获取到用户的信息，用作登录时的请求参数：

**`my-login.vue`**

```html
<template>
	<view class="my-container">
		<block>
			<button class="login-btn" type="primary" @click="getUserInfo">
				微信用户一键登录
			</button>
		</block>
	</view>
</template>
<script>
import { mapActions } from "vuex";
export default {
	name: "my-login",
	data() {
		return {};
	},
	methods: {
		...mapActions("user", ["login"]),
		/**
		 * 微信一键登录点击事件
		 */
		getUserInfo() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 获取用户信息
			uni.getUserProfile({
				desc: "登录后可同步数据",
				success: (obj) => {
					// 调用登录接口
					console.log(this.login(obj));
				},
				fail: () => {
					uni.showToast({
						title: "授权已取消",
						icon: "error",
						mask: true,
					});
				},
			});
			// 关闭加载
			uni.hideLoading();
		},
	},
};
</script>
```

接着去vuex中定义获取登录的方法：

**`store/modules/user.js`**

```javascript
import { login } from 'api/user'

export default {
    namespaced: true,
    state: () => ({

    }),
    mutations: {},
    // actions中完成异步操作
    actions: {
        /**
         * 完成登录
         */
        async login(context, userProfile) {
            const userInfo = userProfile.userInfo
            // 调用登录接口
            const { data: res } = await login({
                signature: userProfile.signature,
                iv: userProfile.iv,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                city: userInfo.city,
                province: userInfo.province,
                avatarUrl: userInfo.avatarUrl
            })
            console.log(res)
        }
    }
}
```

**`store/index.js`**

```javascript
...
import user from './modules/user'
...

const store = new Vuex.Store({
    // 模块
    modules: {
        ...
        user
    }
});
export default store;
```

最后定义请求接口的方法：

**`api/user.js`**

```javascript
import request from '../utils/request'

/**
 * 用户登录
 */
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data
    })
}
```

## 用户登录 - 保存用户登录状态

用户的登录状态需要被保存到 `vuex` 中，同时需要进行 **本地存储**。

```javascript
import { login } from 'api/user'
const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'user-info'

export default {
    namespaced: true,
    state: () => ({
        // 用户 token
        token: uni.getStorageSync(TOKEN_KEY) || '',
        // 用户信息
        userInfo: uni.getStorageSync(USER_INFO_KEY) || {}
    }),
    mutations: {
        /**
         * 保存 token 到 vuex
         */
        setToken(state, token) {
            state.token = token
            this.commit('user/saveToToken')
        },
        /**
         * 保存 token 到本地存储
         */
        saveToToken(state) {
            uni.setStorage({
                key: TOKEN_KEY,
                data: state.token
            })
        },
        /**
         * 保存 userInfo 到 vuex
         */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            this.commit('user/saveToUserInfo')
        },
        /**
         * 保存 userInfo 到本地存储
         */
        saveToUserInfo(state) {
            uni.setStorage({
                key: USER_INFO_KEY,
                data: state.userInfo
            })
        }
    },
    // actions中完成异步操作
    actions: {
        /**
         * 完成登录
         */
        async login(context, userProfile) {
            const userInfo = userProfile.userInfo
            // 调用登录接口
            const { data: res } = await login({
                signature: userProfile.signature,
                iv: userProfile.iv,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                city: userInfo.city,
                province: userInfo.province,
                avatarUrl: userInfo.avatarUrl
            })
            // TODO：登录逻辑
            this.commit('user/setToken', res.token)
            this.commit('user/setUserInfo', userInfo)
        }
    }
}
```

## 用户登录 - 完成已登录的用户视图

当 `token` 存在时，表示用户已经登录了，此时需要 **展示用户登录完成的视图：**

**`my-login.vue`**

```html
<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<block v-if="!token">
			<image
				class="avatar avatar-img"
				src="/static/images/default-avatar.png"
				mode="scaleToFill"
			/>
			<view class="login-desc">登录后可同步数据</view>
			<button class="login-btn" type="primary" @click="getUserInfo">
				微信用户一键登录
			</button>
		</block>
		<!-- 用户登录 -->
		<block v-else>
			<image
				class="avatar avatar-img"
				:src="userInfo.avatarUrl"
				mode="scaleToFill"
			/>
			<view class="login-desc">{{ userInfo.nickName }}</view>
			<button class="login-btn" type="default">退出登录</button>
		</block>
	</view>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "my-login",
	computed: {
		...mapState("user", ["token", "userInfo"]),
	},
	methods: {
		...mapActions("user", ["login"]),
        ...
	},
};
</script>
```

## 用户登录 - 实现退出登录功能

**`store/modules/user.js`**

```javascript
export default {
    ...
    mutations: {
        ...
        /**
         * 删除 token
         */
        removeToken(state) {
            state.token = ''
            this.commit('user/saveToToken')
        },
        /**
         * 删除用户信息
         */
        removeUserInfo(state) {
            state.userInfo = {}
            this.commit('user/saveToUserInfo')
        }
    },
    // actions中完成异步操作
    actions: {
        ...
        /**
         * 退出登录
         */
        logout(context) {
            this.commit('user/removeToken')
            this.commit('user/removeUserInfo')
        }
    }
}
```

**`my-login.vue`**

```html
<template>
	<view class="my-container">
        ...
		<!-- 用户登录 -->
		<block v-else>
			<image
				class="avatar avatar-img"
				:src="userInfo.avatarUrl"
				mode="scaleToFill"
			/>
			<view class="login-desc">{{ userInfo.nickName }}</view>
			<button class="login-btn" type="default" @click="onLogoutClick">
				退出登录
			</button>
		</block>
	</view>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    ...
	computed: {
		...mapState("user", ["token", "userInfo"]),
	},
	methods: {
        ...
		/**
		 * 退出登录的点击事件
		 */
		onLogoutClick() {
			uni.showModal({
				title: "提示",
				content: "退出将无法同步数据哦~~",
				success: ({ confirm, cancel }) => {
					if (confirm) {
						// 调用退出登录的 action
						this.logout();
					}
				},
			});
		},
	},
};
</script>
```

## 用户登录 - 判断用户登录状态

截止到目前为止， **用户登录** 的功能其实就已经全部构建完毕了。

接下来我们就需要实现：

- 关注用户
- 文章点赞
- 文章收藏
- 文章评论

这四个对应的功能。

之前我们说过，想要实现这四个功能， 那么需要有一个前提条件就是：**当前用户已登录。**

所以说，我们就需要在用户使用这四个功能之前，来判断用户的登录状态。

也就是说，在 **用户登录功能完成之后**，我们其实还不可以立刻着手这四个功能的开发，我们还需要进行一步操作，那就是 **判断用户的登录状态！**

想要判断用户的登录状态，我们依然需要在 `vuex` 中进行：

```javascript
export default {
    ...
    actions: {
        ...
        /**
         * 进行登录判定
         */
        isLogin(context) {
            if (context.state.token) return true;
            // TODO：如果用户未登录，需要引导用户进入登录页面
            return false;
        }
    }
}
```

## 用户登录 - 新建登录页面，处理当前场景

开篇的时候，我们说过，对于 **登录** 来说，包含有两个入口：

1. 在 《我的页面》中
2. 在调用需要登录权限的功能时

那么此时，就是使用到第二个场景的时候了。

我们创建一个分包，叫做 `login-page`，在这个页面中，导入 `my-login` 组件：

```html
<template>
	<view>
		<my-login></my-login>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss">
</style>
```

进行登录判定，当用户未登录时，进入login-page 页面：

```javascript
export default {
    ...
    actions: {
        ...
        /**
         * 进行登录判定
         */
        async isLogin(context) {
            if (context.state.token) return true;
            // TODO：如果用户未登录，需要引导用户进入登录页面
            // 此处要用await，因为uni.showModal 是异步操作，我们要将其变为同步
            const [error, res] = await uni.showModal({
                title: '登录之后才可以进行后续操作',
                content: '立即跳转到登录页面？(登录后会自动返回当前页面)',
            })
            const { cancel, confirm } = res;
            if (confirm) {
                uni.navigateTo({ url: '/subpkg/pages/login-page/login-page' })
            }

            return false;
        }
    }
}
```

在用户点击关注时，调用登录判定方法：

```html
<template>
	...
	<view class="detail-right">
    <!-- 关注按钮 -->
    <button class="follow" size="mini" @click="onFollowClick">
        关注
    </button>
    </view>
	...
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 关注用户的点击事件
		 */
		async onFollowClick() {
			const isLogin = await this.isLogin();
			if (!isLogin) {
				// 用户未登录
				return;
			}
		},
	},
};
</script>
```

## 用户登录 - 监听登录成功的状态，返回之前页面

在上一节，我们已经完成了 **在调用需要登录权限的功能时，进入登录页面** ，但是当我们登录完成之后，我们 **还需要返回之前页面**，因为只有这样才能完成我们的功能闭环，所以在这一小节中，我们就去完成这一块的功能：

`my-login`：在登录成功后，发送事件

```html
<script>
export default {
    ...
	methods: {
		getUserInfo() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 获取用户信息
			uni.getUserProfile({
				desc: "登录后可同步数据",
				success: async (obj) => {
					// 调用登录接口
                      // 注意此处需要同步操作，确保登录成功
					await this.login(obj);
					// 登录成功，发送事件
					this.$emit("onLoginSuccess");
				},
				fail: () => {
					uni.showToast({
						title: "授权已取消",
						icon: "error",
						mask: true,
					});
				},
			});
			// 关闭加载
			uni.hideLoading();
		},
        ...
	},
};
</script>
```

在 **`login-page`**中定义事件，用于跳转页面：

```html
<template>
	<view>
		<my-login @onLoginSuccess="onLoginSuccess"></my-login>
	</view>
</template>

<script>
export default {
    ...
	methods: {
		/**
		 * 用户登录成功的事件回调
		 */
		onLoginSuccess() {
			uni.navigateBack({ delta: 1 });
		},
	},
};
</script>
```

## 用户登录 - 处理登录时无 loading 的 bug

原本的写法：

```html
<script>
export default {
	methods: {
		getUserInfo() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 获取用户信息
			uni.getUserProfile({
				desc: "登录后可同步数据",
				success: async (obj) => {
					// 调用登录接口
					await this.login(obj);
					// 登录成功，发送事件
					this.$emit("onLoginSuccess");
				},
				fail: () => {
					uni.showToast({
						title: "授权已取消",
						icon: "error",
						mask: true,
					});
				},
				complete: () => {},
			});
			// 关闭加载
			uni.hideLoading();
		},
	},
};
</script>
```

<div class="danger">

> 由于uni.getUserProfile() 是一个异步的方法，所以uni.showLoading和uni.hideLoading会连续执行，导致我们无法看出效果。

</div>

修改后的写法：

```html
<script>
export default {
    ...
	methods: {
        ...
		...mapActions("user", ["login", "logout"]),
		/**
		 * 微信一键登录点击事件
		 */
		getUserInfo() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 获取用户信息
			uni.getUserProfile({
				desc: "登录后可同步数据",
				success: async (obj) => {
					// 调用登录接口
					await this.login(obj);
					// 登录成功，发送事件
					this.$emit("onLoginSuccess");
				},
				fail: () => {
					uni.showToast({
						title: "授权已取消",
						icon: "error",
						mask: true,
					});
				},
				complete: () => {
					// 关闭加载
					uni.hideLoading();
				},
			});
		},
	},
};
</script>
```

> 此种写法，可以保证请求完成后再调用 uni.hideLoading() ，就可以看到loading的效果了。

## 文章操作 - 关注用户

在彻底完成了 **登录** 相关的内容之后，接下来就可以回过头去实现这四个功能了。

首先我们先去实现 **关注用户** 的功能：

定义 `api` 接口：

```javascript
/**
 * 关注用户
 */
export function userFollow(data) {
    return request({
        url: '/user/follow',
        data
    })
}
```

关注用户接口需要传递 `token` 请求头，所以我们可以在 `utils/request.js` 中，传递当前的 `token`:

```javascript
import store from '../store'

function request({ url, data, method }) {
    return new Promise((resolve, reject) => {
        // 通过 uni.request 发起网络请求
        uni.request({
            ...
            header: {
                Authorization: store.state.user.token
            },
        })
    })
}

export default request
```

在 `blog-detail` 中调用 接口：

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
			<!-- 文章内容区 -->
			<!-- 由于获取文章内容是异步的，此处确保文章有内容在渲染，否则会报错 -->
			<block v-if="articleData">
                ...
						<!-- 关注按钮 -->
						<button
							class="follow"
							size="mini"
							@click="onFollowClick"
							:loading="isFollowLoading"
							:type="articleData.isFollow ? 'primary' : 'default'"
						>
							{{ articleData.isFollow ? "已关注" : "关注" }}
						</button>
			</block>
		</view>
	</page-meta>
</template>
<script>
import { userFollow } from "api/user";
export default {
    ...
	data() {
		return {
    		...
			// 关注用户的 loading
			isFollowLoading: false,
		};
	},
	methods: {
        ...
		/**
		 * 关注用户的点击事件
		 */
		async onFollowClick() {
			const isLogin = await this.isLogin();
			if (!isLogin) {
				// 用户未登录
				return;
			}
			// 关注用户接口
			this.isFollowLoading = true;
			await userFollow({
				author: this.author,
				isFollow: !this.articleData.isFollow,
			});
			// 修改用户数据
			this.articleData.isFollow = !this.articleData.isFollow;
			// 关闭loading
			this.isFollowLoading = false;
		},
	},
};
</script>
```

## 文章操作 - 处理发表评论的 UI

监听 `article-operate` 中的 输入框点击事件：

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
            ...
			<!-- 底部功能区 -->
			<article-operate @commitClick="onCommit"></article-operate>
		</view>
	</page-meta>
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 点击发表评论
		 */
		onCommit() {
		},
	},
};
</script>
```

在 article-operate 中触发点击事件：

```html
<template>
	<view class="operator-container">
		<!-- 输入框 -->
		<view class="comment-box" @click="onCommitClick">
			<my-search
				placeholderText="评论一句，前排打call..."
				:config="{
					height: 28,
					backgroundColor: '#eeedf4',
					icon: '/static/images/input-icon.png',
					textColor: '#a6a5ab',
					border: 'none',
				}"
			></my-search>
		</view>
        ...
	</view>
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * my-search 点击事件
		 */
		async onCommitClick() {
			// 因为发表评论需要在用户登录之后进行
			const isLogin = await this.isLogin();
			if (!isLogin) {
				return;
			}
			this.$emit("commitClick");
		},
	},
};
</script>
```


新建 **`article-comment-commit`**组件：

```html
<template>
	<view class="comment-container">
		<uni-easyinput
			v-model="value"
			type="textarea"
			placeholder="说点什么..."
			:maxlength="50"
			:inputBorder="false"
		/>
		<!-- 此处button会自动置于uni-easyinput 的右下方 -->
		<button
			class="commit"
			type="primary"
			:disabled="!value"
			size="mini"
			@click="onBtnClick"
		>
			发送
		</button>
	</view>
</template>

<script>
export default {
	name: "article-comment-commit",
	data() {
		return {
            value:''
        };
	},
	methods: {
		/**
		 * 发送按钮点击事件
		 */
		onBtnClick() {},
	},
};
</script>

<style lang="scss">
.comment-container {
	background-color: $uni-bg-color;
	text-align: right;
	padding: $uni-spacing-row-base;
	position: relative;
}
</style>
```
在blog-detail 中定义弹出层：

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
            ...
			<!-- 输入评论的 popup -->
			<uni-popup ref="popup" type="bottom">
				<article-comment-commit></article-comment-commit>
			</uni-popup>
		</view>
	</page-meta>
</template>
<script>
export default {
	methods: {
        ...
		/**
		 * 点击发表评论
		 */
		onCommit() {
			// 通过调用 popup 实例的方法，进行弹出层的弹出
			this.$refs.popup.open();
		},
	},
};
</script>
```

## 文章操作 - 处理评论框的显示问题

现在评论框已经可以显示出来了，但是目前 **评论框的显示存在两个问题：**

1. 输入内容之后，关闭评论框，再次展示评论框时，之前输入的内容依然存在
2. 在真机中，软键盘会遮挡评论框的展示

**1. 输入内容之后，关闭评论框，再次展示评论框时，之前输入的内容依然存在：**

**原因：**

当 `popup` 关闭时，`article-comment-commit` 组件 并未销毁，依然存在

**解决方案：**

监听 `popup` 的关闭事件，通过 `v-if` 控制 `article-comment-commit` 组件的销毁

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
            ...
			<!-- 输入评论的 popup -->
			<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
				<article-comment-commit v-if="isShowCommit"></article-comment-commit>
			</uni-popup>
		</view>
	</page-meta>
</template>
<script>
export default {
	data() {
		return {
            ...
			// popup 的显示状态
			isShowCommit: false,
		};
	},
	methods: {
        ...
		/**
		 * 发布评论的 propup 切换事件
		 */
		onCommitPopupChange(e) {
			// 修改对应的标记，当 popup 关闭的时候，为了动画的平顺，进行延迟的处理。（否则关闭动画会消失）
			if (e.show) {
				this.isShowCommit = e.show;
			} else {
				setTimeout(() => {
					this.isShowCommit = e.show;
				}, 200);
			}
		},
	},
};
</script>
```

**2. 在真机中，软键盘会遮挡评论框的展示**

**原因：**

软键盘弹出，占用了底部空间

**解决方案：**

检测软键盘的弹出事件，动态修改  `article-comment-commit` 组件的位置

`article-comment-commit`

```html
<template>
	<view class="comment-container" :style="{ bottom: bottom + 'px' }">
		<uni-easyinput
			v-model="value"
			type="textarea"
			placeholder="说点什么..."
			:maxlength="50"
			:inputBorder="false"
		/>
        ...
	</view>
</template>
<script>
export default {
    ...
	data() {
		return {
			value: "",
			bottom: 0,
		};
	},
	created() {
		// 检测软键盘的变化
		uni.onKeyboardHeightChange(({ height }) => {
			console.log(height, 111);
			this.bottom = height;
		});
	},
};
</script>
```

## 文章操作 - 发表评论

在一切准备就绪之后，最后就可以实现 发表评论 的功能了。

在 `api/user` 中，定义发表评论的接口：

```javascript
/**
 * 发表评论
 */
export function userArticleComment(data) {
    return request({
        url: '/user/article/comment',
        method: 'POST',
        data
    })
}
```

在 `article-comment-commit` 中调用接口，发表评论：

```html
<template>
	...
	<view class="comment-container" :style="{ bottom: bottom + 'px' }">
		<button
			class="commit"
			type="primary"
			:disabled="!value"
			size="mini"
			@click="onBtnClick"
		>
			发送
		</button>
	</view>
</template>
<script>
import { userArticleComment } from "api/user";
export default {
    ...
	methods: {
        ...
		/**
		 * 发送按钮点击事件
		 */
		async onBtnClick() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 调用接口
			const { data: res } = await userArticleComment({
				articleId: this.articleId,
				content: this.value,
			});
			// 发表评论完成之后，给用户一个提示
			// 此处不用写关闭，在request的complete中已经写了统一关闭
			uni.showToast({
				title: "发表成功",
				icon: "success",
				mask: true,
			});
			// 关闭 popup
			this.$emit("success");
		},
	},
};
</script>
```

在 `blog-detail` 中传递 `id` ，处理评论成功之后的操作：

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
            ...
			<!-- 输入评论的 popup -->
			<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
				<article-comment-commit
					v-if="isShowCommit"
					:articleId="articleId"
					@success="onSendSuccess"
				></article-comment-commit>
			</uni-popup>
		</view>
	</page-meta>
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 评论发表成功
		 */
		onSendSuccess() {
			// 关闭弹出层
			this.$refs.popup.close();
    		// 下面这行不写也不影响。因为调用了popup.close()后，会自动清空输入框内容
	        this.isShowCommit = false;
		},
	},
};
</script>
```

## 文章操作 - 回显评论数据

`article-comment-commit` ：评论发布成功，传递评论数据对象

```html
<script>
import { userArticleComment } from "api/user";
export default {
    ...
	methods: {
        ...
		/**
		 * 发送按钮点击事件
		 */
		async onBtnClick() {
			// 展示加载框
			uni.showLoading({
				title: "加载中",
			});
			// 调用接口
			const { data: res } = await userArticleComment({
				articleId: this.articleId,
				content: this.value,
			});
			// 发表评论完成之后，给用户一个提示
			// 此处不用写关闭，在request的complete中已经写了统一关闭
			uni.showToast({
				title: "发表成功",
				icon: "success",
				mask: true,
			});
			// 关闭 popup，传递回显数据
			this.$emit("success", res);
		},
	},
};
</script>
```

**`在blog-detail中处理对应的success事件`**

```html
<template>
	...
			<!-- 输入评论的 popup -->
			<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
				<article-comment-commit
					v-if="isShowCommit"
					:articleId="articleId"
					@success="onSendSuccess"
				></article-comment-commit>
			</uni-popup>
</template>
<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 评论发表成功
		 */
		onSendSuccess(data) {
			// 关闭弹出层
			this.$refs.popup.close();
			this.isShowCommit = false;
			// 为 commentList 增加数据
			this.$refs.mescrollItem.addCommentList(data);
		},
	},
};
</script>
```

在 **`article-comment-list`**中定义对应的增加数据的方法。

```html
<script>
    ...
	methods: {
        ...
		/**
		 * 为 commentList 增加一个评论
		 */
		addCommentList(data) {
			this.commentList.unshift(data);
		},
	},
};
</script>
```

## 文章操作 - 点赞功能实现

1. 定义对应的请求方法

```js
/**
 * 点赞功能
 */
export function userPraise(data) {
    return request({
        url: '/user/praise',
        data
    })
}
```



2. 在 **`article-praise`**中定义对应的点击事件，并发送请求，将请求得到的结果传递给 **`article-operate`**，并由 **`article-operate`** 传给 **`blog-detail`**，在 **`blog-detail`** 中将 接收到的属性赋值。

**`blog-detail`**

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
			<!-- 文章内容区 -->
			<!-- 由于获取文章内容是异步的，此处确保文章有内容在渲染，否则会报错 -->
			<block v-if="articleData">
                ...
				<!-- 底部功能区 -->
				<article-operate
					@commitClick="onCommit"
					:articleData="articleData"
					@changePraise="onChangePraise"
					@changeCollect="onChangeCollect"
				></article-operate>
			</block>
		</view>
	</page-meta>
</template>

<script>
export default {
    ...
	methods: {
        ...
		/**
		 * 点赞或取消点赞成功
		 */
		onChangePraise(isPraise) {
			this.articleData.isPraise = isPraise;
		},
	},
};
</script>
```

**`article-operate`**

```html
<template>
	<view class="operator-container">
		<!-- 点赞 -->
		<view class="options-box">
			<article-praise
				:articleData="articleData"
				@changePraise="$emit('changePraise', !articleData.isPraise)"
			></article-praise>
		</view>
	</view>
</template>
<script>
import { mapActions } from "vuex";
export default {
    ...
	props: {
		articleData: {
			type: Object,
			required: true,
		},
	},
};
</script>
```

**`article-praise`**

```html
<template>
	<view class="praise-box" @click="praiseOnclick">
		<image class="img" :src="praiseImg" />
		<text class="txt">点赞</text>
	</view>
</template>

<script>
import { userPraise } from "api/user";
import { mapActions } from "vuex";
export default {
	name: "article-praise",
	data() {
		return {};
	},
	props: {
		articleData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		praiseImg() {
			if (this.articleData && this.articleData.isPraise) {
				return "/static/images/praise.png";
			} else {
				return "/static/images/un-praise.png";
			}
		},
	},
	methods: {
		...mapActions("user", ["isLogin"]),
		async praiseOnclick() {
			if (!(await this.isLogin())) return;
			uni.showLoading({
				title: "加载中",
			});
			await userPraise({
				articleId: this.articleData.articleId,
				isPraise: !this.articleData.isPraise,
			});
			uni.hideLoading();
			this.$emit("changePraise", !this.articleData.isPraise);
		},
	},
};
</script>
```



## 文章操作 - 收藏功能实现

1. 定义请求方法

```javascript
/**
 * 收藏功能
 */
export function userCollect(data) {
    return request({
        url: '/user/collect',
        data
    })
}
```

2. 具体实现

**`blog-detail`**

```html
<template>
	<page-meta root-font-size="54px">
		<view class="detail-container">
			<!-- 文章内容区 -->
			<!-- 由于获取文章内容是异步的，此处确保文章有内容在渲染，否则会报错 -->
			<block v-if="articleData">
                ...
				<!-- 底部功能区 -->
				<article-operate
					@commitClick="onCommit"
					:articleData="articleData"
					@changePraise="onChangePraise"
					@changeCollect="onChangeCollect"
				></article-operate>
			</block>
		</view>
	</page-meta>
</template>

<script>
export default {
	methods: {
        ...
		/**
		 * 收藏或取消收藏成功
		 */
		onChangeCollect(isCollect) {
			this.articleData.isCollect = isCollect;
		},
	},
};
</script>
```

**`article-operate`**

```html
<template>
	<view class="operator-container">
		<!-- 收藏 -->
		<view class="options-box">
			<article-collect
				:articleData="articleData"
				@changeCollect="$emit('changeCollect', !articleData.isCollect)"
			></article-collect>
		</view>
	</view>
</template>
<script>
export default {
    ...
	props: {
		articleData: {
			type: Object,
			required: true,
		},
	},
};
</script>
```

**`article-collect`**

```html
<template>
	<view class="collect-box" @click="onCollectClick">
		<image class="img" :src="collectImg" />
		<text class="txt">收藏</text>
	</view>
</template>

<script>
import { userCollect } from "api/user";
import { mapActions } from "vuex";
export default {
	name: "article-collect",
	data() {
		return {};
	},
	props: {
		articleData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		collectImg() {
			return this.articleData && this.articleData.isCollect
				? "/static/images/collect.png"
				: "/static/images/un-collect.png";
		},
	},
	methods: {
		...mapActions("user", ["isLogin"]),
		async onCollectClick() {
			if (!(await this.isLogin())) return;
			uni.showLoading({
				title: "加载中",
			});
			await userCollect({
				articleId: this.articleData.articleId,
				isCollect: !this.articleData.isCollect,
			});
			uni.hideLoading();
			this.$emit("changeCollect", !this.articleData.isCollect);
		},
	},
};
</script>
```

## 热播列表 - 获取热播列表数据

定义接口：`api/video`

```javascript
import request from '../utils/request'

/**
 * 热播视频列表
 */
export function getHotVideoList(data) {
    return request({
        url: '/video/list',
        data
    })
}
```

在 `hot-video.vue` 中获取数据：

```html
<template>
	<view> </view>
</template>

<script>
import { getHotVideoList } from "api/video";
export default {
	data() {
		return {
			page: 1,
			size: 10,
			videoList: [],
		};
	},
	created() {
		this.loadHotVideoList();
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async loadHotVideoList() {
			const { data: res } = await getHotVideoList({
				page: this.page,
				size: this.size,
			});
			this.videoList = res.list;
		},
	},
};
</script>

<style lang="scss">
</style>
```

## 热播列表 - 渲染UI结构

`hot-video`

```html
<template>
	<view class="hot-video-container">
		<block v-for="(item, index) in videoList" :key="index">
			<hot-video-item :data="item"></hot-video-item>
		</block>
	</view>
</template>
<style lang="scss" scoped>
.hot-video-container {
	background-color: $uni-bg-color-grey;
}
</style>
```

`hot-video-item`

```html
<template>
	<view class="hot-video-item-container">
		<view class="video-box">
			<video
				id="myVideo"
				class="video"
				:src="data.play_url"
				enable-danmu
				danmu-btn
			/>
		</view>
		<hot-video-info :data="data"></hot-video-info>
	</view>
</template>
<style lang="scss" scoped>
.hot-video-item-container {
	margin-bottom: $uni-spacing-col-lg;
	position: relative;
	.video {
		width: 100%;
		height: 230px;
	}
}
</style>
```

`hot-video-info`

```html
<template>
	<view class="hot-video-info-container">
		<view class="video-title">{{ data.title }}</view>
		<view class="video-info">
			<view class="author-box">
				<image class="avatar" :src="data.poster_small" />
				<text class="author-txt">{{ data.source_name }}</text>
			</view>
			<view class="barrage-box">
				<uni-icons class="barrage-icon" type="videocam" />
				<text class="barrage-num">{{ data.fmplaycnt }}</text>
			</view>
		</view>
	</view>
</template>
<style lang="scss">
.hot-video-info-container {
	.video-title {
		position: absolute;
		top: $uni-spacing-col-big;
		left: $uni-spacing-row-lg;
		color: $uni-text-color-inverse;
		font-size: $uni-font-size-lg;
	}
	.video-info {
		display: flex;
		justify-content: space-between;
		background-color: $uni-bg-color;
		padding: $uni-spacing-col-sm $uni-spacing-row-lg;
		.author-box {
			display: flex;
			align-items: center;
			.author-txt {
				margin-left: $uni-spacing-row-sm;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				font-weight: bold;
			}
		}
		.barrage-box {
			display: flex;
			align-items: center;
			.barrage-num {
				margin-left: $uni-spacing-row-sm;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
		}
	}
}
</style>
```

## 热播列表 - 列表的下拉刷新与上拉加载

`hot-video`： 在页面中使用 `mescroll` 比较简单

```html
<template>
	<view class="hot-video-container">
		<!-- 1.导入 mescroll-body -->
		<mescroll-body
			ref="meScrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
// 2.导入 mixin
import MescrollMixin from "uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins";
import { getHotVideoList } from "api/video";
export default {
	// 3. 注册 mixin
	mixins: [MescrollMixin],
	data() {
		return {
			page: 1,
			size: 10,
			videoList: [],
			// 是否首次加载
			isInit: true,
			// 实例
			mescroll: null,
		};
	},
	created() {
		// this.loadHotVideoList();
	},
	mounted() {
		this.mescroll = this.$refs.meScrollRef.mescroll;
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async loadHotVideoList() {
			const { data: res } = await getHotVideoList({
				page: this.page,
				size: this.size,
			});
			// 判断是否为第一页的数据
			if (this.page === 1) {
				this.videoList = res.list;
			} else {
				this.videoList = [...this.videoList, ...res.list];
			}
		},
		/**
		 * List 组件首次加载
		 */
		async mescrollInit() {
			await this.loadHotVideoList();
			this.isInit = false;
			// 结束上拉加载 && 下拉刷新
			this.mescroll.endSuccess();
		},
		/**
		 * 下拉刷新的回调
		 */
		async downCallback() {
			if (this.isInit) return;
			this.page = 1;
			await this.loadHotVideoList();
			// 结束上拉加载 && 下拉刷新
			this.mescroll.endSuccess();
		},
		/**
		 * 上拉加载的回调
		 */
		async upCallback() {
			if (this.isInit) return;
			this.page += 1;
			await this.loadHotVideoList();
			// 结束上拉加载 && 下拉刷新
			this.mescroll.endSuccess();
		},
	},
};
</script>
```

## 热播列表 - 热播列表 - 点击进入详情页

创建新的分包页面 `video-detail`

为 `hot-video-item` 添加点击事件：

```html
<template>
	<view class="hot-video-item-container">
        ...
		<view @click="$emit('click')">
			<hot-video-info :data="data"></hot-video-info>
		</view>
	</view>
</template>
```

在 `hot-video` 中处理点击事件：

```html
<template>
	<view class="hot-video-container">
        ...
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>
<script>
export default {
	methods: {
        ...
		/**
		 * item 点击事件
		 */
		onItemClick() {
			uni.navigateTo({ url: "/subpkg/pages/video-detail/video-detail" });
		},
	},
};
</script>
```

## 热播详情 - 渲染详情页面的视频组件

因为在 `Uniapp` 中无法直接通过 `navigateTo` 方法，传递一个复杂的对象。

在为了不影响 **简洁数据流** 的前提下，我们通过 `vuex` 来保存当前用户点击的 `video` 数据。

创建 **`store/modules/video`** 模块

```javascript
export default {
    // 独立命名空间
    namespaced: true,
    state: () => ({
        videoData: {}
    }),
    mutations: {
        setVideoData(state, videoData) {
            state.videoData = videoData
        }
    }
}
```

在 **`index.js`** 中注册该模块

```javascript
import Vue from 'vue';
import Vuex from 'vuex'
import video from './modules/video'
Vue.use(Vuex);
// 3. 创建 store 实例
const store = new Vuex.Store({
    // 模块
    modules: {
        ...
        video
    }
});

export default store;
```

在 **`hot-video-item`** 中触发事件

```html
<template>
	<view class="hot-video-item-container">
        ...
		<view @click="$emit('click', data)">
			<hot-video-info :data="data"></hot-video-info>
		</view>
	</view>
</template>
```

在 **`hot-video`** 中注册事件，将 传递过来的数据存储到 vuex 中

```html
<template>
	<view class="hot-video-container">
		<mescroll-body
			ref="meScrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>
<script>
import { mapMutations } from "vuex";
export default {
	methods: {
		...mapMutations("video", ["setVideoData"]),
		/**
		 * item 点击事件
		 */
		onItemClick(data) {
			this.setVideoData(data);
			uni.navigateTo({ url: "/subpkg/pages/video-detail/video-detail" });
		},
	},
};
</script>
.hot-video-container {
```

在 **`video-detail`** 中获取到vuex的数据，并渲染：

```html
<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video
				id="myVideo"
				class="video"
				:src="videoData.play_url"
				enable-danmu
				danmu-btn
			/>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapState("video", ["videoData"]),
	},
};
</script>
```

## 热播详情 - 展示视频弹幕

想要展示视频弹幕，那么首先我们需要获取到 **视频弹幕数据:**

**`api/video`**

```javascript
/**
 * 获取视频弹幕列表
 */
export function getVideoDanmuList(data) {
    return request({
        url: '/video/danmu',
        data
    })
}
```

然后在 **`video-detail`**  中进行请求，并将请求到的数据配置到 video 组件上：

```html
<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video
				id="myVideo"
				class="video"
				:src="videoData.play_url"
				:danmu-list="danmuList"
				enable-danmu
				danmu-btn
			/>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
	</view>
</template>
<script>
import { getVideoDanmuList } from "api/video";
export default {
    ...
	created() {
		this.loadVideoDanMuList();
	},
	methods: {
        ...
		/**
		 * 获取弹幕数据
		 */
		async loadVideoDanMuList() {
			const { data: res } = await getVideoDanmuList({
				videoId: this.videoData.id,
			});
			console.log(res.list);
			this.danmuList = res.list;
		},
	},
};
</script>
```

## 热播详情 - 渲染全部弹幕模块

```html
<template>
	<view class="video-detail-container">
        ...
		<!-- 弹幕模块 -->
		<view class="danmu-box">
			<!-- 弹幕列表 -->
			<view class="comment-cotainer">
				<view class="all-comment-title">全部弹幕</view>
				<view class="list">
					<block v-for="(item, index) in danmuList" :key="index">
						<article-comment-item :data="item"></article-comment-item>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
.video-detail-container {
    ...
	.danmu-box {
		border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
		margin-bottom: 36px;
		.comment-container {
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;
			.all-comment-title {
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
		}
	}
}
</style>
```

## 热播详情 - 渲染底部功能区

此处的 **底部功能区** 与 文章详情的底部功能区一样，所以可以复用 `article-operate` 组件：

```html
<template>
	<view class="video-detail-container">
        ...
		<!-- 底部功能区 -->
		<article-operate
			placeHolder="发个弹幕，开心一下"
			@commitClick="onCommit"
			:articleData="{}"
		></article-operate>
		<!-- popup -->
		<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
			<article-comment-commit v-if="isShowCommit"></article-comment-commit>
		</uni-popup>
	</view>
</template>
<script>
export default {
	data() {
		return 
	         ...
			isShowCommit: false,
		};
	},
	methods: {
        ...
		/**
		 * 发送弹幕事件
		 */
		onCommit() {
			this.$refs.popup.open();
		},
		/**
		 * popup 切换时间
		 */
		onCommitPopupChange(e) {
			if (e.show) {
				this.isShowCommit = e.show;
			} else {
				setTimeout(() => {
					this.isShowCommit = e.show;
				}, 200);
			}
		},
	},
};
</script>
```

功能区的 `placeholder` 与文章详情 **不同** ，可以通过 `props` 指定：

```html
<template>
	<view class="operator-container">
        ...
		<!-- 输入框 -->
		<view class="comment-box" @click="onCommitClick">
			<my-search
				:placeholderText="placeHolder"
				:config="{
					height: 28,
					backgroundColor: '#eeedf4',
					icon: '/static/images/input-icon.png',
					textColor: '#a6a5ab',
					border: 'none',
				}"
			></my-search>
		</view>
	</view>
</template>
<script>
export default {
    ...
	props: {
		placeHolder: {
			type: String,
			default: "评论一句，前排打call...",
		},
		...
	},
};
</script>
```

## 热播详情 - 发布弹幕

`video-detail：`

```html
<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video
				id="myVideo"
				class="video"
				:src="videoData.play_url"
				:danmu-list="danmuList"
				enable-danmu
				danmu-btn
			/>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
        ...
		<!-- 底部功能区 -->
		<article-operate
			placeHolder="发个弹幕，开心一下"
			@commitClick="onCommit"
			:articleData="{}"
		></article-operate>
		<!-- popup -->
		<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
			<article-comment-commit
				v-if="isShowCommit"
				:articleId="videoData.id"
				@success="onSendDanmu"
			></article-comment-commit>
		</uni-popup>
	</view>
</template>
<script>
export default {
	data() {
		return {
			danmuList: [],
			isShowCommit: false,
			// 1. 定义 videoContext 变量
			videoContext: null,
		};
	},
    ...
	// 2. 在 onReady中定义该变量
	onReady() {
		this.videoContext = uni.createVideoContext("myVideo"); // 此处的 myVideo 为 video 组件的 id
	},
	methods: {
        ...
		/**
		 * 发送弹幕成功之后的回调
		 */
		onSendDanmu(data) {
			// 3. 调用 sendDanmu 方法发送弹幕
			this.videoContext.sendDanmu({
				text: data.info.content,
				color: "#00ff00",
			});
			// 4.添加弹幕到弹幕列表
			this.danmuList.unshift(data.info);
			// 5.关闭 popup
			this.$refs.popup.close();
			// 6.关闭 popup 标记
			this.isShowCommit = false;
			// 7. 提示用户
			uni.showToast({
				title: "发表成功",
				icon: "success",
				mask: true,
			});
		},
	},
};
</script>
```

## 热播详情 - 定义弹幕的随机颜色值

在 `utils` 下创建一个新的 `js` 文件，用来定义 **随机颜色方法**：

`utils/index.js`

```js
/**
 * 返回随机色值
 */
export let getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
};

```

在 `video-detail` 中使用该方法：

```html

<script>
import { getRandomColor } from 'utils';
export default {
  ...
  methods: {
    /**
     * 获取弹幕数据
     */
    async loadVideoDanmuList() {
      const { data: res } = await getVideoDanmuList({
        videoId: this.videoData.id
      });
      // 定义随机颜色
      res.list.forEach((item) => {
        item.color = getRandomColor();
      });
      this.danmuList = [...res.list];
      this.commentList = [...res.list];
    },
    ...
    /**
     * 弹幕发布成功之后的回调
     */
    onSendBarrage(data) {
      // 发送弹幕
      this.videoContext.sendDanmu({
        text: data.info.content,
        color: getRandomColor()
      });
       ...
    }
  }
};
</script>
```

## 热播详情 - 处理弹幕列表数据加载动画

当弹幕为空的时候，我们需要给用户一个提示。

以此，弹幕的状态可分为三种：

1. 数据加载中
2. 无弹幕数据
3. 有弹幕数据

那么我们分别对这三种情况进行处理：

```html
<template>
  <view class="danmu-box">
      <!-- 加载动画 -->
      <uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
      <!-- 无弹幕 -->
      <empty-data v-else-if="commentList.length === 0"></empty-data>
      <!-- 弹幕列表 -->
      <view class="comment-container" v-else>
        <view class="all-comment-title">全部弹幕</view>
        <view class="list">
          <block v-for="(item, index) in commentList" :key="index">
            <article-comment-item :data="item" />
          </block>
        </view>
      </view>
    </view>
</template>

<script>
...
export default {
  data() {
    return {
     ...
      // 弹幕列表数据加载中
      isLoadingComment: true
    };
  },
  methods: {
    /**
     * 获取弹幕数据
     */
    async loadVideoDanmuList() {
      ...
      this.isLoadingComment = false;
    },
  }
};
</script>
```

## uniapp 中的条件编译

想要搞定适配的功能，那么我们首先需要了解一个东西，那就是：[条件编译](https://uniapp.dcloud.io/platform)

我们可以通过：**特殊的注释作为标记，将注释里面的代码编译到不同平台**。

这样的注释主要有两种：

1. 以 `#ifdef %PLATFORM% ` 开头，以 `#endif` 结尾：仅在某平台存在
2. 以 `#ifndef %PLATFORM%  ` 开头，以 `#endif` 结尾：除了某平台均存在

其中 `%PLATFORM% ` 表示 **平台名称**

比如说，我们可以在 `App.vue` 中，写下这样一行代码：

```html
<script>
export default {
	onLaunch: function () {
		// 当项目运行到 H5 端的时候，进行一个打印：当前处于 H5 编译平台
		/* #ifdef H5 */
		console.log("当前处于H5编译平台");
		/* #endif */
		// 当项目运行到 非H5 端的时候，进行一个打印：当前处于非 H5 编译平台
		/* #ifndef H5 */
		console.log("当前处于非H5编译平台");
		/* #endif */
	},
	onShow: function () {},
	onHide: function () {},
};
</script>

<style>
/*每个页面公共css */
</style>

```

## 多平台适配 - `tabs` 置顶效果消失

### 分析原因

在控制台中检查 `tab-sticky` 的，我们可以发现 它的样式指定其实是没有问题的：

![](imooc-blog项目开发-下(uniapp)/3.jpg)

`position: sticky` 依然生效，那么问题是出现在哪里呢？

当我们把页面进行滚动之后，然后再控制台查看 `tab-sticky` 的位置，此时我们就可以发现问题：

![](imooc-blog项目开发-下(uniapp)/55.jpg)

`tab-sticky` 虽然吸顶了，但是它的吸顶位置为 `top:0` 。

这样的效果在 **微信小程序是没有问题的**，但是在 **浏览器端就会被遮挡！**

### 解决方案

明确了原因之后，想要处理这个问题就很容易了。我们只需要在 **浏览器端调整 `top` 的位置就可以了。**

### 处理代码

`hot.vue`

```css
  .tab-sticky {
    position: -webkit-sticky;
    position: sticky;
    z-index: 99;
    /* #ifndef H5 */
    top: 0;
    /* #endif */
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
  }
```

## 多平台适配 - 火狐浏览器处理粗滚动条

### 分析原因

在浏览器中出现 **粗滚动条** 的原因是因为： **浏览器对滚动条的处理问题**。

### 解决方案

隐藏浏览器滚动条

### 处理代码

`my-tabs`

```scss
  /* #ifdef H5 */
  /deep/.uni-scroll-view::-webkit-scrollbar {
    display: none;
  }

  /deep/.uni-scroll-view {
    scrollbar-width: none;
  }
  /* #endif */
```

## 多平台适配 -  `ui` 错乱 与 文章详情无法展示

### 分析原因

在我们刚进入到首页的时候，我们的 `ui` 是没有任何问题的。但是当我们进入到 **文章详情** 在返回到首页时，我们就会发现：**`item` 的 `ui` 变得错乱了** 

那么想要去分析这个问题的原因，就需要到 **文章详情** 页面，看一下，看看 **文章详情** 究竟做了什么事情。

在 **文章详情** 中，我们之前使用过 `page-meta` 来去处理：**微信小程序中文章详情文字过小的问题**。

而现在在 **浏览器端** 之所以出现这些问题，就是因为 `page-meta` 导致的。

### 解决方案

在 `h5` 中，不使用 `page-mate` ，只使用 `article-detail.scss` 中的 

```css
html {
  font-size: 52px;
}
```

即可

### 处理代码

```html
<template>
  <!-- #ifndef H5 -->
  <page-meta root-font-size="52px">
    <!-- #endif -->
    ...
    <!-- #ifndef H5 -->
  </page-meta>
  <!-- #endif -->
</template>
```

## 多平台适配 -  文章详情样式处理

### 分析原因

通过控制台查看，我们可以发现 `article-detail.scss` 文件的样式并没有生效，出现这个问题的原因，是因为当 `uni-app` 运行到浏览器端的时候，页面组件中 `style` 标签的引入会失效。

### 解决方案

在 `main.js` 中统一引入

### 处理代码

```js
...
// 文章详情样式
import './styles/article-detail.scss';
...
```

## 多平台适配 -  热播视频全部无法播放

### 分析原因

在浏览器中视频无法播放，并且会出现 403 的错误。

对于这一块，大家需要首先先明确 `403` 错误表示的是什么意思：

> 403错误是一种在网站访问过程中，常见的错误提示，表示资源不可用。 服务器理解客户的请求，但拒绝处理它，通常由于服务器上文件或目录的权限设置导致的WEB访问错误。

简单来说就是：服务端不愿意处理你的请求。

在某些网站中，服务端只会处理 **它信任的客户端请求，而不愿意处理它不认识的客户端的请求。** 

而想要解决这个问题，我们就需要对 **请求进行伪装**，我们无法伪装成 **他信任的人**，但是我们可以 **隐藏身份，让服务端不确定它是不是认识你。** 这样在默认情况下，服务端就 “勉为其难” 的处理你的请求。

那么想要进行伪装，就需要使用到  [referrer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy) 的 `no-referrer` 指令

### 解决方案

1. 在项目的根目录创建 `index.html` 文件，作为 **根模板**。（可参考：[自定义模板](https://uniapp.dcloud.io/collocation/manifest?id=h5) 相关文档）
2. 添加 `<meta name="referrer" content="no-referrer" />` 标签
3. 在 `manifest.json->h5->template` 节点中关联这个`html`文件的路径
4. 重新编译项目到浏览器

### 处理代码

`index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>
            <%= htmlWebpackPlugin.options.title %>
        </title>
				<!-- 访问来源信息不随着请求一起发送 -->
				<!-- 解决 web 访问商品 403 的问题 -->
				<meta name="referrer" content="no-referrer" />
        <!-- Open Graph data -->
        <!-- <meta property="og:title" content="Title Here" /> -->
        <!-- <meta property="og:url" content="http://www.example.com/" /> -->
        <!-- <meta property="og:image" content="http://example.com/image.jpg" /> -->
        <!-- <meta property="og:description" content="Description Here" /> -->
        <script>
            var coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') || CSS.supports('top: constant(a)'))
            document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' + (coverSupport ? ', viewport-fit=cover' : '') + '" />')
        </script>
        <link rel="stylesheet" href="<%= BASE_URL %>static/index.<%= VUE_APP_INDEX_CSS_HASH %>.css" />
    </head>
    <body>
        <noscript>
            <strong>Please enable JavaScript to continue.</strong>
        </noscript>
        <div id="app"></div>
        <!-- built files will be auto injected -->
    </body>
</html>
```

`manifest.json`

```json
  "h5": {
    "template": "index.html"
  }
```

或在 HBuilderX中修改：

![](imooc-blog项目开发-下(uniapp)/6.jpg)

## 多平台适配 -  一键登录功能

### 分析原因

在 `my-login` 中，只处理了 **微信一键登录** 的功能

### 解决方案

按照接口，直接处理对应数据即可。

### 处理代码

`my-login`

```html
<template>
  <view class="my-container">
    <!-- 用户未登录 -->
    <block v-if="!token">
      <image class="avatar avatar-img" src="/static/images/default-avatar.png" mode="scaleToFill" />
      <view class="login-desc">登录后可同步数据</view>
      <!-- #ifdef MP-WEIXIN -->
      <button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <button class="login-btn" type="primary" @click="onAutoLogin">一键登录</button>
      <!-- #endif -->
    </block>
  </view>
</template>

<script>
export default {
  methods: {
    ...
    /**
     * 一键登录
     */
    async onAutoLogin() {
      // 展示加载框
      uni.showLoading({
        title: '加载中'
      });
      await this.login({
        encryptedData: 'BmGEMqpGI5w',
        errMsg: 'getUserProfile:ok',
        iv: 'c+NbINO4CuEWCBYGG2FxWw==',
        rawData:
          '{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
        signature: '449a10f11998daf680fe546a5176e6e2973516ce',
        userInfo: { nickName: '小慕同学', gender: 1, language: 'zh_CN', city: '', province: '' }
      });
      this.$emit('onLoginSuccess');
      // 隐藏loading
      uni.hideLoading();
    },
  }
};
</script>
```

## 打包微信小程序

1. 打开 `HBuilder`
2. 打开当前要打包的项目
3. 点击发行，找到【小程序 - 微信】
   ![](imooc-blog项目开发-下(uniapp)/7.jpg)
4. 确认小程序名称和 `appid`，确认无误点击 【发行】
   ![](imooc-blog项目开发-下(uniapp)/8.jpg)
5. 等待控制台编译
6. 编译完成之后，会自动打开【微信开发者工具】
7. 点击【上传】即可
   ![](imooc-blog项目开发-下(uniapp)/9.jpg)

## 打包H5

1. 打开 `HBuilder`
2. 打开当前要打包的项目
3. 点击发行，找到【网站 - PC web 或手机 H5 】
   ![](imooc-blog项目开发-下(uniapp)/10.jpg)
4. 确认【网站标题】，无需【网站域名】，直接点击发行即可
   ![](imooc-blog项目开发-下(uniapp)/11.jpg)
5. 等待项目编译
   ![](imooc-blog项目开发-下(uniapp)/12.jpg)
6. 编译成功后，项目会被导出到指定路径
   ![](imooc-blog项目开发-下(uniapp)/13.jpg)
7. 找到该路径下的文件，即为【打包后的问题】
  
8. **注意：** 不可直接打开 `index.html` 进行访问，需要通过 `web 服务` 进行访问！（可以使用vercel进行编译）

![](imooc-blog项目开发-下(uniapp)/14.jpg)