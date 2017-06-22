# yunu 前端自动化工作流1.1.0

## 安装

1. 安装node.js  [地址](https://nodejs.org/en/)
2. 使用npm安装工作环境
   * 方法一：运行cmd =&gt; 进入当前文件夹 =&gt; 输入以下命令 
   ```
   npn i 
   ```
   * 方法二：双击文件夹内 安装.bat  
     >**!注意：npm服务器在国外 国内安装插件有可能很慢 建议使用cnpm\(淘宝npm镜像\)进行安装** [使用方法](https://cnpmjs.org/)  
     
     >**!注意：安装完毕之后gulp只是局部安装 无法使用gulp命令 还需要手动安装全局gulp**  
     
     安装方法：在cmd中输入 
     ```
     npm i -g gulp
 
     ```
3. 运行程序  
    npm安装完毕后点击 开发环境.bat 或者 生产环境.bat 启动程序  
    >**!注意：如果提示找不到'gulp-sass'模块 请使用cnpm 单独安装**
    
    ```
    npm i -D gulp-sass
    ```
4. 本工具现有主要功能  
    >**!注意：以下功能只对src/sourcen/css和src/sourcen/js目录下的文件生效**
    
   * 可以使用未来的css功能\(css4\) 具体支持详见[http://cssnext.io/](http://cssnext.io/)
   * ~~允许使用类似sass插件的部分功能\(如变量，嵌套和混合\) 具体支持详见~~[~~https://github.com/~~](https://github.com/jonathantneal/precss) //由于功能不足被其他工具取代
   * 使用autoprefixer插件 浏览器前缀自动补全
   * 在生产环境中使用cssnano对css进行压缩  具体支持详见[http://cssnano.co/](http://cssnano.co/)
   * 提供sourcemaps方便代码调试
   * 使用babel对js进行编译 允许使用最新js特性  具体支持详见[http://babeljs.io/](http://babeljs.io/)
   * 在生产环境中使用uglify对js进行压缩
   * 使用browser-sync方便浏览器同步调试 具体支持详见[https://browsersync.io/](https://browsersync.io/) 中文介绍[http://www.browsersync.cn/](http://www.browsersync.cn/)
   * 使用scss作为css的预处理工具 具体支持详见[http://www.sass-zh.com/docs.html](http://www.sass-zh.com/docs.html)

## 目录结构

```
┌── node_modules                # node模块(开发环境)
│
├── package.json                # 项目配置
│
├── gulpfile.js                 # gulp插件配置文件
│
├── .gitignore                  # 忽略无需git控制的文件  比如 node_modules
│
├── book                        # 文档目录
│
└── src                         # 项目目录
    │
    ├── css                     # 样式文件
    │
    ├── img                     # 图片资源
    │
    ├── js                      # 脚本代码
    │
    ├── source                  # css与js源代码
    │   │
    │   ├── css                 # css源代码
    │   │   │
    │   │   └── components      # css模块
    │   │
    │   └── js                  # js源代码
    │
    ├── grid.html               # 栅格布局例子
    │
    └── index.html              # 首页例子
```



