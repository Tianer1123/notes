'use strict';

function success(text) {
  var textarea = document.getElementsByTagName('test-response-text');
  textarea = text;
}

function failed(code) {
  var textarea = document.getElementsByTagName('test-response-text');
  textarea.value = 'Error Code: ' + code;
}

var request; // 新建XMLHttpRequest对象
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}
request.onreadystatechange = function() {  // 状态发生变化时，函数被回调
  if (request.readyState === 4) { // 成功完成
    // 判断响应结果:
    if (request.status === 200) {
      // 成功，通过responseText拿到响应的文本:
      return success(request.responseText);
    } else {
      // 失败，根据响应码判断失败原因:
      return failed(request.status);
    }
  } else {
    // HTTP请求还在继续...
  }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...')
