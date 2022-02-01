---
title: Vue-Router源码解析
tags:
  - Vue
categories:
  - 大前端
  - Vue
abbrlink: 2ca750a
date: 2021-10-15 08:05:23
---

# Vue-Router

## 演示基本效果

## Vue-Router 源码结构

![](Vue-Router源码解析/1.jpg)

### Vue.use() 注册插件源码

- src\core\global-api\use.js

```js
export function initUse (Vue: GlobalAPI) {
  // Vue.use(VueRouter, options)
  Vue.use = function (plugin: Function | Object) {		// 此处plugin代表插件，此外可能还会传入一些配置项
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {		// 判断插件数组中是否已经有值，若有则直接结束
      return this
    }

    // additional parameters
    // 把数组中的第一个元素(plugin)去除
    const args = toArray(arguments, 1)		
    // 把this(Vue)插入第一个元素的位置
    args.unshift(this)
    if (typeof plugin.install === 'function') {		// 如果传的插件是对象，且内部有install方法，直接调用install方法，并传入args。
        
      plugin.install.apply(plugin, args)  // plugin.install(args[0], args[1]),此处使用apply是为了传args参数，并没有起到改变this指向的作用（原先this就为plugin）	。使得install的参数变为(vue，someoptions)
        
    } else if (typeof plugin === 'function') {	// 如果传的插件是函数，，直接调用函数，并传入args。
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)		// 保存已安装的插件
    return this
  }
}
```

## 模拟整体结构

### VueRouter 基本结构

```js
export default class VueRouter {
  constructor (options) {  // 此处的options为一些路由规则 + 路由模式（mode）
    // 记录所有的路由规则
    this._routes = options.routes || []
  }
  
  init () {}
}
```

### install 方法

- 注册 VueRouter 插件，并给 Vue 根实例，以及每一个子组件对象设置 _routerRoot ，让子组件可以获取到根实例，以及根实例中存储的 _router 对象

```js
export let _Vue = null
export default function install (Vue) {
  if (install.installed && _Vue === Vue) return   // 如果本插件已经被安装，则直接返回，此处需要学习的是：可以在函数内部通过函数名获取到本函数
  install.installed = true
  
  _Vue = Vue
  _Vue.mixin({		// 通过在Vue中添加混入，使得所有的Vue实例中都具有本beforeCreate方法。// 实现在所有Vue实例和组件中都能够访问到router。
    beforeCreate () {	
      // 判断当前是否是 Vue 的根实例
      if (this.$options.router) {		// 此处的this为Vue的根实例(new Vue())，只有根实例才拥有this.$options属性
        this._router = this.$options.router		
        // 根实例记录自己，目的是在子组件中通过 _routerRoot 获取到 _router 对象
        this._routerRoot = this
        // 此处调用init，并传入vue实例  
        this._router.init(this)
      } else {
        // 给子组件设置 routerRoot，让子组件能够通过 routerRoot._router 找到 router 对象（此处将名称也设置为_routerRoot，以便后续的深层子组件也可以获取到Vue根实例的router属性）
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}
```

<div class="warning">

> 个人理解：在我们使用VueRouter时，总共有三个步骤：1.在routes/index.js中使用Vue.use(VueRouter)，2.在routes/index.js中const router = new VueRouter({
> routes
> })
> 3.在main.js中新建Vue时传入第二步创建的router
>
> 此处第一步是为了调用VueRouter中创建的install函数，来将第三步的router绑定到所有的Vue实> 例和组件中。第2不是为了给router实例添加各种VueRouter提供的方法，并传入routes来为各个> 路由、组件建立对应关系。第三步是为了给Vue组件的$options属性添加一个router属性，使得
> install方法中可以访问到options.router的内容并实现将router绑定到所有的Vue实例和组件中

</div>



- 挂载 install

```js
import install from './intall'
export default class VueRouter {
  constructor (options) {
    // 记录所有的路由规则
    this._routes = options.routes || []
  }

  // 初始化事件监听器，监听路由地址的变化
  // 改变 url 中的路由地址
  init (app) {
  }
}
VueRouter.install = install
```



### router-link、router-view

- 此时创建这两个组件的目的是为了测试
- router-link

```js
export default {
  name: 'RouterLink',
  props: {
    to: {   // to表示跳转地址
      type: String,
      required: true
    }
  },
  // template: '<a :href="{{ '#' + this.to }}"><slot name="default"></slot></a>'
  render(h) {
    return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])    // 此处使用hash模式来写 
  }
}
```

- router-view

```js
export default {
  render (h) {
    // return h('div','这是routerview')
    return h()		// 此种写法会生成一个空注释
  }
}
```

- install.js(注册组件)

```javascript
import Link from './components/link'
import View from './components/view'

export let _Vue = null
export default function install (Vue) {
   if (install.installed && _Vue === Vue) return   // 如果本插件已经被安装，则直接返回，此处需要学习的是：可以在函数内部通过函数名获取到本函数
  install.installed = true
  _Vue = Vue
......

  _Vue.component(Link.name, Link)
  _Vue.component(View.name, View)

......
}

```



### createMatcher  和  createRouteMap

#### createMatcher

- 创建并返回一个匹配器，包含 match 方法和 addRoutes 方法
  - match 根据路由地址匹配相应的**路由规则**对象
  - addRoutes 动态添加路由
- 把所有的路由规则解析成路由表
  - pathList 是一个数组，存储所有的路由地址
  - pathMap 路由表，路由地址 -> record 一个记录（path、component、parent）

```js
import createRouteMap from './create-route-map'

export default function createMatcher (routes) {
  // routes 所有的路由规则
  // 把路由规则解析成数组和对象的形式存储到 pathList pathMap
  const { pathList, pathMap } = createRouteMap(routes)  // 真正把路由规则解析成路由表是在createRouteMap

  function match (path) {		// 根据path实现相关的信息

  }
  function addRoutes (routes) {		// 用于手动添加路由规则
		createRouteMap(routes, pathList, pathMap)
  }
  return {
    match,
    addRoutes
  }
}
```

#### createRouteMap

- 遍历所有的路由规则，生成路由表
- 如果有子路由的话，递归添加子路由到路由表

```js
export default function createRouteMap (routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []		// 存储所有的路由地址
  const pathMap = oldPathMap || {}		// 路由表，存储路径和组件的相关信息
  // 遍历路由规则，解析成路由表
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })
  return {
    pathList,
    pathMap
  }
}
// 添加路由表
function addRouteRecord (route, pathList, pathMap, parentRecord) {
  const path = parent ? `${parent.path}/${route.path}` : route.path
  const record = {
    path: path,
    component: route.component,
    parent: parentRecord // 如果是子路由的话，记录子路由的 parentRecord
  }

  // 如果路由表中有已经有该路径，不做处理
  if (!pathMap[path]) {
    pathMap[path] = record
    pathList.push(path)
  }
  // 如果有子路由，递归添加到对应的 pathList 和 pathMap 中
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, parentRecord)
    })
  }
}
```

#### createMatcher -- match

- 根据路由地址，匹配一个**路由数据对象 route** { matched, path }	matched ==》 [record1，record2]
  - create-matcher.js 中

```js
function match (path) {
  const record = pathMap[path]
  if (record) {		// 如果可以在pathMap中根据路径找到对应的组件
    return createRoute(record, path)		// 调用createRoute创建对应的路由数据对象
  }
  return createRoute(null, path)
}
```

- createRoute 根据路由地址，创建 route 路由规则对象
  - route --> { matched: [ musicRecord ], path: '/music' }
  - 如果是子路由的话，找到他的所有父路由对应的 record 插入到数组的第一项中，确保父组件的信息在子组件之前。
  - matched 数组中 -> [musicRecord, popRecord]     /music/pop

```js
function createRoute (record, path) {
  const matched = []
  while (record) {
    matched.unshift(record)
    record = record.parent
  }
  return {
    matched,
    path
  }
}
```

- VueRouter 的构造函数中

```js
import createMatcher from './create-matcher'

export default class VueRouter {
  constructor(options) {  
    // createMatcher 返回 match 匹配的方法 和 addRoutes 动态添加路由的方法
    this.matcher = createMatcher(this._routes)
  }
  ......
}
```



### History 历史管理

- hash 模式
- html 5 模式

- History 父类
  - router 属性
  - current 属性，记录当前路径对应的**路由规则对象** {path:'/', matched: []}
  - transitionTo(path, onComplete)  
    - 跳转到指定的路径，根据当前路径获取匹配的路由规则对象 route，然后更新视图

```js
export default class History {
  constructor (router) {
    this.router = router
    // current用于当前路径获取到的匹配的结果
    //  { path:'/', matched: [] }
    this.current = createRoute(null, '/')
  }
  transitionTo (path, onComplete) {
    // 根据路径获取匹配到的路由规则对象，渲染页面
    // { path: '/music/pop', matched: [musicRecord, popRecord] }
    this.current = this.router.matcher.match(path)
    console.log(path, this.current)
    onComplete && onComplete()
  }
}
```

- HashHistory
  - 继承 History
  - 确保首次访问地址为 #/
  - getCurrentLocation() 获取当前的路由地址（# 后面的部分）
  - setUpListener()  监听路由地址改变的事件

```js
import History from './base'
export default class HashHistory extends History {
  constructor (router) {
    super(router)
    // 如果是第一次访问设置为首页 #/
    ensureSlash()
  }
  getCurrentLocation () {
    return window.location.hash.slice(1)
  }
  setUpListener () {
    window.addEventListener('hashchange', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }
}
function ensureSlash () {
  // 判断当前路径中是否有hash，有值直接返回
  if (window.location.hash) {
    return
  }
  // 没有则进行设置
  window.location.hash = '/'
}
```

- VueRouter 构造函数中初始化 history
  - 根据创建 VueRouter 传来的 mode 决定使用哪个 History 对象

```js
const mode = this.mode = options.mode || 'hash'		// 判断选项中是否有mode，如果没有默认为hash
switch (mode) {
  case 'hash':
    this.history = new HashHistory(this)
    break
  case 'history':
    this.history = new HTML5History(this)
    break
  default:
    throw new Error('mode error')
}
```



- VueRouter 的 init 中调用

```js
// 初始化事件监听器，监听路由地址的变化
// 改变 url 中的路由地址
init (app) {
  const history = this.history
  const setUpListener = _ => {		// 个人理解：当install中beforeCreate进入第一层判断，及创建new Vue时，会调用init函数(只会调用一次)，从而给window添加一个hashchange事件。
    history.setUpListener()
  }
  history.transitionTo(
    history.getCurrentLocation(),
    // history.setUpListener   此处不可以直接这么写，因为transitionTo的第二个参数(onComplete)，是直接调用的，setUpListener内部的this会发生错误（原本因为history却变为了window）。
    setUpListener
  )
}

// install 中调用 init()
```

### 给 router 对象设置响应式的 _route 属性

> 为了使得current变化后视图也产生变化

- 参考源码，在 install.js 中

```js
Vue.util.defineReactive(this, '_route', this._router.history.current)	// this为Vue实例，给Vue实例新增一个_route属性，将history.current赋值给_route，并将_route变为响应式（此时current改变并不能是_route改变）
```

- 让 _route 改变
- 在 history/base.js 中

```js
import createRoute from '../util/route'
export default class History {
  constructor (router) {
    this.router = router
    // 记录当前路径对应的 route 对象 { matched, path }
    this.current = createRoute(null, '/')
    // 增加一个回调函数属性
    this.cb = null
  }

  // 增加一个 listen 方法
  // 在 transitionTo 中调用，触发回调，给 _route 赋值
  listen (cb) {
    this.cb = cb
  }

  transitionTo (path, onComplete) {
    this.current = this.router.matcher.match(path)

    // 调用 listen 中设置的回调，并且把 最新的 current 传递给 cb
  	// cb 中把当前的 current 赋值给 app._route 响应式数据发生变化，更新视图
    this.cb && this.cb(this.current)
    onComplete && onComplete()
  }
}
```

- VueRouter 中
  - index.js

``` js
init () {
  …………
  // init 的最后调用 父类中的 listen 方法
  // 在回调中给 _route 重新赋值，更新视图
  history.listen(route => {
    app._route = route
    console.log(app._route)
  })
}
```

### $route/$router

- install.js 中

```js
Object.defineProperty(Vue.prototype, '$route', {
  get () {
    return this._routerRoot._route
  }
})

Object.defineProperty(Vue.prototype, '$router', {
  get () {
    return this._routerRoot._router
  }
})
```

### router-view

- 获取当前组件的 $route 路由规则对象
- 找到里面的 matched 匹配的 record （里面有 component）
- 如果是 /music 的话，matched 匹配到一个，直接渲染对应的组件
- 如果是 /music/pop 的话，matched 匹配到两个 record（第一个是父组件，第二个是子组件）

```js
render (h) {
  // 根据路径找到 route ，看里面的 matched 有几个
  // this.$route
  let depth = 0
  const route = this.$route

  // 标识当前组件是一个 router-view
  this.routerView = true

  // /music/pop
  // matched -->  [musicRecord,popRecord]
  let parent = this.$parent
  while (parent) {
    // 如果当前组件的父组件也是 router-view ，这时候让depth++，使得route.matched匹配到子组件
    // 由于/music/pop中，App组件中的router-view会将Music渲染出来，同时Music中的router-view又能将Pop渲染出来。就实现了多层路由的效果。
    if (parent.routerView) {
      depth++
    }
    parent = parent.$parent		// 如果其父组件还有父组件，则说明其在matced数组中排第三。故depth再++。
  }

  const record = route.matched[depth]
  if (!record) {
    return h()
  }
  const component = record.component
  return h(component)
}
```







### 模拟导航守卫(钩子函数)

- router 中增加属性记录所有的钩子函数
  - index.js

```js
// 增加一个属性，记录所有 beforeEach 注册的钩子函数
this.beforeHooks = []

// 定义 beforeEach 方法
beforeEach (fn) {
  this.beforeHooks.push(fn)
}
```

- base.js 中，在跳转之前执行这些方法

```js
 transitionTo (path, onComplete) {
    const current = this.router.matcher.match(path)
    // 在页面跳转之前（重新渲染之前）
    // 执行钩子函数，传入 to 和 from
    this.router.beforeHooks.forEach(hook => {
      hook(current, this.current)
    })

    this.current = current
    this.cb && this.cb(this.current)
    onComplete && onComplete()
  }
```