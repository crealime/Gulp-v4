'use strict';

const gulp  			= require('gulp');
const config 			= require('./gulp/config.js');
const browserSync = require('browser-sync').create();

function lazyRequireTask(taskName, path) {
	gulp.task(taskName, () => {
		let task = require(path);

		return task();
	});
}

lazyRequireTask('templates',	'./gulp/tasks/templates.js');

lazyRequireTask('styles',			'./gulp/tasks/styles.js');

lazyRequireTask('js', 			  './gulp/tasks/js.js');

lazyRequireTask('js-libs', 	  './gulp/tasks/js-libs.js');

lazyRequireTask('img', 				'./gulp/tasks/img.js');

lazyRequireTask('sprite', 		'./gulp/tasks/sprite.js');

lazyRequireTask('fonts', 			'./gulp/tasks/fonts.js');

lazyRequireTask('clean', 			'./gulp/tasks/clean.js');



// server & watch:dev task must be in the same files, for correct autoreloade page
gulp.task('server', () => {
	browserSync.init({
		server: config.dist.dist,
		notify: false
	});

	browserSync.watch([config.dist.dist, '!' +config.dist.styles +'*.css']).on('change', browserSync.reload);
});

// usePolling - chokidar solution for faster resave files
gulp.task('watch:dev', () => {

	// gulp.watch(config.watch.pug, { usePolling: true }, gulp.series('templates'))
	// 	.on('all', (event, filepath) => {
	// 		global.emittyChangedFile = filepath;
	// 	});

	gulp.watch(config.watch.pug, { usePolling: true }, gulp.series('templates'));

	gulp.watch(config.watch.styles, { usePolling: true }, gulp.series('styles')).on('change', browserSync.reload);

	gulp.watch([config.watch.scripts, '!'+config.watch.scriptsLibs], { usePolling: true }, gulp.series('js'));

	gulp.watch(config.watch.scriptsLibs, { usePolling: true }, gulp.series('js-libs'));

	gulp.watch(config.watch.img, gulp.series('img'));

	gulp.watch(config.watch.sprite, gulp.series('sprite'));

	gulp.watch(config.watch.fonts, gulp.series('fonts'));

});


// Start watching files & turn on local server, without rebuild project
gulp.task('watch', gulp.parallel('watch:dev', 'server'));


// Finish line, prepare project for production without optimization
gulp.task('build:dev', gulp.series(
	'clean',
	gulp.parallel(
		"templates", 
		"styles", 
		"js", 
		"js-libs", 
		"img", 
		"sprite", 
		"fonts"
	)
));


//set env for absolute build optimization
gulp.task('set-prod', function(){
	process.env.NODE_ENV = "production";
	return gulp.src('./');
});
	// Finish line, prepare project for production with optimization
	gulp.task('build', gulp.series('set-prod', 'build:dev'));


// First Step 
// Rebuild the whole project, start watching files & turn on local server
gulp.task('default', gulp.series('build:dev', gulp.parallel('watch')));
