---
title: Vue.js 源码剖析-模板编译
tags:
  - Vue
categories:
  - 大前端
  - Vue
abbrlink: 41844f31
date: 2021-10-25 21:34:10
---

## 模板编译简介

- 模板编译的主要目的是将（template）转换为渲染函数（render）

  ```html
  <div>
      <h1 @click="handler">title</h1>
      <p>some content</p>
  </div>
  ```

  渲染函数

  ```javascript
  render (h) {
  	return h('div', [
  		h('h1', { on: { click: this.handler} }, 'title'),
  		h('p', 'some content')
  	])
  }
  ```

  从以上两段代码可以看出，写模板比写渲染函数更加直观，开发速度也会更快。

> 模板编译的作用

- Vue2.x 使用VNode描述视图以及各种交互，用户自己编写VNode比较复杂
- 用户只需要编写类似HTML的代码 - Vue.js模板，通过编译器将模板转换为返回VNode的render函数
- .vue文件会被webpack在构建的过程中转换成render函数。webpack本身不支持，是通过vue-loader来实现的。

## 体验模板编译的结果

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>compile</title>
</head>
<body>
  <div id="app">
    <h1>Vue<span>模板编译过程</span></h1>
    <p>{{ msg }}</p>
    <comp @myclick="handler"></comp>
  </div>
  <script src="../../dist/vue.js"></script>
  <script>
    Vue.component('comp', {
      template: '<div>I am a comp</div>'
    })
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'Hello compiler'
      },
      methods: {
        handler () {
          console.log('test')
        }
      }
    })
    console.log(vm.$options.render)
  </script>
</body>
</html>
```

> 以上代码中，既没有提供render，也没有提供template，则Vue会去找el的outerHTML作为template进行编译

我们来看编译结果：

```javascript
(function anonymous() {
    with (this) {		// with的作用的将来在代码块中使用this的成员对象(_m,_v,...)时可以省略this
        return _c(
            "div",
            { attrs: { id: "app" } },
            [
                _m(0),
                _v(" "),
                _c("p", [_v(_s(msg))]),
                _v(" "),
                _c("comp", { on: { myclick: handler } }),
            ],
            1
        );
    }
});
```

编译生成的函数的位置：

- _c()
  - src\core\instance\render.js
- \_m()/\_v()/\_s()
  - src\core\instance\render-helpers\index.js

我们首先找到\_c()定义的位置：

```javascript
// 对编译生成的 render 进行渲染的方法（把模板编译为render函数时调用的）
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)		// 其中的最后一个属性设为false用来区分对子节点的操作
```

接着来看其它编译函数的位置：

```javascript
export function installRenderHelpers (target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString		// toString函数，判断参数是否为null，为null直接返回空字符串，否则再判断参数是否是数组或对象，是的话调用JSON.stringfy，否则调用string。
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic		// 用来处理静态内容
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode		// 创建一个文本的VNode节点
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```

可以看到在render\helpers\index.js中定义了installRenderHelpers方法，同时可以在instance\render.js中找到如下代码

```javascript
installRenderHelpers(Vue.prototype)
```

可以看到其将一堆编译函数添加到了Vue.prototype上。

