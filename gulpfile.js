const gulp = require('gulp');
const CustomRegistry = require('gulp-angular2-project-registry');

gulp.registry(new CustomRegistry({
	vendor: ['./node_modules/peerjs/dist/peer.min.js']
}));

gulp.task('default', gulp.task('dev'));
