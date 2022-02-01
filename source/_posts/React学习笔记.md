---
title: React学习笔记
abbrlink: 828ccc9a
date: 2021-12-12 10:31:34
tags:
  - React
---

## 小知识点
**shift + F5 ：强制刷新浏览器**
**ctrl+`：在VSCODE中打开/关闭终端**
## React简介

> **用于构建用户界面的JavaScript库**
>
> **是一个将数据渲染为HTML视图的开源JavaScript库。**

> **由Facebook开发，且开源**
>
> **React正在被腾讯、阿里等一线大厂广泛使用。**

> **为什么要学？**
>
> 1. **原生JavaScript操作DOM繁琐、效率低（DOM-API操作UI）。**
> 2. **使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排。(即便用jQuery，也只是方便了编码，并没有增加页面性能)**
> 3. **原生JavaScript没有组件化编码规范，代码复用率低。**

> **React的特点？**
>
> 1. **采用组件化模式、声明式编码，提高开发效率及组件复用率。**
> 2. **在React Native中可以使用React语法进行移动端开发。**
> 3. **使用虚拟DOM（放在内存中）+优秀Diffing算法，尽量减少与真实DOM的交互。**

- **原生JS实现：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/b59ae2b3e4394f04b0b27c9235e164de.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/8aef7248d7fd4c9aa80c948b13df6e0b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **新增加一条数据则直接全部重新渲染**

- **React实现**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/57a4b6a1b3e04c4eb654a3227202575a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **新的虚拟DOM与旧的虚拟DOM进行比较。发现新的虚拟DOM只有一条不同，所以真实DOM只增加了一条。**

> **React高效的原因**
> 1. **使用虚拟(virtual)DOM，不总是直接操作页面真实DOM。**
> 2. **DOM Diffing 算法，最小化页面重绘。**

## React的基本使用
> **babel.min.js：编译jsx语法，jsx->js。**
> **react.development.js：react核心库**
> **react-dom.development.js：react扩展库(操作dom)**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello_react</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel"> /* 此处一定要写babel */
        // 1.创建虚拟DOM
        const VDOM = <h1>Hello,React</h1>   /* 此处一定不要写引号，因为不是字符串 */
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))   // 此处React没有提供选择器语法，需要自己获取DOM节点
    </script>
</body>

</html>
```

> **此种情况下运行，浏览器会进行警告。因为我们是用babel翻译的。**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/52e670b762c045548a3f3ae20d604530.png)**
- **同一个容器重复render会覆盖**
```html
<script type="text/babel"> /* 此处一定要写babel */
        // 1.创建虚拟DOM
        const VDOM = <h1>Hello,React</h1>   /* 此处一定不要写引号，因为不是字符串 */
        const VDOM2 = <h1>Hello,React2</h1>   /* 此处一定不要写引号，因为不是字符串 */
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))   // 此处React没有提供选择器语法，需要自己获取DOM节点
        ReactDOM.render(VDOM2, document.getElementById('test'))   // 此种情况下，会进行覆盖
    </script>
```

## 虚拟DOM的两种创建方式
### 使用jsx创建虚拟DOM
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_使用jsx创建虚拟DOM</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel"> /* 此处一定要写babel */
        // 1.创建虚拟DOM
        const VDOM = (
            <h1 id="title">
                <span>Hello,React</span>
            </h1>
        )   /* 此处一定不要写引号，因为不是字符串 */
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))   // 此处React没有提供选择器语法，需要自己获取DOM节点
    </script>
</body>

</html>
```

### 使用js创建虚拟DOM
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2_使用js创建虚拟DOM</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>

    <script type="text/javascript">
        // 1.创建虚拟DOM
        // const VDOM = React.createElement(标签名, 标签属性, 标签内容);
        // const VDOM = React.createElement('h1', { id: 'title' }, '<span>Hello,React</span>');  // 此种写法无法达成效果
        const VDOM = React.createElement('h1', { id: 'title' }, React.createElement('span', {}, 'Hello,React'));
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))   // 此处React没有提供选择器语法，需要自己获取DOM节点
    </script>
</body>

</html>
```
> **由此可见，使用jsx可以方便虚拟DOM的创建。jsx就是原始创建虚拟dom的一个语法糖。**

### 虚拟DOM与真实DOM
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3_虚拟DOM与真实DOM</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <div id="demo"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel"> /* 此处一定要写babel */
        // 1.创建虚拟DOM
        const VDOM = (
            <h1 id="title">
                <span>Hello,React</span>
            </h1>
        )   /* 此处一定不要写引号，因为不是字符串 */
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))   // 此处React没有提供选择器语法，需要自己获取DOM节点
        console.log("虚拟DOM", VDOM);
        const TDOM = document.getElementById('demo')
        console.log("真实DOM", TDOM);
        console.log(typeof VDOM);   // object
        console.log(VDOM instanceof Object);    // true
        debugger
        /*
            关于虚拟DOM：
            1.本质是Object类型的对象（一般对象）
            2.虚拟DOM比较“轻”，真实DOM比较“重”。因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
            3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
        */
    </script>
</body>

</html>
```

## JSX语法规则
> **全称：Javascript XML。**
> **react定义的一种类似于XML的JS扩展语法：JS+XML。**
> **本质是  React.createElement(components,props,...children)  方法的语法糖。**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jsx语法规则</title>
    <style>
        .title {
            font-size: 50px;
            background: orange;
        }
    </style>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        const myId = 'aTgUiGu'
        const myData = 'HeLLo,rEact'

        // 1.创建虚拟DOM
        const VDOM = (
            <div>
                <h2 className="title" id={myId.toLowerCase()}>
                    <span style={{ color: "white", fontSize: '50px' }}>{myData.toUpperCase()}</span>
                </h2>
                <h2 className="title" id={myId.toUpperCase()}>
                    <span style={{ color: "white", fontSize: '50px' }}>{myData.toUpperCase()}</span>
                </h2>
                <input type="text" />
                <good>123</good>
            </div>
        )
        // 2.渲染虚拟DOM到页面
        ReactDOM.render(VDOM, document.getElementById('test'))

        /*
            jsx语法规则：
                1.定义虚拟DOM时，不要写引号。
                2.标签中混入JS表达式时要用{}。
                3.样式的类名指定不要用class，要用className。（因为class是ES6中类定义的关键字）
                4.内联样式，要用style={{key:value}}的形式去写
                5.只有一个根标签
                6.标签必须闭合
                7.关于标签首字母
                    (1).若小写字母开头，则将该标签转为html中同名元素。若html中无该标签对应的同名元素，则报错。
                    (2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
        */
    </script>
</body>

</html>
```

##  JSX小练习
>  **一定注意区分：【js语句（代码）】与【js表达式】**
>
>  **1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方**
>                  **下面这些都是表达式**
>                      **（1）. a**
>                      **（2）. a+b**
>                      **（3）. demo(1)**
>                      **（4）. arr.map()**
>                      **（5）. function test (){}**
>
>  **2.语句（代码）:**
>   **下面这些都是语句（代码）：**
>  **（1）. if(){}**
>  **（2）. for(){}**
>  **（3）. switch(){case:xxxx}**     


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jsx小练习</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">

        // 模拟一些数据
        const data = ['Vue', 'React', 'Angular']
        // const obj = { name1: 'Vue', name2: 'React', name3: 'Angular' }   // React无法直接遍历对象
        // 1.创建虚拟DOM
        const VDOM = (
            <div>
                <h1>前端js框架列表</h1>
                <ul>
                    {
                        data.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
        ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
</body>

</html>
```
>**![在这里插入图片描述](https://img-blog.csdnimg.cn/bf45b11b7f6d4ed5ba9e2d690d02ee07.png)**
>**当运行代码为React所写却却未经打包，则会显示此种图标**

## 函数式组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_函数式组件</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建函数式组件
        function Demo() {   // 此处Demo是一个组件，而且由于是组件，Demo的首字母必须大写。
            console.log(this);  // undefined，因为此处babel编译开启了严格模式
            return <h2>我是用函数定义的组件（适用于【简单组件】的定义）</h2>
        }
        // 2.渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
        /*
            执行了ReactDOM.render(MyComponent/)、、、、、、之后，发送了什么?
             1.React解析组件标签，找到了MyComponent组件。
             2.发现组件是使用函数定义的，随后调用该喊叔叔，将返回的虚拟DOM转为真实DOM。
        */
    </script>
</body>

</html>
```

## 类复习
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_类的基本知识</title>
</head>

<body>
    <script type="text/javascript">
        // 创建一个Person类
        class Person {
            // 构造器方法
            constructor(name, age) {
                // 构造器中的this是谁？ -- 类的实例对象
                this.name = name;
                this.age = age;
            }
            // 一般方法
            speak() {
                // speak方法放在了哪里？ -- 类的原型对象上
                // 通过Person实例调用speak时，speak中的this就是Person实例
                console.log(`我叫${this.name}，我的年龄是${this.age}`);
            }
        }
        // 创建一个Person的实例对象
        const p1 = new Person('tom', 18)
        const p2 = new Person('jerry', 19)

        console.log(p1);
        console.log(p2);
        p1.speak()
        p2.speak()
        p1.speak.call({ name: 'xxc', age: 50 }) // 此种情况不是通过Person实例调用speak，所以speak中的this不是Person实例
    </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_类的基本知识</title>
</head>

<body>
    <script type="text/javascript">
        // 创建一个Person类
        class Person {
            // 构造器方法
            constructor(name, age) {
                // 构造器中的this是谁？ -- 类的实例对象
                this.name = name;
                this.age = age;
            }
            // 一般方法
            speak() {
                // speak方法放在了哪里？ -- 类的原型对象上
                // 通过Person实例调用speak时，speak中的this就是Person实例
                console.log(`我叫${this.name}，我的年龄是${this.age}`);
            }
        }

        // 创建一个Student类，继承于Person类
        class Student extends Person {
            constructor(name, age, grade) {
                super(name, age);    // 此处写了构造器，则必须要写super();且得在最开始调用。
                this.grade = grade;
            }
            // 重写从父类中继承的方法
            speak() {
                console.log(`我叫${this.name}，我的年龄是${this.age}，我读的是${this.grade}年级`)
            }
            // study方法放在了哪里？ -- 类的原型对象上
            // 通过Person实例调用study时，study中的this就是Person实例
            study() {
                console.log('我很努力的学习');
            }
        }

        const s1 = new Student('小张', 15); // 此处即便类中没有构造器也可以创建成功，因为Student继承了Person的构造器
        const s2 = new Student('小张', 15, '高一');
        console.log(s1);
        s1.study();
        s1.speak();
        console.log(s2);
    </script>
</body>

</html>
```
**![l](https://img-blog.csdnimg.cn/70b7e00e2aba4c50ba65bea69ae4f4ed.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_17,color_FFFFFF,t_70,g_se,x_16)**
>  **总结：**
>  **1.类中的构造器不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时，才写。**
>   **2.如果A类继承了B类，且A类中写了构造器，那么A类构造器中super是必须要调用的。**
>  **3.类中所定义的方法（以类名(){}的形式），都是放在了类的原型对象上，供实例去使用。**

## 类式组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2_类式组件</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建类式组件
        class MyComponent extends React.Component {
            render() {
                // render是放在哪里的？ --- MyComponent的原型对象上，供实例使用。
                // render中的this是谁？ --- MyComponent的实例对象上。（MyComponent组件实例对象）
                console.log('render中的this:', this);
                return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
            }
        }
        // 2.渲染组件到页面
        ReactDOM.render(<MyComponent />, document.getElementById('test'))
        /*
            执行了ReactDOM.render(<MyComponent/>.....)之后，发生了什么？
                1.React解析组件标签，找到了MyComponent组件。
                2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
                3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
        */
    </script>
</body>

</html>
```
**![在这里插入图片描述](https://img-blog.csdnimg.cn/6abd2cad3fde4cf4bf8d148afafe14ea.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
>    **执行了ReactDOM.render(\<MyComponent/\>.....)之后，发生了什么？**
>              **1.React解析组件标签，找到了MyComponent组件。**
>              **2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。**
>              **3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。**

 ## 组件实例的三大核心属性1：state
 - **函数式组件没有this，所以没有实例这一概念**

 ### 对state的理解
 1. **state是组件对象最重要的属性，值是对象（可以包含多个key-value的组合）**
 2. **组件被称为“状态机”，通过更新组件的state来更新对应的页面显示（重新渲染组件）**

### 初始化state
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>state</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建组件
        class Weather extends React.Component {
            constructor(props) {
                super(props)
                this.state = { isHot: false }
            }
            render() {
                const {isHot} = this.state
                return <h1>今天天气很{isHot ? '炎热' : '凉爽'}，今天有大风</h1>
            }
        }
        // 2.渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
</body>

</html>
```

### 原生事件绑定
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button id="btn1">按钮1</button>
    <button id="btn2">按钮2</button>
    <button onclick='demo()'>按钮3</button>

    <script type="text/javascript">
        const btn1 = document.getElementById('btn1')
        btn1.addEventListener('click', () => {
            alert('按钮1被点击了')
        })

        const btn2 = document.getElementById('btn2')
        btn2.onclick = () => {
            alert('按钮2被点击了')
        }

        function demo() {
            alert('按钮3被点击了')
        }
    </script>
</body>

</html>
```

### 类中方法this指向
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script type="text/javascript">
        class Person {
            constructor(name, age) {
                this.name = name
                this.age = age
            }
            study() {
                // speak是放在哪里的？ --- 类的原型对象上，供实例使用。
                // 通过Person实例调用study时，study中的this就是Person实例。
                console.log(this)
            }
        }

        const p1 = new Person('tom', 18)
        p1.study()  // 通过实例调用speak方法
        const x = p1.study
        x()     // 此处直接调用study函数，其内部的this本该为window。但因为类中定义的方法在局部使用了严格模式
    </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>state</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建组件
        class Weather extends React.Component {
            // 构造器中的this及render函数中的this,都是Weather实例对象。因为render是通过实例对象调用的。
            constructor(props) {
                super(props)
                // 初始化状态
                this.state = { isHot: false }
            }
            render() {
                console.log(this);
                // 此处不可以写demo()，否则onClick得到的就是demo的返回值，即undefined
                // 此处this.changeWeather只是将函数地址赋给了h1的onClick回调，而当我们点击之后，并没有通过this去执行回调。而是直接调用这个函数，相当于window.changeWeather。
                return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}，今天有大风</h1>
            }
            changeWeather() {
                // changeWeather放在哪里？ -- Weather的原型对象上，供实例使用
                // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，而是直接调用(window.)。
                // 类中的方法默认开启了局部的严格模式，所以changeWeather中的this未undefined
                console.log(this.state.isHot);
            }
        }
        // 2.渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))

        // 以下两种绑定事件的方式不推荐使用，因为使用了 document.getElementById('')
        /* const title = document.getElementById('title')
        title.addEventListener('click', () => {
            console.log('标题被点击了');
        }) */

        /* const title = document.getElementById('title')
        title.onclick = () => {
            console.log('标题被点击了');
        } */
    </script>
</body>

</html>
```

### 解决类中this指向问题
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>state</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建组件
        class Weather extends React.Component {
            constructor(props) {
                super(props)
                // 初始化状态
                this.state = { isHot: false }
                // 此处相当于把原本处于原型对象的changeWeather函数改变了this指向后赋给了实例对象
                this.changeWeather = this.changeWeather.bind(this)
            }
            render() {
                console.log(this);
                return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}，今天有大风</h1>
            }
            changeWeather() {
                console.log(this.state.isHot);
            }
        }
        // 2.渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
</body>

</html>
```

### setState的使用
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>state</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 1.创建组件
        class Weather extends React.Component {
            // 构造器调用几次？ ---  1次
            constructor(props) {
                console.log('constructor');
                super(props)
                this.state = { isHot: false, wind: '微风' }
                this.changeWeather = this.changeWeather.bind(this)
            }
            // render调用几次？ --- 1+n次 1是初始化的那次 n是状态更新的次数
            render() {
                console.log('render');
                return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}，今天{this.state.wind}</h1>
            }
            // changeWeather调用几次？  --- 1+n次 1是初始化的那次 n是状态更新的次数
            changeWeather() {
                const isHot = this.state.isHot
                // 注意：状态(state)不可直接更改
                // this.state.ishot = !isHot   // 此种方式修改state中的值，react无法识别。
                // 状态必须通过setState进行更新，且setState是将修改后的数据原先的数据合并，不是替换。
                this.setState({ isHot: !isHot })
            }
        }
        // 2.渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
</body>

</html>
```

### state的简写方式
>**类中可以直接写赋值语句，如下代码的含义是：给Car的实例对象添加一个属性，名为a，值为1**
```js
class Car {
            constructor(name, price) {
                this.name = name
                this.price = price
                this.wheel = 4
            }
             a = 1
        }

        const c1 = new Car('奔驰c63', 199)
        const c2 = new Car('宝马', 299)
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>state</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        class Weather extends React.Component {
            // 初始化状态
            state = { isHot: false, wind: '微风' }

            render() {
                return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}，今天{this.state.wind}</h1>
            }

            // 自定义方法 --- 要用赋值语句的形式 + 箭头函数
            changeWeather = () => {
                const isHot = this.state.isHot
                this.setState({ isHot: !isHot })
            }
        }
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
</body>

</html>
```

### 总结state
> **1.组件中的render方法中的this为组件实例对象**
>
> **2.组件自定义的方法中this为undefined，如**
> **---- a.强制绑定this:通过函数对象的bind()**
> **---- b.箭头函数**
>
> **3.状态数据，不能直接修改或更新**

## 组件实例的三大核心属性2：props
### props基本使用
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>
    <div id="test2"></div>
    <div id="test3"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <script type="text/babel">
        // 创建组件
        class Person extends React.Component {
            render() {
                console.log(this);
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age}</li>
                    </ul>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Person name="tom" age="18" sex="女" />, document.getElementById('test1'))
        ReactDOM.render(<Person name="xxc" age="10" sex="男" />, document.getElementById('test2'))
        ReactDOM.render(<Person name="jmz" age="5" sex="女" />, document.getElementById('test3'))
    </script>
</body>
```

### 展开运算符复习
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script type="text/javascript">
        let arr1 = [1, 3, 5, 7, 9]
        let arr2 = [2, 4, 6, 8, 10]
        console.log(...arr1);   // 展开一个数组
        let arr3 = [...arr1, ...arr2]   // 连接数组
        // console.log(arr3)

        // 在函数中使用
        function sum(...numbers) {
            return numbers.reduce((preValue, currentValue) => {
                return preValue + currentValue
            }, 0);
        }
        console.log(sum(1, 2));

        // 构造字面量对象时使用展开语法
        let person = { name: 'tom', age: 18 }
        let person2 = { ...person }      // 此处不是展开对象，而是 将已有对象的所有可枚举(enumerable)属性拷贝到新构造的对象中.
        // console.log(...person2)  // 展开运算符不能展开对象
        person.name = 'jerry'
        console.log(person2.name);

        // 合并+覆盖
        let person3 = { ...person, name: 'jack', address: '地球' }
        console.log(person3);
    </script>
</body>

</html>
```
### 批量传递props
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>
    <div id="test2"></div>
    <div id="test3"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <script type="text/babel">
        // 创建组件
        class Person extends React.Component {
            render() {
                console.log(this);
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age}</li>
                    </ul>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Person name="tom" age="18" sex="女" />, document.getElementById('test1'))
        ReactDOM.render(<Person name="xxc" age="10" sex="男" />, document.getElementById('test2'))
        const p = { name: '老刘', age: 18, sex: '女' }
        // ReactDOM.render(<Person name="jmz" age="5" sex="女" />, document.getElementById('test3'))
        // babel+react可以使得展开运算符可以展开对象，但只能在标签传递props时使用。其余地方也无法使用
        console.log('1', ...p);  // 输出为空
        ReactDOM.render(<Person {...p} />, document.getElementById('test3'))    // 此种写的要求p中的数据域render中return数据的名称一致
    </script>
</body>
```

### 对props进行限制
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>
    <div id="test2"></div>
    <div id="test3"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>
    <script type="text/babel">
        // 创建组件
        class Person extends React.Component {
            render() {
                // console.log(this);
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age + 1}</li>
                    </ul>
                )
            }
        }
        // 对标签属性进行类型、必要性的限制
        Person.propTypes = {
            name: PropTypes.string.isRequired,      // 限制name必传，且为字符串
            sex: PropTypes.string,  // 限制sex为字符串
            age: PropTypes.number,  // 限制age为字符串
            speak: PropTypes.func   // 限制speak为函数，此处由于function是关键字，所以要改为func
        }
        // 指定默认标签属性值
        Person.defaultProps = {
            sex: '不男不女',    // sex默认值为'不男不女'
            age: 18 // age默认值为18
        }
        // 渲染组件到页面
        ReactDOM.render(<Person name="tom" age={18} sex="女" speak={speak} />, document.getElementById('test1'))
        ReactDOM.render(<Person name="xxc" age={10} sex="男" />, document.getElementById('test2'))
        const p = { name: '老刘', sex: '女' }
        ReactDOM.render(<Person {...p} />, document.getElementById('test3'))

        function speak() {
            console.log('我说话了');
        }
    </script>
</body>
```

### props的简写方式
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>
    <div id="test2"></div>
    <div id="test3"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>
    <script type="text/babel">
        // 创建组件
        class Person extends React.Component {
            static propTypes = {
                name: PropTypes.string.isRequired,
                sex: PropTypes.string,
                age: PropTypes.number,
                speak: PropTypes.func
            }

            static defaultProps = {
                sex: '不男不女',
                age: 18
            }

            render() {
                const { name, age, sex } = this.props
                //  props是只读的
                // this.props.name = 'jack'    // 此行代码会报错，因为props是只读的
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age + 1}</li>
                    </ul>
                )
            }

        }
        ReactDOM.render(<Person name="tom" age={18} sex="女" speak={speak} />, document.getElementById('test1'))
        ReactDOM.render(<Person name="xxc" age={10} sex="男" />, document.getElementById('test2'))
        const p = { name: '老刘', sex: '女' }
        ReactDOM.render(<Person {...p} />, document.getElementById('test3'))

        function speak() {
            console.log('我说话了');
        }
    </script>
</body>
```

### 类式组件中的构造器和props
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>
    <div id="test2"></div>
    <div id="test3"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>
    <script type="text/babel">
        // 创建组件
        class Person extends React.Component {
            // 一般我们可以不用写构造器。
            // 构造器是否接收props,是否传递给super，取决于：是否希望在构造器通过this访问props。但是这种情况极其罕见
            // 若不接收和传递，而输出this.props，就会报undefined
            /* constructor() {
                super()
                console.log('constructor', this.props);		// undefined
            } */
            constructor(props) {
                super(props)
                console.log('constructor', this.props);
            }
            static propTypes = {
                name: PropTypes.string.isRequired,
                sex: PropTypes.string,
                age: PropTypes.number,
            }

            static defaultProps = {
                sex: '不男不女',
                age: 18
            }

            render() {
                const { name, age, sex } = this.props
                //  props是只读的
                // this.props.name = 'jack'    // 此行代码会报错，因为props是只读的
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age + 1}</li>
                    </ul>
                )
            }

        }
        ReactDOM.render(<Person name="tom" age={18} sex="女" />, document.getElementById('test1'))
    </script>
</body>
```

### 函数式组件使用props
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>props</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test1"></div>

    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>
    <script type="text/babel">
        function Person(props) {
            const { name, age, sex } = props
            return (
                <ul>
                    <li>姓名:{name}</li>
                    <li>性别:{sex}</li>
                    <li>年龄:{age + 1}</li>
                </ul>
            )
        }

        Person.propTypes = {
            name: PropTypes.string.isRequired,
            sex: PropTypes.string,
            age: PropTypes.number,
        }

        Person.defaultProps = {
            sex: '不男不女',
            age: 18
        }
        console.dir(Person);
        ReactDOM.render(<Person name="tom" age={18} sex="女" />, document.getElementById('test1'))
    </script>
</body>
```

### 总结props
> **1.每个组件对象都会有props(properties的简写)属性**
> **2.组件标签的所有属性都保存在props中**
> **3.作用**
> **---- 1.通过标签属性从组件外向组件内传递变化的数据**
> **---- 2.注意：组件内部不要修改props数据**


## 组件实例的三大核心属性3：refs
### 字符串形式的ref
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_字符串形式的ref</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Demo extends React.Component {
            // 展示左侧输入框的数据
            showData = () => {
                // this.refs.input1为真实dom
                // console.log(this.refs.input1);
                const { input1 } = this.refs
                alert(input1.value)
            }
            // 展示右侧输入框的数据
            showData2 = () => {
                const { input2 } = this.refs
                alert(input2.value)
            }
            render() {
                return (
                    <div>
                        <input ref="input1" type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button ref="button" onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                        <input onBlur={this.showData2} ref="input2" type="text" placeholder="失去焦点提示数据" />
                    </div>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
    </script>
</body>

</html>
```
> **字符串形式的ref存在一些效率问题，会影响页面渲染**

### 回调函数形式的ref
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_字符串形式的ref</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Demo extends React.Component {
            // 展示左侧输入框的数据
            showData = () => {
                const { input1 } = this
                alert(input1.value)
            }
            // 展示右侧输入框的数据
            showData2 = () => {
                const { input2 } = this
                alert(input2.value)
            }
            render() {
                return (
                    // 此处的c为节点。this.input1=c表示把ref当前所处的节点挂载到了组件挂载到了组件自身上，并取名为input
                    // 此处ref = 回调函数的形式，按理来说不会自动调用，但react会帮我们调
                    <div>
                        <input ref={c => this.input1 = c} type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                        <input onBlur={this.showData2} ref={c => this.input2 = c} type="text" placeholder="失去焦点提示数据" />
                    </div>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
    </script>
</body>

</html>
```

### 回调ref中调用次数的问题
**![在这里插入图片描述](https://img-blog.csdnimg.cn/3e893dc8dc3a4d8abc6baf136e4cdc0b.png)**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_字符串形式的ref</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Demo extends React.Component {

            state = { isHot: true }

            showInfo = () => {
                // 函数体
                const { input1 } = this
                alert(input1.value)
            }

            changeWeather = () => {
                // 获取原来的状态
                const { isHot } = this.state
                // 更新状态
                this.setState({ isHot: !isHot })
            }

            saveInput = (currentNode) => {
                this.input1 = currentNode;
                console.log('@', currentNode)
            }

            render() {
                const { isHot } = this.state
                return (
                    <div>
                        <div>今天天气很{isHot ? '炎热' : '凉爽'}</div>
                        {/*此处当页面重新渲染时，currentNode会先传入一个null，将原本的节点清空。之后再传入当前的节点*/}
                        {/*<input ref={(currentNode) => { this.input1 = currentNode; console.log('@', currentNode) }} type="text" />*/}

                        {/*此种写法，会导致saveInput只在页面初次渲染时执行一次，之后再执行render不会再执行*/}
                        <input ref={this.saveInput} type="text" />
                        <button onClick={this.showInfo}>点我提示输入的数据</button><br />
                        <button onClick={this.changeWeather}>点我切换天气</button><br />
                    </div>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
    </script>
</body>

</html>
```

### createRef形式的ref
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_字符串形式的ref</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Demo extends React.Component {
            /*
                React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器只能存一个节点
            */
            myRef = React.createRef()
            myRef2 = React.createRef()

            // 展示左侧输入框的数据
            showData = () => {
                console.log(this.myRef.current.value);
            }

            // 展示右侧输入框的数据
            showData2 = () => {
                console.log(this.myRef2.current.value);
            }

            render() {
                return (
                    <div>
                        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
                        <button onClick={this.showData}>点我提示左侧的数据</button><br />
                        <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="点击按钮提示数据" />
                    </div>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
    </script>
</body>

</html>
```

## react中的事件处理
> **(1).通过onXxx属性指定事件处理函数（注意大小写）**
> **----a.React使用的是自定义（合成）事件，而不是使用的原生DOM事件 --- 为了更好的兼容性**
> **----b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) --- 为了更高效**
> **(2).通过event.target得到发生事件的DOM元素对象	--- 为了避免过度的使用ref**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件处理</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Demo extends React.Component {
            // 创建ref容器
            myRef = React.createRef()

            // 展示左侧输入框的数据
            showData = () => {
                console.log(this.myRef.current.value);
            }

            // 展示右侧输入框的数据
            showData2 = (event) => {
                alert(event.target.value);
            }

            render() {
                return (
                    <div>
                        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
                        <button onClick={this.showData}>点我提示左侧的数据</button><br />
                        {/* 此处发生事件的元素与ref绑定的值相同，所以可以不用ref */}
                        {/*<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="点击按钮提示数据" />*/}
                        <input onBlur={this.showData2} type="text" placeholder="点击按钮提示数据" />
                    </div>
                )
            }
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo />, document.getElementById('test'))
    </script>
</body>

</html>
```

## 非受控组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1_非受控组件</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Login extends React.Component {
            // 页面中所有输入类的dom，现用现取，则为非受控组件
            handleSubmit = (event) => {
                event.preventDefault(); // 阻止表单提交

                const { username, password } = this
                alert(`你输入的用户名是${username.value},你输入的密码是${password.value}`)
            }
            render() {
                return (
                    <form action="https://blog.xxcijmz.top" onSubmit={this.handleSubmit}>
                        用户名:<input ref={c => this.username = c} type="text" name="username" />
                        密码:<input ref={c => this.password = c} type="password" name="password" />
                        <button>登录</button>
                    </form>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
</body>

</html>
```

## 受控组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2_受控组件</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Login extends React.Component {
            // 页面中所有输入类的dom，随着输入把数据存储到状态中，需要用的时候从状态中读取，则为受控组件。
            // 受控组件的优势是可以省略ref
            // 初始化状态
            state = {
                username: '',   // 用户名
                password: ''    // 密码
            }

            // 保存用户名到状态中
            saveUsername = (event) => {
                // console.log(event.target.value);
                this.setState({ username: event.target.value })
            }

            // 保存密码到状态中
            savePassword = (event) => {
                this.setState({ password: event.target.value })
            }

            // 表单提交的回调
            handleSubmit = (event) => {
                event.preventDefault(); // 阻止表单提交
                const { username, password } = this.state
                alert(`你输入的用户名是${username},你输入的密码是${password}`)
            }
            render() {
                return (
                    <form action="https://blog.xxcijmz.top" onSubmit={this.handleSubmit}>
                        用户名:<input onChange={this.saveUsername} type="text" name="username" />
                        密码:<input onChange={this.savePassword} type="password" name="password" />
                        <button>登录</button>
                    </form>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
</body>

</html>
```

## 高阶函数与函数柯里化
> **高阶函数：如果一个函数符合下面2个规范中的任何一个，那么该函数就是高阶含糊。**
> **----- 			1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数**
> **-----			2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数**
> **\**
> **常见的高阶函数有：promise、setTimeout、Array.map()等**
> **\**
> **函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理函数的函数编码形式。**

- **演示函数的柯里化**
```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script type="text/javascript">
        // function sum(a, b, c) {
        //     return a + b + c
        // }
        function sum(a) {
            return (b) => {
                return (c) => {
                    return a + b + c
                }
            }
        }
        const result = sum(1)(2)(3)
        console.log(result);
    </script>
</body>

</html>
```
- **使用函数柯里化实现只定义一个函数就能实现获取参数的功能**
```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高阶函数_函数柯里化</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        // 创建组件
        class Login extends React.Component {
            // 初始化状态
            state = {
                username: '',   // 用户名
                password: ''    // 密码
            }

            // 保存表单数据到状态中
            saveFormData = (dataType) => {
             // 此处的event为react帮忙维护的对象，给react自封装的事件的回调函数自动传入，我们无法自己手动传
                return (event) => {
                    // this.setState({ dataType: event.target.value })  // 此处不能直接写dataType，否则会认为是是字符串
                    this.setState({ [dataType]: event.target.value })
                }
            }
            // 表单提交的回调
            handleSubmit = (event) => {
                event.preventDefault(); // 阻止表单提交
                const { username, password } = this.state
                alert(`你输入的用户名是${username},你输入的密码是${password}`)
            }
            render() {
                return (
                    <form action="https://blog.xxcijmz.top" onSubmit={this.handleSubmit}>
                        用户名:<input onChange={this.saveFormData('uesrname')} type="text" name="username" />
                        密码:<input onChange={this.saveFormData('password')} type="password" name="password" />
                        <button>登录</button>
                    </form>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
</body>

</html>
```

### 不用柯里化的写法
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2_不用函数柯里化的实现</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <!-- 引入prop-types，用于对组件标签属性进行限制,全局多了PropTypes-->
    <script type="text/javascript" src="../js/prop-types.js"></script>

    <script type="text/babel">
        class Login extends React.Component {
            state = {
                username: '',   // 用户名
                password: ''    // 密码
            }

            saveFormData = (dataType, value) => {
                this.setState({ [dataType]: event.target.value })
            }
            handleSubmit = (event) => {
                event.preventDefault();
                const { username, password } = this.state
                alert(`你输入的用户名是${username},你输入的密码是${password}`)
            }
            render() {
                return (
                    <form action="https://blog.xxcijmz.top" onSubmit={this.handleSubmit}>
                        用户名:<input onChange={(event) => this.saveFormData('username', event)} type="text" name="username" />
                        密码:<input onChange={(event) => this.saveFormData('password', event)} type="password" name="password" />
                        <button>登录</button>
                    </form>
                )
            }
        }
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
</body>

</html>
```

## React的生命周期
### 引出生命周期
> **生命周期回调函数 《=》生命周期钩子函数《=》生命周期函数《=》生命周期钩子**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        // 创建组件
        class Life extends React.Component {

            state = { opacity: 0.5 }

            death = () => {
                // 清除定时器，若不清除而直接卸载组件会导致定时器内部还在修改一个已卸载的组件的state
                // 也可以写在componentWillUnMount
                // clearInterval(this.timer)
                // 卸载组件
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            // 调用的时机：组件挂载完毕
            componentDidMount() {
                // 若把定时器写在render中，会导致opacity一改变页面就重新渲染，重新调用render，再开启一个定时器，导致定时器不断增加。
                this.timer = setInterval(() => {
                    // 获取原状态
                    let { opacity } = this.state
                    // 减小0.1
                    opacity -= 0.1
                    if (opacity <= 0) opacity = 1
                    // 设置新的透明度
                    this.setState({ opacity })
                }, 200);
            }

            // render调用的时机：初始化渲染、状态更新之后
            render() {
                return (
                    <div>
                        <h2 style={{ opacity: this.state.opacity }}>React学不会怎么办？</h2>
                        <button onClick={this.death}>不活了</button>
                    </div>
                )
            }

            // 组件将要卸载
            componentWillUnmount() {
                clearInterval(this.timer)
            }
        }
        // 渲染组件
        ReactDOM.render(<Life />, document.getElementById('test'))
    </script>
</body>

</html>
```

### 生命周期(旧)_组件挂载流程图
> 1. **组件从创建到死亡它会经历一些特定的阶段**
> 2. **React组件中包含一系列钩子函数（生命周期回调函数），会在特定的时刻调用**
> 3. **我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/58ee3abe821f43fd968e3b466d29f9bf.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **shouldComponent为是否要执行更新的阀门，如果不写默认返回true。**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        class Count extends React.Component {

            // 构造器
            constructor(props) {
                console.log('Count-constructor');
                super(props)
                // 初始化状态
                this.state = { count: 0 }
            }


            // 加1按钮的回调
            add = () => {
                // 获取原状态
                const { count } = this.state
                // 更新状态
                this.setState({ count: count + 1 })
            }

            // 组件将要挂载的钩子
            componentWillMount() {
                console.log('Count-componentWillMount');
            }

            // 组件挂载完毕的钩子
            componentDidMount() {
                console.log('Count-componentDidMount');
            }

            render() {
                console.log('Count-render');
                const { count } = this.state
                return (
                    <div>
                        <h2>当前求和为{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                    </div>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Count />, document.getElementById('test'))
    </script>
</body>
```
**result：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/673d4d580a054893862a3bd421589370.png)**

- **第一条线（正常更新）**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/73f59573a6a34a78a1c0c51dbb6973db.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        class Count extends React.Component {

            // 构造器
            constructor(props) {
                console.log('Count-constructor');
                super(props)
                // 初始化状态
                this.state = { count: 0 }
            }

            // 加1按钮的回调
            add = () => {
                // 获取原状态
                const { count } = this.state
                // 更新状态
                this.setState({ count: count + 1 })
            }

            // 卸载组件按钮的回调
            death = () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            // 组件将要挂载的钩子
            componentWillMount() {
                console.log('Count-componentWillMount');
            }

            // 组件挂载完毕的钩子
            componentDidMount() {
                console.log('Count-componentDidMount');
            }

            // 组件将要卸载的钩子
            componentWillUnmount() {
                console.log('Count-componentWillUnmount');
            }

            // 控制组件更新的“阀门”
            shouldComponentUpdate() {
                console.log('Count-shouldComponentUpdate');
                return true    // 若返回false，则无法执行页面更新操作
            }

            // 组件将要更新的钩子
            componentWillUpdate() {
                console.log("Count-componentWillUpdate");
            }

            // 组件更新完毕的钩子
            componentDidUpdate() {
                console.log('Count-componentDidUpdate');
            }

            render() {
                console.log('Count-render');
                const { count } = this.state
                return (
                    <div>
                        <h2>当前求和为{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.death}>卸载组件</button>
                    </div>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Count />, document.getElementById('test'))
    </script>
</body>
```
- **第二条线（强制更新）**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/fb5ed43134d746dd99c3bc06f578c7f3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        class Count extends React.Component {

            // 构造器
            constructor(props) {
                console.log('Count-constructor');
                super(props)
                // 初始化状态
                this.state = { count: 0 }
            }

            // 加1按钮的回调
            add = () => {
                // 获取原状态
                const { count } = this.state
                // 更新状态
                this.setState({ count: count + 1 })
            }

            // 卸载组件按钮的回调
            death = () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            // 强制更新按钮的回调
            force = () => {
                this.forceUpdate()
            }

            // 组件将要卸载的钩子
            componentWillUnmount() {
                console.log('Count-componentWillUnmount');
            }

            // 组件更新完毕的钩子
            componentDidUpdate() {
                console.log('Count-componentDidUpdate');
            }

            render() {
                console.log('Count-render');
                const { count } = this.state
                return (
                    <div>
                        <h2>当前求和为{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.death}>卸载组件</button>
                        <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                    </div>
                )
            }
        }
        // 渲染组件
        ReactDOM.render(<Count />, document.getElementById('test'))
    </script>
</body>
```

- **第三条线（父组件更新）**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/f56a49df615b4c3daebb8168384898f5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
```js
  class A extends React.Component {
      // 初始化状态
      state = { carName: '奔驰' }

      changeCar = () => {
          this.setState({ carName: '奥拓' })
      }

      render() {
          return (
              <div>
                  <div>我是A组件</div>
                  <button onClick={this.changeCar}>换车</button>
                  <B carName={this.state.carName} />
              </div>
          )
      }
  }

  class B extends React.Component {
      // 组件将要接收新的props的钩子
      componentWillReceiveProps(props) {   // 这个钩子，第一次渲染不执行，后面更新才执行。且可以传一个props参数
          console.log('B---componentWillReceiveProps', props);
      }
      // 组件将要卸载的钩子
      componentWillUnmount() {
          console.log('B-componentWillUnmount');
      }

      // 控制组件更新的“阀门”
      shouldComponentUpdate() {
          console.log('B-shouldComponentUpdate');
          return true    // 若返回false，则无法执行页面更新操作
      }

      // 组件更新完毕的钩子
      componentDidUpdate() {
          console.log('B-componentDidUpdate');
      }

      render() {
          console.log('B-render');
          return (
              <div>
                  我是B组件，接收到的车是：{this.props.carName}
              </div>
          )
      }
  }
  // 渲染组件
  ReactDOM.render(<A />, document.getElementById('test'))
```

### 总结生命周期
> **1.初始化阶段：有ReactDOM.render()触发---初次渲染**
> **----1.constructor()**
> **----2.componentWillMount()**
> **----3.render()**
> **----4.componentDidMount()		--->常用，一般在这个钩子中做一些初始化的事。例如：开启定时器、发送网络请求、订阅消息**
> **2.更新阶段：由组件内部this.setState()或父组件render触发**
> **----1.shouldComponentUpdate()**
> **----2.componentWillUpdate()**
> **----3.render()**
> **----4.componentDidUpdate()**
> **3.卸载组件：由ReactDOM.unmountComponentAtNode()触发**
> **----1.componentWillUnmount()	--->常用，一般在这个钩子中做一些收尾的事。例如：关闭定时器、取消订阅消息。**

### 对比新旧生命周期
> **旧版本的生命周期新版本也可以用，但是会报警告。（componentWillReceiveProps、componentWillUpdate、componentWillMount【所有Will相关、除了componentWillUnmount】，这三前要加UNSAVE_，警报才会消失）**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/001579ee790042d384c66d7212a6b8e8.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/4f4983bcf8db41cba6929e233b00f5a9.png)**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/826a55db56984a01a18bf6950aef0bc6.png)**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/d5dbc479e79d47ae86a7d54e11923013.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**


**新的生命周期图：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/13bf717f56fd4e7487a87e71c7fb2957.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**

### getDerivedStateFromProps
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3_react生命周期(新)</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/17.0.1/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/17.0.1/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/17.0.1/babel.min.js"></script>

    <script type="text/babel">
        class Count extends React.Component {

            constructor(props) {
                console.log('Count-constructor');
                super(props)
                this.state = { count: 0 }
            }

            add = () => {
                const { count } = this.state
                this.setState({ count: count + 1 })
            }

            death = () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            force = () => {
                this.forceUpdate()
            }

            // 此处必须加static，必须return一个null或者状态对象。
            // 此处可以传入props和state,可以通过返回props使得state的值在任何时候都取决于props（派生状态）。
            static getDerivedStateFromProps(props, state) {
                console.log('getDerivedStateFromProps', props, state);
                // return null;
                // return { count: 108 };  // 此处返回了108，则add中对count+1的操作就无法生效了，count一直都会是108。
                return props;
            }

            componentDidMount() {
                console.log('Count-componentDidMount');
            }

            componentWillUnmount() {
                console.log('Count-componentWillUnmount');
            }

            shouldComponentUpdate() {
                console.log('Count-shouldComponentUpdate');
                return true
            }

            componentDidUpdate() {
                console.log('Count-componentDidUpdate');
            }

            render() {
                console.log('Count-render');
                const { count } = this.state
                return (
                    <div>
                        <h2>当前求和为{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.death}>卸载组件</button>
                        <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                    </div>
                )
            }
        }
        ReactDOM.render(<Count count={199} />, document.getElementById('test'))
    </script>
</body>
```

### getSnapshotBeforeUpdate
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3_react生命周期(新)</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/17.0.1/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/17.0.1/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/17.0.1/babel.min.js"></script>

    <script type="text/babel">
        class Count extends React.Component {

            constructor(props) {
                console.log('Count-constructor');
                super(props)
                this.state = { count: 0 }
            }

            add = () => {
                const { count } = this.state
                this.setState({ count: count + 1 })
            }

            death = () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            force = () => {
                this.forceUpdate()
            }

            static getDerivedStateFromProps(props, state) {
                return null;
            }

            /* getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。 */
            // 在更新之前获取快照
            getSnapshotBeforeUpdate() {
                console.log('getSnapshotBeforeUpdate');
                // 此处要求A snapshot value (or null) must be returned. 其中snapshot value可以为任何值
                return 'atguigu';
            }

            componentDidMount() {
                console.log('Count-componentDidMount');
            }

            componentWillUnmount() {
                console.log('Count-componentWillUnmount');
            }

            shouldComponentUpdate() {
                console.log('Count-shouldComponentUpdate');
                return true
            }

            // componentDidUpdate传递三个参数，preProps：之前的props，preState：之前的state，snapshotValue：快照值，及getSnapshotBeforeUpdate返回的值。
            componentDidUpdate(preProps, preState, snapshotValue) {
                console.log('Count-componentDidUpdate', preProps, preState);
            }

            render() {
                console.log('Count-render');
                const { count } = this.state
                return (
                    <div>
                        <h2>当前求和为{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.death}>卸载组件</button>
                        <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                    </div>
                )
            }
        }
        ReactDOM.render(<Count count={199} />, document.getElementById('test'))
    </script>
</body>
```

### getSnapshotBeforeUpdate的使用场景
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4_getSnapshotBeforeUpdate的使用场景(新)</title>
    <!-- scrollTop:滚动的高度(若为30，则出现在list头部的就为新闻6)。scrollHeight:内容区的高度(此处为210px) -->
    <style>
        .list {
            width: 200px;
            height: 150px;
            background: skyblue;
            overflow: auto;
        }

        .news {
            height: 30px;
        }
    </style>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/17.0.1/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/17.0.1/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/17.0.1/babel.min.js"></script>
    <script type="text/babel">
        class NewsList extends React.Component {

            state = { newsArr: [] }

            componentDidMount() {
                setInterval(() => {
                    // 获取原状态
                    const { newsArr } = this.state
                    // 模拟一条新闻
                    const news = ('新闻' + (newsArr.length + 1))
                    // 更新状态
                    this.setState({ newsArr: [news, ...newsArr] })
                }, 1000)
            }

            getSnapshotBeforeUpdate() {
                return this.refs.list.scrollHeight
            }

            componentDidUpdate(preProps, preState, height) {
                this.refs.list.scrollTop += this.refs.list.scrollHeight - height
            }

            render() {
                return (
                    <div className="list" ref="list">
                        {
                            this.state.newsArr.map((n, index) => {
                                return <div key={index} className="news">{n}</div>
                            })
                        }
                    </div>
                )
            }
        }
        ReactDOM.render(<NewsList />, document.getElementById('test'))
    </script>
</body>

</html>
```
### react新生命周期总结
> **1.初始化阶段：由ReactDOM.render()触发 --- 初次渲染**
> **&nbsp; 1.constructor()**
> **&nbsp; 2.getDerivedStateFromProps**
> **&nbsp; 3.render()**
> **&nbsp; 4.componentDidMount()--->常用，一般在这个钩子中做一些初始化的事。例如：开启定时器、发送网络请求、订阅消息**
> 2. **更新阶段：由组件内部this.setState()或父组件重新render触发**
> **&nbsp;	1.getDerivedStateFromProps**
> **&nbsp;	2.shouldComponentUpdate()**
> **&nbsp;	3.render()**
> **&nbsp;	4.getSnapshotBeforeUpdate()**
> **&nbsp;	5.componentDidUpdate()**
> 3. **卸载组件：由ReactDOM.unmountComponentAtNode()触发**
> **&nbsp; 1.componentWillUnmount()--->常用，一般在这个钩子中做一些收尾的事。例如：关闭定时器、取消订阅消息。**

## DOM的diffing算法
### 验证Diffing算法
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>验证diff算法</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库 -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        class Time extends React.Component {

            state = { date: new Date() }

            componentDidMount() {
                setInterval(() => {
                    this.setState({
                        date: new Date()
                    })
                }, 1000)
            }

            render() {
                // DOM的diffing算法每次比较的最小力度是节点
                return (
                    <div>
                        <h1>hello</h1>
                        {/*当h3中的内容发生改变时，下面的输入框输入的内容不会消失，说明了页面只有h3里面的内容发生重新渲染*/}
                        <input type="text" placeholder="随便输入一点内容" />
                        <span>
                            现在是：{this.state.date.toTimeString()}
                            {/*diffing算法不只对比一层，为了可能出现标签套标签的情况发生，所以会逐层对比，所以下方的input标签也不会消失*/}
                            <input type="text" />
                        </span>
                    </div>
                )
            }
        }

        ReactDOM.render(<Time />, document.getElementById('test'))
    </script>
</body>

</html>
```

### key的作用
```txt
经典面试题:
1). react/vue中的key有什么作用？（key的内部原理是什么？）
2). 为什么遍历列表时，key最好不要用index?

1. 虚拟DOM中key的作用：
      1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

      2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 
                                  随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

              a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
                          (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
                          (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

              b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
                          根据数据创建新的真实DOM，随后渲染到到页面
                  	
2. 用index作为key可能会引发的问题：
          1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:(正序添加不会出现问题)
                          会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

          2. 如果结构中还包含输入类的DOM：
                          会产生错误DOM更新 ==> 界面有问题。
                      	
          3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
              仅用于渲染列表展示，使用index作为key是没有问题的。
  	
3. 开发中如何选择key?:
          1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
          2.如果确定只是简单的展示数据，用index也是可以的。

一、使用索引值(index)作为key：
          初次挂载组件：
                  1.初始的数据：
                          {id:'atguigu_001',name:'小张',age:18},
                          {id:'atguigu_002',name:'小李',age:19},

                  2.初始的虚拟DOM
                          <li key=0>小张-18 <input type="text"/> </li>
                          <li key=1>小李-19 <input type="text"/> </li>
      	
          更新：
                  1.新的数据：
                          {id:'atguigu_003',name:'小王',age:20},
                          {id:'atguigu_001',name:'小张',age:18},
                          {id:'atguigu_002',name:'小李',age:19},

                  2.新的虚拟DOM,此时会更新三次
                          <li key=0>小王-20 <input type="text"/> </li>
                          <li key=1>小张-18 <input type="text"/> </li>
                          <li key=2>小李-19 <input type="text"/> </li>
          此时，由于使用了索引值，导致了没有必要的两次更新。
          此时，比较input框时，由于两个input框的节点一样，就会将原本小张-18的input框给了新生成的小王-20

二、使用唯一标识(id)作为key：
          初次挂载组件：
                  1.初始的数据：
                          {id:'1',name:'小张',age:18},
                          {id:'2',name:'小李',age:19},

                  2.初始的虚拟DOM
                          <li key="1">小张-18 <input type="text"/> </li>
                          <li key="2">小李-19 <input type="text"/> </li>
      	
          更新：
                  1.新的数据：
                          {id:'3',name:'小王',age:20},
                          {id:'1',name:'小张',age:18},
                          {id:'2',name:'小李',age:19},

                  2.新的虚拟DOM
                          <li key="3">小王-20 <input type="text"/> </li>
                          <li key="1">小张-18 <input type="text"/> </li>
                          <li key="2">小李-19 <input type="text"/> </li>
```
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
</head>

<body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
    <!-- 引入react核心库，全局多了React -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM，全局多了ReactDOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
        
        class Person extends React.Component {
            state = {
                persons: [
                    { id: 1, name: '小张', age: 18 },
                    { id: 2, name: '小李', age: 19 },
                ]
            }

            add = () => {
                const { persons } = this.state
                const p = { id: persons.length + 1, name: '小王', age: 20 }
                this.setState({ persons: [p, ...persons] })
            }

            render() {
                return (
                    <div>
                        <h2>展示人员信息</h2>
                        <button onClick={this.add}>添加一个小王</button>
                        <h3>使用index索引值作为key</h3>
                        <ul>
                            {
                                this.state.persons.map((personObj, index) => {
                                    return <li key={index}>{personObj.name}---{personObj.age} <input type="text" /></li>
                                })
                            }
                        </ul>
                        <h3>使用id(数据的唯一标识)作为key</h3>
                        <ul>
                            {
                                this.state.persons.map((personObj) => {
                                    return <li key={personObj.id}>{personObj.name}---{personObj.age} <input type="text" /></li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
</body>
```

## 初始化react脚手架
### react 脚手架
1. **xxx脚手架：用来帮助程序员快速创建一个基于xxx库的模板项目**
	**1.包含了所有需要的配置（语法检查、jsx编译、devServer...）**
	**2.下载好了所有相关的依赖**
	**3.可以直接运行一个简单效果**
2. **react提供了一个用于创建react项目的脚手架库： create-react-app**
3. **项目的整体技术架构为：react+webpack+es6+eslint**
4. **使用脚手架开发的项目的特点：模块化、组件化、工程化**

### 创建项目并启动
1. **全局安装：npm install -g create-react-app**
2. **切换到想创项目的目录，使用命令：create-react-app hello-react**
3. **进入项目文件夹：cd hello-reat**
4. **启动项目：npm start**

> **react脚手架将所有的webpack配置文件隐藏了。可以使用yarn eject来暴露。但是无法再次隐藏。**

## 脚手架文件介绍

>**.eslintcache----缓存文件**
> **debug.log  ----- 错误日志文件**

>**以上两个文件可删可不删。但删了可能还会自动产生。**
>>		public ---- 静态资源文件夹
>>	>>**favicon.icon ------ 网站页签图标**
>>	>>**index.html -------- 主页面（SPA：signal、page、application，单页面应用）**
>>	>>**logo192.png ------- logo图**
>>	>>**logo512.png ------- logo图**
>>	>>**manifest.json ----- 应用加壳的配置文件**
>>	>>**robots.txt -------- 爬虫协议文件**
>>	>>**src ---- 源码文件夹**
>>	>>**App.css -------- App组件的样式**
>>	>>**App.js --------- App组件(所有组件的外壳组件，其余组件都为其子组件)**
>>	>>**App.test.js ---- 用于给App做测试**
>>	>>**index.css ------ 通用的样式**
>>	>>**index.js ------- 入口文件**
>>	>>**logo.svg ------- logo图**
>>	>>**reportWebVitals.js**
>>	>>**--- 页面性能分析文件(需要web-vitals库的支持)**
>>	>>**setupTests.js**
>>	>>**---- 组件单元测试的文件(需要jest-dom库的支持)**

>**package.json:**
>**test : 测试用指令，还需代码支持，一般不用。**
>**eject：暴露被脚手架隐藏的文件及配置。**

>***Index.js文件中<React.StrictMode>标签用于开启严格模式，使得无法使用过时的API(如字符串形式的ref)。
>当执行npm start。会先找到入口文件index.js。***

- **index.html**
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <!-- 用于引入网站页签图标，%PUBLIC_URL%表示public文件夹的路径 -->
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <!-- 用于开启理想视口，用于做移动端网页适配 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- 用于配置浏览器页签+地址栏的颜色（仅支持安卓手机浏览器，兼容性不好） -->
  <meta name="theme-color" content="#000000" />
  <!-- 用于描述网页信息 -->
  <meta name="description" content="Web site created using create-react-app" />
  <!-- 在苹果手机中添加网页到手机主屏幕的图标 -->
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <!-- 应用加壳的配置文件 -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>React App</title>
</head>

<body>
  <!-- 用于浏览器不支持javascript脚本时显示的文字 -->
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <!-- 组件的容器 -->
  <div id="root"></div>
</body>

</html>
```
- **App.js**
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React123
        </a>
      </header>
    </div>
  );
}

export default App;

```

- **index.js**
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

```


> **react脚手架中的index.js如何找到index.html中的root节点并插入呢？**
> >**是由react底层写好的，我们无需关心**
>
> **启动过程：**
> **找到index.js，引入相关的文件，然后ReactDOM.render()，由于要document.getElementById('root')，就会去public下找index.html的root节点。**


## 一个简单的Hello组件
- **复习ES6中的import**
```js
----->  module.js
const React = { a: 1, b: 2 }
// 此处既默认暴露了React，又分别暴露了Component。
// 所以外部可以如下引入
// import React, { Component } from './module.js'
// const {Component} = React

export class Component {

}
React.Component = Component

export default React
```

**![在这里插入图片描述](https://img-blog.csdnimg.cn/85d209dc63484024a8381b397a0399fe.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_13,color_FFFFFF,t_70,g_se,x_16)**
- **index.js**
```js
// 引入React核心库
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom'
// 引入App组件
import App from './App'

// 渲染App到页面
ReactDOM.render(<App />, document.getElementById('root'))
```
- **App.js**
```js
// 创建“外壳”组件App
import React, { Component } from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'

// 创建并暴露App组件
export default class App extends Component {
    render() {
        return (
            <div>
                <Welcome />
                <Hello />
            </div>
        )
    }
}
```
- **Components/Hello/index.jsx**
```js
import React, { Component } from 'react'
import './index.css'

export default class Hello extends Component {
    render() {
        return <h2 className="title">Hello,React</h2>
    }
}
```

- **Components/Hello/index.css**
```css
.title{
    background: orange;
}
```

## 样式的模块化
> **为何要使用样式的模块化？**
> **为了避免不同组件中样式类名冲突导致其css样式产生覆盖的情况发生**

1. **将css文件重命名为xxx.module.css**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/927e7b80342b4c188f985f5e4215b684.png)**
2. **引入修改后的css，并重命名，之后便可以用重命名.xxx来进行类名定义**

- **index.module.css**
```css
.title{
    background: orange;
}
```

- **index.jsx**
```js
import React, { Component } from 'react'
import hello from './index.module.css'

export default class Hello extends Component {
    render() {
        return <h2 className={hello.title}>Hello,React</h2>
    }
}
```


## 功能界面的组件化编码流程
> 1. **拆分组件：拆分页面**
> 2. **实现静态组件：使用组件实现静态页面效果**
> 3. **实现动态组件**
> 		**3.1 动态显示初始化数据**
> 			**&nbsp;&nbsp;3.1.1 数据类型**
>  		**&nbsp;&nbsp;3.1.2 数据名称**
>     		**&nbsp;&nbsp;3.1.3 保存在那个组件？**
>     	**3.2 交互（从绑定事件监听开始）**


## todoList案例
**项目src文件夹结构：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/3a00ac92c7e7435da234fd1cae72b3c5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_12,color_FFFFFF,t_70,g_se,x_16)**


- **App.jsx**
```js
// 创建“外壳”组件App
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

// 创建并暴露App组件
export default class App extends Component {
    // 状态在哪里，操作状态的方法就在哪里

    // 初始化状态
    state = {
        todos: [
            { id: '001', name: '吃饭', done: true },
            { id: '002', name: '打代码', done: false },
            { id: '003', name: '睡觉', done: true },
            { id: '004', name: '逛街', done: false },
        ]
    }

    // addTodo用于添加一个Todo，接收的参数是一个todo对象
    addTodo = (todoObj) => {
        // 获取原todos
        const { todos } = this.state
        // 追加一个todo
        const newTodos = [todoObj, ...todos]
        console.log(newTodos)
        // 更新状态。注意React无法直接修改state中的数据
        this.setState({ todos: newTodos })
    }

    // updateTodo用于更新一个todo对象
    updateTodo = (id, done) => {
        // 获取状态里的todos
        const { todos } = this.state
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) {
                return { ...todoObj, id, done }
            }
            return todoObj
        })
        this.setState({ todos: newTodos })
    }

    // deleteTodo用于删除一个todo对象
    deleteTodo = (id) => {
        //获取原来的todos
        const { todos } = this.state
        // 删除指定id的todo对象
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id !== id
        })
        // 更新状态
        this.setState({ todos: newTodos })
    }

    // checkAllTodo用于全选
    checkAllTodo = (done) => {
        // 获取原来的todos
        const { todos } = this.state
        // 加工数据
        const newTodos = todos.map((todoObj) => {
            return { ...todoObj, done }
        })
        // 更新状态
        this.setState({ todos: newTodos })
    }

    // clearAllDoneTodos用于清除所有已完成的
    clearAllDoneTodos = () => {
        // 获取原来的todos
        const { todos } = this.state
        // 过滤数据
        const newTodos = todos.filter((todo) => {
            return todo.done === false
        })
        this.setState({ todos: newTodos })
    }

    render() {
        const { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                    <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDoneTodos={this.clearAllDoneTodos} />
                </div>
            </div>
        )
    }
}
```
- **Header.jsx**
```js
import React, { Component } from 'react'
import ProtoTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class Header extends Component {

    static protoTypes = {
        addTodo: ProtoTypes.func.isRequired
    }

    // 键盘事件的回调
    handleKeyUp = (event) => {
        // 解构赋值，获取keyCode,target
        const { keyCode, target } = event
        // 判断是否是回车按键
        if (keyCode !== 13) return
        // 添加的todo名字不能为空
        if (target.value.trim() === '') {
            alert('输入不能为空')
            return
        }
        else {
            // 准备好一个todo对象
            const todoObj = { id: nanoid(), name: target.value, done: false }
            // 将todoObk传递给App
            this.props.addTodo(todoObj)
            // 清空输入
            target.value = ""
        }
    }

    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}

```

- **List.jsx**
```js
import React, { Component } from 'react'
import ProtoTypes from "prop-types"
import Item from '../Item'
import './index.css'

export default class List extends Component {
    // 对接收的props进行：类型、必要性的限制
    static propTypes = {
        updateTodo: ProtoTypes.func.isRequired,
        deleteTodo: ProtoTypes.func.isRequired,
        todos: ProtoTypes.array.isRequired,
    }

    render() {
        const { todos, updateTodo, deleteTodo } = this.props
        return (
            <ul className="todo-main">
                {
                    todos.map((todo) => {
                        return <Item {...todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}></Item>
                    })
                }
            </ul>
        )
    }
}

```
- **Item.jsx**
```js
import React, { Component } from 'react'
import ProtoTypes from "prop-types"

export default class Item extends Component {

    static protoTypes = {
        updateTodo: ProtoTypes.func.isRequired
    }

    state = { mouse: false }    // 标识鼠标移入、移出

    // 鼠标移入、移出的回调
    handleMouse = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }

    // 勾选或取消勾选某一个todo的回调
    handleCheck = (id) => {
        const { updateTodo } = this.props
        return (event) => {
            // console.log(this.props);
            updateTodo(id, event.target.checked)
        }
    }

    // 删除某一个todo的回调
    handleDelete = (id) => {
        // 此处confirm要加window，否则会报错
        if (window.confirm('确定删除吗?')) {
            const { deleteTodo } = this.props
            deleteTodo(id)
        }
    }

    render() {
        const { id, name, done } = this.props
        const { mouse } = this.state
        return (
            <li style={{ background: mouse ? '#ddd' : 'white' }} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)}>
                <label>
                    {/*此处若用checked=，则无法修改选择状态，需要同时添加onChange*/}
                    {/* 而若用defaultchecked，则会导致当点击全选或取消全选时，其状态无法被改变 */}
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
                    <span>{name}</span>
                </label>
                <button onClick={() => { this.handleDelete(id) }} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
            </li>
        )
    }
}

```

- **Footer.jsx**
```js
import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    // 全选checkBox的回调
    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked)
    }

    // 清除所有已完成的回调
    handleClearAllDone = () => {
        if (window.confirm('确定删除所有已完成的？')) {
            this.props.clearAllDoneTodos()
        }
    }

    render() {
        const { todos } = this.props
        // 已完成的个数
        const doneCount = todos.reduce((pre, todo) => {
            return pre + (todo.done ? 1 : 0)
        }, 0)
        // 总数
        const total = todos.length
        return (
            <div className="todo-footer">
                <label>
                    {/* 此处若用defaultChecked，则只有第一次可以根据逻辑进行赋值，后面无法重新赋值。即便其可以改变勾选，也只是手动使得页面上发生改变，无法根据逻辑进行再次自动改变 */}
                    {/* 而若要用checked，则必须配合onChange使用，否则无法手动改变选中状态 */}
                    <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false} />
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{total}
                </span>
                <button className="btn btn-danger" onClick={this.handleClearAllDone}>清除已完成任务</button>
            </div>
        )
    }
}

```

>**1.拆分组件、实例静态组件，注意：className、style的写法**
>**2.不要通过非setState的方式修改数据,操作状态时，push、unshift等方法尽量不用。**
>**3.所有的todo列表交给App管理，因为兄弟组件间暂时不能直接“对话”（状态提升）**
>**4.yarn add nanoid，用于生成数据的唯一标识**
>**5.注意：<input type="checkbox" checked={done} 会有一个警告，写onChange即可**
>**6.注意:defaultChecked和checked的区别，类似的还有：defaultValue和value**
>**7.关于父子之间通信：**
>**&nbsp;7.1.【父组件】给【子组件】传递数据：通过props传递**
>**&nbsp;7.2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数**
>**8.状态在哪里，操作状态的方法就在哪里**

## 脚手架配置代理
### 方法一
- **App.jsx**
```js
import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {

    getStudentData = () => {
        // 跨域主要是由于客户端存在ajax引擎
        // 此处访问本地的3000服务器，然后在package.json中代理到5000端口
        // 这样就会先找public目录下是否有相应资源，没有则去5000端口的服务器寻找
        axios.get('http://localhost:3000/students').then(
            response => { console.log('成功了', response.data); },
            error => {
                console.log('失败了', error);
            }
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.getStudentData}>点我获取学生shuju</button>
            </div>
        )
    }
}

```
- **package.json**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/1a5d22c81cd144a09828a61b4f65cbdb.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **此种配置代理的方式无法配置多个代理**


### 方法二
- **src/setupProxy.js**
```js
const proxy = require('http-proxy-middleware')  // react脚手架中已下载了这个库

module.exports = function (app) {
    app.use(
        proxy('/api1', {    // 遇见/api1前缀的请求，就会触发该代理配置
            target: 'http://localhost:5000',    // 请求转发给谁
            changeOrigin: true,     // 默认值为false。控制服务器收到的响应头中Host字段的值。true则host为5000(代理服务器的host),否则为3000（react项目启动时的host）
            pathRewrite: { '^/api1': '' }   // 重写请求路径，若不写，则访问/student时，会变为访问/api1/student
        }),
        proxy('/api2', {
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: { '^/api2': '' }
        })
    )
}
```
- **src/App.jsx**
```js
import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {

    getStudentData = () => {
        // 跨域主要是由于客户端存在ajax引擎
        // 此处访问本地的3000服务器，然后在package.json中代理到5000端口
        // 这样就会先找public目录下是否有相应资源，没有则去5000端口的服务器寻找
        axios.get('http://localhost:3000/api1/students').then(
            response => { console.log('成功了', response.data); },
            error => {
                console.log('失败了', error);
            }
        )
    }

    getCarData = () => {
        axios.get('http://localhost:3000/api2/cars').then(
            response => { console.log('成功了', response.data); },
            error => {
                console.log('失败了', error);
            }
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.getStudentData}>点我获取学生数据</button>
                <button onClick={this.getCarData}>点我获取汽车数据</button>
            </div>
        )
    }
}

```
> **优点：可以配置多个代理，可以灵活的控制请求是否走代理**
> **缺点：配置繁琐，前端请求资源时必须加前缀**

## 复习连续解构赋值
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script type="text/javascript">
        let obj = { a: { b: { c: 1 } } }
        let obj2 = { a: { b: 2 } }
        console.log(obj.a.b.c)

        // const { a: { b: { c } } } = obj
        // console.log(c)   // 1

        const { a: { b: xxc } } = obj2  // 连续解构赋值并改名
        console.log(xxc)
    </script>
</body>

</html>
```

## github搜索项目
### 使用axios发送请求，props传递数据
- **src/App.jsx**
```js
import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
import './App.css'

export default class App extends Component {
    state = {
        users: [], // 初始化状态，users初始值为数组
        isFirst: true,   // 是否为第一次打开页面
        isLoading: false,    // 标识是否处于加载中
        err: ''  // 存储请求相关的错误信息
    }

    // 更新App的state
    updateAppState = (stateObj) => {
        this.setState({ ...stateObj })
    }

    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateAppState} />
                <List {...this.state} />
            </div>
        )
    }
}
```
- **src/components/List/index.jsx**
```js
import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
import './App.css'

export default class App extends Component {
    state = {
        users: [], // 初始化状态，users初始值为数组
        isFirst: true,   // 是否为第一次打开页面
        isLoading: false,    // 标识是否处于加载中
        err: ''  // 存储请求相关的错误信息
    }

    // 更新App的state
    updateAppState = (stateObj) => {
        this.setState({ ...stateObj })
    }

    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateAppState} />
                <List {...this.state} />
            </div>
        )
    }
}

```
- **src/components/Search/index.jsx**
```js
import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

    search = () => {
        // 获取用户的输入（连续解构赋值+重命名）
        const { keyWordElement: { value: keyword } } = this  // 此种写法无法直接输出keyWordElement

        // 发送请求前通知App更新状态
        this.props.updateAppState({ isFirst: false, isLoading: true })

        // 发送网络请求
        // 此处由于react运行所处服务器地址与get要发送请求的前缀相同，都是http://localhost:3000，所以可以省略
        axios.get(`/search/users?q=${keyword}`).then(
            response => {
                // 请求成功后通知App更新状态
                this.props.updateAppState({ isLoading: false, users: response.data.items })
            },
            error => {
                // 请求失败后通知App 更新状态
                // 此处要传error.message，不能直接传error，因为react无法直接展示对象
                this.props.updateAppState({ isLoading: false, err: error.message })
            }
        )
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键字点击搜索" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}
```

- **src/setupProxy.js**
```js
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/search', {    // 遇见/api1前缀的请求，就会触发该代理配置
            target: 'http://localhost:5000',    // 请求转发给谁
            changeOrigin: true,     // 默认值为false。控制服务器收到的响应头中Host字段的值。true则host为5000(代理服务器的host),否则为3000（react项目启动时的host）
        })
    )
}
```

### 使用PubSub重构
- **App.jsx**
```js
import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
import './App.css'

export default class App extends Component {


    // 更新App的state
    updateAppState = (stateObj) => {
        this.setState({ ...stateObj })
    }

    render() {
        return (
            <div className="container">
                <Search />
                <List />
            </div>
        )
    }
}

```

- **components/List/index.jsx**
```js
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

    state = {
        users: [], // 初始化状态，users初始值为数组
        isFirst: true,   // 是否为第一次打开页面
        isLoading: false,    // 标识是否处于加载中
        err: ''  // 存储请求相关的错误信息
    }

    componentDidMount() {
        // 此处的'_'代表消息名，及xxc
        this.token = PubSub.subscribe('xxc', (_, stateObj) => {
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }


    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {
                    // 此处由于react中无法写if及for，所以要用三元表达式
                    isFirst ? <h2>输入关键字，随后点击搜索</h2> :
                        isLoading ? <h2>Loading.....</h2> :
                            err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                                users.map((userObj) => {
                                    return (
                                        <div className="card" key={userObj.id}>
                                            <a href={userObj.html_url} target="_blank" rel="noreferrer">
                                                <img alt="avatar" src={userObj.avatar_url} style={{ width: '100px' }} />
                                            </a>
                                            <p className="card-text">{userObj.login}</p>
                                        </div>
                                    )
                                })
                }
            </div>
        )
    }
}

```

- **components/Search/index.jsx**
```js
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {

    search = () => {
        console.log('Search组件发布消息了');
        const { keyWordElement: { value: keyword } } = this

        PubSub.publish('xxc', { isFirst: false, isLoading: true })

        axios.get(`/search/users?q=${keyword}`).then(
            response => {
                PubSub.publish('xxc', { isLoading: false, users: response.data.items })
            },
            error => {
                PubSub.publish('xxc', { isLoading: false, err: error.message })
            }
        )
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键字点击搜索" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}

```
> **谁要接收数据，就在谁的componetDidMount中订阅消息，在componentWillUnmount中取消消息订阅。谁要发送数据，就在谁里面发布消息。**

### fetch发送请求
> **jQuery和axios都是对xhr的封装，但服务端中没有xhr，axios在服务端中是对http的封装。**
> **fetch与xhr并列。windows自带，且不用安装。**

- **Search/index.js**
```js
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {

    search = async () => {
        console.log('Search组件发布消息了');
        const { keyWordElement: { value: keyword } } = this

        PubSub.publish('xxc', { isFirst: false, isLoading: true })

        // 使用axios发送网络请求
        //#region 
        /* axios.get(`/search/users2?q=${keyword}`).then(
            response => {
                PubSub.publish('xxc', { isLoading: false, users: response.data.items })
            },
            error => {
                PubSub.publish('xxc', { isLoading: false, err: error.message })
            }
        ) */
        //#endregion

        // 发送网络请求---使用fetch发送（未优化）
        /* fetch(`/search/users2?q=${keyword}`).then(
            // response自身没有响应要获取的数据，需要response.json()返回一个promise对象，其内部保存着你想要的数据
            response => { console.log('联系服务器成功了'); return response.json() },   // 此处返回的promise实例(response.json()会作为.then()返回的promise实例) 
            // 此次要联系服务器失败的话，除非断网之类的。其只要端口有开着，就会联系成功
            error => {
                console.log('联系服务器失败了', error);
                return new Promise(() => { });
            }     // 此处若联系服务器失败，也会返回一个非promise值undefined，则会走到下一个.then的response中，输出"'获取数据成功了' undefined"。所以需要中断Promise链，让其无法再往下走
        ).then(
            // 上一个.then返回了一个promise实例，根据这个promise实例可以进行数据获取
            response => { console.log('获取数据成功了', response) },
             error => { console.log('获取数据失败了', error) }
        ) */

        // 发送网络请求---使用fetch发送（已优化）
        try {
            const response = await fetch(`/search/users2?q=${keyword}`)
            const data = await response.json()
            PubSub.publish('xxc', { isLoading: false, users: data.items })
        } catch (error) {
            PubSub.publish('xxc', { isLoading: false, err: error.message })
        }
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键字点击搜索" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}

```

### 总结
> **1.设计状态时要考虑全名，例如带有网络请求的组件，请求失败的时候怎么办？**
> **2.ES6小知识点：解构赋值+重命名**
> **---- let obj = {a:{b:1}}**
> **---- const {a} = obj;	//传统解构赋值**
> **---- const {a:{b}} = obj;	// 连续解构赋值**
> **---- const {a:{b:value}}= obj;	// 连续解构赋值 + 重命名**

> **3.消息订阅与发布机制**
> 	**3.1 先订阅，在发布(理解：有一种隔空对话的感觉)**
> **3.2 适用于任意组件间通信**
> **3.3 要在组件的componentWillUnmount中取消订阅**

> **4.fetch发送请求(关注分离设计思想)**
```js
try {
    const response = await fetch(`/search/users2?q=${keyword}`)
    const data = await response.json()
    PubSub.publish('xxc', { isLoading: false, users: data.items })
} catch (error) {
    PubSub.publish('xxc', { isLoading: false, err: error.message })
}
```

## React路由
### SPA的理解
> 1. **单页Web应用(single page web application，SPA)。**
> 2. **整个应用只有一个完整的页面。**
> 3. **点击页面中的链接不会刷新页面，只会做页面的局部更新。**
> 4. **数据都需要通过ajax请求获取，并在前端异步展现。**

### 路由的理解
> 1. **什么是路由？**
> **-- 1.一个路由就是一个映射关系(key-value)**
> **-- 2.key为路径，value可能是function(后端)或component(前端)**
> 2. **路由分类**
> **-- 1.后端路由：**
> **---- 1) .理解：value是function，用来处理客户端提交的请求。**
> **---- 2) .注册路由：router.get（path,function(req,res)）。**
> **---- 3) .工作过程：当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据**
> **-- 2.前端路由：**
> **--- 1) .浏览器端路由，value是component，用于展示页面内容。**
> **--- 2) .注册路由：\<Route path="/test" component={Test}>**
> **--- 3) .工作过程：当浏览器的path变为/test时，当前路由组件就会变为Test组件**  

### 前端路由原理
```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>前端路由的基石_history</title>
</head>

<body>
	<a href="http://www.atguigu.com" onclick="return push('/test1') ">push test1</a><br><br>
	<button onClick="push('/test2')">push test2</button><br><br>
	<button onClick="replace('/test3')">replace test3</button><br><br>
	<button onClick="back()">&lt;= 回退</button>
	<button onClick="forword()">前进 =&gt;</button>

	<script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"></script>
	<script type="text/javascript">
		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API
		let history = History.createHashHistory() //方法二，hash值（锚点）

		function push(path) {
			history.push(path)
			return false	// 此处是为了禁止a标签跳转，使得页面路径改变却不跳转
		}

		function replace(path) {
			history.replace(path)
		}

		function back() {
			history.goBack()
		}

		function forword() {
			history.goForward()
		}

		history.listen((location) => {
			console.log('请求路由路径变化了', location)
		})
	</script>
</body>

</html>
```

### react-router-dom的理解
> **1.react的一个插件库**
> **2.专门用来实现一个SPA应用**
> **3.基于react的项目基本都会用到此库**

>**路由Route由路由器Router管理**

### 路由的基本使用
> 1. **明确好界面中的导航区、展示区**
> 2. **导航区的a标签改为Link标签，最终也是转为了a标签**
> 		**\<Link to='/xxxxx'>Demo\</Link>**
> 3. **展示区写Route标签进行路径的匹配**
> 		**\<Route path='/xxxxx' component={Demo}/>**
> 4. **\<App>的最外侧包裹了一个\<BrowserRouter>或\<HashRouter>。使用HashRouter时，#后面的东西不会带给服务器。**
- **index.js**
```js
// 引入React核心库
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom'
// 引入路由器
import { BrowserRouter } from 'react-router-dom'
// 引入App组件
import App from './App'

// 渲染App到页面
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'))
```

- **App.jsx**
```js
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                {/* 此处要保证Link和Route标签被同一个Router标签包裹，否则会报错,所以在index.js中用了BrowserRouter包裹了整个<App/> */}
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 原生html中，靠<a>跳转不同的页面 */}
                            {/* <a className="list-group-item active" href="./about.html">About</a>
                            <a className="list-group-item" href="./home.html">Home</a> */}

                            {/* 在React中，靠路由链接实现切换组件---编写路由链接 */}
                            {/* Router(BrowserRouter或HashRouter)必须包在Link的外面，否则会报错 */}
                            <Link className="list-group-item active" to="/about">About</Link>
                            <Link className="list-group-item" to="/home">Home</Link>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Route path="/about" component={About} />
                                <Route path="/home" component={Home} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```

- **components/About/index.jsx**
```js
import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <h3>我是About的内容</h3>
        )
    }
}
```

- **components/Home/index.jsx**
```js
import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <h3>我是Home的内容</h3>
        )
    }
}
```

### 路由组件与一般组件
> **一般组件，引入后可以直接<组件名/> 来使用，放在components文件夹中**
> **路由组件，引入后靠路由匹配进行展示，放在pages文件夹中：**
> **\<Route path="/about" component={About} />**

> **路由组件中，React会为其props中默认传递一些值**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/962f6f1f00f94e4d94796f7534645aba.png)**
> **而一般组件若没有手动传值，其props都为空对象**
- **路由组件props中常用属性：**
```txt
history:
		go: ƒ go(n)
		goBack: ƒ goBack()
		goForward: ƒ goForward()
		push: ƒ push(path, state)
		replace: ƒ replace(path, state)
location:
		pathname: "/about"
		search: ""
		state: undefined
match:
		params: {}
		path: "/about"
		url: "/about"
```

### NavLink的使用
- **src/App.jsx**
```js
import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Header from './components/Header'    // Header是一般组件

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 此处使用NavLick，React会给点击的那个NavLink自动加上active */}
                            {/* NavLink有一个activeClassName属性，可以指定当前的NavLink被点击后加上什么名字的类。不设置默认为active */}
                            <NavLink activeClassName="xxc" className="list-group-item" to="/about">About</NavLink>
                            <NavLink activeClassName="xxc" className="list-group-item" to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Route path="/about" component={About} />
                                <Route path="/home" component={Home} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```

- **public/index.html**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React脚手架</title>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="stylesheet" href="./css/bootstrap.css">
    <style>
        .xxc {
            /* 此处需加important,为了避免由于权重低导致效果不生效 */
            background: orange !important;
            color: skyblue !important;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```
**result:**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/5d56d1bafd524ee28c771c5130f30494.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
### 封装NavLink组件
- **App.jsx**
```js
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Header from './components/Header'    // Header是一般组件
import MyNavLink from './components/MyNavLink'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 此处的标签体内容，会作为props的children属性传给MyNavLink */}
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Route path="/about" component={About} />
                                <Route path="/home" component={Home} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```

- **components/MyNavLink/index.jsx**
```js
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        console.log(this.props);    //{to: '/about', children: 'About'}
        return (
            // 由于this.props中有一个children属性包含标签体内容，所以如下写法相当于
            // <NavLink activeClassName="xxc" className="list-group-item" {...this.props}>{this.props.children}</NavLink>
            <NavLink activeClassName="xxc" className="list-group-item" {...this.props} />
        )
    }
}
```

> 1. **NavLink可以实现路由链接的高亮，通过activeClassName指定样式名**
> 2. **标签体内容是一个特殊的标签属性**
> 3. **通过this.props.children可以获取标签体内容**

### Switch的使用
**![在这里插入图片描述](https://img-blog.csdnimg.cn/54be6d954a594baebf5801967c73317f.png)**
> **当出现如上情况时，一个路径对应两个路由组件，则会将两个路由组件都显示出来**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/f968eff69f704ba1befdb9a43b046be5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **这说明，路由匹配会遍历所有路由后再展示。由于要遍历所有路由，此种情况会有效率上的问题。**
> **此时就需要Switch组件，使得路由匹配后就直接展示，不会继续遍历(单一匹配)。**

```js
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Test from './pages/Test'
import Header from './components/Header'    // Header是一般组件
import MyNavLink from './components/MyNavLink'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 此处的标签体内容，会作为props的children属性传给MyNavLink */}
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                    <Route path="/home" component={Test} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```
**result:**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/499e12848cec472cad8fb702caadb03d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**

### 解决样式丢失问题
> **当第一次加载页面时，bootstrap.css的访问路径为：**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/53ae9bb6d0704f3783b9c0a5f203a373.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **当点击了About再刷新页面后，其访问路径变为：**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/91da8b4189994f6fbe8ae425a7c3ebd2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **![在这里插入图片描述](https://img-blog.csdnimg.cn/7092d4fadb4a4f20ae4b392eaff2f0ea.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
> **由于webpack默认是从public文件夹中寻找静态资源，而public中没有xxc这个文件夹，而其内部规定若访问了一个public中不存在的资源，则会将public下的index.html返回。故此处导致样式丢失，然而bootstrap.css的status仍为200问题。**

>**造成这一问题的主要原因是，在index.html中引入bootstrap.css，使用的是相对路径。这就导致了当点击About时，路径添加了/xxc变为了多级结构，而请求会把/xxc也作为public下的目录结构。**
>**![在这里插入图片描述](https://img-blog.csdnimg.cn/01dfe4c627a548d18533ccbe22e4c09b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**

#### **方法一：**
**将public/index.html中的link改为绝对路径形式**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React脚手架</title>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="stylesheet" href="/css/bootstrap.css">
    <style>
        .xxc {
            /* 此处需加important,为了避免由于权重低导致效果不生效 */
            background: orange !important;
            color: skyblue !important;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```

#### **方法二：**
**将public/index.html中的link改为%PUBLIC_URL%形式**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React脚手架</title>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
    <style>
        .xxc {
            /* 此处需加important,为了避免由于权重低导致效果不生效 */
            background: orange !important;
            color: skyblue !important;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```

#### **方法三：**
**将index.js中包裹App组件的路由器改为HashRouter**
```js
// 引入React核心库
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom'
// 引入路由器
import { HashRouter } from 'react-router-dom'
// 引入App组件
import App from './App'

// 渲染App到页面
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root'))
```

### 路由的模糊匹配与严格匹配
>**![在这里插入图片描述](https://img-blog.csdnimg.cn/a47b14aa740746e193cc5b84ab033815.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
>**当Link标签中to属性值包含了Route中的path属性值且以其path属性值开头时，就可以对应匹配。而若Route中的path属性值为如下两种情况，则无法匹配。因为React中的路由默认是模糊匹配**
>**![在这里插入图片描述](https://img-blog.csdnimg.cn/4e01059975394df08462be198a561223.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
>**![在这里插入图片描述](https://img-blog.csdnimg.cn/54e61d8d10b74b64a03ad533a5293c63.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**

**开启严格匹配(在Route中添加exact)：**
```js
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Header from './components/Header'    // Header是一般组件
import MyNavLink from './components/MyNavLink'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 此处的标签体内容，会作为props的children属性传给MyNavLink */}
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home/b">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" exact component={About} />
                                    <Route path="/home" exact component={Home} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```
> 1. **默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）**
> 2. **开启严格匹配：\<Route exact={true} path="/about" component={About}/>**
> 3. **严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由**

### Redirect的使用
> **Redirect的作用：使得页面一开始就能跳到/about**

```js
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Header from './components/Header'    // Header是一般组件
import MyNavLink from './components/MyNavLink'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                    <Redirect to="/about" />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```
> 1. **Redirect一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由**
> 2. **具体编码：**
> **\<Switch>**
> **——  \<Route path="/about" component={About} />**
> **—— \<Route path="/home" component={Home} />**
> **——\<Redirect to="/about" />**
>  **\</Switch>**

 ### 嵌套路由
 - **App.jsx**
 ```js
 import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'     // Home是路由组件
import About from './pages/About'
import Header from './components/Header'    // Header是一般组件
import MyNavLink from './components/MyNavLink'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                    <Redirect to="/about" />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
 ```
- **pages/Home/index.jsx**
```js
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import News from './News'
import Message from './Message'
import MyNavLink from '../../components/MyNavLink'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>我是Home的内容</h3>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            {/* 此处需要在路由前加/home，否则会去App.jsx中匹配，由于没有一个匹配成功的，所以会跳转到/about */}
                            {/* 而若加了/home，会先去App.jsx中匹配，匹配到了/home（模糊匹配），展示Home组件。之后再进入Home组件中，匹配/home/news，并渲染News组件 */}
                            {/* 此时若在App.jsx中开启了严格匹配，则会导致MyNavLink中的二级匹配失效，因为最开始时匹配就匹配不到 */}
                            <MyNavLink to="/home/news">News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/message">Message</MyNavLink>
                        </li>
                    </ul>
                    <div>
                        {/* 注册路由 */}
                        <Switch>
                            <Route path="/home/news" component={News}></Route>
                            <Route path="/home/message" component={Message}></Route>
                            <Redirect to="home/news" />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

```

- **pages/Home/Message/index.jsx**
```js
import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="/message1">message001</a>&nbsp;&nbsp;
                    </li>
                <li>
                    <a href="/message2">message002</a>&nbsp;&nbsp;
                    </li>
                <li>
                    <a href="/message/3">message003</a>&nbsp;&nbsp;
                    </li>
            </ul>
        )
    }
}

```
- **pages/Home/News/index.jsx**
```js
import React, { Component } from 'react'

export default class News extends Component {
    render() {
        return (
            <ul>
                <li>news001</li>
                <li>news002</li>
                <li>news003</li>
            </ul>
        )
    }
}
```
> 1. **注册子路由时要写上父路由的path值**
> 2. **路由的匹配是按照注册路由的顺序进行的**

### 向路由组件传递params参数
- **src\pages\Home\Message\index.jsx**
```js
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr: [
            { id: '01', title: '消息1' },
            { id: '02', title: '消息2' },
            { id: '03', title: '消息3' },
        ]
    }
    render() {
        const { messageArr } = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj) => {
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递params参数 */}
                                    <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                                </li>

                            )
                        })
                    }
                </ul>
                <hr />
                {/* 声明接收params参数 */}
                {/* 此处声明后，便可以在路由组件的props.match.params中收到参数 */}
                <Route path="/home/message/detail/:id/:title" component={Detail} />
            </div>
        )
    }
}

```
- **src\pages\Home\Message\Detail\index.jsx**
```js
import React, { Component } from 'react'

const DetailData = [
    { id: '01', content: '你好，中国' },
    { id: '02', content: '你好，xxc' },
    { id: '03', content: '你好，jmz' },
]
export default class Detail extends Component {
    render() {
        // 接收params参数
        const { id, title } = this.props.match.params
        const findResult = DetailData.find((detailObj) => {
            return detailObj.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>Title:{title}</li>
                <li>Content:{findResult.content}</li>
            </ul>
        )
    }
}
```

> **params参数**
> **--- 路由链接(携带参数)：\<Link to="/demo/test/tom/18">详情</Link>**
> **--- 注册路由(声明接收)：\<Route path="/demo/test/:name/:age" component={Test}>**
> **--- 接收参数：const {name,age} = this.props.match.params**

### 向路由组件传递search参数
- **src\pages\Home\Message\index.jsx**
```js
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr: [
            { id: '01', title: '消息1' },
            { id: '02', title: '消息2' },
            { id: '03', title: '消息3' },
        ]
    }
    render() {
        const { messageArr } = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj) => {
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递search参数 */}
                                    <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
	                {/* search参数无需声明接收，正常注册路由即可 */}
                <Route path="/home/message/detail" component={Detail} />
            </div>
        )
    }
}

```
- **src\pages\Home\Message\Detail\index.jsx**
```js
import React, { Component } from 'react'
import qs from 'querystring'    // 这个库的parse方法可以使得 name=tom&age=18（urlencoded编码）变为对象,stringfy则相反


const DetailData = [
    { id: '01', content: '你好，中国' },
    { id: '02', content: '你好，xxc' },
    { id: '03', content: '你好，jmz' },
]
export default class Detail extends Component {
    render() {
        // 接收search参数
        const { search } = this.props.location
        const { id, title } = qs.parse(search.slice(1))

        const findResult = DetailData.find((detailObj) => {
            return detailObj.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>Title:{title}</li>
                <li>Content:{findResult.content}</li>
            </ul>
        )
    }
}

```
> search参数
> --- 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'>详情\</Link>`
> --- 注册路由(无需声明，正常注册即可):`<Route path="/demo/test" component={Test}>`
> --- 接收参数：this.props.location.search
> --- 备注: 获取到的search是urlencoded编码字符串，需要借助querystring解析

### 向路由组件传递state参数
- **src\pages\Home\Message\index.jsx**
```js
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr: [
            { id: '01', title: '消息1' },
            { id: '02', title: '消息2' },
            { id: '03', title: '消息3' },
        ]
    }
    render() {
        const { messageArr } = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj) => {
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递state参数 */}
                                    <Link to={{ pathname: '/home/message/detail', state: { id: msgObj.id, title: msgObj.title } }}>{msgObj.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* state参数无需声明接收，正常注册路由即可 */}
                {/* 此种传递方式虽然没有将参数保存在路由中，但是会被浏览器的history记录，所以即便刷新页面，数据也会保存。但是一旦清除浏览器数据，数据就会丢失 */}
                <Route path="/home/message/detail" component={Detail} />
            </div>
        )
    }
}

```

- **src\pages\Home\Message\Detail\index.jsx**
```js
import React, { Component } from 'react'

const DetailData = [
    { id: '01', content: '你好，中国' },
    { id: '02', content: '你好，xxc' },
    { id: '03', content: '你好，jmz' },
]
export default class Detail extends Component {
    render() {
        // 接收state参数
        // 下方的两个{}是为了避免state传参方式在浏览器数据被删除时消失的情况
        const { id, title } = this.props.location.state || {}

        const findResult = DetailData.find((detailObj) => {
            return detailObj.id === id
        }) || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>Title:{title}</li>
                <li>Content:{findResult.content}</li>
            </ul>
        )
    }
}
```

> state参数
> ---路由链接(携带参数):`<Link to={{path:'/demo/test',state:{name:"tom",age:18}}}>详情</Link>`
> ---注册路由(无需声明，正常注册即可):`<Route path="/demo/test" component={Test}>`
> ---接收参数：this.props.location.state
> ---备注：刷新也可以保留住参数

### push与replace
> 默认是push模式，可以通过如下方式改为replace模式(将Link标签的replace改为true)。
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/c974355ca36143138f0b2c5e78850b2c.png)
### 编程式路由导航
- src\pages\Home\Message\index.jsx
```js
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr: [
            { id: '01', title: '消息1' },
            { id: '02', title: '消息2' },
            { id: '03', title: '消息3' },
        ]
    }

    replaceShow = (id, title) => {
        // 编写一段代码，让其实现跳转到Detail组件，且为replace跳转，携带params参数
        // this.props.history.replace(`/home/message/detail/${id}/${title}`)

        // replace跳转，携带search参数
        // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

        // replace跳转，携带state参数
        this.props.history.replace(`/home/message/detail`, { id, title })
    }

    pushShow = (id, title) => {
        // 编写一段代码，让其实现跳转到Detail组件，且为push跳转，携带params参数
        // this.props.history.push(`/home/message/detail/${id}/${title}`)

        // push跳转，携带search参数
        // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

        // push跳转，携带state参数
        this.props.history.push(`/home/message/detail`, { id, title })
    }

    forward = () => {
        this.props.history.goForward()
    }

    back = () => {
        this.props.history.goBack()
    }

    go = () => {
        this.props.history.go(-2) // 表示后退两位
    }

    render() {
        const { messageArr } = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj) => {
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递params参数 */}
                                    <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                                    <button onClick={() => this.pushShow(msgObj.id, msgObj.title)}>push查看</button>&nbsp;&nbsp;
                                    <button onClick={() => this.replaceShow(msgObj.id, msgObj.title)}>replace查看</button>
                          
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 声明接收params参数 */}
                {/* 此处声明后，便可以在路由组件的props.match.params中收到参数 */}
                {/* <Route path="/home/message/detail/:id/:title" component={Detail} /> */}

                {/* search参数无需声明接收，正常注册路由即可 */}
                {/* <Route path="/home/message/detail" component={Detail} /> */}

                {/* state参数无需声明接收，正常注册路由即可 */}
                {/* 此种传递方式虽然没有将参数保存在路由中，但是会被浏览器的history记录，所以即便刷新页面，数据也会保存。但是一旦清除浏览器历史记录，数据就会丢失 */}
                <Route path="/home/message/detail" component={Detail} />
                <button onClick={this.back}>回退</button>&nbsp;
                <button onClick={this.forward}>前进</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}

```

- **实现页面渲染后过两秒跳转：**
```js
import React, { Component } from 'react'

export default class News extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/home/message')
        }, 2000);
    }

    render() {
        return (
            <ul>
                <li>news001</li>
                <li>news002</li>
                <li>news003</li>
            </ul>
        )
    }
}
```

> 注意：只有路由组件才有this.props.history.xxx。一般组件没有，需要使用withRouter才能实现对应效果。

### withRouter的使用
- src/components/Header/index.jsx
```js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    back = () => {
        this.props.history.goBack()
    }

    forward = () => {
        this.props.history.goForward()
    }

    go = () => {
        this.props.history.go(-2)
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header">
                        <h2>React Router Demo</h2>
                        <button onClick={this.back}>回退</button>&nbsp;
                        <button onClick={this.forward}>前进</button>
                        <button onClick={this.go}>go</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)

// withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
// withRouter的返回值是一个新组件
```

### BrowserRouter与HashRouter的区别
> **1.底层原理不一样：**
> **--- BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。**
> **--- HashRouter使用的是URL的哈希值。**
> 2. **path表现形式不一样**
> **--- BrowserRouter的路径中没有#，例如：localhost:3000/demo/test**
> **--- HashRouter的路径包含#，例如：localhost:3000/#/demo/test**
> 3. **刷新后对路由state参数的影响**
> **--- (1).BrowserRouter没有任何影响，因为state保存在history对象中。**
> **--- (2).HashRouter刷新后会导致路由state参数的丢失**
> 4. **备注:HashRouter可以用于解决一些路径错误相关的问题**

## antd
### antd的基本使用
1. **项目中安装**
```js
yarn add antd
```
2. **在组件中引入antd及相应的css文件**
3. **使用**

- **App.jsx**
```js
import React, { Component } from 'react';
import { Button, DatePicker } from 'antd'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
const { RangePicker } = DatePicker;

class App extends Component {

    render() {
        function onChange(date, dateString) {
            console.log(date, dateString);
        }
        return (
            <div>
                App...
                <Button type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>
                <Button type="primary">按钮1</Button>
                <Button type="danger">按钮2</Button>
                <Button>按钮3</Button>
                <LoadingOutlined></LoadingOutlined>
                <DatePicker onChange={onChange} picker="year" />
                <RangePicker picker="year" />
            </div>
        );
    }
}

export default App;
```

### antd样式的按需引入
1. **导入如下两个包，其中react-app-rewired是用来启动修改后的react项目，customize-cra用来修改配置**
```txt
yarn add react-app-rewired customize-cra
```
2. **将package.json文件的scripts的start修改为：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/894ab08c2b4c4825b5c772fec7a8bb80.png)**
3. **安装按需引入的插件**
```txt
yarn add babel-plugin-import
```
4. **在根目录新建config-overrides.js，并写入如下代码**
```js
// 配置具体的修改规则
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);
```
5. **此后，无序在项目中引入antd的css文件，也可使得样式生效。**

### antd修改主题颜色
1. **安装插件**
```txt
yarn add less@3.12.2 less-loader@7.1.0
```
2. **修改config-overrides.js**
```js
// 配置具体的修改规则
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,    // 允许用js修改antd底层文件
            modifyVars: { '@primary-color': 'orange' },    // 修改哪个变量
        }
    }),
);
```

## redux
### redux理解
> **redux是什么？**
> **---1. redux是一个专门用于做状态管理的JS库（不是react插件库）**
> **--- 2. 它可以用在react、angular、vue等项目中，但基本与react配合使用**
> **--- 3. 作用：集中式管理react应用中多个组件共享的状态**

>**什么情况下需要使用redux**
>**---1.某个组件的状态，需要让其他组件可以随时拿到（共享）**
>**---2. 一个组件需要改变另一个组件的状态（通信）**
>**---3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用**

**![在这里插入图片描述](https://img-blog.csdnimg.cn/5a8043cc1836478d989ef0141bb85451.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
>**Store：指挥者  
>Action Creators：将要做的事包装为action对象**
>**Reducers：执行者 (初始化状态【previousState传undefined】、加工状态)**
>**previousState：之前的状态**
>**action：要执行的动作和值**
>**newState：新的状态**

**1.action**
**--1.动作的对象**
**--2.包含2个属性**
**-----type：标识属性, 值为字符串, 唯一, 必要属性**
**-----data：数据属性, 值类型任意, 可选属性（当type为@@init@@时）**
**--3.例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }**

**2.reducer**
**--1.用于初始化状态、加工状态。**
**--2.加工时，根据旧的state和action， 产生新的state的纯函数。**

**3.store**
**--1.将state、action、reducer联系在一起的对象**
**--2.如何得到此对象?**
**-----1.import {createStore} from 'redux'**
**-----2.import reducer from './reducers'**
**-----3.const store = createStore(reducer)**
**--3	此对象的功能?**
**-----1.getState(): 得到state**
**-----2.dispatch(action): 分发action, 触发reducer调用, 产生新的state**
**-----3.subscribe(listener): 注册监听, 当产生了新的state时, 自动调用**

### 求和案例_纯react版
- **App.jsx**
```js
import React, { Component } from 'react'
import Count from './components/Count'

export default class App extends Component {
    render() {
        return (
            <div>
                <Count />
            </div>
        )
    }
}

```

- **components\Count\index.jsx**
```js
import React, { Component } from 'react'

export default class componentDidMount extends Component {
    state = { count: 0 }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        const { count } = this.state
        this.setState({ count: count + value * 1 })
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        const { count } = this.state
        this.setState({ count: count - value * 1 })
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const { count } = this.state
        if (count % 2 !== 0) {
            this.setState({ count: count + value * 1 })
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        const { count } = this.state
        setTimeout(() => {
            this.setState({ count: count + value * 1 })
        }, 1000);
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{this.state.count}</h1>
                {/* 此处的c未select节点 */}
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

```

### 求和案例_redux精简版
> **写redux版的案例之前，需要先安装redux：yarn add redux。**

- **redux/count_reducer.js**
```js
/* 
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别是:之前的状态(preState)，动作对象(action)
*/

const initState = 0
export default function countReducer(preState = initState, action) {
    console.log(preState, action)   
    // 从action对象中获取：type、data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case 'increment':   // 如果是加
            return preState + data
        case 'decrement':   // 如果是减
            return preState - data
        default:
            return preState
    }
}
```

- **redux/store.js**
```js
/* 
    该问价专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入creteStore，专门用于创建redux中最为核心的store对象
import { createStore } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'

export default createStore(countReducer)


```

- **index.js**
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App />, document.getElementById('root'))

store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
```

- **components/Count/index.jsx**
```js
import React, { Component } from 'react'
// 引入store，用于获取redux中保存的状态
import store from '../../redux/store'

export default class componentDidMount extends Component {
    state = { carName: '奔驰c63' }

    // 此处单独在组件中检测，会导致每一个组件都得写一遍，更好的办法是在入口文件index.js中就写一遍，一劳永逸。
    // 个人认为，也可以把以下代码放到App.jsx中，在根组件只有一个<App/>时，可以达到同样的效果
    /* componentDidMount() {
        // 检测redux中状态的变化，只要变化，就调用render
        store.subscribe(() => {
            this.setState({})   // thi.setSate({}) 用来更新页面，传一个空对象表示不修改组件内部state
        })
    } */


    // 加法
    increment = () => {
        const { value } = this.selectNumber
        // 通知redux加value
        // redux触发的数据更新不会导致页面重新渲染，需要我们手动渲染
        store.dispatch({ type: 'increment', data: value * 1 })
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        // 通知redux加value
        // redux触发的数据更新不会导致页面重新渲染，需要我们手动渲染
        store.dispatch({ type: 'decrement', data: value * 1 })
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const count = store.getState()
        if (count % 2 !== 0) {
            store.dispatch({ type: 'increment', data: value * 1 })
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        setTimeout(() => {
            store.dispatch({ type: 'increment', data: value * 1 })
        }, 1000);
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{store.getState()}</h1>
                {/* 此处的c未select节点 */}
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}
```

> **(1).去除Count组件自身的状态**
> **(2).src下建立：**
> **--- redux**
> **--- store.js**
> **--- count_reducer.js**
> **(3).store.js**
> **--- 1).引入redux中的createStore函数，创建一个store**
> **--- 2).createStore调用时要传入一个为其服务的reducer**
> **--- 3).记得暴露store对象**
> **(4).count_reducer.js:**
> **--- 1).reducer的本质是一个函数，接收：preState，action，返回加工后的状态**
> **--- 2).reducer有两个作用：初始化状态，加工状态**
> **--- 3).reducer被第一次调用时，是store自动触发的。**
> **----- 传递的preState是undefined,**
> **----- 传递的action是：{type:'@@REDUX/INIT_a.2.b.4'}**
> **(5).在index.js中检测store中状态的改变，一旦发送改变重新渲染\<App/>**
> **--- 备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。**


### 求和案例_redux完整版
- **redux/constant.js**
```js
/*
    该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/

export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

- **redux/count_action.js**
```js
/*
    该文件专门为Count组件生成action对象
*/
import { INCREMENT, DECREMENT } from './constant'

// 此处要写小括号，否则返回值简写形式若返回对象时，对象的{}会被认为是函数体
export const createIncrementAction = data => ({ type: INCREMENT, data })

export const createDecrementAction = data => ({ type: DECREMENT, data })
```

- **redux/count_reducer.js**
```js
/* 
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别是:之前的状态(preState)，动作对象(action)
*/
import { INCREMENT, DECREMENT } from './constant'

const initState = 0
export default function countReducer(preState = initState, action) {
    // 从action对象中获取：type、data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case INCREMENT:   // 如果是加
            return preState + data
        case DECREMENT:   // 如果是减
            return preState - data
        default:
            return preState
    }
}
```
- **redux/store.js**
```js
/* 
    该问价专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入creteStore，专门用于创建redux中最为核心的store对象
import { createStore } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'

export default createStore(countReducer)
```

- **components/Count/index.jsx**
```js
import React, { Component } from 'react'
// 引入store，用于获取redux中保存的状态
import store from '../../redux/store'
// 引入actionCreator，专门用于创建action对象
import { createIncrementAction, createDecrementAction } from '../../redux/count_action'

export default class componentDidMount extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        // 通知redux加value
        // redux触发的数据更新不会导致页面重新渲染，需要我们手动渲染
        store.dispatch(createIncrementAction(value * 1))
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        // 通知redux加value
        // redux触发的数据更新不会导致页面重新渲染，需要我们手动渲染
        store.dispatch(createDecrementAction(value * 1))
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const count = store.getState()
        if (count % 2 !== 0) {
            store.dispatch(createIncrementAction(value * 1))
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        setTimeout(() => {
            store.dispatch(createIncrementAction(value * 1))
        }, 1000);
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{store.getState()}</h1>
                {/* 此处的c未select节点 */}
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

```

> **新增文件：**
> 1. **count_action.js 专门用于创建action对象**
> 2. **constant.js 放置容易写错的type值**

### 求和案例_异步action版
**action：Object{} 同步、function 异步**

> **1).含义：延迟的动作不想交给组件自身，想交给action**
> **2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。**
> **3).具体编码：**
> **---- 1）. yarn add redux-thunk，并配置在store中。**
> **---- 2）.创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。**
> **---- 3）.异步任务有结果后，分发一个同步的action去真正操作数据。**
> **4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果，再去分发同步action。**

- **components/Count/index.jsx**
```js
import React, { Component } from 'react'
import store from '../../redux/store'
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

export default class componentDidMount extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        store.dispatch(createIncrementAction(value * 1))
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        store.dispatch(createDecrementAction(value * 1))
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const count = store.getState()
        if (count % 2 !== 0) {
            store.dispatch(createIncrementAction(value * 1))
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        store.dispatch(createIncrementAsyncAction(value * 1, 500))
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{store.getState()}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

```

- **redux/store.js**
```js
/* 
    该问价专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入applyMiddleware，用于包裹中间件，执行异步任务
import { createStore, applyMiddleware } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'

export default createStore(countReducer, applyMiddleware(thunk))
```

- **redux/count-action.js**
```js
/*
    该文件专门为Count组件生成action对象
*/
import { INCREMENT, DECREMENT } from './constant'
// import store from './store'

// 同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({ type: INCREMENT, data })

export const createDecrementAction = data => ({ type: DECREMENT, data })

// 所谓的异步action,就是指action的值为函数，异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data, time) => {
    // 由于函数是由store调用的，其会传入一个dispatch，所以就不用store.dispatch()的写法，而是可以直接dispatch()
    return (dispatch) => {
        // 此处返回的函数被包裹在组件中的store.dispatch()方法中，所以store会帮忙调用。
        setTimeout(() => {
            // store.dispatch(createIncrementAction(data))
            dispatch(createIncrementAction(data))
        }, time);
    }
}
```

### 对react-redux的理解
**![请添加图片描述](https://img-blog.csdnimg.cn/409952fc314e474b86ea63b48b9e2793.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)**
#### 连接容器组件与UI组件
> **首先要安装react-redux。然后新建文件夹containers，在里面靠react-redux建立容器组件**
- **containers/Count/index.jsx**
```js
// 引入Count的UI组件
import CountUI from '../../components/Count'

// import store from '../../redux/store'    // 报错

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

// 让容器组件与UI组件进行关联
// 使用connect()()创建并暴露一个Count的容器组件
export default connect()(CountUI)

// store需要从其父组件通过props传入，而不能直接在容器组件中引入，会报错
```

- **conponents/Count/index.jsx（此文件为UI组件，不可写任何与redux相关代码）**
```js
import React, { Component } from 'react'

export default class componentDidMount extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{ }</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

```

- **App.jsx（通过此文件给容器组件传递store，且注意渲染的是容器组件，不是UI组件）**
```js
import React, { Component } from 'react'
import Count from './containers/Count'  // 此处要改成引入containers中的Count容器组件
import store from './redux/store'


export default class App extends Component {

    render() {
        return (
            <div>
                <Count store={store} />
            </div>
        )
    }
}
```

#### react-redux的基本使用
- **containers/Count/index.jsx**
```js
// 引入Count的UI组件
import CountUI from '../../components/Count'

// 引入action
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'

// import store from '../../redux/store'    // 报错

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

// 1.mapStateToProps函数返回的是一个对象
// 2.返回的对象中的key就作为传递给UI组件props的key, value就作为传递给UI组件props的value
// 3.mapStateToProps用于传递状态
// 此处react-redux调用下面的函数时，已经内部得到了store.getState()的返回值state，并将state作为函数的参数传入
function mapStateToProps(state) {
    // 此处返回值必须为对象，因为props是对象形式
    return {
        count: state
    }
}

// 1.mapDispatchToProps函数返回的是一个对象
// 2.返回的对象中的key就作为传递给UI组件props的key, value就作为传递给UI组件props的value
// 3.mapDispatchToProps用于传递操作状态的方法
// 此处react-redux调用下面的函数时，已经内部将了store.dispatch地址作为函数的参数传入
function mapDispatchToProps(dispatch) {
    return {
        jia: (number) => {
            // 通知redux执行加法
            dispatch(createIncrementAction(number))
        },
        jian: number => dispatch(createDecrementAction(number)),
        jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
    }
}

// 让容器组件与UI组件进行关联
// 使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)

// store需要从其父组件通过props传入，而不能直接在容器组件中引入，会报错
```

- **conponents/Count/index.jsx**
```js
import React, { Component } from 'react'

export default class componentDidMount extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        // console.log('UI组件接收到的props是：', this.props);
        return (
            <div>
                <h1>当前求和为:{this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}
```

> **(1).明确两个概念：**
> **--- 1）.UI组件：不能使用任何redux的api，只负责页面的呈现、交互等。**
> **--- 2）.容器组件：负责和redux通信，将结果交给UI组件。**
> **(2).如何创建一个容器组件-----靠react-redux的connect函数**
> **--- connect（mapStateToProps,mapDispatchToProps）（UI组件）**
> **----- mapStateToProps:映射状态，返回值是一个对象**
> **----- mapDispatchToProps:映射操作状态的方法，返回值是一个对象**
> **(3).备注：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入**

#### 简写mapDispatch（对象形式）
- **containers/Count/index.jsx**
```js
import CountUI from '../../components/Count'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'
import { connect } from 'react-redux'

export default connect(
    state => ({ count: state }),

    // mapDispatchToProps的一般写法
    /* dispatch => ({
        jia: number => dispatch(createIncrementAction(number)),
        jian: number => dispatch(createDecrementAction(number)),
        jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
    }) */

    // mapDispatchToProps的简写：
    {
        // 此处只需要给UI组件传递返回action对象的函数，UI组件执行后得到的action对象，react-redux会将其自动分发(dispatch)出去
        // 返回action对象时，react-redux会自动dispatch(action)
        jia: createIncrementAction,
        jian: createDecrementAction,
        // 异步返回的是函数,react-redux会将返回的function作为参数dispatch(function)，相当于调用了function
        jiaAsync: createIncrementAsyncAction
        // 个人理解，只要mapDispatch是对象形式，当UI组件调用键时，react-redux会将其中的每一项的值的返回结果都dispatch一遍。
    }
)(CountUI)
```

#### 使用react-redux后可以自动监测state
**原先我们需要在index.js中写如下代码，才能使得redux中reducer的数据发生改变后react能监测的到**
- **index.js**
```js
store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
```
**而现在由于我们使用了react-redux，所以不再需要写以上代码，react也能监测到redux的数据改变**

#### Provider组件的使用
**原先我们要给容器组件传递store，需要在App.jsx中通过props的方式一个一个传给容器组件：**
```js
import React, { Component } from 'react'
import Count from './containers/Count'  // 此处要改成引入containers中的Count容器组件
import store from './redux/store'


export default class App extends Component {

    render() {
        return (
            <div>
                {/* 给容器组件传递store */}
                <Count store={store} />
            </div>
        )
    }
}
```

**而现在我们可以通过在index.js中导入react-redux提供的Provider来实现一次传入，所有容器组件都可以使用store的效果**
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

#### 整合UI组件与容器组件
**原先的目录结构**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/db5b42243ab74b9495e02262a7928b94.png)**
**可以看出，每一个组件既要创建一个对应的容器组件，又要创建一个对应的UI组件，当组件过多时，会增加项目的复杂度。所以我们可以考虑将UI组件融入到容器组件中：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/d53d449f8ce0482688b0f4ac24a2d28e.png)**
- **containers\Count\index.jsx**
```js
import React, { Component } from 'react'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'
import { connect } from 'react-redux'

// 定义UI组件
class Count extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
    state => ({ count: state }),
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
       }
)(Count)
```

#### 优化总结
> **(1).容器组件和UI组件整合一个文件**
> **(2).无需自己给容器组件传递store，给\<App/>包裹一个\<Provider store={store}>即可。**
> **(3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作.**
> **(4).mapDispatchToProps也可以简单的写成一个对象**
> **(5).一个组件要和redux“打交道”要经过哪几步？**
> **---- (1).定义好UI组件--- 不暴露**
> **---- (2).引入connect生成一个容器组件，并暴露，写法如下：**
> **connect(**
> 	**state=>({key:value})， // 映射状态**
> **{key:xxxAction}	// 映射操作状态的方法**
> **)(UI组件)**
> **---- (3).在UI组件中通过this.props.xxx读取和操作状态**

> **注意：容器组件中看不到直接操作store的代码，但是还是需要传入store，因为react-redux底层需要，不传会报错。**

### 数据共享
**目录结构：**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/26872274ec03499488947751cbc353f9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_13,color_FFFFFF,t_70,g_se,x_16)**
- **src/redux/constant.js**
```js
/*
    该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/

export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const ADD_PERSON = 'add_person'
```
- **src/redux/store.js**
```js
/* 
    该问价专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入applyMiddleware，用于包裹中间件，执行异步任务
import { createStore, applyMiddleware, combineReducers } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './reducers/count'
// 引入为Person组件服务的reducer
import personReducer from './reducers/person'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'

// 引入combineReducers，合并reducer，确保其为对象形式，以便获取
const allReducer = combineReducers({
    count: countReducer,
    persons: personReducer
})

export default createStore(allReducer, applyMiddleware(thunk))
```
- **src/redux/actions/count.js**
```js
/*
    该文件专门为Count组件生成action对象
*/
import { INCREMENT, DECREMENT } from '../constant'
export const createIncrementAction = data => ({ type: INCREMENT, data })

export const createDecrementAction = data => ({ type: DECREMENT, data })

export const createIncrementAsyncAction = (data, time) => {
    // 由于函数是由store调用的，其会传入一个dispatch，所以就不用store.dispatch()的写法，而是可以直接dispatch()
    return (dispatch) => {
        // 此处返回的函数被包裹在组件中的store.dispatch()方法中，所以store会帮忙调用。
        setTimeout(() => {
            // store.dispatch(createIncrementAction(data))
            dispatch(createIncrementAction(data))
        }, time);
    }
}
```
- **src/redux/actions/person.js**
```js
import { ADD_PERSON } from '../constant'

// 创建增加一个人的action动作对象
export const createAddPersonAction = personObj => ({
    type: ADD_PERSON,
    data: personObj
})
```
- **src/redux/reducers/count.js**
```js
/* 
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别是:之前的状态(preState)，动作对象(action)
*/
import { INCREMENT, DECREMENT } from '../constant'

const initState = 0
export default function countReducer(preState = initState, action) {
    // 从action对象中获取：type、data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case INCREMENT:   // 如果是加
            return preState + data
        case DECREMENT:   // 如果是减
            return preState - data
        default:
            return preState
    }
}
```
- **src/redux/reducers/person.js**
```js
import { ADD_PERSON } from '../constant'

// 初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }]
export default function personReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case ADD_PERSON:    // 若是添加一个人
            return [data, ...preState]
        default:
            return preState
    }
}
```


- **src/containers/Count/index.jsx**
```js
import React, { Component } from 'react'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/actions/count'
import { connect } from 'react-redux'

// 定义UI组件
class Count extends Component {
    state = { carName: '奔驰c63' }
    // 加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        // console.log('UI组件接收到的props是：', this.props);
        return (
            <div>
                <h2>我是Count组件,下方组件总人数为:{this.props.personCount}</h2>
                <h4>当前求和为:{this.props.count}</h4>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步+</button>&nbsp;
            </div>
        )
    }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
    // 此处由于reducer为经过合并的对象，不再是原本单纯的值，所以要用state.count进行对象属性获取
    state => ({ count: state.count, personCount: state.persons.length }),
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
    }
)(Count)


```
- **src/containers/Person/index.jsx**
```js
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { createAddPersonAction } from '../../redux/actions/person'

class Person extends Component {

    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value*1
        const personObj = { id: nanoid(), name, age }
        this.props.addPerson(personObj);
        this.nameNode.value = ""
        this.ageNode.value = ""
    }

    render() {
        return (
            <div>
                <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
                <input ref={c => this.nameNode = c} type="text" placeholder="输入名字" />
                <input ref={c => this.ageNode = c} type="text" placeholder="输入年龄" />
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.persons.map((p) => {
                            return <li key={p.id}>名字{p.name}---年龄{p.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    // 此处由于reducer为经过合并的对象，不再是原本单纯的值，所以要用state.persons进行对象属性获取
    state => ({ persons: state.persons, count: state.count }),   // 映射状态
    {
        addPerson: createAddPersonAction
    }
)(Person)
```

> **(1).定义一个Person组件，和Count组件通过redux共享数据**
> **(2).为Person组件编写：reducer、action，配置constant常量**
> **(3).重点：Person的reducer和Count的reducer要使用combineReduceers进行合并，合并后的总状态是一个对象！！！**
> **(4).交给store的是总reducer，最后注意在组件中取状态的时候，记得state.xxx**

### 纯函数
- **src/redux/reducers/person.js**
```js
import { ADD_PERSON } from '../constant'

// 初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }]
export default function personReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case ADD_PERSON:    // 若是添加一个人
            preState.unshift(data)
            return preState
        default:
            return preState
    }
}
```
**当执行以上代码时，会发现添加人的功能无法实现。原因是在redux底层会进行判断，如果返回的数据与原先的数据一样(浅比较，比较地址)，则不会再次渲染，同时由于preState被改写了，presonReducer就不是纯函数了。所以要用下面的写法，创建一个新数组存储数据：**
```js
import { ADD_PERSON } from '../constant'

// 初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }]
export default function personReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case ADD_PERSON:    // 若是添加一个人
            return [data, ...preState]
        default:
            return preState
    }
}
```

>1.	**一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)**
>**非纯函数：若返回值为Math.random()+实参**
>2.	**必须遵守以下一些约束  
>---1)	不得改写参数数据 function demo(a){a=9}	=> 此种情况则不纯。上述第一种写法也改变了参数，所以也非纯函数**
>**---2)	不会产生任何副作用，例如网络请求，输入和输出设备都不可以在存函数中写**
>**---3)	不能调用Date.now()或者Math.random()等不纯的方法**
>3.	**redux的reducer函数必须是一个纯函数**


### redux开发者工具
1. **首先要安装Redux DevTools**
**![在这里插入图片描述](https://img-blog.csdnimg.cn/2865199fd5674ea5bb0177d2c6f52f9e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-t6L275pif5a2Q,size_14,color_FFFFFF,t_70,g_se,x_16)**
2. **安装插件**
```txt
yarn add redux-devtools-extension
```

3. **修改store.js**
```js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

const allReducer = combineReducers({
    count: countReducer,
    persons: personReducer
})


export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
```

### reducer汇总
**在redux/reducer中新建index.js，并引入所有的reducer，合并后导出。在store中导入合并后的reducer**
- **redux/reducers/index.js**
```js
/* 
    该文件用于汇总所有的reducer为一个总的reducer
*/
// 引入combineReducers，合并reducer
import { combineReducers } from 'redux'
// 引入为Count组件服务的reducer
import count from './count'
// 引入为Person组件服务的reducer
import person from './person'

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
    count: count,
    persons: person
})
```

- **redux/store.js**
```js
// 引入applyMiddleware，用于包裹中间件，执行异步任务
import { createStore, applyMiddleware } from 'redux'

// 引入汇总之后的reducer
import reducer from './reducers'

// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

// 暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
```

## 扩展setState
>		(1). setState(stateChange, [callback])------对象式的setState
>	**---1.stateChange为状态改变对象(该对象可以体现出状态的更改)**
>	**---2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用**
>	**(2). setState(updater, [callback])------函数式的setState**
>	**--- 1.updater为返回stateChange对象的函数。**
>	**--- 2.updater可以接收到state和props。**
>	**--- 3.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。**
>	**总结:**
>	**---1.对象式的setState是函数式的setState的简写方式(语法糖)**
>	**---2.使用原则：**
>	**-----(1).如果新状态不依赖于原状态 ===> 使用对象方式**
>	**-----(2).如果新状态依赖于原状态 ===> 使用函数方式**
>	**-----(3).如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取**
```js
import React, { Component } from 'react'

export default class Demo extends Component {
    state = { count: 0 }

    add = () => {
        // 对象式的setState
        /* //1.获取原来的count值
        const { count } = this.state
        //2.更新状态 
        this.setState({ count: count + 1 }, () => {
            console.log('输出2', this.state.count);
        })
        // 由于setState调用后引起的后续步骤是异步操作，所以下行会输出改变之前的count值
        console.log('输出', this.state.count);  // 0 */

        // 函数式的setState
        this.setState((state, props) => {
            console.log(state, props);
            return { count: state.count + 1 }
        })
    }

    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
                <button onClick={this.add}>点我+1</button>
            </div>
        )
    }
}
```

## lazyLoad
```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

- **App.jsx**
```js
import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom'

// 下面的引入方式会在页面一加载时就引入
// import Home from './Home'
// import About from './About'
import Loading from './Loading'     // 要用组件来实现Suspense组件加载慢时代替，则必须以此种方式引入，不可用懒加载

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

export default class Demo extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                {/* 此处要保证Link和Route标签被同一个Router标签包裹，否则会报错,所以在index.js中用了BrowserRouter包裹了整个<App/> */}
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <NavLink className="list-group-item" to="/about">About</NavLink>
                            <NavLink className="list-group-item" to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* Suspense用来配置组件未加载完时的代替内容，可以是html标签或组件 */}
                                <Suspense fallback={<Loading />}>
                                    {/* 注册路由 */}
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

```

## Hooks
### StateHook
```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```
```js
import React from 'react'

// 类式组件
/* class Demo extends React.Component {

    state = { count: 0 }

    add = () => {
        this.setState(state => ({ count: state.count + 1 }))
    }

    render() {
        return (
            <div>
                <h2>当前求和为:{this.state.count}</h2>
                <button onClick={this.add}>点我+1</button>
            </div>
        )
    }
} */

// 函数式组件
function Demo() {
    // Demo调用1+n次
    console.log('Demo');

    // react底层将count存储起来，使得再次执行时count不会被useState中的初始值覆盖
    const [count, setCount] = React.useState(0) // useState传入count初始值
    const [name, setName] = React.useState('tom')

    function add() {
        // setCount(count + 1)     // setCount()执行后Demo重新执行，setCount传入的值为修改后其对应的count值
        setCount((count) => count + 1)
    }

    function changeName() {
        setName('xxc')
        setName((name) => "xxc")
    }

    return (
        <div>
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是：{name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
        </div>
    )
}

export default Demo
```

### EffectHook
```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

```js
import React from 'react'
import ReactDOM from 'react-dom'

// 类式组件
/* class Demo extends React.Component {

    state = { count: 0 }

    add = () => {
        this.setState(state => ({ count: state.count + 1 }))
    }

    unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(state => ({ count: state.count + 1 }))
        }, 1000);
    }

    componentWillUnmount() {
        // 此处为了确保unmount中卸载组件后不会因为定时器的存在而去渲染不存在的组件，导致报错，所以定时器必须停掉
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <h2>当前求和为:{this.state.count}</h2>
                <button onClick={this.add}>点我+1</button>
                <button onClick={this.unmount}>卸载组件</button>
            </div>
        )
    }
} */

// 函数式组件
function Demo() {
    // Demo调用1+n次

    // react底层将count存储起来，使得再次执行时count不会被useState中的初始值覆盖
    const [count, setCount] = React.useState(0) // useState传入count初始值
    // const [name, setName] = React.useState('tom')

    // React.useEffect只传一个函数时，其相当于componetDidMount+componentDidUpdate，因为此时默认监测所有数据
    // 可以接着传一个空数组，数组内部填入监测哪些数据
    // React.useEffect(() => {
    //     console.log('@');
    // }, [count])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCount(count => count + 1)    // 在React.useEffect中写setCount，需要写成函数形式
        }, 1000);
        // 这个函数返回的函数相当于componentWillUnmount
        return () => {
            clearTimeout(timer)
        }
    }, [])

    function add() {
        // setCount(count + 1)     // setCount()执行后Demo重新执行，setCount传入的值为修改后其对应的count值
        setCount((count) => count + 1)
    }

    // 卸载组件的回调
    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    // 此时因为React.useEffect中的第二个参数不包括name,所以即便改了name也无法触发React.useEffect
    // function change() {
    //     setName('jack')
    // }

    return (
        <div>
            <h2>当前求和为:{count}</h2>
            {/* <h2>{name}</h2> */}
            <button onClick={add}>点我+1</button>
            <button onClick={unmount}>卸载组件</button>
            {/* <button onClick={change}>点我改名</button> */}
        </div>
    )
}

export default Demo
```

### RefHook
```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

```js
import React from 'react'

// 类式组件
/* class Demo extends React.Component {

    myRef = React.createRef()

    show = () => {
        console.log(this.myRef.current.value);
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.myRef} />
                <button onClick={this.show}>点击提示数据</button>
            </div>
        )
    }
} */

// 函数式组件
function Demo() {

    const myRef = React.useRef()

    // 提示输入的回调
    function show() {
        console.log(myRef.current.value)
    }

    return (
        <div>
            <input type="text" ref={myRef} />
            <button onClick={show}>点击提示数据</button>
        </div>
    )
}

export default Demo
```

## Fragment
```js
import React, { Component, Fragment } from 'react'

export default class Demo extends Component {
    render() {
        return (
            // Fragment最终会被React解析并丢掉，这样我们就可以避免无用的标签结构
            // Fragment只能有一个key属性，其余的都不允许
            <Fragment key={1}>
                <input type="text" />
                <input type="text" />
            </Fragment>
        )
    }
}

```
> **Fragment也可以用空标签代替，但是空标签不能写任何属性**

## Context
-  **理解**

> **一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信**

-  **使用**

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

- **注意**

	**在应用开发中一般不用context, 一般都用它的封装react插件**

```js
import React, { Component } from 'react'
import './index.css'

// 创建Context对象
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext
export default class A extends Component {

    state = { username: 'tom', age: 18 }

    render() {
        const { username, age } = this.state
        return (
            <div className="parent">
                <h3>我是A组件</h3>
                <h4>我的用户名是:{username}</h4>
                {/* 如此写完之后，B组件及B的子组件中写了“static contextType = MyContext”的都可以收到username */}
                {/* 此处只能写value */}
                {/* 只传一个(接收时直接this.context)： */}
                {/* <Provider value={ username }> */}
                {/* 传递多个(使用对象形式,接收时要this.context.xxx)： */}
                <Provider value={{ username, age }}>
                    <B />
                </Provider>
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className="child">
                <h3>我是B组件</h3>
                <C />
            </div>
        )
    }
}

// 类式组件
/* class C extends Component {
    // 声明接收context
    static contextType = MyContext
    render() {
        const { username, age } = this.context
        return (
            <div className="grand">
                <h3>我是C组件</h3>
                <h4>我从A组件接收到的用户名：{username}，年龄是:{age}</h4>
            </div>
        )
    }
} */

// 函数式组件
function C() {
    return (
        <div className="grand">
            <h3>我是C组件</h3>
            <h4>我从A组件接收到的用户名：
            <Consumer>
                    {
                        value => `${value.username}，年龄是:${value.age}`
                    }
             </Consumer>
            </h4>
        </div>
    )
}
```

## PureComponent
-  **Component的2个问题** 

> 1. **只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低**
>
> 2. **只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低**

- **效率高的做法**

>  **只有当组件的state或props数据发生改变时才重新render()**

-  **原因**

>  **Component中的shouldComponentUpdate()总是返回true**

-  **解决**
```txt
	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化
```


```js
import React, { Component } from 'react'
import './index.css'

export default class Parent extends Component {

    state = { carName: "奔驰c63" }

    changeCar = () => {
        this.setState({ carName: '迈巴赫' })
    }

    render() {
        console.log('Parent--render');
        const { carName } = this.state
        return (
            <div className="parent">
                <h3>我是Parent组件</h3>
                <span>我的车名字是：{carName}</span><br />
                <button onClick={this.changeCar}>点我换车</button>
                <Child />
            </div>
        )
    }
}

class Child extends Component {
    render() {
        console.log('Child--render');
        return (
            <div className="child">
                <h3>我是Child组件</h3>
                {/* <span>我接到的车是：{this.props.carName}</span> */}
            </div>
        )
    }
}
```
> **以上情况，即便子组件没有使用父组件中的任何数据，但是当父组件中点击button导致页面渲染(render)后，子组件也会跟着调用render。所以可以改写为如下形式：**

```js
import React, { PureComponent } from 'react'
import './index.css'

// 可以自己写shouldComponentUpdate来判断props、state是否改变，从而判断是否执行更新。
// 但是也可以使用PureComponent，来自动判断，其底层重写了shouldComponentUpdate
export default class Parent extends PureComponent {

    state = { carName: "奔驰c63" }

    changeCar = () => {
        this.setState({ carName: '迈巴赫' })

        // 此种写法导致obj与state是同一个地址，而pureComponent底层做的是浅对比，所以得到两个值一样，shouldComponentUpdate返回false
        // const obj = this.state
        // obj.carName = '迈巴赫'
        // this.setState(obj)
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props, this.state);    // 目前的props和state
        console.log(nextProps, nextState);  // 接下来要变化的目标props，目标state
        if (this.state.carName === nextState.carName) return false
        else return true
    } */

    render() {
        console.log('Parent--render');
        const { carName } = this.state
        return (
            <div className="parent">
                <h3>我是Parent组件</h3>
                <span>我的车名字是：{carName}</span><br />
                <button onClick={this.changeCar}>点我换车</button>
                <Child carName={carName} />
            </div>
        )
    }
}

class Child extends PureComponent {
    /* shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props, this.state);    // 目前的props和state
        console.log(nextProps, nextState);  // 接下来要变化的目标props，目标state
        return !this.props.carName === nextProps.carName
    } */
    render() {
        console.log('Child--render');
        return (
            <div className="child">
                <h3>我是Child组件</h3>
                {/* <span>我接到的车是：{this.props.carName}</span> */}
            </div>
        )
    }
}
```

## render props
- **如何向组件内部动态传入带内容的结构(标签)?**

	**Vue中:** 
		**使用slot技术, 也就是通过组件标签体传入结构  \<A>\<B/>\</A>**
	**React中:**
		**使用children props: 通过组件标签体传入结构	 \<A>\<B/>\</A>**
		**使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性**
**\<A render={(name) => \<B name={name} />} />**

- **children props**

	**\<A>**
	  **\<B>xxxx\</B>**
	**\</A>**
	**{this.props.children}**
	**问题: 如果B组件需要A组件内的数据, ==> 做不到 (因为以上代码一般都是写在父组件中，this并非A组件)**

- **render props**

	**\<A render={(data) => \<C data={data}>\</C>}>\</A>**
	**A组件: {this.props.render(内部state数据)}**
	**C组件: 读取A组件传入的数据显示 {this.props.data}** 

```js
import React, { Component } from 'react'
import './index.css'
import C from '../1_setState'

export default class Parent extends Component {
    render() {
        return (
            <div className="parent">
                <h3>我是parent组件</h3>
                <A render={(name) => <C name={name} />} />
            </div>
        )
    }
}

class A extends Component {
    state = { name: 'tom' }
    render() {
        const { name } = this.state
        return (
            <div className="a">
                <h3>我是A组件</h3>
                {/* 此种写法类似于vue中的插槽 */}
                {this.props.render(name)}
            </div>
        )
    }
}

class B extends Component {
    render() {
        console.log('B-render');
        return (
            <div className="b">
                <h3>我是B组件,{this.props.name}</h3>
            </div>
        )
    }
}
```

## 错误边界
- **理解：**

**错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面**

- **特点：**

**只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误**

- **使用方式：**

**getDerivedStateFromError配合componentDidCatch**

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

```js
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {

    state = {
        hasError: ''    // 用于标识子组件是否产生错误
    }

    // 当Parent的子组件出现了任何的报错，都会调用这个钩子，并携带错误信息
    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: error }	// 此处返回的数据会代替state
    }

    componentDidCatch() {
        console.log('统计错误次数，反馈给服务器，用于通知编码人员进行bug的解决');
    }

    render() {
        return (
            <div>
                <h2>我是Parent组件</h2>
                {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child />}
            </div>
        )
    }
}

```

## 组件通信方式总结
- **组件间的关系：**

1.  **父子组件**
2. **兄弟组件（非嵌套组件）**
3. **祖孙组件（跨级组件）**

- **几种通信方式：**

		**1.props：**
			**(1).children props**
			**(2).render props**
		**2.消息订阅-发布：**
			**pubs-sub、event等等**
		**3.集中式管理：**
			**redux、dva等等**
		**4.conText:**
			**生产者-消费者模式**

- **比较好的搭配方式：**
		**父子组件：props**
		**兄弟组件：消息订阅-发布、集中式管理**
		**祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)**