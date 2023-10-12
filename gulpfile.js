const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //asegura que funcione en cualquier navegador
const cssnano = require('cssnano'); //comprimir css 
const postcss = require('gulp-postcss'); //combinación de los dos
const sourcemaps = require('gulp-sourcemap'); //para que se fácil de busca en elementos de la interfaz

//Imagenes
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js'); //optimizar js

function css(done) {
  src('src/scss/**/*.scss') //Identificar el archivo de sass
  .pipe(sourcemaps.init()) 
  .pipe(plumber()) //da los errores más facil de leer
    .pipe(sass()) //compilar-ejecutar el archivo de sass
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.init()) 
    .pipe(dest('build/css')); //almacenarla en el disco duro

  done(); //Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done){
  const opciones = {
    optimizationLevel: 3
  };
  src('src/img/**/*.{png, jpg}')
  .pipe( cache(imageMin(opciones)))
  .pipe(dest('build/img'))
  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png, jpg}') //Para buscar todas las imágenes
  .pipe(webp(opciones))
  .pipe(dest('build/img'))
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png, jpg}') //Para buscar todas las imágenes
  .pipe(avif(opciones))
  .pipe(dest('build/img'))
  done();
}

function javascript(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/js'))

  done();
}
function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/scss/**/*.js', javascript);

  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
