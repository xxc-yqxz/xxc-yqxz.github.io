---
title: Serverless-vue3-eggsjs-无人点餐项目(三)
tags:
  - eggjs
  - serverless
categories:
  - 项目开发
abbrlink: 564fa0ad
date: 2021-11-22 13:41:45
---
## Sass 相关

Sass (英文全称：Syntactically Awesome Stylesheets) 是一个最初由 Hampton Catlin 设计并由 Natalie Weizenbaum 开发的层叠样式表语言。

 Sass 是一个 CSS 预处理器。 

Sass 是 CSS 扩展语言，可以帮助我们减少 CSS 重复的代码，节省开发时间。 

Sass 完全兼容所有版本的 CSS。 

Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。 

Sass 生成良好格式化的 CSS 代码，易于组织和维护。 

Sass 文件后缀为 .scss

**安装Sass**

```
npm install -g sass
```

**Sass嵌套**

```scss
nav {
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li {
		display: inline-block;
	}
	a {
		display: block;
		padding: 6px 12px;
		text-decoration: none;
	}
}
```

**Sass变量**

```scss
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
$myWidth: 680px;
body {
	font-family: $myFont;
	font-size: $myFontSize;
	color: $myColor;
}
#container {
	width: $myWidth;
}
```

**Sass的编译**

你还可以利用 --watch 参数来监视单个文件或目录。 

--watch 参数告诉 Sass 监听源文件的 变化， 并在每次保存 Sass 文件时重新编译为 CSS。

如果你只是想监视 （而不是手动构建） input.scss 文件，你只需在 sass 命令后面添加 --watch 参数即可，如下：

```scss
sass --watch input.scss output.css
```

可以使用文件夹路径作为输入和输出， 并使用冒号分隔它们，来监听文件并输出到目录。 例如:

```scss
sass --watch app/sass:public/stylesheets
```

Sass 将会监听 app/sass 目录下所有文件的变动，并编译 CSS 到 public/stylesheets 目录 下。 

[Sass中文文档](https://sass.bootcss.com/)

## 无刷新数据同步

### 如何让服务器主动给客户端推送消息

我们可以非常轻松的捕获浏览器上发生的事件（比如用户点击了盒子），这个事件可以轻松 产生与服务器的数据交互（比如 Ajax）。

但是，反过来却是不可能的：服务器端发生了一个 事件，服务器无法将这个事件的信息实时主动通知它的客户端。只有在客户端查询服务器的当前状态的时候，所发生事件的信息才会从服务器传递到客户端。

让服务器主动给客户端推送消息常见的做法有下面几种方式：

**长轮询**：客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要 轮询速度足够快，例如 1 秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举， 实际上对服务器、客户端双方都造成了大量的性能浪费。

**长连接**：浏览器和服务器只需要要做一个握手的动作，在建立连接之后，双方可以在任 意时刻，相互推送信息。同时，服务器与客户端之间交换的头信息很小。

### 关于 WebSocket 和 Socket.io

#### WebSocket

WebScoket 是一种让客户端和服务器之间能进行双向实时通信的技术。

它是 HTML 最新标准 HTML5 的一个协议规范，本质上是个基于 TCP 的协议，它通过 HTTP/HTTPS 协议发送一条特殊的请求进行握手后创建了一个 TCP 连接，此后浏览器/客户端和服务器之间便可以通过此连接来进行双向实时通信。

所以 WebSocket 协议，需要浏览器支持，更需要服务器支持。 

● 支持 WebSocket 协议的浏览器有：Chrome 4、火狐 4、IE10、Safari5 

● 支持 WebSocket 协议的服务器有：Node 0、Apach7.0.2、Nginx1.3 Node.js 上需要写一些程序，来处理 TCP 请求。

#### Socket.io

WebSocket 是 HTML5 最新提出的规范，虽然主流浏览器都已经支持，但仍然可能有不兼容的情况， 为了兼容所有浏览器，给程序员提供一致的编程体验，SocketIO 将 WebSocket、AJAX 和其它的通信方式全部封装成了统一的通信接口，也就是说，我们在使用 SocketIO 时，不用担心兼容问题， 底层会自动选用最佳的通信方式。因此说，WebSocket 是 SocketIO 的一个子集。

Node.js 从诞生之日起，就支持 WebSocket 协议。不过，从底层一步一步搭建一个 Socket 服 务器很费劲。所以，有大神帮我们写了一个库 Socket.IO。

## Express 结合 Socket.io 实现服务器 和客户端的相互通信

1. 安装

```
npm install socket.io --save
```

安装成功后，服务器便可以 通过访问 `http://localhost:端口名/socket.io/socket.io.js` 来获取到socket.io.js 文件。而客户端也可以引入这个文件来实现 socket.io 的相关功能

2. 服务器集成 socket.io

```javascript
var express = require('express');
var app = express();
//1、配置 socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
res.render('index');
})

//2、监听端口
server.listen(8000);

//3、建立连接 广播数据
// io.on 与 io.emit 会向所有客户端 发送操作通知 与 执行通知相关操作
// socket.on 与 socket.emit 只会向 有监听相关事件 或 触发相关事件的客户端  发送操作通知 与 执行通知相关操作

// io.on('connection',function(){}) 在客户端建立连接时自动触发
io.on('connection', (socket) => {
    console.log("来了一个客户");
    //给客户端广播一个消息  发送给建立连接的用户
    socket.emit("serverMsg","已经建立了连接");


    //接收客户端发送的数据
    socket.on("clientMsg",(clientData)=>{
        console.log("clientMsg:"+clientData);  
        io.emit("serverMsg","serverMsg:"+clientData); //给所有用户广播        
    })
});
```

3. 客户端集成 socket.io

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <title>Socket.io客户端</title>
    <script src="/jquery-1.11.3.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <input type="text" id="msg" />

    <br />
    <br />

    <button id="send">发送</button>
</body>

<script>
  //1、连接socket.io服务器
  var socket = io();

  //2、监听服务器的广播
  socket.on("serverMsg",function(serverData){
    console.log(serverData);
  })

  //3、客户端给服务器发送消息
  $("#send").click(function(){
      var msg=$("#msg").val();
      socket.emit("clientMsg",msg);
  })
</script>
</html>
```

## Socket.io 解决跨域

1. 服务器配置

```javascript
var express = require('express');
var app = express();
//1、配置socket.io 以及 配置跨域
// https://github.com/socketio/socket.io/issues/3755

const server = require('http').createServer(app);

// 配置跨域需要在 配置 socket.io 时的第二个参数中传入相关配置
const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        // origin: "http://127.0.0.1:5500", // 指定特定端口
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

//2、监听端口
server.listen(8000);

//3、创建socket.io服务

io.on('connection', (socket) => {
    console.log("来了一个客户");
    //给客户端广播一个消息  发送给建立连接的用户
    socket.emit("serverMsg", "已经建立了连接");

    //接收客户端发送的数据
    socket.on("clientMsg", (clientData) => {
        console.log("clientMsg:" + clientData);
        io.emit("serverMsg", "serverMsg:" + clientData); //给所有用户广播        
    })
});
```

2. 客户端连接

只要服务器配置了跨域，客户端便可照常连接。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <title>Socket.io客户端</title>
  <script src="http://192.168.129.1:8000/jquery-1.11.3.min.js"></script>
  <script src="http://192.168.129.1:8000/socket.io/socket.io.js"></script>
</head>

<body>
  <input type="text" id="msg" />

  <br />
  <br />

  <button id="send">发送</button>
</body>

<script>
  //1、连接socket.io服务器
  var socket = io.connect("http://192.168.129.1:8000");

  //2、监听服务器的广播
  socket.on("serverMsg", function (serverData) {
    console.log(serverData);
  })

  //3、客户端给服务器发送消息
  $("#send").click(function () {
    var msg = $("#msg").val();
    socket.emit("clientMsg", msg);
  })
</script>

</html>
```

## Socket.io 实现分组广播

io.emit 广播，为所有配置了 socket.io 的客户端发送广播

socket.emit 为触发了广播的客户端发送广播（比如一个客户端触发了io.on(connection,function(){})，socket.emit就会给这个客户端发送广播）



分组广播： 

socket.join(roomid); 		建立分组

io.to(roomid).emit('addCart','ServerAddCartOk'); 对房间（分组）内的用户广播消息 

socket.broadcast.to(roomid).emit('addCart',AddCart Ok'); 通知分组内的用户不包括自己

**服务器配置：**

```javascript
var express = require('express');
var querystring = require("querystring");
var app = express();
//1、配置socket.io 以及 配置跨域
// https://github.com/socketio/socket.io/issues/3755

const server = require('http').createServer(app);

const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: "*", // from the screenshot you provided
        methods: ["GET", "POST"]
    }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

//2、监听端口
server.listen(8000);

//3、创建socket.io服务

io.on('connection', (socket) => {
    console.log("来了一个客户");
    //给客户端广播一个消息  发送给建立连接的用户
    // console.log(socket.request.url)  // /socket.io/?roomid=20&EIO=4&transport=polling&t=NbbLfLV

    // console.log(url.parse(socket.request.url,true).query.roomid);        // 通过 url.parse 解析 query 参数（将被废弃，不推荐）

    let roomId = querystring.parse(socket.request.url.split("?")[1]).roomid;    // querystring 可以将 url中 ? 后面的 query 参数解析成对象
    socket.join(roomId);        // 通过 socket.join 进行分组

    socket.on("addCart", (clientData) => {
        //给当前分组里面的用户广播
        io.to(roomId).emit("serverMsg", "this is addCart msg");  //对房间（分组）内的用户广播消息
        // socket.broadcast.to(roomId).emit('serverMsg','this is addCart msg');  //通知分组内的用户不包括自己
    })
});
```

**客户端发送请求：**

```html
<body>
  <h2>客户端111</h2>
  <br>
  <button onclick="addCart()">加入购物车</button>
</body>
<script>
  //1、连接socket.io服务器(通过传入 query 参数，实现分组)
  var socket = io.connect("http://192.168.129.1:8000?roomid=20");

  socket.on("serverMsg", function (serverData) {
    console.log(serverData);
  })

  function addCart() {
    socket.emit("addCart", "client AddCart");
  }
</script>
```

## Socket.io 命名空间

所谓命名空间，就是指在不同的域当中发消息只能给当前的域的 socket 收到。

**服务器配置：**

```javascript
// 在 io 连接时使用 of() 配置命名空间
io.of('/cart').on('connection', (socket) => {
	console.log("来了一个客户");
	//给客户端广播一个消息 发送给建立连接的用户
	let roomId = querystring.parse(socket.request.url.split("?")[1]).roomid;
	socket.join(roomId);
    // 此外还需要在 每次发送广播时添加 of() 
	socket.on("addCart",(clientData)=>{
		console.log(clientData);
		io.of('/cart').to(roomId).emit("serverMsg","this is addCart msg");
	})
});
```

**客户端连接：**

```javascript
var socket = io.connect("http://192.168.0.13:8000/cart?roomid=20");		// 连接时需要带上命名空间
socket.on("serverMsg",function(serverData){
	console.log(serverData);
})
function addCart(){
	socket.emit("addCart","client AddCart");
}
```

## eggjs 中配置 Socket.io

1. 安装插件

```
cnpm i egg-socket.io --save
```

2. 在 **config/plugin.js** 中安装插件

```javascript
io: {
    enable: true,
    package: 'egg-socket.io',
}
```

3. 在 **`config/config.default.js`** 中配置插件

```javascript
config.io = {
    init: {}, // passed to engine.io
    namespace: {
      // 配置 命名空间
      '/cart': {
        connectionMiddleware: ["connection"],  //建立连接的时候要触发的方法（中间件）
        packetMiddleware: [],
      }
    },
  };
```

4. 在 **router.js** 中定义路由（之后当客户端调用 socket.emit("clientMsg", "client AddCart");  时，就会触发路由，调用对应的控制器）

```javascript
module.exports = (app) => {
  const {
    router,
    controller,
    config
  } = app
  ...
  app.io.of('/').route('clientMsg', app.io.controller.default.index);
}
```

5. 新建 **io/middleware/connection.js** ，配置中间件(中间件在客户端连接时就会触发)

```javascript
module.exports = app => {
    return async (ctx, next) => {
        console.log("连接成功...")
        ctx.socket.emit('serverMsg', 'connected success');
        await next();
    };
};
```

6. 新建 **`io/controller/default.js`**，创建对应的控制器

```javascript
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    async index() {
        const { ctx, app } = this;
        const message = ctx.args[0];	// 获取 客户端 传递的数据
        console.log("ClientMsg:", message);
        await ctx.socket.emit('serverMsg', `Hi! I've got your message: ${message}`);
    }
}

module.exports = DefaultController;
```

7. 客户端连接 socket.io

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <title>Socket.io客户端1</title>
  <script src="http://a.itying.com/socket.io/socket.io.js"></script>
</head>

<body>
  <h2>客户端111</h2>
  <br>
  <button onclick="send()">发送消息</button>
</body>

<script>
  //1、连接socket.io服务器
  var socket = io.connect("http://127.0.0.1:7001/cart");

  socket.on("serverMsg", function (serverData) {
    console.log(serverData);
  })

  function send() {
    socket.emit("clientMsg", "client AddCart");
  }
</script>

</html>
```

8. 配置 **命名空间** 及 **分组广播**

**`io/middleware/connection.js`**

```javascript
const querystring = require('querystring')
module.exports = app => {
    return async (ctx, next) => {
        console.log('连接成功...')
        ctx.socket.emit('serverMsg', 'connected success');

        // 获取客户端的地址 加入 socket
        let roomId = querystring.parse(ctx.socket.request.url.split('?')[1]).roomId
        ctx.socket.join(roomId)		// 分组

        await next();
    };
};
```

**`io/controller/default.js`**

```javascript
'use strict';

const Controller = require('egg').Controller;
const querystring = require('querystring')

class DefaultController extends Controller {
    async index() {
        const { ctx, app } = this;
        const message = ctx.args[0];

        // await ctx.socket.emit('serverMsg', `Hi! I've got your message: ${message}`);

        // await app.io.of('/cart').emit('serverMsg', `Hi! I've got your message: ${message}`)

        let roomId = querystring.parse(ctx.socket.request.url.split('?')[1]).roomId
        // 分组广播
        // app.io.of('/cart').to(roomId).emit('serverMsg', `Hi! I've got your message: ${message}`)
        // 分组广播，不包括自己
        ctx.socket.broadcast.to(roomId).emit('serverMsg', `Hi! I've got your message: ${message}`)
    }
}

module.exports = DefaultController;

```

