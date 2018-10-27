/*
 *<!-- HTML结构 -->
 *<ol id="test-list">
 *  <li class="lang">Scheme</li>
 *  <li class="lang">JavaScript</li>
 *  <li class="lang">Python</li>
 *  <li class="lang">Ruby</li>
 *  <li class="lang">Haskell</li>
 *</ol>
 * 按字符串顺序重新排序DOM节点：
 * */
'use strict';
var langs = document.getElementById("test-list");
var arr = [];

for (var i = 0; i < langs.children.length; i++) {
    arr.push(langs.children[i]);
}

// ES6:
// list = arr.sort((x, y) => {x.innerText > y.innerText})

list = arr.sort(function(x, y) {
    return x.innerText > y.innerText;
});

for (var i = 0; i < list.length; i++) {
    langs.appendChild(list[i]);
}

// 测试:
;(function () {
    var
        arr, i,
        t = document.getElementById('test-list');
    if (t && t.children && t.children.length === 5) {
        arr = [];
        for (i=0; i<t.children.length; i++) {
            arr.push(t.children[i].innerText);
        }
        if (arr.toString() === ['Haskell', 'JavaScript', 'Python', 'Ruby', 'Scheme'].toString()) {
            console.log('测试通过!');
        }
        else {
            console.log('测试失败: ' + arr.toString());
        }
    }
    else {
        console.log('测试失败!');
    }
})();
