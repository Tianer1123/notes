
> Vim 的设计哲学是：如果用户曾经为某件事物写过一次，那就不需要再写第二次。

# cp2. 定制Vim

## 2.2 设置字体

`Linux` 中设置字体:

``` vim
set guifont=Courier\ 14
```

`Windows` 中设置字体:

``` vim
set guifont=Courier:14
```

如果不确定字体是否存在，可以设置多个字体，用 `,` 分割。

``` vim
set guifont=Courier\ New\ 12,Arial\ 10
```

## 2.3 设置配色方案

``` vim
:colorscheme 'schemename'
```

### 2.3.1 个性化高亮

与高亮相关的技术 **匹配** ( `matching` )。

``` vim
:match group / pattern /
```

* `group` : 彩色组名字。
* `/pattern/` : 模式。

例子:

``` vim
:match ErrorMsg /^Error/
```

自定义彩色组:
``` vim
:highlight MyGroup ctermbg=red guibg=red gctermfg=yellow guifg=yellow term=bold
```

|命令|说明|
|---|---|
|ctermbg|控制台环境下的背景色|
|guibg|Gvim环境下的背景色|
|ctermfg|控制台环境下的文本颜色|
|guifg|Gvim下文本颜色|
|gui|Gvim下字体格式|
|term|控制台下字体格式|

**示例1：** 用彩色标记某列后面的文字
``` vim
:match ErrorMsg /\%>73v.\+/
```
* `\%>` : 匹配该列之后的内容，列号要紧跟在尖括号右边。
* `73` : 列号。
* `v` : 只能工作在可见的列上面。
* `.\+` : 匹配一个或多个任意的字符。

**示例2：** 标记代码中未被用作缩进的制表符
``` vim
:match ErrorMsg /[^\t]\zs\t\+/
```
* `[^` : 字符组的开始标记，组中的字符将不会被匹配到。
* `\t` : 制表符。
* `]` : 字符组的结束标记。
* `\zs` : 一个宽度为0的匹配，它把'匹配'置于一行的开始，并忽略任意的空格。
* `\t\+` : 匹配一个或多个制表符。

**示例3：** 检查IP地址的有效性
``` vim
:match errorMsg /\(2[5][6-9]\|2[6-9][0-9]\|[3-9][0-9][0-9]\)[.]
                \[0-9]\{1,3\}[.][0-9]\{1,3\}[.][0-9]\{1,3\}\|
                \[0-9]\{1,3\}[.]\(2[5][6-9]\|2[6-9][0-9]\|\
                \\ \[3-9][0-9][0-9]\)[.][0-9]\{1,3\}[.][0-9]
                \\{1,3\}\|\[0-9]\{1,3\}[.][0-9]\{1,3\}[.]\(2[5]
                \\ \[6-9]\|\2[6-9][0-9]|[3-9][0-9][0-9]\)[.][0-9]\{1,3\}
                \\|[0-9]\{1,3\}[.][0-9]\{1,3\}[.][0-9]\{1,3\}[.]
                \\(2[5][6-9]\|2[6-9][0-9]\|\[3-9][0-9][0-9]\)/
```

## 2.4 状态行

格式:
``` vim
:set statusline format " format 表示一个格式字符串 :help statusline
```

## 2.5 切换菜单与工具条

``` vim
:help 'guioptions'
```

## 2.6 添加自定义菜单与工具栏按钮

### 添加菜单

``` vim
:menu menupath command
```

**例子**
``` vim
:menu Tabs.Next <ESC>:tabnext<cr>
```
添加了一个新的菜单项Tabs，子菜单项Next，点击后执行命令`:tabnext`。

**例子**
``` vim
:amenu Tabs.&Delete :confirm tabclose<cr>
:amenu Tabs.&Alternate :confirm tabn #<cr>
:amenu <slient> Tabs.Next :tabnext<cr>
:amenu <slient>Tabs.&Previous :tabprevious<cr>
```

* `<slient>` : 阻止命令回显。
* `&` : 快捷键。
<kbd>Alt + T + N</kbd> 执行 `tabnext` 命令。

### 添加菜单项图标
``` vim
:amenu icon=/path/to/icon/myicon.png ToolBar.Bufferlist :buffers<cr>
```

## 2.7 修改标签页

**vim**
``` vim
:set tabline tabline-layout
```

**Gvim**
``` vim
:set guitablabel
```

用户要时刻注意标签页是否处于 **活跃状态** 。

例子：只显示缓冲区文件名的前6个字母，而且当前活跃的标签名以红底白字的方式呈现。

``` vim
function! ShortTabLine()
  let ret = ''
  for i in range(tabpagenr('$'))
    " select the color group for highlighting active tab
    if i + 1 == tabpagenr()
      let ret .= '%#errorMsg#'
    else
      let ret .= '%#TabLine#'
    endif

    " find the buffername for the tablabel
    let buflist = tabpagebuflist(i+1)
    let winnr = tabpagewinnr(i+1)
    let buffername = bufname(buflist[winnr - 1])
    let filename = fnamemodify(buffername, ':t')

    " check if there is no name
    if filename == ''
      let filename = 'noname'
    endif
    " only show the first 6 letters of the name and .. if the filename is more than 8 letters long
    if strlen(filename) >= 8
      let ret .= '['. filename[0:5] . '..]'
    else
      let ret .= '[' . filename . ']'
    endif
  endfor

  " after the last tab fill with TabLineFill and reset tab page #
  let ret .= '%#TabLineFill#%T'
  return ret
endfunction
```

在 `vimrc` 中添加函数，并设置一个命令：

``` vim
:set tabline=%!ShortTabLine()
```
命令执行结果如下:

![shortTabLine](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/shortTabLine.png)

在Gvim中实现以上的效果：

``` vim
function! ShortTabLine()
  let bufnrlist = tabpagebuflist(v:lnum)
  " show only the first 6 letters of the name + ..
  let label = bufname(bufnrlist[tabpagewinnr(v:lnum) - 1])
  let filename = fnamemodify(label, ':h')
  " only add .. if string is more than 8 letters
  if strlen(filename) >= 8
    let ret = filename[0:5].'..'
  else
    let ret = filename
  endif
  return ret
endfunction
```

设置 `guitablabel`属性:

``` vim
:set guitablabel=%{shortTabLine()}
```

效果:

![shortTabLineGvim](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/shortTabLineGvim.png)

**给标签栏添加提示信息：**

``` vim
function! InfoGuiTooltip()
  " get window count
  let wincount = tabpagewinnr(tabpagenr(), '$')
  let bufferlist = ''

  " get name of active buffers in windows
  for i in tabpagebuflist()
    let bufferlist .= '[' . fnamemodify(bufname(i), ':t') . ']'
  endfor
  return bufname($) . ' windows: ' . wincount . ' ' . bufferlist ' '
endfunction
```

设置命令：

``` vim
:set guitabtooltip=%!InfoGuiTooltip()
```

显示效果：

![infoGuiTooltip](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/infoGuiTooltip.png)

## 2.8 工作区定制

``` vim
:set cursorline
:set cursorcolumn
:set number
:set numberwidth=[width]
:set spell " 拼写检查
:set spelllang=de " 德语
:set spelllang=en,da,de,it " 设置多种语言
:set spellsuggest=[width] " width 列表最大长度
```

在带波浪线(拼写有错误的单词)下按 <kbd>z=</kbd> ，vim会把提示信息显示出来。

### 2.8.4 添加工具提示

工具提示相关命令：
1. 请用 `balloons` :

    ``` vim
    :set ballooneval
    ```

2. 显示信息之前需要等待的时间，默认600ms：

    ``` vim
    :set balloondelay=400
    ```

3. 设置信息内容：

    ``` vim
    set balloonexpr="textstring"
    ```

鼠标所在位置的相关信息，Vim提供的相关变量：

|变量名|说明|
|---|---|
|v:beval_bufnr|鼠标所在区域的缓冲区个数|
|v:beval_winnr|鼠标所在区域的窗口的个数|
|v:beval_lnum|鼠标所在的行号|
|v:beval_col|鼠标所在的列号|
|v:beval_text|触发提示信息的字符所在的单词|

**示例1：**
基于Vim的帮助系统，编写简单函数，显示所有变量：

``` vim
function! SimpleBalloon()
  return 'Cursor is at line/column: ' . v:beval_lnum . '/' . v:beval_col . ' in file ' . bufname(v:beval_bufnr) .
          \ '. Word under cursor is: "' . v:beval_text . '"'
endfunction
set balloonexpr=SimpleBalloon()
set ballooneval
```

效果：
![simpleBalloon](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/simpleBalloon.png)

**示例2：**

* 拼写错误单词：这个balloons给出候选单词。
* 折叠文本：给出被折叠文本的预览。

打开拼写错误的设置:

``` vim
:set spell
```

函数：

``` vim
function! FoldSpellBalloon()
  let foldStart = foldclosed(v:beval_lnum)
  let foldEnd = foldclosedend(v:beval_lnum)
  let lines = []
  " Detect if we are in fold
  if foldStart < 0
    " Detect if we are on a misspelled word
    let lines = spellsuggest(spellbadword(v:beval_text)[0], 5, 0)
  else
    " we are in a fold
    let numLines = foldEnd - foldStart + 1
    " if we have too many lines in fold, show only the first 14 and the last 14 lines
    if (numLines > 31)
      let lines = getline(foldStart, foldStart + 14)
      let lines += ['-- Snipped ' . (numLines - 30) . ' lines --']
      let lines += getline(foldEnd - 14, foldEnd)
    else
      " less than 30 lines, lets show all of them
      let lines = getline(foldStart, foldEnd)
    endif
  endif

  " return result
  return join(lines, has("balloon_multiline") ? "\n" : " ")
endfunction

set balloonexpr=FoldSpellBalloon()
set ballooneval
```

效果：
![foldSpellBalloon1](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/foldSpellBalloon1.png)
![foldSpellBalloon2](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/foldSpellBalloon2.png)

### 2.8.5 使用缩写(abbreviations)

|模式命令|说明|
|---|---|
|`abbreviate`|创建所有模式中均可用的缩写|
|`iabbrev`|创建插入模式中使用的缩写|
|`cabbrev`|创建命令行使用的缩写|

例子：地址缩写
``` vim
:iabbrev myAddr 32 Lincoln Road, Birminham B27 6PA, United Kingdom
```
当输入 `myAddr` 和 <kbd>空格</kbd> 时，Vim自动将地址补全。

截图:

![iabbreveg1](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/iabbreveg1.gif)

缩写的一些 **有趣** 的用途：
* 纠正常见的拼写错误:
    ``` vim
    :iabbr teh the
    ```
* 编程模板：
    ``` vim
    :iabbr forx for(x = 0; x < 100; x++) {<cr><cr>}
    ```
* 更短的命令：
    ``` vim
    :cabbr csn colorscheme night
    ```

在调用缩写是询问是否需要扩展功能：
``` vim
function! s:AbbrAsk(addr, expansion)
  let answer = confirm("use the abbreviation '" . a:addr . "'?", "&yes\n&No", 1)
  return answer == 1 ? a:expansion : a:addr
endfunction

iabbrev <expr> addr <SID>AbbrAsk('addr', "your full address here")
```

截图:

![iabbrevAddrAsk](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/iabbrevAddrAsk.png)

### 2.8.6 修改按键绑定

使用 `inoremap`, `vnoremap`, `cnoremap`。

# cp3 快速导航

## 3.1 在文件内快速导航

* 普通文本中移动
    * 在普通模式下按 <kbd>{</kbd> 移动到段首。 <kbd>}</kbd> 把光标移动到段落末尾。
    * Vim可以记住最近999个被修改的地方。按 <kbd>g,</kbd> 可以遍历之前修改过的地方。反向遍历是 <kbd>g;</kbd> 。
    * 句子的开头和末尾：<kbd>(</kbd> 句子的开头。<kbd>)</kbd> 句子的末尾。
* 在代码中移动
    * <kbd>%</kbd> 在括号间跳转。
    * <kbd>[[</kbd> 与 <kbd>][</kbd> : 向后/向前移动到下一节的开头（比如函数的开头）
    * <kbd>[]</kbd> 与 <kbd>]]</kbd> : 向后/向前移动到下一节的结束（比如函数的末尾）
    * <kbd>[{</kbd> : 跳转到块的开始
    * <kbd>]}</kbd> : 跳转到快的结束
    * <kbd>[/</kbd> : 跳转到注释块的开始
    * <kbd>]/</kbd> : 跳转到注释块的结束
    * <kbd>gd</kbd> : 跳转到变量的声明位置
    * <kbd>gD</kbd> : 查找变量的全局定义
* 长行内导航
    * <kbd>gj</kbd>: 在 **视觉上** 的行向 **下** 移动，非实际行。
    * <kbd>gk</kbd>: 在 **视觉上** 的行向 **上** 移动，非实际行。

## 3.2 在Vim帮助中快速导航

光标移动到任何一个连接按 <kbd>control + ]</kbd> 跳转到目标地址。 <kbd>control + t</kbd> 返回到跳转前的位置。

## 3.3 在多个缓冲区中更快的导航

打开缓冲区列表
``` vim
:buffers
```

跳转到某个缓冲区
``` vim
:buffers n
```
`n` 表示缓冲区号。

* `:bnext` : 下一个缓冲区
* `:bprevious` : 上一个缓冲区

## 3.4 快速打开引用过的文件

<kbd>gf</kbd> 意思为 **"goto file"** 。Vim会在以下几个地方寻找文件：

* Vim 首先在选项 path 中定义的，并且相对于当前打开着的文件的目录中寻找。
* 如果没找到，Vim 就使用函数 `suffixadd`，查看是否可以通过加上一个后缀来搜索文件(比如在文件名后加上 `.c` )。
* 如果还没有找到，使用表达式 `includeexpr`，把文件名更换成更像文件名的形式(例如，把 `java.com.http` 转换成 `java/com/http.java`)

## 3.5 搜索即可得到

### 3.5.1 在当前文件内搜索

命令模式Ex命令搜索:
``` vim
" 向前搜索
/someWord
" 向后搜索
?someWord
```

搜索光标下的单词:
按 <kbd>*</kbd> 或者 <kbd>#</kbd> 键。搜索下一个按 <kbd>n</kbd> 键，反向按 <kbd>N</kbd>。

搜索包含光标下单词的单词：
按 <kbd>g*</kbd> 或者 <kbd>g#</kbd> 。

### 3.5.2 在多个文件内搜索

命令格式：
``` vim
:vimgrep /pattern/[j][g] file file2... fileN
```

* `j` : 结果显示到 `quickfix` 中。
* `g` : 调到第一个匹配。剩下的结果添加到 `quickfix` 列表。

### 3.5.3 搜索帮助系统

命令格式：
``` vim
:helpgrep pattern [@LANG]
```
例如：
``` vim
:helpgrep completion@en
```

`helpgrep` 遍历的是taglist而不是所有文档。生成tag的命令：
``` vim
:helptags /path/to/documentation
```

## 3.6 标记位置

### 3.6.1 可见标记

1. 定义想用的符号

    ``` vim
    :sign define name arguments
    ```

    `arguments` 可以是下面几种之一：
    * `linehl` : 用于标记行的色彩组
    * `text` : 该文本将作为符号，显示在控制台Vim中，每一个符号最多可以用两个字符。
    * `texthl` : 用于标记符号文本的色彩组。
    * `icon` : 图标的完整路径，该图标可用在Gvim的符号中。图片要足够 **小**，小到能够放到两个字符的空间中。最好是.xpm格式。

    一个例子:
    ``` vim
    :sign define information text=!> linehl=Warning texthl=Error icon=/path/to/information.xpm
    ```

2. 把符号放到文件中的某个位置

    ``` vim
    :exe ":sign place 123 line=" . line(.) . "name=information file=" . expand("%:p")
    ```

    123代表的是符号的ID，可以用其他数字替代。

    映射符号到快捷键上：

    ``` vim
    :map <F7> :exe ":sign place 123 line=" . line(".") . "name=information file=" . expand("%:p")<CR>
    ```

    截图：

    ![signInformation](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/signInformation.png)

3. 移除符号

    ``` vim
    " 移除所有符号
    :sign unplace ID
    " 移除指定符号
    :sign unplace ID file=name
    " 移除指定缓冲区
    :sign unplace ID buffer=bufferno
    " 移除当前行的符号
    :sign unplace
    ```

4. 跳转到符号

    ``` vim
    :sign jump ID file=file [buffer=bufferno]
    ```

### 3.6.2 隐藏的标记

举个例子：

在光标停留时按 <kbd>m</kbd> + <kbd>a</kbd> 。当光标移动到其他位置，想跳回到标记的`a` 的位置，按 <kbd>\`</kbd> + <kbd>a</kbd>。

`:marks` 获取所有的完整的正在使用的标记列表。

删除标记：

``` vim
:delmarks markid makrid ... markid
" 例子
:delmarks a b c
```

# cp4 助推器

## 4.1 模板

### 4.1.1 模板文件

以 `HTML` 为例，在VIMHOME目录下创建一个目录templates/，加载时在 `vimrc` 添加如下命令：
``` vim
:autocmd BufNewFile * silent! 0r $HOME/.vim/templates/%:e.tpl
```

在模板中添加占位符 `<+CONTENT+>` 。在 `vimrc` 中添加跳转映射：
``` vim
nnoremap <c-j> /<+.\{-1,}+><cr>c/+>/e<cr>
inoremap <c-j> <ESC>/<+.\{-1,}+><cr>c/+>/e<cr>
```

截图：

![fileTemplates](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/fileTemplates.gif)

### 4.1.2 把缩写作为模板

第二章的时候介绍了缩写，格式大概是如下：
``` vim
:iabbrev match replace-string
```

在插入模式下，一个C语言的常见的例子：
``` vim
:iabbrev <buffer> for( for(x = 0; x < var; x++) {<cr><cr>}
```

当在c文件中输入 `for(` 时，会自动转换为如下的代码：
``` c
for(x = 0; x < var; x++) {

}
```

比较灵活的做法是使用占位符，使用 <kbd>Ctrl + j</kbd> 跳转到下一个占位符(跳转点) `<+++>`。

**如果有括号自动补全，需要考虑先去掉自动补全，否则显示结果不尽如人意：**
``` vim
iabbrev for( for(!cursor!; <+++>; <+++>) {<cr><+++><cr>}<Esc> :call search('!cursor!', 'b')<cr>cf!:
```

同一个类似的缩写，不同的编程语言，表现方式不太一样，可以让Vim根据不同的文件类型，加载适当的缩写：
``` vim
function! LoadTemplate(extension)
  silent! :execute '0r $HOME/.vim/templates/' . a:expansion . '.tpl'
  silent! :execute 'source $HOME/.vim/templates/' . a:expansion . '.patterns.tpl'
endfunction

" 调用如下命令
autocmd BufNewFile * silent! call LoadTemplate('%:e')
```

### 4.1.3 snipMate脚本
这是一个插件，下载地址是:

[github.com/msanders/snipmate.vim](https://github.com/msanders/snipmate.vim)

[www.vim.org/scripts/script.php?script_id=2540](https://www.vim.org/scripts/script.php?script_id=2540)

## 4.2 TagList

可以使用 `ctags` ，支持大概 25 种语言 。 `cscope` 也是一个不错的替代方案。

启动Vim，告诉它tags文件，来启用tags文件：
``` vim
set tags=/path/to/tags
```

`:help tags` 查看更多有关tags的帮助。

## 4.3 自动补全

### 4.3.1 已知单词的自动补全

<kbd>Ctrl + n</kbd> ，向前搜索匹配的单词。<kbd>Ctrl + p</kbd> 向后搜索匹配的单词。

例如Vim输入下面的句子："I hava beautiful flowers in my f"，这时用户输入 <kbd>Ctrl + n</kbd> 或 <kbd>Ctrl + p</kbd>会将 f 补全为 flowers ，此时把 s 删掉即可。

### 4.3.2 使用字典自动补全

使用字典的命令：
``` vim
set dictionary+=/path/to/dictionary/file/with/words
```

在 **插入模式** 下，输入 <kbd>Ctrl + x + k</kbd> 就会显示字典内容。如下截图：

![dictCompletion](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/dictCompletion.gif)

按 <kbd>Ctrl + x</kbd> 进入补全模式，再按下 <kbd>Ctrl + k</kbd> 会在字典中查找关键词（k 指 keyword)

其他补全类型：

<kbd>Ctrl + x</kbd> 后面跟:

* <kbd>Ctrl + l</kbd> : 补全 **一整行** 文本
* <kbd>Ctrl + n</kbd> : 从 **当前缓冲区** 补全单词
* <kbd>Ctrl + k</kbd> : 从 **字典** 中补全
* <kbd>Ctrl + t</kbd> : 从 **从同义词典** 中补全单词（:h 'thesaurus'）
* <kbd>Ctrl + i</kbd> : 从 **当前文件与被包含** 的文件中补全单词
* <kbd>S</kbd> : 拼写建议

### 4.3.3 Ominicompletion

按 <kbd>Ctrl + x + o</kbd> 来使用 Ominicompletion。

**每个缓冲区都需要设置一次，否则不起作用**

添加用户自定义的补全函数，执行：
``` vim
" 只在当前缓冲区有效，通常在文件类型的插件中完成。
set omnifunc=MyCompleteFunction
```

举个完整的补全的例子：假设用户有一个通讯录文件，文件内容是人名及其邮件地址，就像：

Kim Schulz|kim@schulz.dk

John Doe|john.doe@somedomain.com

Jane Dame|jd@somedomain2.com

Johannes Burg|jobu@somedomain3.com

Kimberly B. Schwartz|kbs@somedomain.com

用户想写完一个人名后，补全对应的地址，完成这个功能的函数是：
``` vim
function! CompleteEmails(findstart, base)
  if a:findstart
    " local the start of the word
    let line = getline('.')
    let start = col('.') - 1
    " \a 字母字符
    while start > 0 && line[start - 1] =~ '\a'
      let start -= 1
    endwhile
    return start
  else
    " find contact names matching with a:base"
    let res = []
    " We read contactlist file and sort the result
    for m in sort(readfile($HOME . '/.vim/dictionary/contacts.txt'))
      if m =~ '^' . a:base
        let contactinfo = split(m, '|')
        
        " show names in list, but insert email address
        call add(res, {'word': contactinfo[1],
              \ 'abbr': contactinfo[0] . ' <' . contactinfo[1] . '>',
              \ 'icase': 1})
      endif
    endfor
    return res
endfunction
```

截图：

![completeEmails](https://github.com/Tianer1123/notes/blob/master/hackingVim/pic/completeEmails.gif)


在返回值构成的字典中，几个关键词有特别的意思：

* `word` : 实际要插入的值。
* `abbr` : 在弹出列表中使用的单词，而非直接使用 `word`。
* `icase` : 如果是非零，则匹配大小写。
* 其他见 `help 'omnifunc'`

### 4.3.4 多合一补全

`help ins-completion` 补全介绍中有一个 `CleverTab()` 的函数，可以将补全快捷键映射到 <kbd>Tab</kbd> 上，使补全更简单。

下面使用 `CleverTab()` 函数实现如下功能：

* Ominicompletion
* 字典补全
* 已知单词补全

代码实现：
``` vim
function! SuperCleverTab()
  " check if at beginning of line or after a space
  if strpart(getline('.'), 0, col('.') - 1) =~ '^\s*$'
    return "\<Tab>"
  else
    " do we have omni completion available
    if &omnifunc != ''
      " use omni-completion 1. priority
      return "\<C-X>\<C-O>"
    elseif &dictionary != ''
      " no omni completion, try dictionary completion
      return "\<C-K>"
    else
      " use omni completion or dictionary completion
      " use known-word completion
      return "\<C-N>"
    endif
  endif
endfunction

" bind function to the tab key
inoremap <Tab> <C-R>=SuperCleverTab()<cr>
```

## 4.4 宏录制

宏录制命令:

* `qa` : 开始录制宏，记录到寄存器 `a` 中，可以使用任意寄存器。
* `q` : 停止录制。
* `@a` : 执行记录在 `a` 中的宏，`[n]@a` 执行 `n` 次。
* `@@` : 执行上一次所执行的宏命令。

## 4.5 会话

Vim 保存的信息有哪些：

* 打开的文件，缓冲区，窗口，标签页
* 历史命令
* 文本的变化点
* 选择与撤销分支
* 窗口，分割与GUI窗口的大小
* 光标的位置


保存的信息可以分为 **三类** ：

* **视图(view)** : 应用到一个单独的窗口上。
* **会话(session)** : 视图集合 + 视图之间配合的信息。
* **其他** : 其他所有归为第三类。

### 4.5.1 简单会话

1. 将会话保存到会话文件：
    ``` vim
    " mksession! 覆盖原有的session
    mksession file
    ```

2. 保存当前视图的命令
    ``` vim
    mkview file
    ```

3. 设置视图目录
    ``` vim
    set viewdir = $HOME/.vim/views
    ```

假设用户当前打开三个窗口，在退出Vim前执行
``` vim
:mksession
```

用户希望用相同的会话启动Vim，此时用如下命令:
``` vim
vim -S Session.vim
```

或者在启动Vim以后 `source` 会话文件
``` vim
:source Session.vim
```

对于视图：
``` vim
:loadView View.vim
```

例子：用户退出Vim时，自动保存会话，打开Vim时，还原会话：
``` vim
autocmd VimEnter * call LoadSession()
autocmd VimLeave * call SaveSession()
function! SaveSession()
  execute 'mksession! $HOME/.vim/sessions/seesion.vim'
endfunction

function! LoadSession()
  if argc() == 0
    execute 'source $HOME/.vim/sessions/session.vim'
  endif
endfunction
```

说明：
* vim file.txt : 这种方式打开文件，不会加载 `session.vim`，因为有参数。
* vim : 这种方式打开文件会加载`session.vim`。

### 4.5.2 满足个人需求的会话

``` vim
set sessionoptions=options
```

查看帮助： `:h sessionoptions`。

### 4.5.3 会话与项目管理

``` vim
:mksession!
```

## 4.6 寄存器与撤销分支

VIM 提供的两个工具：

* 寄存器：寄存器是一种带有多个缓冲区的高级剪贴板，可以用来存放被剪切，删除或复制的文本。
* 撤销分支：撤销分支是Vim版本控制的一种简单形式。利用撤销分支，用户可以把文件回滚到某个特定的时刻，或者回滚一定的次数。

### 4.6.1 寄存器

以 `"` 开头，比如 `"x` ，使用 `x` 寄存器。

使用下面的命令查看所有寄存器：

``` vim
:registers
```

### 4.6.2 撤销分支

**什么是撤销分支？** 用户按 <kbd>u</kbd> 撤销后做了其他修改，此次撤销并没有被Vim丢弃，而是生成一个撤销分支，通过下面的命令可以查看：
``` vim
undolist
" 通过下面的命令在修改列表中后退：
g-
" 前进
g+
```

## 4.7 折叠

折叠文本的方式：

* 手动折叠 (`:help fold-manual`) : 用户手动标记被折叠的范围。
* 缩进折叠 (`:help fold-indent`) : 通过缩进折叠文本。
* 表达式折叠 (`:help fold-expr`) : 根据表达式折叠文本。
* 语法折叠 (`:help fold-syntax`) : 根据语法来折叠文本。
* 差异折叠 (`:help fold-diff`) : 折叠未被修改的文本。
* 标记折叠 (`:help fold-marker`) : 根据文本中插入的标记来折叠文本。

要使用折叠，需要先了解的一些操作：

首先要打开折叠

``` vim
:set foldenable
```

打开和折叠的命令：

* <kbd>zc</kbd> : 关闭一个折叠
* <kbd>zo</kbd> : 打开一个折叠
* <kbd>zM</kbd> : 关闭所有折叠
* <kbd>zR</kbd> : 打开所有折叠

如果想改变折叠后的提示信息，可以通过修改 `foldtext` 来改变提示信息：

``` vim
:set foldtext=MyFlodFunction()
```

`MyFlodFunction` 的实现代码：

``` vim
function! MyFlodFunction()
  let line = getline(v:foldstart)
  " cleanup unwanted things in first line
  let sub = substitute(line, '/\*\|\*/\|^\s+', '', g)
  " calculate lines in folded text
  let lines = v:foladend - v:foldstart - 1
  return v:folddashes.sub . '...' . lines . 'Lines...'.getline(v:foladend)
endfunction
```

折叠后的效果如下:

``` vim
+---function myFunction() {... 6 Lines...}
```

说明一下里面用到的变量的意思：

* `v:foldstart`: 被折叠的第一行的行号
* `v:foldend`: 被折叠的最后一行的行号
* `v:folddashes`: 为每一层折叠包含一个连字符

### 4.7.2 使用 vimdiff 比较差异

``` vim
vimdiff file1 file2
```

## 4.8 打开任意位置的文件

打开远程文件的命令

* FTP
* SCP
* SFTP
* RCP
* HTTP (只读)
* DAV
* rsync (只读)
* fetch (只读)

# cp5 格式化进阶

## 5.1 格式化文本

使用下面命令对长行排版：
``` vim
" help gq 查看详细说明
gqap
```

使用格式化函数，一个格式化函数包括三个变量：

  * `v:num` : 待格式化的第一行行号。
  * `v:count` : 待格式化行数。
  * `v:char` : 被插入的字符，可控。

示例：(在每行开头加上 `>` ，就像引用一样)
``` vim
function! MyFormatter()
  let first = v:num
  let last = v:num + v:count
  while (first <= last)
    call setline(first, '> ' . getline(first))
    let first = first + 1
  endwhile
endfunction
```

### 5.1.2 对齐文本

``` vim
" width 每行最多字符数, range 行范围
[range]center width

" 左对齐
[range]left indent

" 右对齐
[range]right width
```

### 5.1.3 列表

给指定行添加列表函数:

``` vim
" range 告诉vim，函数对一个范围内的行进行操作，而不是一行
function! NumberList() range
  " set line numbers in front of lines
  let beginning = line("'<")
  let ending = line("'>")
  let difsize = ending - beginning + 1
  let pre = ' '
  while (beginning < ending)
    if match(difsize, '^9*$') == 0
      let pre = pre . ' '
    endif
    call setline(ending, pre . difsize . "\t" . getline(ending))
    let ending = ending - 1
    let difsize = difsize - 1;
  endwhile
endfunction
```

结果如下:

1. item
2. item
3. item

## 5.2 格式化代码

格式化用到的Vim中的一些重要选项：

  * `formatoptions`: 特定格式的设置(*:help 'fo'*)。
  * `comments`: 注释，和格式化(*:help 'com'*)。
  * `(no)expandtab`: 空格代替制表符。
  * `softtabstop`: 一个制表符用多少个空格替代。
  * `tabstop`: 一个制表符的宽度。

### 5.2.1 Autoindent

保持和上一行相同的缩进。

### 5.2.2 Smartindent

比 `Autoindent` 稍微智能一些。用户无需修改缩进层次。

### 5.2.3 Cindent

`clever indent` 聪明的缩进。

### 5.2.4 Indentexpr

最灵活的缩进，对表达式求值，并计算一行的缩进。

``` vim
set Indentexpr=Myindent()

function! Myindent()
  " Find previous line and get it's indention
  let pre_lineno = s:prevnonblank(v:lnum)
  let ind = indent(pre_lineno)
  return ind
endfunction
```

### 5.2.5 代码块快速格式化

``` vim
1G=G
```

命令解释：

  * 1G : 跳到第一行
  * = : 根据格式化的配置进行缩进
  * G : 跳到最后一行



## 5.3 使用外部格式化工具

几个有用的外部工具：

  * indent
  * Berkeley Par
  * Tidy

# cp6 Vim脚本基础

# 开发脚本

**变量作用域**

使用不同作用域的例子：
``` vim
" g: 全局作用域
let g:sum = 0
function! SumNumber(num1, num2)
  " l: 函数作用域, a: 函数参数
  let l:sum = a:num1 + a:num2
  " check if previous sum was lower than this
  if g:sum < l:sum
    let g:sum = l:sum
  endif
  return g:sum
endfunction
" test code, this will print 7 (value of l:sum)
echo SumNumber(3, 4)
" this should also print 7 (value of g:sum)
echo g:sum
```

关于 `function` 的定义：
``` vim
function! Name(arg1, arg2, ... argN) keyword
  code-to-execute-when-function-is-called
endfunction
```

`keyword` 告诉Vim该函数的用途，以及如何调用该函数。关键字有：

* `dict`: 告诉Vim该函数绑定到一个字典。
* `range`: 告诉Vim为一个范围内的行调用一次，而不是为每一行调用一次。

# cp7 Vim脚本进阶

## 7.1 脚本结构

### 7.1.1 脚本头部
头部是注释，表明一下信息：

* 脚本维护人员
* 最后一次版本更新
* 发布许可证(最重要的信息)

一个例子：
``` vim
" myscript.vim : Example script to show how a script is structured.
" Version : 1.0.5
" Maintainer : Kim Schulz<kim@schulz.dk>
" Last modified : 01/01/2007
" License : This script is released under the Vim License.
```

### 7.1.2 脚本加载检查
检查脚本是否已经被加载的判断如下：
``` vim
if exists("loaded_myscript")
    finish " stop loading the script
endif
let loaded_myscript = 1
```

某些情况需要重新加载脚本，需要先卸载脚本：
``` vim
if exists("loaded_myscript")
    delfunction MyglobalfunctionB
    delfunction MyglobalfunctionC
endif
let loaded_myscript = 1
```


脚本关于 `vi/vim` 兼容模式安全编程的代码如下：
``` vim
let s:global_cpo = &cpo " store current compatible-mode
                        " in local variable
set cpo&vim             " go to nocompatible-mode

" ... 其他一些脚本

let &cpo = s:global_cpo " 恢复之前的模式
```
### 7.1.3 脚本配置
用户要确保脚本配置的选项，没有被其他用户修改过，只有在没有被修改过的情况下才修改配置。
``` vim
" variable myscript_path
if !exists("myscript_path")
    let s:vimhomepath = split(&runtimepath, ',')
    let s:myscript_path = s:vimhomepath[0] . "/plugin/myscript.vim"
else
    let s:myscript_path = myscript_path
    unlet myscript_path
endif

" variable myscript_ident
if !exists("myscript_ident")
    let s:myscript_ident = 4
else
    let s:myscript_ident = myscript_ident
    unlet myscript_ident
endif
```
### 7.1.4 按键映射
通过按键映射调用函数的写法：
``` vim
if !hasmapto('<Plug>MyscriptMyfunctionA')
    map <unique> <Leader>a <Plug>MyscriptMyfunctionA
endif

noremap <unique> <script> <Plug>MyscriptMyfunctionA <SID>MyfunctionA
noremap <SID>MyfunctionA :call <SID>MyfunctionA()<CR>
```

解释一下里面的一些关键字：
* `hasmapto()` : 检查某个 **函数映射** 是否存在的函数。
* `<unique>` : 如果存在相同的映射则报错。
* `<Leader>` : 用户设置的前导符。
* `<Plug>` : 为一个函数建立一个唯一的全局标识。避免冲突。

下面两个映射：
* 第一条命令是把 `<Plug>MyscriptMyfunctionA` 映射到 `<SID>MyfunctionA` 上。
* 第二条命令是把真正的函数 `<SID>MyfunctionA()` 绑定到 `<SID>MyfunctionA` 上。

### 7.1.5 函数
脚本很重要的部分：
``` vim
" this is our local function with a mapping
function s:MyfunctionA()
    echo "this is the script-scope function MyfunctionA speaking"
endfunction
" this is a global function which can be called by anyone
function MyglobalfunctionB()
    echo "Hello from the global-scope function myglobalfunctionB"
endfunction
" this is another global function which can be called by anyone
function MyglobalfunctionC()
    echo "Hello from MyglobalfuncionC() now calling locally:"
    call <SID>MyfunctionA()
endfunction
```

第一个函数是一个局部函数，其他两个函数是全局函数，全局函数可以调用本脚本内部的局部函数。

### 7.1.6 一个完整的脚本

``` vim
" myscript.vim - Example script to show how a script is structured.
" Version : 1.0.5
" Maintainer : Kim Schulz<kim@schulz.dk>
" Last modified : 01/01/2007
" License : This script is released under the Vim License.
" check if script is already loaded
if exists("loaded_myscript")
    finish "stop loading the script
endif
let loaded_myscript=1

let s:global_cpo = &cpo "store compatible-mode in local variable
set cpo&vim " go into nocompatible-mode

" ######## CONFIGURATION ########
" variable myscript_path
if !exists("myscript_path")
    let s:vimhomepath = split(&runtimepath,',')
    let s:myscript_path = s:vimhomepath[0]."/plugin/myscript.vim"
else
    let s:myscript_path = myscript_path
    unlet myscript_path
endif

" variable myscript_indent
if !exists("myscript_indent")
    let s:myscript_indent = 4
else
    let s:myscript_indent = myscript_indent
    unlet myscript_indent
endif

" ######## FUNCTIONS #########
" this is our local function with a mapping
function s:MyfunctionA()
    echo "This is the script-scope function MyfunctionA speaking"
endfunction

" this is a global function which can be called by anyone
function MyglobalfunctionB()
    echo "Hello from the global-scope function myglobalfunctionB"
endfunction

" this is another global function which can be called by anyone
function MyglobalfunctionC()
    echo "Hello from MyglobalfuncionC() now calling locally:"
    call <SID>MyfunctionA()
endfunction

" return to the users own compatible-mode setting
let &cpo = s:global_cpo
```

## 7.2 Vim 脚本开发技术
### 7.2.1 Gvim或Vim
判断当前vim是Gvim还是Vim
``` vim
if has("gui_running")
    " 设置Gvim的一些配置
endif
```

### 7.2.2 操作系统类型
区分系统的脚本：
``` vim
if has("win16") || has("win32") || has("win64") || has("win95")
" do windows things here
elseif has("unix")
" do linux/unix things here
endif
```
### 7.2.3 Vim的版本
判断版本号：
``` vim
if v:version >= 702 || v:version == 701 && has("patch123")
" code here is only for version 7.1 with patch 123
" and version 7.2 and above
endif
```

## 7.3 调试Vim脚本

不确定错误发生在什么地方，以调试的方式直接启动Vim:
``` vim
vim -D somefile.txt
```

已经知道错误发生在哪个函数中，调试某个函数：
``` vim
:debug call Myfunction
:debug read somefile.txt
:debug nmap ,a :call Myfunction()<CR>
:debug help :debug
```


## 7.4 发布Vim脚本

创建 `Vimball` 参考 `help :MkVimball` 。

## 7.5 文档

生成帮助文档 tag 的命令是 `:helptags docdir`

格式可以参考其他文档。

## 7.6 使用外部解释器

可以查文档学习。

### 7.6.1 Perl
`:help perl`
### 7.6.2 Python
`:help python`
### 7.6.3 Ruby
`:help ruby`

---

**结束： 没有那个教程比Vim的帮助文档更详细，所以要学会使用Vim的帮助系统。可以通过命令 `:help help` 来查看如何使用Vim的帮助系统。**

