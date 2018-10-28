
# cp3

* `ECMAScript` 数据5个数据类型 `Undefined`, `Null`, `Boolean`, `Number`, `String`.

    **注意:** *String 不是 Object 而是基本类型。*

* `"use strict";` 严格模式.
* `arguments` 访问函数参数.

# cp4

## 作用域

`var`在函数中定义的并不是全局变量。
``` javascript
var color = 'blue';   // 全局变量

function changeColor() {
    var anotherColor = 'red';  // changeColor的局部变量

    function swapColor() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        // color, anotherColor, tempColor
    }
    // color, anotherColor, 无法访问tempColor
}
// clolor 无法访问 anotherColor, tempColor
changeColor();
```

* typeof : 确定一个值是哪种 **基本** 类型。
* instanceof : 确定一个值是哪种 **引用** 类型。
* 执行环境 : **全局** 和 **函数** 之分。

# cp5 引用类型

> 引用类型 ==> 类（JavaScript并没有严格意义的类） ==> 包含属性和方法的对象。

``` javascript
var person = new Object();
```

## Object 类型

**创建 Object**
1. `new` 方法:

    ``` js
    var person = new Object();
    person.name = 'Tom';
    person.age = 30;
    ```

2. **对象字面量** 表示法:

    ``` js
    var person = {
        name = 'Tom',
        age = 30
    };
    ```

## Array 类型

### 创建数组

1. `new` 方法:

    ``` js
    var colors = new Array(3);    // 创建包含3项的数组
    var colors = new Array('red', 'blue', 'green');  // 创建有3个字符串值的数组
    ```

2. **数组字面量** 表示法:

    ``` js
    var colors = ['red', 'blue', 'green'];  //创建有3个字符串值的数组
    var colors = [];  // 空数组
    ```

### 检测数组:

``` js
if (Array.isArray(value)) {
    // 检测是否是数组
}
```

### 数组->字符串:
`array.toString()`, `array.toLocalString()`, `array.valueOf()`, `array.jion()`。

### 栈:
可以实现 `array.push()`, `array.pop()` 的 `LIFO(Last_In_First_Out)`.

### 队列:
`array.shift()` 取出第一项。 `array.unshift('a', 'b')` 在末尾推入 `a` 和 `b` 。

### 重排序:

``` js
value.reverse();  // 倒序
value.sort();  // 不带参数,升序,比较的是字符串toString()方法.
// sort()方法接收一个函数参数 , 以下是升序，如果要降序，判断反转一下。
// + 交换value1, value2的位置。
// - 0 不交换。
function compare(value1, value2) {  // 需要两个参数
    if (value1 < value2) {  // 小的在前面返回 -1
        return -1;
    } else if (value1 > value2) {  // 前大后小返回 1
        return 1;
    } else {  // 相当返回0
        return 0;
    }
}

var value = [1, 5, 4, 8, 6, 10];
value.sort(compare); // 1, 4, 5, 6, 8, 10
```

### 操作:
* `concat()` : 基于当前数组创建一个新数组。

    ``` js
    // 1. 不传参数,只是复制一个数组。
    // 2. 传参数，将参数放到复制的数组后。
    var color = ['red', 'blue', 'green'];
    var color2 = color.concat('yellow', ['black', 'brown']);
    console.log(color2);  // red,blue,green,yellow,black,brown
    ```

* `slice()` : 基于当前一或多个 **项** 创建新数组。

    ``` js
    // slice(start, end); 只有一个参数，是从这个项到末尾项。
    // start 开始的下标
    // end 不包含这个下标项
    var color = ['red', 'blue', 'green', 'yellow', 'black', 'brown'];
    var color2 = color.slice(3);  // yello, black, brown
    var color3 = color.slice(1, 4);  // blue, green, yellow 
    ```

    * 删除: `slice(0, 2)`, 删除前两项。
    * 插入: `slice(2, 0, 'red', 'green')`, 1,起始位置。2,0(要删除的项数)。3,后面是要插入的项。
    * 替换: `slice(2, 1, 'red', 'green')`, 删除位置2的元素，插入 `red`, `green`。

### 位置: 
`indexOf(value, start)`, `lastIndexOf(value, start)`.其中 `start` 可选。

### 迭代:

| 函数 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `every()` | `func(item, index, array)` | **true** or **false** | 每项为 `true` 返回 `true` |
| `filter()` | `func(item, index, array)`| `array` | `func()` 返回 `true` 的项组成的数组 |
| `forEach()` | `func(item, index, array)`| - | - |
| `map()` | `func(item, index, array)`| `array` | 每一项组成的数组 |
| `some()` | `func(item, index, array)`| **true** or **false** | 有一项返回 `true` 就返回 `ture` |

### 归并:

`reduce()` 和 `reduceRight()` (反方向)函数。

``` js
var value = [1, 2, 3, 4, 5];
var sum = reduce(function(prev, cur, index, array) {
  return prev + cur;
});
// sum = 15 , prev = 1, 3(1+2(cur)), 6(3 + 3(cur))...
```

## Date 类型
``` js
var date = new Date() //  Sat Sep 15 2018 16:22:31 GMT+0800 (中国标准时间)
```
**根据特定时间创建日期对象**: `Date.parse()` 和 `Date.UTC()` 。

1. `Date.parse()`格式: 
    * 16/9/2018
    * January 12,2004
    * Tue May 25 2004 00:00:00 GMT-0700
    * 2004-05-25T00:00:00

    ``` js
    var someDate = new Date(Date.parse('9/16/2018'));  // Sun Sep 16 2018 00:00:00 GMT+0800 (中国标准时间)
    ```

2. `Date.UTC()`:
    ``` js
    var y2k = new Date(Date.UTC(2000, 0)); // GMT 2000年1月1日零时
    var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));  // 2005年5月5日x下午5点55分55秒
    ```

3. 获取当前时间 `Date.now()` 时间戳。

**日期格式化**

| 方法 | 说明 |
| --- | --- |
|`toDateString()`|星期几，日，月，年|
|`toTimeString()`|时,分,秒,时区|
|`toLocalDateString()`|特定地区显示星期几，日，月，年|
|`toLocalTimeString()`|特定地区显示时,分,秒,时区|
|`toUTCString()`|UTC时间|

**日期组件**: `getTime()`, `getFullYear()`...

## RegExp 类型

``` js
var expression = / pattern / flag;   // pattern 正则表达式
```
`flags` :
  * **g** : 匹配所有字符串,非第一个匹配到就停止。
  * **i** : 忽略大小写。
  * **m** : 多行模式。

需要转义的 **元字符** : `( [ { \ ^ $ | ) ? * + .]}`.

**正则表达式字面量和构造函数创建区别:**

``` js
var re = null, i;

for (i = 0; i < 10; i++) {
  re = /cat/g;  // 共用一个RegExp实例，第一次找到cat后，第二次从astrophe中查找。
  re.test('catastrophe');
}

for (i = 0; i < 10; i++) {
  re = new RegExp('cat', 'g');  // 每次都会创建一个RegExp实例。
  re.test(('catastrophe');
}
```

### 属性

| 属性 | 类型 | 例子 | 说明 |
|---|---|---|---|
|`golbal`|布尔值|`pattern.global`|是否设置了 `g` |
|`ignoreCase`|布尔值|`pattern.ignoreCase`|是否设置了 `i` |
|`lastIndexOf`|整数|`pattern.lastIndexOf`|下一个匹配项开始位置从0开始|
|`multiline`|布尔值|`pattern.multiline`|是否设置了 `m` |
|`source`|正则表达式字符串表示|`pattern.source`|例如:'\[bc\]at'|

### 方法

* `exec()`: 

    ``` js
      var text = 'mom and dad and baby';
      var pattern = /mom( and dad( and baby)?)?/g;

      var matches = pattern.exec(text);
        // ^
        // | -- 包含 input 和 index 属性
        // 返回值: null 或者第一个匹配信息的数组
        alert(matches.index)  // 0
        alert(matches.input)  // mom and dad and baby
    ```

* `test()`:

    ```js
    var text = '000-00-0000'
    var pattern = /\d{3}-\d{2}-\d{4}/;

    if (pattern.test(text)) {
      alert('The pattern was matched');
    }
    ```

## Function 类型
定义函数两种方式:
``` js
function sum(num1, num2) {
  return num1 + num2;
}

var sum = function(sum1, sum2) {
  return num1 + num2;
};
```
### 函数内部属性:
* `arguments`
* `this`: 函数所在执行环境的对象。
    ```js
    window.color = 'red';
    var o = {color: 'blue'};

    function sayColor() {
      alert(this.color);
    }

    sayColor();  // red
    o.sayColor = sayColor();
    o.sayColor();  // blue
    ```

**牢记: 函数名仅仅是一个包含指针的变量名而已.**

### 属性和方法
* 属性：
  * `length`: `func.length` = `func()` 接收参数的个数.
  * `protopyte`: `protopyte`是保存所有实例方法的真正所在.
* 方法:
  * apply()
      ```js
      function sum(num1, num2) {
        return num1 + num2;
      }

      function callSum1(num1, num2) {
        return sum.apply(this, arguments);
      }

      function callSum2(num1, num2) {
        return sum.apply(this, [sum1, sum2]);
      }

      alert(callSum1(10, 10));  // 20
      alert(callSum2(10, 10));  // 20
      ```
  * call()

      与`apply()`基本类似.
      ```js
      function sum(num1, num2) {
        return num1 + num2;
      }

      function callSum1(num1, num2) {
        return sum.call(this, num1, num2);
      }

      alert(callSum1(10, 10));  // 20
      ```
  * bind()
      ```js
      window.color = 'red';
      var o = {color: 'blue'};

      function sayColor() {
        alert(this.color);
      }
      var objectSayColor = sayColor.bind(o);
      objectSayColor();  // blue
      ```

## 基本包装类型

`Boolean` ,`Number` ,`String` 三种基本类型，按理不应该有方法，基本包装类型是后台实现基本类型带方法。实现流程是:

1. 创建 `String` 类型的一个实例。
2. 在实例上调用指定的方法。
3. 销毁这个实例。

``` js
var s1 = 'some text';
var s2 = s1.substring(2);
// 以上跟一下相等
var s1 = new String('some text');
var s2 = s1.substring(2);
s1 = null;  // 调用完立即销毁
```

### Number类型

* `toString()` : 参数是进制, 例如 `num = 10, num.tostring(2)` , 二进制显示`1010`。
* `toFixed()` : 参数是小数点位数，例如 `num.toFixed(2)`, `10.00`。
* `toExponential()` : `e` 表示法, 例如 `num.toExponential(1)`, `1.0e+1`。
* `toPrecision()` : 传入数字参数，返回合适的格式。
    ```js
    var num = 99;
    alert(num.toPrecision(1));  // 1e+2    1位数
    alert(num.toPrecision(2));  // 99      2位数
    alert(num.toPrecision(3));  // 99.0    3位数
    ```

### String类型

**属性和方法:**

0. 属性: `str.length` 字符串长度。
1. 字符方法: `str.charAt()`, `str.charCodeAt()`, `str[1]`。
2. 字符串操作方法: `str.concat()` (拼接字符串)， `str.slice()`, `str.substring()`, `str.substr()`。
3. 字符串位置方法: `str.indexof('o')`, `str.lastIndexOf('o')`。
4. trim方法: `str.trim()`。
5. 大小写转换方法: `toLowerCase()`, `toLocaleLowerCase()`, `toUpperCase()`, `toLocaleUpperCase()`。
6. 字符串模式匹配方法: `str.match(pattern)` (与 `pattern.exec(str)` 相同), `str.search(pattern)`, `str.replace('str1', 'str2')`, `str.replace('pattern', 'str2')`, `str.split()`。
7. localCompare()方法: `str.localCompare('str2')`。
8. fromCharCode()方法: `str.fromCharCode()`。参数是字符编码。
9. HTML方法: 尽量不要使用。

```js
// 0. 属性
var stringValue = 'Hello World';
alert(stringValue.length);  // 11

// 1. 字符方法
var stringValue = 'Hello World';
alert(stringValue.charAt(1));  // e
alert(stringValue.charCodeAt(1));  // 101 
alert(stringValue[1]);  // e

// 2. 字符串操作方法
var stringValue = 'Hello ';
var result = stringValue.concat('World');
alert(result);  // Hello World
var result = stringValue.concat('World', '!');
alert(result);  // Hello World!

var stringValue = 'Hello World';
alert(stringValue.slice(3));  // lo World
alert(stringValue.substring(3));  // lo World
alert(stringValue.substr(3));  // lo World
alert(stringValue.slice(3, 7));  // lo W       start, end
alert(stringValue.substring(3, 7));  // lo W   start, end
alert(stringValue.substr(3, 7));  // lo Worl   start, len

// 3. 字符位置方法
var stringValue = 'Hello World';
alert(stringValue.indexOf('o'));  // 4  前->后搜索
alert(stringValue.lastIndexOf('o'));  // 7  后->前搜索

alert(stringValue.indexOf('o', 6));  // 7  第二个参数,从什么位置开始
alert(stringValue.lastIndexOf('o', 6));  // 4 同上

// 4. trime()方法
var stringValue = '    Hello World    ';
var trimmedStringValue = stringValue.trim();
alert(stringValue);          // '    Hello World    '
alert(trimmedStringValue);   // 'Hello World'

// 5. 字符串大小写转换
var stringValue = 'hello world';
alert(stringValue.toLocaleUpperCase());  // HELLO WORLD
alert(stringValue.toUpperCase());  // HELLO WORLD
alert(stringValue.toLocaleLowerCase());  // hello world
alert(stringValue.toLowerCase());  // hello world

// 6. 字符串模式匹配
var text = 'cat, bat, sat, fat';
var pattern = /.at/;

// 与pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index);  // 0
alert(matches[0]);     // cat
alert(match.lastIndex); // 0

var pos = text.search(/at/); // 找不到返回-1
alert(pos);  // 1

var result = text.replace('at', 'ond');
alert(result);  // cond, bat, sat, fat
result = text.replace(/at/g, 'ond');
alert(result);  // cond, bond, sond, fond

result = text.replace(/(.at)/g, 'word ($1)');
alert(result);  // word (cat), word (bat), word (sat), word (fat)

var colorText = 'red, blue, green, yellow';
var color1 = colorText.split(',');  // ['red', 'blue', 'green', 'yellow']
var color2 = colorText.split(',', 2); // ['red', 'blue']
var color3 = colorText.split(/[^\,]+/); // ['', '', '', '']

// 7. localCompare()方法
var stringValue = 'yellow';
alert(stringValue.localCompare('brick'));  // 1
alert(stringValue.localCompare('yellow'));  // 0
alert(stringValue.localCompare('zoo'));  // -1

// 8. fromCharCode()方法
alert(String.fromCharCode(104, 101, 108, 108, 111)); // 'hello'
```

## 单位内置对象
### Golbal对象
#### URI编码方法
`encodeURI()`, `encodeRUIComponent()`, `decodeURI()`, `decodeURIComponent()`。
#### eval()方法
`eval(command)`。
```js
eval('alert('hello')');
```
#### golbal对象属性

![golbal_attribute](https://github.com/Tianer1123/notes/blob/master/learnJS/pic/golbal_attribute.png)

#### window对象
``` js
var color = 'red';

function sayColor() {
  alert(window.color);
}

window.sayColor();  // 'red'
```
### Math对象
#### 属性

![math_attribute](https://github.com/Tianer1123/notes/blob/master/learnJS/pic/math_attribute.png)

#### Min(), Max()方法

```js
var max = Math.max(10, 11, 3, 98);
alert(max);  // 98
var min = Math.min(10, 11, 3, 98);
alert(min);  // 3
```

#### 舍入方法

* `Math.ceil()`: 向上舍入
* `Math.floor()`: 向下舍入
* `Math.round()`: 标准舍入

#### random()方法
`Math.random()` 返回大于0小于1的数。
``` js
// 值 = Math.floor(Math.random() * 值总数 + 第一个数)
// 1 - 10
var value = Math.floor(Math.random() * 10 + 1)
```
#### 其他方法

![math_func](https://github.com/Tianer1123/notes/blob/master/learnJS/pic/math_func.png)

# cp6 面向对象程序设计
## 6.1 理解对象
### 6.1.1 属性类型
**"数据属性"**, **"访问器属性"**。
1. 数据属性:
    * `[[Configurable]]` : 可配置属性，默认为*True*。
    * `[[Enumerable]]` : 可否 `for-in` 循环返回属性, 默认为*True*。
    * `[[Writable]]` : 可否修改属性值, 默认为*True*。
    * `[[Value]]` : 数据值。默认为*undefined*。


    ``` js
    var person = {}
    object.defineproperty(person, 'name', {
      writable: false,
      value: 'Nicholas'
    });
    alert(person.name); // Nicholas
    // name属性是不可修改的。
    person.name = 'Greg';
    alert(person.name); // Nicholas
    
    // 如果属性被设置为不可配置，就不能改为可配置了。
    ```
2. 访问器属性:
    * `[[Configurable]]` : 可配置属性，默认为*True*。
    * `[[Enumerable]]` : 可否 `for-in` 循环返回属性, 默认为*True*。
    * `[[Get]]` : 读取时调用的函数，默认为*undefined*。
    * `[[Set]]` : 写入时调用的函数。默认为*undefined*。


    ``` js
    var book = {
      _year: 2004,
      edition: 1
    };

    Object.defineProperty(book, 'year', {
      get: function() {
        return this._year;
      },
      set: function(newValue) {
        if (newValue > 2004) {
          this._year = newValue;
          this.edition: += newValue - 2004;
        }
      }
    };

    book.year = 2005;
    alert(book.edition);   // 2
    ```
### 6.1.2 定义多个属性
### 6.1.3 读取属性特性
## 6.2 创建对象
## 6.3 继承
# cp7 函数表达式
# cp8 BOM
# cp9 客户端检测
# cp10 DOM
# cp11 DOM扩展
# cp12 DOM2和DOM3
# cp13 事件
# cp14 表单脚本
# cp15 Canvas绘图
# cp16 HTML5脚本编程
# cp17 错误处理和调试
# cp18 JavaScript和XML
# cp19 E4X
# cp20 JSON
# cp21 Ajax和Comet
# cp22 高级技巧
# cp23 离线应用和客户端存储
# cp24 最佳实践
# cp25 新兴API

