const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done) {
  src('src/scss/**/*.scss') //Identificar el archivo de sass
  .pipe( plumber()) //da los errores más facil de leer 
  .pipe(sass()) //compilar-ejecutar el archivo de sass
    
    .pipe(dest('build/css')); //almacenarla en el disco duro

  done(); //Callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}

exports.css = css;
exports.dev = dev;
