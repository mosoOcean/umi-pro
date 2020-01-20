let  gulp = require('gulp');

let zip = require('gulp-zip');
let fs = require('fs');

let cfg = require('./config/publish.config');


let publishConfig = cfg.publishConfig;

//打包为war
gulp.task("package", function () {
    gulp.src(['dist/**', "!dist/**/*.map"]).pipe(zip('dist.war')).pipe(gulp.dest('./'));
    console.info('package ok!');
});
//安装到maven中
gulp.task("install", function () {

    if (!publishConfig) {
        console.console.error("can't find publishConfig in config.js");
    }
    let targetPath = fs.realpathSync('.');
    let installCommandStr = publishConfig.command + " install:install-file -Dfile=" + targetPath + "/dist.war   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war";
    console.log("=========");
    console.log("targetPath" + targetPath);
    console.log(installCommandStr);
    let process = require('child_process');
    let installWarProcess = process.exec(installCommandStr, function (err, stdout, stderr) {
        if (err) {
            console.log('install war error:' + stderr);
        }
    });
    installWarProcess.stdout.on('data', function (data) {
        console.info(data);
    });
    installWarProcess.on('exit', function (data) {
        console.info('install war success');
    })
})
//发布到maven仓库中
gulp.task("deploy", function () {
    if (!publishConfig) {
        console.console.error("can't find publishConfig in config.js");
    }
    let process = require('child_process');
    let targetPath = fs.realpathSync('.');
    let publishCommandStr = publishConfig.command + " deploy:deploy-file  -Dfile=" + targetPath + "/dist.war   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war  -DrepositoryId=" + publishConfig.repositoryId + " -Durl=" + publishConfig.repositoryURL;
    console.info(publishCommandStr);
    let publishWarProcess = process.exec(publishCommandStr, {
        maxBuffer: 500 * 1024 // 默认 200 * 1024
    },function (err, stdout, stderr) {
        if (err) {
            console.log('publish war error:' + stderr);
            console.log('publish war error:' + err.message);
        }
    });

    publishWarProcess.stdout.on('data', function (data) {
        console.info(data);
    });
    publishWarProcess.on('exit', function (data) {
        console.info('publish  war success');
    });

});
