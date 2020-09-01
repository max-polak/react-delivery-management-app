
// 1. Main Variables //

var proxy_url   = "http://localhost/react-delivery-management-app/";

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

sass.compiler = require('node-sass');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var uglify_es = require('gulp-uglify-es').default;

// 2. Setup Sass - Variables + task //

var sassFiles = 'assets/scss/**/*.scss',
    sassMainFile = 'assets/scss/styles.scss',
    cssFiles = 'assets/css/';

// Compile Sass //
function compileSass() {

	return gulp.src(sassMainFile)
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(error){
            console.log(error);
            this.emit('end');
        }))
        .pipe(gulp.dest(cssFiles))
        .pipe(browserSync.stream());

}

// 3. Setup Theme JS - Variables + task //

var jsFiles = ['assets/js/build/**/*.js', 'assets/js/build/**/*.jsx'],
    jsDest = 'assets/js',
    jsMinFile = 'assets/js/scripts.min.js';


// Compile JS //
function compileJs(){

	return gulp.src(jsFiles) // grab all files
	    .pipe(concat('scripts.min.js')) // concat all
	    // .pipe(uglify_es()).on('error', function(error){
	    //     console.log(error);
	    //     this.emit('end');
	    // }) // minify it
        .pipe(gulp.dest(jsDest)) // write out that file
}


// 4. Setup Browsersync //

// Start Gulp //
function startGulp(){

    browserSync.init({
        proxy: proxy_url
    });

	gulp.watch(sassFiles, compileSass);

    gulp.watch(jsFiles, compileJs);

    gulp.watch( [ "**/*.php" , "**/*.html", jsMinFile] ).on('change', browserSync.reload);
}

// 5. Setup Default task - browsersync //
gulp.task('default', gulp.series(startGulp));
