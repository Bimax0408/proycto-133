var listaobjetos = [];
var estatus = false;


function setup() {
    canvas = createCanvas(800, 600);
    background("rgb(175, 255, 151)");
    canvas.center();
    video = createCapture(VIDEO)
    video.size(800, 600)
    video.hide()
    reconocimiento = ml5.objectDetector("cocossd", listo);
};

function listo() {
    console.log("El modelo esta cargado");
    estatus = true;
};

function result(error, object) {
    if (!error) {
        console.log(object);
        listaobjetos = object;
    };
};

function preload() {
    alarma = loadSound("AlarmClock.mp3")
};

function draw() {
    image(video, 0, 0, 800, 600);
    if (estatus) {
        reconocimiento.detect(canvas, result);
        bebe = false
        for (var f = 0; f < listaobjetos.length; f++) {
            if (listaobjetos[f].label == "person") {
                bebe = true

            }
            strokeWeight(6);
            textSize(15);
            fill("blue");
            textStyle(BOLD);
            porcentaje = Math.round(listaobjetos[f].confidence * 100)
            mensaje = listaobjetos[f].label + " " + porcentaje + "%"
            text(mensaje, listaobjetos[f].x, listaobjetos[f].y - 10);
            noFill();
            stroke("lime");
            strokeWeight(3);
            rect(listaobjetos[f].x, listaobjetos[f].y, listaobjetos[f].width, listaobjetos[f].height);
        }
        if (bebe) {
            document.getElementById("detectado").innerHTML = "✅ Bebe detectado ✅";
            alarma.stop();
        } else {
            document.getElementById("detectado").innerHTML = "❌ Bebe no detectado ❌";
            if (!alarma.isPlaying()) {
                alarma.play();
            }

        }
    };
};