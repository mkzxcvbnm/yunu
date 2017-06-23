const gulp = require('gulp');//前端自动化构建工具
const gulpif = require('gulp-if');//gulp if插件
const plumber = require('gulp-plumber');//gulp if插件
const postcss = require('gulp-postcss');//css构建工具
const cssnext = require('postcss-cssnext');//允许使用未来的CSS功能
const sass = require('gulp-sass');//scss文件编译成css
const precss = require('precss');//包含Sass类功能的插件，如变量，嵌套和混合。
const cssnano = require('cssnano');//是一个模块化的CSS minifier。
const sourcemaps = require('gulp-sourcemaps');//源地图
const babel = require('gulp-babel');//JavaScript编译器
const uglify = require('gulp-uglify');//js压缩工具
const browserSync = require('browser-sync').create();//浏览器调试工具

const knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};
const minimist = require('minimist');
const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('css', function () {
    let processors = [
        cssnext({
            features: {
                rem: false//关闭无用的rem回退转换px功能
            }
        }),
        //precss()
    ];
    if (options.env === 'production') {
        processors.push(cssnano({autoprefixer: false}));//去掉重复功能
    }
    return gulp.src('src/source/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        //嵌套输出方式 nested
        //展开输出方式 expanded 
        //紧凑输出方式 compact 
        //压缩输出方式 compressed
        .pipe(postcss(processors))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.', { sourceRoot: 'src/source/css' }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('js', function () {
    let processors = {
        presets: [
            "es2015",
            "stage-0"
        ]
    };
    return gulp.src('src/source/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel(processors))
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.', { sourceRoot: 'src/source/js' }))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['css', 'js'], () => {
    browserSync.init({
        server: {
            baseDir: 'src',
            directory: true//显示目录
        },
        //open: false,//启动browser-sync不打开新页面  地址:http://localhost:3000
        reloadOnRestart: true,//重启browser-sync刷新所有页面
        //notify: false//不显示在浏览器中的任何通知。
    });
    gulp.watch('src/source/css/**/*', ['css']);
    gulp.watch('src/source/js/**/*', ['js']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});