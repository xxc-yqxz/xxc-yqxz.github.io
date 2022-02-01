---
title: CodeWhy-Vue3-TS-学习笔记3
tags:
  - TypeScript
categories:
  - CodeWhy
  - Vue3+TS
abbrlink: 3c70d866
date: 2022-01-25 18:24:22
---

# TS语法精讲一

- **任何新技术的出现都是为了解决原有技术的某个痛点。**

- **JavaScript是一门优秀的编程语言吗？**

  - 每个人可能观点并不完全一致，但是从很多角度来看，JavaScript是一门非常优秀的编程语言； 

  - 而且，可以说在很长一段时间内这个语言不会被代替，并且会在更多的领域被大家广泛使用；

- **著名的Atwood定律：**

  - Stack Overflow的创立者之一的 **Jeff Atwood** 在2007年提出了著名的 **Atwood定律**。 

  - any application that can be written in JavaScript, will eventually be written in JavaScript.

  - 任何可以使用JavaScript来实现的应用都最终都会使用JavaScript实现。

- 其实我们已经看到了，这句话正在一步步被应验：

  - Web端的开发我们一直都是使用JavaScript； 

  - 移动端开发可以借助于ReactNative、Weex、Uniapp等框架实现跨平台开发；

  - 小程序端的开发也是离不开JavaScript； 

  - 桌面端应用程序我们可以借助于Electron来开发；

  - 服务器端开发可以借助于Node环境使用JavaScript来开发。



## JavaScript 的痛点

- 随着近几年前端领域的快速发展，让JavaScript迅速被普及和受广大开发者的喜爱，借助于JavaScript本身的强大，也让使用JavaScript开发的人员越来越多。 

- **优秀的JavaScript没有缺点吗？**

  - 其实上由于各种历史因素，JavaScript语言本身存在很多的缺点； 

  - 比如ES5以及之前的使用的var关键字关于作用域的问题；

  - 比如最初JavaScript设计的数组类型并不是连续的内存空间； 

  - 比如直到今天JavaScript也没有加入类型检测这一机制；

- **JavaScript正在慢慢变好**

  - 不可否认的是，JavaScript正在慢慢变得越来越好，无论是从底层设计还是应用层面。

  - ES6、7、8等的推出，每次都会让这门语言更加现代、更加安全、更加方便。 

  - 但是直到今天，JavaScript在类型检测上依然是毫无进展（为什么类型检测如此重要，我后面会聊到）。



## 类型带来的问题

- 首先你需要知道，编程开发中我们有一个共识：**错误出现的越早越好**

  - 能在**写代码的时候**发现错误，就不要在**代码编译时**再发现（IDE的优势就是在代码编写过程中帮助我们发现错误）。

  - 能在**代码编译期间**发现错误，就不要在**代码运行期间**再发现（类型检测就可以很好的帮助我们做到这一点）。

  - 能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误。

- 现在我们想探究的就是如何在 **代码编译期间** 发现代码的错误：
  - JavaScript可以做到吗？不可以，我们来看下面这段经常可能出现的代码问题。

![](CodeWhy-Vue3-TS-学习笔记3/1.jpg)

- **这是我们一个非常常见的错误：**

  - 这个错误很大的原因就是因为JavaScript没有对我们传入的参数进行任何的限制，只能等到运行期间才发现这个错误； 

  - 并且当这个错误产生时，会影响后续代码的继续执行，也就是整个项目都因为一个小小的错误而深入崩溃； 

- **当然，你可能会想：我怎么可能犯这样低级的错误呢？**

  - 当我们写像我们上面这样的简单的demo时，这样的错误很容易避免，并且当出现错误时，也很容易检查出来；

  - 但是当我们开发一个大型项目时呢？你能保证自己一定不会出现这样的问题吗？而且如果我们是调用别人的类库，又如何知道让我们传入的到底是什么样的参数呢？ 

- 但是，如果我们可以给JavaScript加上很多限制，在开发中就可以很好的避免这样的问题了： 

  - 比如我们的getLength函数中str是一个必传的类型，调用者没有传编译期间就会报错；

  - 比如我们要求它的必须是一个String类型，传入其他类型就直接报错；

  - 那么就可以知道很多的错误问题在编译期间就被发现，而不是等到运行时再去发现和修改；



##  类型思维的缺失

- 我们已经简单体会到没有类型检查带来的一些问题，JavaScript因为从设计之初就没有考虑类型的约束问题，所以造成了前端开发人员关于**类型思维的缺失**： 

  - **前端开发人员**通常不关心变量或者参数是什么类型的，如果在必须确定类型时，我们往往需要使用各种判断验证； 

  - 从其他方向转到前端的人员，也会因为没有类型约束，而总是担心自己的代码不安全，不够健壮； 

- 所以我们经常会说JavaScript**不适合开发大型项目**，因为当项目一旦庞大起来，这种宽松的类型约束会带来非常多的安全隐患，多人员开发它们之间也没有**良好的类型契约**。 

  - 比如当我们去实现一个核心类库时，如果没有类型约束，那么需要对别人传入的参数进行各种验证来保证我们代码的健壮性； 

  - 比如我们去调用别人的函数，对方没有对函数进行任何的注释，我们只能去看里面的逻辑来理解这个函数需要传入什么参数，返回值是什么类型；



## JavaScript 添加类型约束

- **为了弥补JavaScript类型约束上的缺陷，增加类型约束，很多公司推出了自己的方案：**

  - 2014年，Facebook推出了flow来对JavaScript进行类型检查； 

  - 同年，Microsoft微软也推出了TypeScript1.0版本；

  - 他们都致力于为JavaScript提供类型检查； 

- 而现在，无疑**TypeScript已经完全胜出**： 

  - Vue2.x的时候采用的就是flow来做类型检查； 

  - Vue3.x已经全线转向TypeScript，98.3%使用TypeScript进行了重构； 

  - 而Angular在很早期就使用TypeScript进行了项目重构并且需要使用TypeScript来进行开发；

  - 而甚至Facebook公司一些自己的产品也在使用TypeScript； 

- 学习TypeScript不仅仅可以为我们的代码增加类型约束，而且可以培养我们前端程序员具备类型思维。



## 认识TypeScript

- 虽然我们已经知道TypeScript是干什么的了，也知道它解决了什么样的问题，但是我们还是需要全面的来认识一下TypeScript到底是什么？

- **我们来看一下TypeScript在GitHub和官方上对自己的定义：**

  - GitHub说法：TypeScript is a superset of JavaScript that compiles to clean JavaScript output.

  - TypeScript官网：TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

  - 翻译一下：TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。

- 怎么理解上面的话呢？

  - 我们可以将TypeScript理解成加强版的JavaScript。 

  - JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是支持的；

  - 并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；

  - TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先； 

  - 并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，在编译时也不需要借助于Babel这样的工具； 

  - 所以，我们可以把TypeScript理解成更加强大的JavaScript，不仅让JavaScript更加安全，而且给它带来了诸多好用的好用特性；



## TypeScript 的特点

- 官方对TypeScript有几段特点的描述，我觉得非常到位（虽然有些官方，了解一下），我们一起来分享一下：

- **始于JavaScript，归于JavaScript**

  - TypeScript从今天数以百万计的JavaScript开发者所熟悉的语法和语义开始。使用现有的JavaScript代码，包括流行的JavaScript库，并从JavaScript代码中调用TypeScript代码；

  - TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或更高版本）的JavaScript引擎中； 

- **TypeScript是一个强大的工具，用于构建大型项目**

  - 类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构； 

  - 类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有JavaScript库的行为； 

- **拥有先进的 JavaScript**

  - TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件； 

  - 这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript；



- 正是因为有这些特性，TypeScript目前已经在很多地方被应用：

  - Angular源码在很早就使用TypeScript来进行了重写，并且开发Angular也需要掌握TypeScript； 

  - Vue3源码也采用了TypeScript进行重写，在前面阅读源码时我们看到大量TypeScript的语法； 

  - 包括目前已经变成最流行的编辑器VSCode也是使用TypeScript来完成的；

  - 包括在React中已经使用的ant-design的UI库，也大量使用TypeScript来编写；

  - 目前公司非常流行Vue3+TypeScript、React+TypeScript的开发模式； 

  - 包括小程序开发，也是支持TypeScript的；



## TypeScript 的编译环境

- 在前面我们提到过，TypeScript最终会被编译成JavaScript来运行，所以我们需要搭建对应的环境： 

  - 我们需要在电脑上安装TypeScript，这样就可以通过TypeScript的Compiler将其编译成JavaScript； 

  ![](CodeWhy-Vue3-TS-学习笔记3/2.jpg)

- 所以，我们先可以进行全局的安装：

```
# 安装命令
npm install typescript -g

# 查看版本
tsc --version
```

## TypeScript 的运行环境

- 如果我们每次为了查看TypeScript代码的运行效果，都通过经过两个步骤的话就太繁琐了：

  - 第一步：通过tsc编译TypeScript到JavaScript代码；

  - 第二步：在浏览器或者Node环境下运行JavaScript代码；

- 是否可以简化这样的步骤呢？

  - 比如编写了TypeScript之后可以直接运行在浏览器上？

  - 比如编写了TypeScript之后，直接通过node的命令来执行？

- 上面提到的两种方式，可以通过两个解决方案来完成：

  - 方式一：通过webpack，配置本地的TypeScript编译环境和开启一个本地服务，可以直接运行在浏览器上；

  - 方式二：通过ts-node库，为TypeScript的运行提供执行环境；

- 方式一：webpack配置

  1. 首先进入一个项目，使用 `npm init`进行初始化管理
  2. 安装如下 webpack 依赖

  ```
  npm install webpack webpack-cli -D
  npm install webpack-dev-server -D
  npm install html-webpack-plugin -D
  ```

  3. 安装如下 ts 文件编译依赖

  ```
  npm install ts-loader typescript -D
  ```

  4. 通过 `tsc --init` 初始化项目的 ts 配置文件
  5. 新建 webpack.config.js ，来配置 ts 文件编译规则：

  ```javascript
  const path = require('path')
  const HTMLWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
      entry: './src/main.ts',
      output: {
          path: path.resolve(__dirname, './dist'),
          filename: "bundle.js"
      },
      resolve: {
          extensions: [".ts", ".js", ".cjs", ".json"]
      },
      devServer: {},
      module: {
          rules: [
              {
                  test: /\.ts$/,
                  loader: 'ts-loader'
              }
          ]
      },
      plugins: [
          new HTMLWebpackPlugin({
              template: './index.html'
          })
      ]
  }
  ```

  6. 在 package.json 中配置启动脚本

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=production"
  },
  ```

  7. 执行 `npm run build` 执行命令，生成对应的 js 文件后，新建一个 html 文件，引入 js 文件。便可在浏览器打开查看效果

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
      <script type="text/javascript" src="./dist/bundle.js"></script>
  </body>
  </html>
  ```

  

- 方式二：安装ts-node

  ```
  npm install ts-node -g
  ```
  - 另外ts-node需要依赖 tslib 和 @types/node 两个包： 

  ```
  npm install tslib @types/node -g
  ```

  - 现在，我们可以直接通过 ts-node 来运行TypeScript的代码：

  ```
  ts-node math.ts
  ```




## 变量的声明

- 我们已经强调过很多次，在TypeScript中定义变量需要指定 **标识符** 的类型。 

- 所以完整的声明格式如下： 

  - 声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解； 

    ```javascript
    var/let/const 标识符: 数据类型 = 赋值;
    ```

- 比如我们声明一个message，完整的写法如下：

  ```javascript
  // string: TypeScript 中的字符串类型
  // String：JavaScript 的字符串包装类的类型
  const message:string = "Hello World"
  ```

  - 注意：这里的string是小写的，和String是有区别的 

  - string是TypeScript中定义的字符串类型，String是ECMAScript中定义的一个类

- 如果我们给message赋值其他类型的值，那么就会报错：

  ![](CodeWhy-Vue3-TS-学习笔记3/3.jpg)



## 声明变量的关键字

- 在TypeScript定义变量（标识符）和ES6之后一致，可以使用var、let、const来定义。 

```javascript
var name: string = "why"
let age: number = 18
const height: number = 1.88
```

- 当然，在tslint中并不推荐使用var来声明变量： 
  - 可见，在TypeScript中并不建议再使用var关键字了，主要原因和ES6升级后let和var的区别是一样的，var是没有块级作用域的，会引起很多的问题，这里不再展开探讨。



## 变量的类型推导

- 在开发中，有时候为了方便起见我们并不会在声明每一个变量时都写上对应的数据类型，我们更希望可以通过TypeScript本身的特性帮助我们推断出对应的变量类型： 

  ![](CodeWhy-Vue3-TS-学习笔记3/4.jpg)

- 如果我们给message赋值123： 

  ![](CodeWhy-Vue3-TS-学习笔记3/5.jpg)

- 这是因为在一个变量第一次赋值时，会根据后面的赋值内容的类型，来推断出变量的类型：
  
  - 上面的message就是因为后面赋值的是一个string类型，所以message虽然没有明确的说明，但是依然是一个string类型



# TS语法精讲二

## JavaScript 和TypeScript的数据类型

- 我们经常说TypeScript是JavaScript的一个超集：

![](CodeWhy-Vue3-TS-学习笔记3/6.jpg)



## JavaScript类型 - number 类型

- 数字类型是我们开发中经常使用的类型，TypeScript和JavaScript一样，不区分整数类型（int）和浮点型（double），统一为number类型。 

  ```javascript
  let num:number = 123
  num = 222
  ```

  

- 如果你学习过ES6应该知道，ES6新增了二进制和八进制的表示方法，而TypeScript也是支持二进制、八进制、十六进制的表示：

  ```javascript
  let num1: number = 100
  let num2: number = 0b111    // 二进制
  let num3: number = 0o456    // 八进制
  let num4: number = 0x123abcdef    // 十六进制
  ```



## JavaScript类型 - boolean 类型

- boolean类型只有两个取值：true和false，非常简单

```javascript
let flag: boolean = true
flag = false
flag = 20 > 30
```



## JavaScript类型 - string类型

- string类型是字符串类型，可以使用单引号或者双引号表示：

```javascript
let message1: string = 'hello world'
let message2: string = "Hello World"
```

- 同时也支持ES6的模板字符串来拼接变量和字符串：

```javascript
const name = "why"
const age = 18
const height = 1.88

let message3 = `name:${name} age:${age} height:${height}`
console.log(message3)
```



## JavaScript类型 - Array类型

- 数组类型的定义也非常简单，有两种方式：

```javascript
const names:Array<string> = []  // 不推荐（在 react jsx 中有冲突 <div></div>）
const names2:string[] = []  // 推荐 

names.push("abc")
```

- 如果添加其他类型到数组中，那么会报错：

  ![](CodeWhy-Vue3-TS-学习笔记3/7.jpg)



## JavaScript类型 - Object类型

- object对象类型可以用于描述一个对象：

```typescript
const info: object = {
    name: "why",
    age: 18
}
```

- 但是从info中我们不能获取数据，也不能设置数据，因为编译过程中会认为其是一个 object 类型，而原始的 object 类型是没有 name 属性的：

![](CodeWhy-Vue3-TS-学习笔记3/8.jpg)

- 所以 object 类型最好让其做类型推导，而不是我们自己手动添加类型。

```typescript
const info= {
    name: "why",
    age: 18
}

console.log(info.name)
```



##JavaScript类型 - null和undefined类型

- 在 JavaScript 中，undefined 和 null 是两个基本数据类型。

- 在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型：

```javascript
let n1: null = null    // null 类型只有一个值：null
let n2: undefined = undefined     // undefined 类型只有一个值：undefined
```



##JavaScript类型 - Symbol类型

- 在ES5中，如果我们是不可以在对象中添加相同的属性名称的，比如下面的做法： 

  ![](CodeWhy-Vue3-TS-学习笔记3/9.jpg)

- 通常我们的做法是定义两个不同的属性名字：比如identity1和identity2。 

- 但是我们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值：

  ```typescript
  const title1 = Symbol("title")
  const title2 = Symbol("title")
  
  const info = {
      [title1]: "程序员",
      [title2]: "老师"
  }
  ```




## TypeScript类型 - any类型

- 在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化，这个时候我们可以使用any类型（类似于Dart语言中的dynamic类型）。

- any类型有点像一种讨巧的TypeScript手段：

  - 我们可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；

  - 我们给一个any类型的变量赋值任何的值，比如数字、字符串的值；

  ```typescript
  // 当进行一些类型断言 as any
  // 在不想给某些JavaScript 添加具体的数据类型时（跟原生的JavaScript一样）
  let message: any = "Hello World"
  
  message = 123
  message = true
  message = {
  
  }
  
  console.log(message)
  ```

- 如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解，这个时候我们可以使用any： 
  
  - 包括在Vue源码中，也会使用到any来进行某些类型的适配；



## TypeScript类型 - unknown类型

- unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。

- 什么意思呢？我们来看下面的场景：

  ```typescript
  function foo() {
      return 'abc'
  }
  
  function bar() {
      return 123
  }
  
  let flag = true
  
  // unknown 类型可以赋值给any和unknown类型
  // any 类型可以赋值给任意类型
  // let result: any
  let result: any
  if (flag) {
      result = foo()
  } else {
      result = bar()
  }
  
  let message:string = result
  
  console.log(result)
  
  export {}
  ```

## TypeScript类型 - void类型

- void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型：

  - 我们可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined

  ```javascript
  function sum(num1: number, num2: number) {
      console.log(num1 + num2)
      return null;
  }
  ```

  

- 这个函数我们没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void：

  ```typescript
  function sum(num1: number, num2: number): void {
      console.log(num1 + num2)
  }
  ```



## TypeScript类型 - never类型

- never 表示永远不会发生值的类型，比如一个函数：

  - 如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？

  - 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型；

  ```typescript
  function foo(): never {
      // 死循环
      while (true) {
  
      }
  }
  
  function bar(): never {
      throw new Error()
  }
  ```

- never有什么样的应用场景呢？这里我们举一个例子：

  ```typescript
  function handleMessage(message: string | number) {
      switch (typeof message) { 
          case 'string':
              console.log("string处理方式处理message")
              break
          case 'number':
              console.log('number处理方式处理message')
              break
          default:        // 保证他人不会为message添加其它的数据类型
              const check:never = message
      }
  }
  ```



## TypeScript类型 - tuple类型

- tuple是元组类型，很多语言中也有这种数据类型，比如Python、Swift等。 

- 那么tuple和数组有什么区别呢？

  - 首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）

  - 其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；

  ```typescript
  // 1.数组的弊端：没办法确定拿到的元素到底是什么类型
  const info: any[] = ["why", 18, 1.88]
  
  const name = info[0]
  console.log(name.length)
  
  // 2.元组的特点
  const info: [string, number, number] = ["why", 18, 1.88]
  const name = info[0]
  console.log(name.length)
  const age = info[1]
  console.log(age.length)  // 报错
  ```

  ![](CodeWhy-Vue3-TS-学习笔记3/10.jpg)



## tuple的应用场景

- 那么tuple在什么地方使用的是最多的呢？

  - tuple通常可以作为返回的值，在使用的时候会非常的方便；

  ```typescript
  // hook：useState
  
  function useState(state: any) {
      let currentState = state
  
      const changeState = (newState: any) => {
          currentState = newState
      }
  
      // const arr: any[] = [currentState, changeState]   // 这么写的话 counter 与 setCounter 都会变为any类型
      const arr: [any, (newState: any) => void] = [currentState, changeState]
  
      return arr
  }
  
  const [counter, setCounter] = useState(10);
  const [title, setTitle] = useState('abc');
  ```

  **优化版：**

  ```typescript
  function useState<T>(state: T) {
      let currentState = state
  
      const changeState = (newState: T) => {
          currentState = newState
      }
  
      const arr: [T, (newState: T) => void] = [currentState, changeState]
  
      return arr
  }
  
  const [counter, setCounter] = useState(10);
  const [title, setTitle] = useState('abc');
  ```



## 函数的参数和返回值类型

- 函数是JavaScript非常重要的组成部分，TypeScript允许我们指定函数的参数和返回值的类型。

- **参数的类型注解**

  - 声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型：

  ```typescript
  function sum(num1: number, num2: number) {
      return num1 + num2
  }
  
  // sum(123)     // 报错， TS 中函数参数个数要保证一样
  sum(123, 123)
  ```



- 我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面：

  ```typescript
  function sum(num1: number, num2: number): number {
      return num1 + num2
  }
  ```

- 和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型：

  - 某些第三方库处于方便理解，会明确指定返回类型，但是这个看个人喜好；





## 匿名函数的参数

- 匿名函数与函数声明会有一些不同：

  - 当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；

  - 该函数的参数会自动指定类型；

  ```typescript
  // 通常情况下，在定义一个函数时，都会给参数加上类型注解的
  function foo(message: string) {
  
  }
  
  const names = ["abc", "cba", "nba"]
  
  // item根据上下文的环境推断出来，这个时候可以不添加类型注解
  // 上下文中的函数，可以不添加类型注解
  names.forEach(function (item) {
      console.log(item.split(""))
  })
  ```

  

- 我们并没有指定item的类型，但是item是一个string类型：

  - 这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；

  - 这个过程称之为上下文类型（*contextual typing*），因为函数执行的上下文可以帮助确定参数和返回值的类型；



## 对象类型

- 如果我们希望限定一个函数接受的参数是一个对象，这个时候要如何限定呢？

  - 我们可以使用对象类型；

  ```typescript
  function printPoint(point: { x: number, y: number }) {
      console.log(point.x);
      console.log(point.y);
  }
  
  printPoint({ x: 123, y: 123 })
  ```

  

- 在这里我们使用了一个对象来作为类型：

  - 在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型；

  - 属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的；

  - 每个属性的类型部分也是可选的，如果不指定，那么就是any类型；



## 可选类型

- 对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个`?`：

  ```typescript
  function printPoint(point: { x: number, y: number, z?: number }) {
      console.log(point.x);
      console.log(point.y);
      console.log(point.z);       // 没传值时为 undefined
  }
  
  printPoint({ x: 123, y: 123 })
  printPoint({ x: 123, y: 123, z: 111 })
  ```



## 联合类型

- TypeScript的类型系统允许我们使用多种运算符，从现有类型中构建新类型。

- 我们来使用第一种组合类型的方法：联合类型（Union Type） 

  - 联合类型是由两个或者多个其他类型组成的类型；

  - 表示可以是这些类型中的任何一个值；

  - 联合类型中的每一个类型被称之为联合成员（union's *members*）；

  

- 传入给一个联合类型的值是非常简单的：只要保证是联合类型中的某一个类型的值即可 

  - 但是我们拿到这个值之后，我们应该如何使用它呢？因为它可能是任何一种类型。

  - 比如我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法；

- 那么我们怎么处理这样的问题呢？

  - 我们需要使用缩小（narrow）联合（后续我们还会专门讲解缩小相关的功能）；

  - TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型

```typescript
// number|string 联合类型
function printID(id: number | string | boolean) {
    // 使用联合类型的值时，需要特别的小心
    // narrow：缩小
    if (typeof id === "string") { 
        // TypeScript 帮助确定id一定是 string 类型
        console.log(id.toUpperCase())
    }else{
        console.log(id)
    }
}

printID(123)
printID("abc")
printID(true)
```



## 可选类型补充

- 事实上，可选类型可以看做是 类型 和 undefined 的联合类型：

```typescript
// 让一个参数本身是可选的
// 一个参数是一个可选类型的时候，它其实类似于是这个参数是 类型|undefined 的联合类型，但是语法上有些区别
// function foo(message?: string) {
//     console.log(message)     // 不传时为 undefined
// }

// 此时可以不用明确的传入 undefined
// foo()

function foo(message: string|undefined) {
    console.log(message)
}

// 此时需要明确的传入 undefined
foo(undefined)

export { }
```



## 类型别名

- 在前面，我们通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多 次。 

- 比如我们可以给对象类型起一个别名：

```typescript
// type 用于定义类型别名(type alias)
type IDType = string | number | boolean
type PointType = {
    x: number
    y: number
    z?: number
}

function printId(id: IDType) {

}

function printPoint(point: PointType) { 
    
}
```





# TS语法精讲三

## 类型断言

- 有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）。

  - 比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它具体的类型：
  - 或者将子类创建的对象当成参数传入时，若参数规定要用父类类型，可以使用 as 将其转为子类类型。

  ```typescript
  // 1.类型断言 as
  const el = document.getElementById("why") as HTMLImageElement
  el.src = "url地址"
  
  
  // 2.Person是Student的父类
  class Person {
  
  }
  
  class Student extends Person {
      studying() {
  
      }
  }
  
  function sayHello(p: Person) {
      (p as Student).studying()
  }
  
  const stu = new Student()
  sayHello(stu)
  ```

  

- TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，此规则可防止不可能的强制转换：

  ```typescript
  const message = "Hello World"
  // const num:number = message as number    // 报错
  const num: number = (message as unknown) as number
  ```

  

## 非空类型断言!

- 当我们编写下面的代码时，在执行ts的编译阶段会报错：

  - 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的；

  ```typescript
  // message? -> undefined | string
  function printMessageLength(message?: string) {
      console.log(message.length)
  }
  ```

  

- 但是，我们确定传入的参数是有值的，这个时候我们可以使用非空类型断言： 

  - 非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；

  ```typescript
  // message? -> undefined | string
  function printMessageLength(message?: string) {
      // 方法一：
      // if(message){
      //     console.log(message.length)
      // }
  
      // 方法二：
      console.log(message!.length)
  }
  ```



## 可选链的使用

- 可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性：

  - 可选链使用可选链操作符 ?.； 

  - 它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行； 

  - 虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更合适；
  - 使用可选链可以减少很多逻辑判断

```typescript
type Person = {
    name: string
    friends?: {
        name: string
        age?: number
        girlFriend?: {
            name: string
        }
    }
}

const info: Person = {
    name: "why",
    friends: {
        name: "kobe",
        girlFriend: {
            name: "lily"
        }
    }
}

// console.log(info.friends!.name)      // 强行让 friends 存在，不安全
     
console.log(info.friends?.age) // ?. 表示info里如有没有 friends ，则后面代码不执行，返回undefined。有值则继续执行。
console.log(info.friends?.name)
console.log(info.friends?.girlFriend?.name)    

// 通过使用可选链，便可以减少像下方这样的判断
// if (info.friends) {
//     console.log(info.friends.name)
// }

// if (info.friends.age) { 
//     console.log(info.friends.age)
// }
```





## ?? 和 !! 的作用

- 有时候我们还会看到 !! 和 ?? 操作符，这些都是做什么的呢？

- !!操作符：

  - 将一个其他类型转换成boolean类型；

  - 类似于Boolean(变量)的方式；

  ```typescript
  const message = "Hello World"
  
  // const flag = Boolean(message)
  // console.log(flag)   // true
  
  const flag = !!message
  
  console.log(flag)
  ```

  

- ??操作符：
  
- 它是ES11增加的新特性；
  
- **空值合并操作符**（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数；(可达到类似三目运算符的效果)

```typescript
let message: string| null = null

const content = message ?? "你好啊,XXC"     // message 不为null 时，返回message，否则返回 后面字符串

console.log(content)
```

 

## 字面量类型

- 除了前面我们所讲过的类型之外，也可以使用字面量类型（literal types）：

  ```typescript
  // 字面量类型必须与它的值保持一致
  const message: "Hello World" = "Hello World"
  
  let num: 123 = 123
  ```

- 那么这样做有什么意义呢？

  - 默认情况下这么做是没有太大的意义的，但是我们可以将多个类型联合在一起；

  ```typescript
  // 字面量类型的意义：就是必须结合联合类型
  type AlignMent = 'left' | 'right' | 'center'
  let align: AlignMent = "left"
  align = 'right'
  align = 'center'
  
  // align = 'hehehe' // 报错
  ```



## 字面量推理

- 我们来看下面的代码：

  ![](CodeWhy-Vue3-TS-学习笔记3/11.jpg)

- 这是因为我们的对象再进行字面量推理的时候，info其实是一个 {url: string, method: string}，而method 是一个字面量类型，所以我们没办法将一个 string 赋值给一个 字面量 类型。可使用以下方法进行解决

  - 方法一：

    ```typescript
    type Request = {
        url: string,
        method: Method
    }
    
    const options: Request = {
        url: "https://www.coderwhy.org/abc",
        method: 'POST'
    }
    
    request(options.url, options.method)
    ```

  - 方法二：

    ```typescript
    const options = {
        url: "https://www.coderwhy.org/abc",
        method: 'POST'
    }
    
    request(options.url, options.method as Method)
    ```

  - 方法三（字面量推理）：

    ```typescript
    const options = {
        url: "https://www.coderwhy.org/abc",
        method: 'POST'
    } as const
     
    request(options.url, options.method)
    ```



## 类型缩小

- 什么是类型缩小呢？

  - 类型缩小的英文是 Type Narrowing； 

  - 我们可以通过类似于 typeof padding === "number" 的判断语句，来改变TypeScript的执行路径；

  - 在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小; 

  - 而我们编写的 typeof padding === "number 可以称之为 类型保护（type guards）；

- 常见的类型保护有如下几种：

  - typeof

  - 平等缩小（比如===、!==） 

  - instanceof

  - in

  - 等等...

### typeof

- 在 TypeScript 中，检查返回的值typeof是一种类型保护：因为 TypeScript 对如何typeof操作不同的值进行编码。

```typescript
// 1.typeof的类型缩小
type IDType = number | string
function printId(id: IDType) {
    if (typeof id === 'string') {
        console.log(id.toUpperCase())   // 此处id 一定为 string类型
    } else {
        console.log(id)     // 此处 id 一定为 number 类型
    }
}
```

### 平等缩小

- 我们可以使用Switch或者相等的一些运算符来表达相等性（比如===, !==, ==, and != ）：

```typescript
// 2.平等的类型缩小(=== == !== != switch)
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(direction: Direction) {
    // 1. if 判断
    // if(direction==="left"){
    //     console.log(direction)
    // }else if(direction==="right"){
    //     console.log(direction)
    // }

    // 2. switch 判断
    switch (direction) {
        case 'left':
            console.log(direction)
            break;
        case 'right':
            console.log(direction)
            break;
    }
}
```

### instance of

- JavaScript 有一个运算符来检查一个值是否是另一个值的“实例”：

```typescript
// 3. instanceof（判断某一个对象是否为另一个对象的实例）
function printTime(time: string | Date) {
    if (time instanceof Date) {
        console.log(time.toUTCString())
    } else {
        console.log(time)
    }
}

class Student {
    studying() { }
}

class Teacher {
    teaching() { }
}

function work(p: Student | Teacher) {
    if (p instanceof Student) {
        p.studying()
    } else {
        p.teaching()
    }
}
```

### in

- Javascript 有一个运算符，用于确定对象是否具有带名称的属性：in运算符
  - 如果指定的属性在指定的对象或其原型链中，则**in 运算符**返回true；

```typescript
// 4. in

type Fish = { swimming: () => void }

type Dog = { running: () => void }

function walk(animal: Fish | Dog) {
    if ('swimming' in animal) {
        animal.swimming()
    }else{
        animal.running()
    }
}

const fish: Fish = {
    swimming() {
        console.log("swimming")
    }
}
```



## TypeScript 函数类型

- 在JavaScript开发中，函数是重要的组成部分，并且函数可以作为一等公民（可以作为参数，也可以作为返回值进行传递）。 

- 那么在使用函数的过程中，函数是否也可以有自己的类型呢？

  - 我们可以编写函数类型的表达式（Function Type Expressions），来表示函数类型；

  ![](CodeWhy-Vue3-TS-学习笔记3/12.jpg)

- 在上面的语法中 (num1: number, num2: number) => void，代表的就是一个函数类型：

  - 接收两个参数的函数：num1和num2，并且都是number类型；

  - 并且这个函数是没有返回值的，所以是void； (void 可以表示返回值为任何类型)

- 在某些语言中，可能参数名称num1和num2是可以省略，但是TypeScript是不可以的：

```typescript
// 2.定义常量时，编写函数的类型
// 此处 num1:number 不能省略成 number ，否则会被认为 值为number ，类型为 any 的函数。
// 此处的 num1,num2 并不影响实际传参的名词
type AddFnType = (num1: number, num2: number) => void
const add: AddFnType = (a1: number, a2: number) => {
    return a1 + a2
}
```



- 函数类型的案例

```typescript
function calc(n1: number, n2: number, fn: (num1: number, num2: number) => number) {
    return fn(n1, n2)
}

const result1 = calc(20, 30, function (a1, a2) {
    return a1 + a2
})
console.log(result1)

const result2 = calc(20, 30, function (a1, a2) {
    return a1 * a2
})
console.log(result2)
```

## 参数的可选类型

- 我们可以指定某个参数是可选的： 

```typescript
// 可选类型是必须写在必选类型的后面的
// y -> undefined | number
function foo(x: number, y?: number) {

}

foo(20, 30)
foo(20)
```

- 这个时候这个参数y依然是有类型的，它是什么类型呢？ number | undefined

- 另外可选类型需要在必传参数的后面：

## 参数的默认值

- 从ES6开始，JavaScript是支持默认参数的，TypeScript也是支持默认参数的： 

```typescript
// 建议将有默认值的参数放在后面
function foo(x: number, y: number = 20) {
    console.log(x, y)
}

foo(20, undefined)
foo(30, 30)
```

- 这个时候y的类型其实是 undefined 和 number 类型的联合。
- 函数参数推荐书写顺序：必传参数 - 有默认值的参数 - 可选参数





## 剩余参数

- 从ES6开始，JavaScript也支持剩余参数，剩余参数语法允许我们将一个不定数量的参数放到一个数组中。

```typescript
function sum(initalNum: number, ...nums: number[]) {
    let total = initalNum
    for (const num of nums) {
        total += num
    }
    return total
}

console.log(sum(20, 30))
console.log(sum(20, 30, 40))
console.log(sum(20, 30, 40, 50))
```

## 可推导的this类型

- TypeScript是如何处理this呢？我们先来看一个例子： 

  ```typescript
  const info = {
      name: "why",
      eating() {
          console.log(this.name + " eating")
      }
  }
  
  info.eating()
  ```

  

- 上面的代码是可以正常运行的，也就是TypeScript在编译时，认为我们的this是可以正确去使用的：
  
  - TypeScript认为函数 eating有一个对应的this的外部对象 info，所以在使用时，就会把this当做该对象。



## 不确定的this类型

- 但是对于某些情况来说，我们并不知道this到底是什么？ 

- 这段代码运行会报错的：

  ```typescript
  function eating() {
      console.log(this.name)
  }
  const info = {
      name: "why",
      eating: eating
  }
  info.eating();
  ```

  - 这里我们再次强调一下，TypeScript进行类型检测的目的是让我们的代码更加的安全；

  - 所以这里对于 eating的调用来说，我们虽然将其放到了info中，通过info去调用，this依然是指向info对象的；

  - 但是对于TypeScript编译器来说，这个代码是非常不安全的，因为我们也有可能直接调用函数，或者通过别的对象来调用函数；



- 这个时候，通常TypeScript会要求我们明确的指定this的类型：

  ```typescript
  type ThisType = { name: string }
  
  function eating(this: ThisType, message: string) {
      console.log(this.name + " eating", message)
  }
  const info = {
      name: "why",
      eating: eating
  }
  
  // 隐式绑定
  info.eating("hahaha");
  
  // 显式绑定
  eating.call({ name: "kobe" }, "hehehe")
  eating.apply({ name: "james" }, ["heiheihei"])
  ```





# TS语法精讲四

## 函数的重载

- 在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？ 

- 我们可能会这样来编写，但是其实是错误的： 

  ![](CodeWhy-Vue3-TS-学习笔记3/14.jpg)

- 那么这个代码应该如何去编写呢？

  - 在TypeScript中，我们可以去编写不同的重载签名（*overload signatures*）来表示函数可以以不同的方式进行调用；

  - 一般是编写两个或者以上的重载签名，再去编写一个通用的函数以及实现；

```typescript
// 函数的重载：函数的名称相同，但是参数不同的几个函数，就是函数的重载
function add(num1: number, num2: number): number;   // 没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1.length + num2.length
    }
    return num1 + num2
}

const result = add(20, 30)
const result2 = add("xxc", "123")

console.log(result)
console.log(result2)

// 在函数的重载中，实现函数是不能直接被调用的
// add({ name: "why" }, { age: 18 })    // 报错
```

- 在我们调用add的时候，它会根据我们传入的参数类型来决定执行函数体时，到底执行哪一个函数的重载签名；

- **但是注意，有实现体的函数，是不能直接被调用的。**



## 联合类型与函数重载

- 我们现在有一个需求：定义一个函数，可以传入字符串或者数组，获取它们的长度。 

- 这里有两种实现方案：

  - 方案一：使用联合类型来实现；

  - 方案二：实现函数重载来实现；

  ```typescript
  // 实现方式一：联合类型
  // 如果可以使用联合类型方便简单实现的条件下，尽量使用联合类型，否则就使用函数的重载
  // function getLength(args: string | any[]) {
  //     return args.length
  // }
  
  // console.log(getLength("abc"))
  
  // console.log(getLength([123, 456, 789]))
  
  // 实现方式二：函数的重载
  function getLength(args: string): number;
  function getLength(args: any[]): number;
  
  function getLength(args: any): number {
      return args.length
  }
  
  console.log(getLength("abc"))
  console.log(getLength([123, 465, 789]))
  ```

- 在开发中我们选择使用哪一种呢？
  
  - 在可能的情况下，尽量选择使用联合类型来实现；



## 认识类的使用

- 在早期的JavaScript开发中（ES5）我们需要通过函数和原型链来实现类和继承，从ES6开始，引入了class关键字，可以更加方便的定义和使用类。

- TypeScript作为JavaScript的超集，也是支持使用class关键字的，并且还可以对类的属性和方法等进行静态类型检测。

- 实际上在JavaScript的开发过程中，我们更加习惯于函数式编程：

  - 比如React开发中，目前更多使用的函数组件以及结合Hook的开发模式；

  - 比如在Vue3开发中，目前也更加推崇使用 Composition API； 

- 但是在封装某些业务的时候，类具有更强大封装性，所以我们也需要掌握它们。 

- 类的定义我们通常会使用class关键字：

  - 在面向对象的世界里，任何事物都可以使用类的结构来描述； 

  - 类中包含特有的属性和方法；

## 类的定义

- **我们来定义一个Person类：**

```typescript
class Person {
    name: string    // 属性初始化必须赋值或在构造函数中赋值，否则会报错
    age: number

    constructor(name: string, age: number) {
        // 在 ts 中，此处的 this.xxx 的属性必须现在外部先定义（与js不同）
        this.name = name;
        this.age = age;
    }

    eating() {
        console.log(this.name + " eating")
    }
}

const p = new Person("why", 18)
console.log(p.name)
console.log(p.age)
```

- 使用class关键字来定义一个类；

- 我们可以声明一些类的属性：在类的内部声明类的属性以及对应的类型

  - 如果类型没有声明，那么它们默认是any的；

  - 我们也可以给属性设置初始化值；

  - 在默认的strictPropertyInitialization模式下面我们的属性是必须初始化的，如果没有初始化，那么编译时就会报错；

    - 如果我们在strictPropertyInitialization模式下确实不希望给属性初始化，可以使用 name!: string语法；

      ```typescript
      name!:string
      ```

- 类可以有自己的构造函数constructor，当我们通过new关键字创建一个实例时，构造函数会被调用；
  
- 构造函数不需要返回任何值，默认返回当前创建出来的实例；
  
- 类中可以有自己的函数，定义的函数称之为方法；



## 类的继承

- 面向对象的其中一大特性就是继承，继承不仅仅可以减少我们的代码量，也是多态的使用前提。 

- 我们使用extends关键字来实现继承，子类中使用super来访问父类。

- 我们来看一下Student类继承自Person： 

  - Student类可以有自己的属性和方法，并且会继承Person的属性和方法；

  - 在构造函数中，我们可以通过super来调用父类的构造方法，对父类中的属性进行初始化；

```typescript
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    eating() {
        console.log('eating')
    }
}

class Student extends Person {
    sno: number

    constructor(name: string, age: number, sno: number) {
        // 调用父类的构造器
        super(name, age)    // 此处使用 super 需要保证 父类中有写对应的constructor
        this.sno = sno
    }

    // 子类对父类进行重写
    eating() { 
        super.eating()
        console.log("student eating")
    }

    studying() {
        console.log("studying")
    }
}

const stu = new Student("why", 18, 111)
console.log(stu.name)
console.log(stu.age)
console.log(stu.sno)
stu.eating()

export { }
```

## 类的多态

```typescript
class Animal {
    action() {
        console.log('animal running')
    }
}

class Dog extends Animal {
    action() {
        console.log("dog running")
    }
}

class Fish extends Animal {
    action() {
        console.log("fish swimming")
    }
}

// animal:dog/fish
// 多态的目的是为了写出更加具备通用性的代码，若此处不用多态，而用 函数重载 或 联合类型，都会更加麻烦
function makeActions(animals: Animal[]) {
    animals.forEach(animals => {
        animals.action()    // 此处会执行重写之后的方法（父类的引用指向子类对象）
    })
}

makeActions([new Dog(), new Fish()])
```



## 类的成员修饰符

- 在TypeScript中，类的属性和方法支持三种修饰符： public、private、protected

  - public 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的；

  - private 修饰的是仅在同一类中可见、私有的属性或方法；

  - protected 修饰的是仅在类自身及子类中可见、受保护的属性或方法；

- public是默认的修饰符，也是可以直接访问的，我们这里来演示一下protected和private。

```javascript
class Person {
    private name: string = ""

    // 封装了两个方法，通过方法来访问name
    getName() {
        return this.name
    }

    setName(newName) {
        this.name = newName
    }
}

const p = new Person()
// console.log(p.name)      // 无法直接访问，会报错
console.log(p.getName())
p.setName("why")

export { }
```

```javascript
// protected：在类内部和子类中可以访问

class Person {
    protected name: string = "123"
}

class Student extends Person {
    getName() { 
        return this.name
    }
}

const stu = new Student()
console.log(stu.getName())
// console.log(p.name)      // 无法直接访问，会报错

export { }
```



## 只读属性 readonly

- 如果有一个属性我们不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly：

```typescript
class Person {
    // 1.只读属性是可以在构造器中赋值的，赋值之后就不可以修改了
    // 2.属性本身不能进行修改，但是如果它是对象类型，对象中的属性是可以修改的
    readonly name: string = "123"
    age?: number
    readonly friend?: Person
    constructor(name: string, friend?: Person) {
        this.name = name
        this.friend = friend
    }
}

const p = new Person("xxc", new Person("kobe"))
console.log(p.name)
console.log(p.friend)

// p.friend = new Person('james')   // 不可以直接修改 friend
if (p.friend) {
    p.friend.age = 30	// 可以进行修改
}

// p.name = "123"   // 无法修改，修改会报错
```



## getter / setter

- 在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程，这个时候我们可以使用存取器。

```typescript
class Person {
    private _name: string
    constructor(name: string) {
        this._name = name
    }

    // 访问器 setter/getter
    // setter
    set name(newName) {
        this._name = newName
    }

    // getter
    get name() {
        return this._name
    }
}

const p = new Person("why")
p.name = "123"
console.log(p.name)

export { }
```



## 静态成员

- 前面我们在类中定义的成员和方法都属于对象级别的, 在开发中, 我们有时候也需要定义类级别的成员和方法。 

- 在TypeScript中通过关键字static来定义：

```typescript
// class Person {
//     // 下面这些都是实例成员，必须通过实例来获取
//     name: string = ""
//     age: number = 12
// }

// const p = new Person()
// p.name = "123"

class Student {
    // 静态成员：可以直接通过类名来进行调用
    static time: string = "20:00"

    static attendClass() { 
        console.log("去学习~")
    }
}

console.log(Student.time)
Student.attendClass()

export { }
```

## 抽象类演练

- 我们知道，继承是多态使用的前提。

  - 所以在定义很多通用的**调用接口时, 我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式。**

  - **但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法,，我们可以定义为抽象方法。**

- **什么是 抽象方法? 在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法。**

  - 抽象方法，必须存在于抽象类中；但是抽象类中也可以定义非抽象方法。

  - 抽象类是使用abstract声明的类；

- 抽象类有如下的特点：

  - 抽象类是不能被实例的话（也就是不能通过new创建） 

  - 抽象方法必须被子类实现，否则该类必须是一个抽象类；

```typescript
function makeArea(shape: Shape) {
    return shape.getArea()
}

abstract class Shape {
    abstract getArea();
}

class Rectangle extends Shape{
    private width: number
    private height: number

    constructor(width: number, height: number) {
        super()
        this.width = width;
        this.height = height;
    }

    // 子类若继承抽象类，则必须实现抽象类的方法
    getArea() {
        return this.width * this.height
    }
}

class Circle extends Shape{
    private r: number

    constructor(r: number) {
        super()
        this.r = r;
    }

    getArea() {
        return this.r * this.r * 3.14
    }
}

const rectangle = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangle))
console.log(makeArea(circle))

// console.log(new Shape());   // 会报错，因为抽象类不能被实例化

// makeArea(123)    // 会报错
```



## 类的类型

-  类本身也是可以作为一种数据类型的：

```typescript
class Person {
    name: string = "123"

    eating() {

    }
}

const p = new Person()

const p1: Person = {        // 对象中的属性必须与类一致
    name: "why",
    eating() {

    }
}

// 使用场景
function printPerson(p: Person) {
    console.log(p.name)
}
// 当参数为类类型时，既可以传递一个类实例，也可传递一个与类属性一致的对象
printPerson(new Person())
printPerson({ name: "kobe", eating: function () { } })  // 这种对象也可称为 对象的字面量
```

## 接口的声明

- 在前面我们通过type可以用来声明一个对象类型，对象的另外一种声明方式就是通过接口来声明： 

```typescript
// 通过类型别名来声明对象类型
// type InfoType = { name: string, age: number }

// 另外一种方式声明对象类型：接口 interface
// 接口与类型别名效果类似，可按个人爱好选择使用，不过推荐使用接口
// 同时，接口定义时有一个规范：在接口名前加 “I”
// 在其中可以定义可选类型，也可以定义只读属性
interface IInfoType {
    readonly name: string
    age: number
    friend?: {
        name: string
    }
}

const info: IInfoType = {
    name: "why",
    age: 18
}

console.log(info.friend?.name)
```

## 索引类型

- 前面我们使用interface来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但是有时候我们会遇到类似下面的对象：

```typescript
// 通过 interface 来定义索引类型
interface IndexLanguage {
    [index: number]: string
}

const frontLanguage: IndexLanguage = {
    0: "HTML",
    1: "CSS",
    2: "JavaScript",
    3: "Vuejs",
    // "abc":"123"  // 报错
}

interface ILanguageYear {
    [name: string]: number
}

const languageYear: ILanguageYear = {
    "C": 1972,
    "Java": 1995,
    "JavaScript": 1996,
    "TypeScript": 2014
}
```

- 可以通过 interface 来定义索引类型，保证对象中的键值对类型固定。



## 函数类型

- 前面我们都是通过interface来定义对象中普通的属性和方法的，实际上它也可以用来定义函数类型： 

```typescript
// type CalcFn = (n1: number, n2: number) => number

// 可调用的接口
interface CalcFn {
    (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: (n1: number, n2: number) => number) {
    return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) => {
    return num1 * num2
}

calc(20, 30, add)
```

- 当然，除非特别的情况，还是推荐大家使用类型别名来定义函数。



## 接口继承

- 接口和类一样是可以进行继承的，也是使用extends关键字：
  - 并且我们会发现，接口是支持多继承的（类不支持多继承）

```typescript
interface ISwim {
    swimming: () => void
}

interface IFly {
    flying: () => void
}

interface IAction extends ISwim, IFly {

}

const action: IAction = {
    swimming() {

    },
    flying() { 
        
    }
}

export { }
```

- 接口定义后，也是可以被类实现的：

  - 如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入；

  - 这就是面向接口开发；

```typescript
interface ISwim {
    swimming: () => void
}

interface IEat {
    eating: () => void
}

class Animal {

}

// 继承：只能实现单继承
// 实现：实现接口，可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
    swimming() {
        console.log("Fish Swimming")
    }
    eating() {
        console.log("Fish Eating")
    }
}

class Person implements ISwim {
    swimming() {
        console.log("Person Swimming")
    }
}

// 编写一些公共的API：面向接口编程
// function swimAction(swimable: Fish) {       // 若要求传入 Fish 类型，则不具备通用性
function swimAction(swimable: ISwim) {    // 此时可以改为要求传入 ISwim 接口类型的数据
    swimable.swimming()
}

// 1. 所有实现了接口的类对应的对象，都是可以传入的
swimAction(new Fish())
swimAction(new Person())

// 2. 符合接口类型的对象字面量，也可以传入
swimAction({ swimming: function () { } })
```





## 交叉类型

- 前面我们学习了联合类型：

  - 联合类型表示多个类型中一个即可 

  ```typescript
  type WhyType = number | string
  type Direction = "left" | "right" | "center"
  ```

- 还有另外一种类型合并，就是交叉类型（Intersection Types）：

  - 交叉类似表示需要满足多个类型的条件； 

  - 交叉类型使用 & 符号； 

- 我们来看下面的交叉类型：

  - 表达的含义是number和string要同时满足； 

  - 但是有同时满足是一个number又是一个string的值吗？其实是没有的，所以MyType其实是一个never类型；

```typescript
type WType = number & string     // 这样写没有任何意义，此时 WType 会被认为是 never 类型
```



- 所以，在开发中，我们进行交叉时，通常是对对象类型进行交叉的：

  ```typescript
  interface ISwim {
      swimming: () => void
  }
  
  interface IFly {
      flying: () => void
  }
  
  type MyType1 = ISwim | IFly
  type MyType2 = ISwim & IFly
  
  const obj: MyType1 = {  // 实现 MyType1 类型，要求只要实现两个接口中一个接口的方法即可
      flying() { }
  }
  
  const obj2: MyType2 = { // 实现 MyType2 类型，要求两个接口中的方法都要实现
      flying() { },
      swimming() { }
  }
  ```

## interface和type区别

- 我们会发现interface和type都可以用来定义对象类型，那么在开发中定义对象类型时，到底选择哪一个呢？
  - 如果是定义非对象类型，通常推荐使用type，比如Alignment、一些Function； 

- 如果是定义对象类型，那么他们是有区别的：

  - interface 可以重复的对某个接口来定义属性和方法，最终所有的属性和方法会合并；

  - 而type定义的是别名，别名是不能重复的；

```typescript
interface IFoo {
    name: string
}

interface IFoo {
    age: number
}

// 定义接口时，若名称相同，会将所有属性合并
const foo: IFoo = {
    name: "why",
    age: 18
}

// 在安装 ts 时，其内部的 lib 文件夹中，为我们定义了一些 Math/Date/Dom相关API 的类型
// document.getElementById('app') as HTMLDivElement
// window.addEventListener

// 而我们可以通过定义同名接口为其内部组添加对应属性
interface Window {
    age: number
}

window.age = 19
console.log(window.age)

type IBar = {
    name: string
}

// type IBar = {    // type 定义的类型别名不能重名，否则会报错。

// }
```



# TS语法精讲五



## 字面量赋值

- 我们来看下面的代码：

```typescript
interface IPerson {
    name: string
    age: number
    height: number
}

const info = {
    name: "why",
    age: 18,
    height: 1.88,
    address: "广州市"
}

// freshness 擦除，在类型检测时会将 info 中多余的属性擦除，擦除后剩余的属性如果能满足类型要求，则允许赋值。
const p: IPerson = info

console.log(info)
console.log(p)

function printInfo(person: IPerson) {
    console.log(person.name)
    // console.log(person.address)      // 不能输出 address ，会报错
}

// printInfo({          // 报错
//     name:"why",
//     age:18,
//     height:1.88,
//     address:"广州市"
// })

printInfo(info)
```



- 这是因为TypeScript在字面量直接赋值的过程中，为了进行类型推导会进行严格的类型限制。
  - 但是之后如果我们是将一个 变量标识符 赋值给其他的变量时，会进行freshness擦除操作。



## TypeScript枚举类型

- 枚举类型是为数不多的TypeScript特性有的特性之一：

  - 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；

  - 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

```typescript
enum Direction {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM
}

function turnDirection(direction: Direction) {
    switch (direction) {
        case Direction.LEFT:
            console.log("改变角色的方向向左")
            break;
        case Direction.RIGHT:
            console.log("改变角色的方向向右")
            break;
        case Direction.TOP:
            console.log("改变角色的方向向上")
            break;
        case Direction.BOTTOM:
            console.log("改变角色的方向向下")
            break;
        default:
            const foo: never = direction;
            break;
    }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
```

- 枚举类型默认是有值的，比如上面的枚举，默认值是这样的： 

  ```typescript
  enum Direction {
      LEFT = 0,
      RIGHT = 1,
      TOP = 2,
      BOTTOM = 3
  }
  ```

- 当然，我们也可以给枚举其他值：

  ```typescript
  enum Direction {
      LEFT = 100,
      RIGHT,
      TOP,
      BOTTOM
  }
  ```

  - 这个时候会从100进行递增；

- 我们也可以给他们赋值其他的类型：

  ```typescript
  enum Direction {
      LEFT = "LEFT",
      RIGHT = "RIGHT",
      TOP = "TOP",
      BOTTOM = "BOTTOM"
  }
  ```



## 认识泛型

- 软件工程的主要目的是构建不仅仅明确和一致的API，还要让你的代码具有很强的可重用性：

  - 比如我们可以通过函数来封装一些API，通过传入不同的函数参数，让函数帮助我们完成不同的操作；

  - 但是对于参数的类型是否也可以参数化呢？

- 什么是**类型的参数化**？

  - 我们来提一个需求：封装一个函数，传入一个参数，并且返回这个参数；

  

- 如果我们是TypeScript的思维方式，要考虑这个参数和返回值的类型需要一致： 

![](CodeWhy-Vue3-TS-学习笔记3/16.jpg)

- 上面的代码虽然实现了，但是不适用于其他类型，比如string、boolean、Person等类型：

  ![](CodeWhy-Vue3-TS-学习笔记3/17.jpg)

- 虽然any是可以的，但是定义为any的时候，我们其实已经丢失了类型信息：

  - 比如我们传入的是一个number，那么我们希望返回的可不是any类型，而是number类型；

  - 所以，我们需要在函数中可以捕获到参数的类型是number，并且同时使用它来作为返回值的类型；

- 我们需要在这里使用一种特性的变量 - 类型变量（type variable），它作用于类型，而不是值：

  ![](CodeWhy-Vue3-TS-学习笔记3/18.jpg)

- **这里我们可以使用两种方式来调用它：** 

  - 方式一：通过 <类型> 的方式将类型传递给函数； 

  - 方式二：通过类型推到，自动推到出我们传入变量的类型：

    - 在这里会推导出它们是 字面量类型的，因为字面量类型对于我们的函数也是适用的

    ![](CodeWhy-Vue3-TS-学习笔记3/19.jpg)



## 泛型的基本补充

- 当然我们也可以传入多个类型： 

```typescript
function foo<T, E>(arg1: T, arg2: E, arg3: O) {

}

foo<number, string>(11, '123', false)
```

- 平时在开发中我们可能会看到一些常用的名称：

  - T：Type的缩写，类型

  - K、V：key和value的缩写，键值对

  - E：Element的缩写，元素

  - O：Object的缩写，对象



## 泛型接口

- 在定义接口的时候我们也可以使用泛型：

```typescript
// 接口是没有类型推导的，不过我们可以给其设置默认类型
interface IPerson<T1 = string, T2 = number> {
    name: T1,
    age: T2
}

const p: IPerson<string, number> = {
    name: "why",
    age: 18
}
```



## 泛型类

- 我们也可以编写一个泛型类：

```typescript
class Point<T> {
    x: T
    y: T
    z?: T

    constructor(x: T, y: T, z: T) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const p1 = new Point("1.33.2", "2.22.3", "4.22.1")
const p2 = new Point<string>("1.33.2", "2.22.3", "4.22.1")
const p3: Point<string> = new Point("1.33.2", "2.22.3", "4.22.1")

// 数组的定义中，也可以用到类似泛型类的写法
const names1: string[] = ["abc", "cba", "nba"]
const names2: Array<string> = ["abc", "cba", "nba"]     // 不推荐(react jsx <>)
```

## 泛型约束

- 有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：

  - 比如string和array都是有length的，或者某些对象也是会有length属性的；

  - 那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢？

  ```typescript
  interface ILength {
      length: number
  }
  
  // 通过让泛型继承接口的方式，让其拥有一些类型约束
  function getLength<T extends ILength>(arg: T) {
      return arg.length
  }
  
  getLength("123")
  getLength(["abc", "cba"])
  getLength({ length: 100 })
  ```



## 模块化开发

- TypeScript支持两种方式来控制我们的作用域： 

  - 模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS； 

  - 命名空间：通过namespace来声明一个命名空间
    - 命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题。

  ```typescript
  // 想要在另外的模块中使用命名空间，需要将对应的命名空间导出
  export namespace time {
      // 命名空间中的内容想要在外部使用，需要导出
      export function format(time: string) {
          return "2222-02-22"
      }
  
      export function foo(){ 
          console.log(123)
      }
  }
  
  export namespace price {
      export function format(price: number) {
          return "99.99"
      }
  }
  
  time.format("123")
  price.format(123)
  ```

  

## 类型的查找

- 之前我们所有的typescript中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型： 

  ![](CodeWhy-Vue3-TS-学习笔记3/20.jpg)

- 大家是否会奇怪，我们的HTMLImageElement类型来自哪里呢？甚至是document为什么可以有getElementById的方法呢？
  - 其实这里就涉及到typescript对类型的管理和查找规则了。

- 我们这里先给大家介绍另外的一种typescript文件：.d.ts文件

  - 我们之前编写的typescript文件都是 .ts 文件，这些文件最终会输出 .js 文件，也是我们通常编写代码的地方；

  - 还有另外一种文件 .d.ts 文件，它是用来做类型的声明(declare)。 它仅仅用来做类型检测，告知typescript我们有哪些类型；

- 那么typescript会在哪里查找我们的类型声明呢？

  - 内置类型声明；

  - 外部定义类型声明；

  - 自己定义类型声明；



## 内置类型声明

- 内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件；
  - 包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等；

- 内置类型声明通常在我们安装typescript的环境中会带有的；
  - https://github.com/microsoft/TypeScript/tree/main/lib



## 外部定义类型声明

- 外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。

- **这些库通常有两种类型声明方式：**

  - 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios

  - 方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件 

    - 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/

    - 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search= 

    - 比如我们安装react的类型声明： npm i @types/react --save-dev



## 自定义类型声明

- 什么情况下需要自己来定义声明文件呢？

  - 情况一：我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash

  - 情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；



### 声明变量、函数、类

**coderwhy.d.ts**

```typescript
// 声明变量/函数/类
declare let whyName: string
declare let whyAge: number
declare let whyHeight: number

declare function whyFoo(): void

declare class Person {
    name: string
    age: number
    constructor(name: string, age: number)
}
```

声明后，如果我们在 index.html定义了对应的数据，便可以直接在 ts 文件中应用这些变量、函数、类。



### 声明模块

- 我们也可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块： 

- 声明模块的语法: declare module '模块名' {}。 
  - 在声明模块的内部，我们可以通过 export 导出对应库的类、函数等；

```typescript
// 声明模块
declare module 'lodash' {
    export function join(arr: any[]): void
}
```

- 声明后，便可在 ts 文件中使用 lodash 的 join 方法



## 声明文件

- 在某些情况下，我们也可以声明文件：

  - 比如在开发vue的过程中，默认是不识别我们的.vue文件的，那么我们就需要对其进行文件的声明；

  - 比如在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明；

![](CodeWhy-Vue3-TS-学习笔记3/21.jpg)



## 声明命名空间

- 比如我们在index.html中直接引入了jQuery： 
  - CDN地址： https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js

- 我们可以进行命名空间的声明： 

  ![](CodeWhy-Vue3-TS-学习笔记3/22.jpg)

- 在main.ts中就可以使用了：

  ![](CodeWhy-Vue3-TS-学习笔记3/23.jpg)





![](CodeWhy-Vue3-TS-学习笔记3/.jpg)