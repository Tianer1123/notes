/**
 * <!-- HTML结构 -->
 * <ul id="test-list">
 *   <li>JavaScript</li>
 *   <li>Swift</li>
 *   <li>HTML</li>
 *   <li>ANSI C</li>
 *   <li>CSS</li>
 *   <li>DirectX</li>
 * </ul>
 * 把与Web开发技术不相关的节点删掉：
 */
'use strict';
var pul = document.getElementById('test-list');
var list_count = pul.children.length;

// children会实时更新，在使用children时要注意这个问题。
for (let i = 0; i < list_count; i++) {
    lang = pul.children[i].innerText;
    if (lang === 'Swift' || lang === 'ANSI C' || lang === 'DirectX') {
        // 删除一个节点后，pul.children.length会少1。
        pul.removeChild(pul.children[i]);
        list_count--;
    }
}

// 测试:
;(function () {
    var
        arr, i,
        t = document.getElementById('test-list');
    if (t && t.children && t.children.length === 3) {
        arr = [];
        for (i = 0; i < t.children.length; i ++) {
            arr.push(t.children[i].innerText);
        }
        if (arr.toString() === ['JavaScript', 'HTML', 'CSS'].toString()) {
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
