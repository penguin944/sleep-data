'use strict';

var gulp = require('gulp');
var typescript = require('gulp-tsc');
var watch = require('gulp-watch');
var del = require('del');
var merge = require('merge2');
var plumber = require('gulp-plumber');

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
    return watch('./src/**/*.ts', ['typescript'])
        .pipe(plumber());
});

gulp.task('typescript', () => {
	return gulp.src(['./src/**/*.ts', '!./src/typings/**'])
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
	).pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'typescript', 'copy']);