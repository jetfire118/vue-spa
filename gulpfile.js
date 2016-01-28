var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
//var WebpackDevServer = require("webpack-dev-server");

//本地调试服务插件
var connect = require('connect');
var http = require('http');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var livereload = require('gulp-livereload');
var cLivereload = require('connect-livereload');

var argv = require('yargs')
    .default('env', 'develop')
    .argv;

var minifyHtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var minifyCss 	= require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');   //删除文件
var insert 		= require('gulp-insert');   //文件插入
var concat		= require('gulp-concat');   //文件合并
var spritesmith = require('gulp.spritesmith');  //图片合并
var imagemin 	= require('gulp-imagemin'); //压缩图片
var pngquant 	= require('imagemin-pngquant'); //压缩png图片
var rev = require('gulp-rev');  //文件名MD5
var revReplace = require('gulp-rev-replace');   //替换代码内文件名

var paths = {
    root: '.app/',  //开发代码的root
    html: './app/index.html',
    sass: './app/sass/',
    js: './app/js/',
    images: './app/img/',
    icons: './app/img/icons/',
    sassEntry: './app/sass/app.scss',
    spriteCss: './app/sass/spriteCss/', //手动合并的css文件夹
    target: {
        root: './www/',
        js: './www/js/',
        style: './www/style/',
        images: './www/img/'
    },
    build : {
        root: './build/',
        js: './build/js/'
    }
};

var config = {
    env: argv.env,
    //webpack.config
    entry: './app/js/app.js',
    output: {
        path: paths.target.js,
        publicPath: paths.target.root,
        filename: 'build.js'
    }
};


// A callback function to handle error
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


// Webpack packaging
var webpackConfig = require('./webpack.config')(config);
gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

//合并图标
gulp.task('sprIcons', function () {

    var spriteData = gulp.src([paths.icons + '*.png', '!' + paths.icons + 'sprite.png']).pipe(spritesmith({
        imgName: 'sprite.png',
        //algorithm: 'top-down',
        cssTemplate: paths.sass + 'icons.hbs',
        padding: 10,
        cssName: 'icons.scss'
    }));

    spriteData.img.pipe(gulp.dest(paths.icons));
    return spriteData.css.pipe(gulp.dest(paths.sass));
});

//合并指定目录的图片，生产相应的css在sass/sprite中，会自动合并到sprite.scss中
//调用：gulp sprImg --imgPath=/images/somePath --fname=someName
gulp.task('sprImg', function () {

    var spriteData = gulp.src([paths.root + argv.imgPath + '/*.png', '!'+paths.root + argv.imgPath+'/sprite.png']).pipe(spritesmith({
        imgName: 'sprite.png',
        padding: 10,
        cssOpts:{
            fname: argv.fname,	//为了防止生产相同的css选择器, 这个是特定的名字
            imgPath: argv.imgPath	//图片路径
        },
        cssTemplate: paths.sass + '/sprite.hbs',
        cssName: argv.fname + '.scss'
    }));

    spriteData.img.pipe(gulp.dest(paths.root + argv.imgPath));
    return spriteData.css.pipe(gulp.dest(paths.spriteCss));
});
//合并sprite文件的scss文件
gulp.task('concatSprite', function () {
    return gulp.src(paths.spriteCss + '*.scss')
        .pipe(insert.append(' '))
        .pipe(concat('sprite.scss'))
        .on('error', handleError)
        .pipe(gulp.dest(paths.sass))
        .pipe(livereload());
});

gulp.task('image', ['sprIcons'], function() {
    return gulp.src(paths.images + '**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.target.images))
        .pipe(livereload());
});

//index.html
gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(minifyHtml({
            conditionals: true,
            spare: true
        }))
        .pipe(gulp.dest(paths.target.root))
        .pipe(livereload());
});

//编译sass
gulp.task('sass', ['concatSprite'], function() {
    return gulp.src(paths.sassEntry)
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox 26', 'chrome 19', 'Opera 12.1', 'ios_saf 4', 'Android 4']
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(paths.target.style))
        .pipe(livereload());
});


// Task clean
gulp.task('clean', function(){
    del([paths.target.root, paths.build.root], function (err, paths) {
        console.log('clean---------------');
    });
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js + '**/*.*', ['webpack']);
    gulp.watch(paths.sass + '**/*.scss', ['sass']);
    gulp.watch(paths.images, ['image']);
    gulp.watch(paths.icons + '*.*', ['sprIcons']);
    gulp.watch(paths.spriteCss + '*.scss', ['concatSprite']);
    gulp.watch(paths.target.js + '**/*.*', function(){
        livereload.changed(paths.target.js);
    });
});

gulp.task('rev', ["webpack", "html", "sass", "image"], function() {
    //不重命名的文件
    gulp.src([paths.target.root + 'index.html'])
        .pipe(gulp.dest(paths.build.root));
    gulp.src([paths.target.js + 'build.js.map'])
        .pipe(gulp.dest(paths.build.js));
    //重命名文件
    return gulp.src([paths.target.root + '**/*.*', '!' + paths.target.root + 'index.html', '!' + paths.target.js + 'build.js.map'], {base: paths.target.root})
        .pipe(rev())
        .pipe(gulp.dest(paths.build.root))  // 重命名
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.build.root));  // write manifest to build dir
});

gulp.task('build', ['clean', 'rev'], function() {
    var manifest = gulp.src(paths.build.root + 'rev-manifest.json');
    return gulp.src([paths.build.root + '**/*.*'])
        //替换文件名
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(paths.build.root))
});

gulp.task("test", ["webpack", "html", "sass", "image", "watch"], function() {
    var app = connect()
        .use(cLivereload({ port: 35729 }))
        .use(serveStatic(paths.target.root, {
            index: 'index.html'
        }));
    http.createServer(app)
        .listen(80)
        .on('listening', function() {
            console.log('Web server started on http://localhost:80')
        });
    livereload.listen();
});
