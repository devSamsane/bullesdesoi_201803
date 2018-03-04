import * as _ from 'lodash';
import * as runSequence from 'run-sequence';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import tslint from 'gulp-tslint';
import { WatchMethod } from 'gulp';

import { properties } from './server/lib/config/index';

const plugins = gulpLoadPlugins();

// Set environnement variable => development
gulp.task('env:dev', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('nodemon', () => {
  plugins.nodemon({
    script: './node_modules/.bin/ts-node server.ts',
    nodeArgs: ['--harmony', '--debug', '--inspect'],
    ext: 'ts, html',
    watch: properties.files.server.allTS
  });
});

gulp.task('lint', () => {
  gulp.src(properties.files.server.allTS)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});


gulp.task('watch', () => {
  // Démarrage du rechargement en live
  plugins.refresh.listen();

  // Règles de surveillance
  gulp.watch(properties.files.server.allTS, ['lint']).on('change', plugins.refresh.changed);
});

gulp.task('default', done => {
  runSequence('lint', 'env:dev', ['nodemon', 'watch'], done);
});
