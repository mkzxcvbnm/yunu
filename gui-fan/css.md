# html
1. 初始文档
``` 
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">//手机版加入此行代码
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>首页</title>
</head>
<body>
    <div class="header"></div>
    <div class="main"></div>
    <div class="footer"></div>
</body>
</html>
``` 
    1. 使用4个空格作为缩进 同层次标签和成对的开始结束标签应该垂直对齐
    2. 标签的属性间隔使用单个空格不要使用多余的空格 头尾不需要加空格 例如<meta name="">
    3. 属性的定义统一使用双引号""
    4. 自闭合元素尾部不用添加"/" 例如<br> 和<meta name="">
    5. 闭合标签必须包含结束标签 例如</div> </li>
    6. 自定义属性使用'data_'作为开头 例如 <div data_toggle="modal"></div>
    7. HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。
        class
        id, name
        data_*
        src, for, type, href, value
        title, alt
        role, aria_*
    <a class="..." id="..." data_toggle="modal" href="#">Example link</a>
    <input class="form_control" type="text">
    <img src="..." alt="...">
    class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。


2. 图片添加alt属性
<img src="" alt="">

3. 特殊符号 使用字符实体 http://www.w3school.com.cn/tags/html_ref_entities.html

4. 非特殊情况css在head标签之前引入提高页面渲染速度

5. 非特殊情况 工具型js(用来定义方法 例如jquery lodash 在head标签之前引入 方便页面内部使用)