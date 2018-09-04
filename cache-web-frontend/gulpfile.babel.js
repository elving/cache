import s3 from 'gulp-s3';
import gzip from 'gulp-gzip';
import gulp from 'gulp';
import dotenv from 'dotenv';
import replace from 'gulp-replace';
import webpack from 'webpack-stream';
import runSequence from 'run-sequence';
import webpackConfig from './webpack.production.config.babel';

dotenv.load();

const AWS_CONFIG = {
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: 'app.trycache.co',
  region: 'us-standard'
};

gulp.task('default', () => {
  runSequence(
    'favicon', 'images', 'webpack',
    's3_favicon', 's3_images', 's3_scripts', 's3_stylesheets'
  );
});

gulp.task('favicon', () => {
  return gulp.src('./assets/favicon.ico')
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', () => {
  return gulp.src('./assets/images/**')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('webpack', () => {
  return gulp.src('./app/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(replace('url("/assets', `url("${process.env.STATIC_URL}`))
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('s3_favicon', () => {
  const awsOptions = {
    headers: { 'Cache-Control': 'max-age=604800, no-transform, public' },
    uploadPath: '/assets/'
  };

  return gulp.src('./dist/favicon.ico')
    .pipe(s3(AWS_CONFIG, awsOptions));
});

gulp.task('s3_images', () => {
  const awsOptions = {
    headers: { 'Cache-Control': 'max-age=604800, no-transform, public' },
    uploadPath: '/assets/images/'
  };

  return gulp.src('./dist/images/**')
    .pipe(s3(AWS_CONFIG, awsOptions));
});

gulp.task('s3_scripts', () => {
  const awsOptions = {
    headers: { 'Cache-Control': 'max-age=604800, no-transform, public' },
    uploadPath: '/assets/scripts/',
    gzippedOnly: true
  };

  return gulp.src(['./dist/*.js.gz', './dist/*.js.map.gz'])
    .pipe(s3(AWS_CONFIG, awsOptions));
});

gulp.task('s3_stylesheets', () => {
  const awsOptions = {
    headers: { 'Cache-Control': 'max-age=604800, no-transform, public' },
    uploadPath: '/assets/stylesheets/',
    gzippedOnly: true
  };

  return gulp.src(['./dist/*.css.gz', './dist/*.css.map.gz'])
    .pipe(s3(AWS_CONFIG, awsOptions));
});
