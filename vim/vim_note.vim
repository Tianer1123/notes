" =============================================================
" vim 面向对象编程
" =============================================================
"
" vimscript 没有真正的面向对象，但是可以通过字典模拟面向对象
"
" 例如:

let transdict = {}
function! transdict.translate(line) dict
  return join(map(split(a:line), 'get(self.words, v:val, "???")'))
endfunction

" dict : 函数后面跟 dict 表示这个函数属于摸个字典。
" transdict: 是一个空字典。
" self.words: 没有实例化成为抽象类。
"
" 实例化对象中文翻译器
let uk2cn = copy(transdict)
let uk2cn.words = {'one': '一', 'two': '二', 'three': '三'}
echo uk2cn.translate('one two five')

" 实例化对象德语翻译器
let uk2de = copy(transdict)
let uk2de.words = {'one': 'eins', 'two': 'zwei', 'three': 'drei'}
echo uk2de.translate('three one')

let uk2uk = copy(transdict)
function! uk2uk.translate(line) dict
  return a:line
endfunction

if $LANG =~? 'cn'
  let trans = uk2cn
elseif $LANG =~? 'de'
  let trans = uk2de
else
  let trans = uk2uk
endif
echo trans.translate('one two three')

