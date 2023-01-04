const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require ('sass'));


function css ( done ){

    //identifica el archivo    //se eecuta el primer pipe, luego el sgeundo pipe

    src('src/scss/app.scss')     //Identificar el archivo de sass
    .pipe( sass() )              //compilar-ejecutar el archivo de sass
    .pipe( dest('build/css'));   //almacenarla en el disco duro

    done(); //Callback que avisa a gulp cuando llegamos al final 
}

function imagenes(){
    
}


function dev( done ){
    watch("src/scss/app.scss", css)

    done();
}

exports.css = css;
exports.dev = dev;