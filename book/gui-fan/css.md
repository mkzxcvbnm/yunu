# css
1. 统一使用UTF-8编码
2. 默认字体 微软雅黑("\5FAE\8F6F\96C5\9ED1") 字体大小14px 行高1.5 颜色#333
3. 书写格式
    对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。
    ```css
    .span1 { width: 60px; }
    /* Bad CSS */
    .selector, .selector_secondary, .selector[type=text] {
        padding:15px;
        margin:0px 0px 15px;
        background-color:rgba(0, 0, 0, 0.5);
        box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
    }

    /* Good CSS */
    .selector,
    .selector_secondary,
    .selector[type="text"] {
        padding: 15px;
        margin-bottom: 15px;
        background-color: rgba(0,0,0,.5);
        box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
    }
    ```
    * 用4个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
    * 为选择器分组时，将单独的选择器单独放在一行。
    * 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
    * 声明块的右花括号应当单独成行。
    * 每条声明语句的 : 后应该插入一个空格。
    * 为了获得更准确的错误报告，每条声明都应该独占一行。
    * 所有声明语句都应当以分号结尾。
    * 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。
    * 不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。
    * 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。
    * 十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。
    * 尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff。
    * 为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。
    * 避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;。
3. 书写顺序 由外到内
    * 位置：position,left,right,float
    * 盒模型属性：display,margin,padding,width,height
    * 边框与背景：border,background
    * 段落与文本：line-height,text-indent,font,color,text-decoration,...
    * 其他属性：overflow,cursor,visibility,...
4. css 需要显示所有值的情况下，应当尽量限制使用简写形式的属性声明。例如padding border
    >大部分情况下，我们不需要为简写形式的属性声明指定所有值。例如，HTML 的 heading 元素只需要设置上、下边距（margin）的值，因此，在必要的时候，只需覆盖这两个值就可以。过度使用简写形式的属性声明会导致代码混乱，并且会对属性值带来不必要的覆盖从而引起意外的副作用。
5. css命名在不冲突的前提下尽可能简洁 并且意义明确 基于最近的父 class 或基本（base） class 作为新 class 的前缀。 多人合作的项目在样式名前面加上自己的命名空间
6. css命名统一小写 多个单词之间用"_"进行连接（"_"符号不可以在首位）
    >"-"在编辑器中可能有无法双击选中的问题 Sublime Text 中可以在 首选项->设置 中的 word_separators 里删除"-"解决
7. css尽可能不用id选择器 除非特殊情况
8. 使用autoprefixer补全浏览器前缀 或者手动补全 并尽量垂直对齐
9. 选择器层数尽可能不要过多 建议不要超过3层 尽量使用类选择器(class)，避免使用通配符选择器（*）​和属性选择器，后代选择器和子选择器也尽量避免
10. 慎用 !important
11. 上下模块之间的间距统一使用下一个模块的margin-top来实现，好处是：如果没有下一个模块也不会多出一段空隙。
12. 列表也尽可能使用margin-top做间距 结合first-child选择器消除第一个子元素的margin-top
13. IE css兼容性手册 [https://msdn.microsoft.com/en-us/library/hh781508%28v=vs.85%29.aspx#element_selectors](https://msdn.microsoft.com/en-us/library/hh781508%28v=vs.85%29.aspx#element_selectors)  
    >因为要兼容IE8 勿使用手册中IE8列中为No的写法 布局使用float 不要用table（层次太多性能不佳）或者flex（无法兼容）进行布局 横向间距尽可能使用margin-left 结合first-child选择器消除第一个子元素的margin-left

# css命名规范
```
header  头部  main  页面主题  footer  尾部  flink  友情链接  copyright  版权

left(l) 左 right(r) 右 top(t) 上 bottom(b) 下 center(c) 中

icon_ 图标类    btn_ 按钮类

index(i)首页类 new_ 新闻模型类前缀 pro_ 产品模型类前缀 pic_ 图片模型类前缀

list 列表  new_list 新闻列表  pro_list  产品列表  pic_list 图片列表

main_l 页面主体左 main_r 页面主体左

i_box1 i_box2 (首页内容容器)

active 当前选中/激活元素

banner 幻灯片 page_banner 内页幻灯片

hover 悬停    selected 挑选   disabled 禁用   focus 得到焦点   blur 失去焦点   checked 勾选   success 成功   error 出错

content 内容   title(tit) 标题   item 项目（条）  cell 单元   img 图片   text 文字  block 块  container 容器(最外层) row 行   col 列    box 容器盒子(内层)

nav 导航   crumbs 面包屑导航  menu 菜单

search 搜索 search_bar 搜索条  search_text 搜索框   search_btn 搜索按钮    search_word 搜索词

login 登录    regsiter 注册   name 用户名    password 密码   nickname 昵称   tel 电话  avatar 头像

hot 热点    download 下载

content 内容    title 标题    description(des) 摘要    time 时间

tags 标签   scroll 滚动

sidebar 侧边栏   column 栏目  msg 提示信息  status 状态  tips 小技巧

popup 弹出层

count 总数/计数   plus 加号/正   minus 减号/负
```