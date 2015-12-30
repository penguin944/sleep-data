'use strict';

var gulp = require('gulp');
var typescript = require('gulp-tsc');
var watch = require('gulp-watch');
var del = require('del');
var merge = require('merge2');
var plumber = require('gulp-plumber');
var mocha = require('jasmine');
var karma = require('karma');

gulp.task('clean', () => {
	return del([
		'./dist/**/*'
	]);
});

gulp.task('copy', () => {
	return gulp.src(['./src/**/*', '!./src/typings/**', '!./src/**/*.ts'])
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['typescript'], () => {
    return gulp.watch('./src/**/*.ts', ['typescript'])
        .pipe(plumber());
});

gulp.task('typescript', () => {
	let tsResult = gulp.src(['./src/**/*.ts', '!./src/typings/**'])
		.pipe(typescript({
			noExternalResolve: true,
			module: "commonjs",
			target: "es6",
			sourceMap: true,
			removeComments: true,
			noImplicitAny: true,
			declaration: true,
			experimentalDecorators: true,
			emitDecoratorMetadata: true
		})
	);

	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
		tsResult.dts.pipe(gulp.dest('release/definitions')),
		tsResult.js.pipe(gulp.dest('release/js'))
	]);
});

gulp.task('build', ['clean', 'typescript', 'copy']);