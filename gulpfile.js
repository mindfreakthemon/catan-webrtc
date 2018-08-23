const gulp = require('gulp');
const CustomRegistry = require('gulp-angular2-project-registry');

gulp.registry(new CustomRegistry({
	vendors: ['./node_modules/peerjs/dist/peer.js']
}));

gulp.task('default', gulp.task('dev'));
