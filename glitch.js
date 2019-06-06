
document.addEventListener("DOMContentLoaded", () => {


var imageLoader = document.getElementById('uploadPhoto');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = document.getElementById("glitch");
var button2 = document.getElementById("glitch2");
var getPhoto = document.getElementById("getPhoto");
var downloadbutton = document.getElementById('download');

downloadbutton.addEventListener('click', function (e) {
        var element = document.createElement('a');
        element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
        element.setAttribute('download', 'glitch.png');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

button.addEventListener('click', glitch);
button2.addEventListener('click', () =>{

    let brightness = document.getElementById("bright");
    if(Math.random() > 0.5){brightness.checked = !brightness.checked;}
    document.getElementById("x").value = Math.floor((Math.random() * 20) + 5);
    glitch();
    document.getElementById("x").value = Math.floor((Math.random() * 20) + 5);
    brightness.checked = !brightness.checked;
    glitch();
    document.getElementById("x").value = Math.floor((Math.random() * 20) + 5);
    if (Math.random() > 0.5) { brightness.checked = !brightness.checked; }
    glitch();
    document.getElementById("x").value = Math.floor((Math.random() * 20) + 5);
    brightness.checked = !brightness.checked;
    glitch();
    
});
getPhoto.addEventListener('click', handleFetch);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function handleFetch(){
    // return fetch("https://source.unsplash.com/800x800/?political,celebrity,sexy,entertainment")
    return fetch("https://source.unsplash.com/800x800/")
    .then(res => {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    img.src = res.url + '?' + new Date().getTime();
    img.setAttribute('crossOrigin', '');
    return res;
});
}

function glitch(){
    let x = document.getElementById("x").value;
    let percent = document.getElementById("percent");
    let brightness = document.getElementById("bright");
    let direction = document.getElementById("direction").value;
    bright = !brightness.checked;

    percent.style.display = "block";
    var inMemoryCanvas = document.createElement('canvas');
    inMemoryCanvas.width = canvas.width;
    inMemoryCanvas.height = canvas.height;
    ictx = inMemoryCanvas.getContext('2d');
    inMemoryCanvas.width = canvas.height;
    inMemoryCanvas.height = canvas.width;
    ictx.translate(inMemoryCanvas.width / 2, inMemoryCanvas.height / 2);
    
    if(direction === "d"){
        ictx.rotate(Math.PI / 2);
    }else if (direction ==="u"){
        ictx.rotate(-Math.PI / 2);
    }else if (direction ==="r"){
        ictx.rotate(Math.PI);
    }
    ictx.drawImage(canvas, -inMemoryCanvas.width / 2, -inMemoryCanvas.height / 2);
    ictx.restore();



    var imgData = ictx.getImageData(0, 0, canvas.width, canvas.height);


    // if(direction === "u"){
    //     ctx.rotate(Math.Pi / 2);
    //     ctx.putImageData(imgData, 0, 0);
    //     imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // }

    var i;
    for (let j = 0; j < x; j++) {
        for (i = 0; i < imgData.data.length - 4; i += 4) {
            if (bright == true){
            if (imgData.data[i + 4] < imgData.data[i]) {
                imgData.data[i] = imgData.data[i + 4];
                imgData.data[i + 1] = imgData.data[i + 4 + 1];
                imgData.data[i + 2] = imgData.data[i + 4 + 2];
                imgData.data[i + 2] = imgData.data[i + 4 + 2];
                imgData.data[i + 3] = imgData.data[i + 4 + 3];
            }}else{
                if (imgData.data[i + 4] > imgData.data[i]) {
                    imgData.data[i] = imgData.data[i + 4];
                    imgData.data[i + 1] = imgData.data[i + 4 + 1];
                    imgData.data[i + 2] = imgData.data[i + 4 + 2];
                    imgData.data[i + 2] = imgData.data[i + 4 + 2];
                    imgData.data[i + 3] = imgData.data[i + 4 + 3];
            }}
        }
    }

    // if (direction === "u") {
    //     ictx.clearRect(0,0,canvas.width, canvas.height)
    //     ictx.putImageData(imgData, 0, 0);

    // }

    // ctx.drawImage(inMemoryCanvas, canvas.width, canvas.height);

    ctx.putImageData(imgData, 0, 0);

    inMemoryCanvas.width = canvas.height;
    inMemoryCanvas.height = canvas.width;
    ictx.translate(inMemoryCanvas.width / 2, inMemoryCanvas.height / 2);
    if (direction === "d") {
        ictx.rotate(-Math.PI / 2);
    }else if (direction ==="u"){
        ictx.rotate(Math.PI / 2);
    }else if (direction === "r") {
        ictx.rotate(-Math.PI);
    }
    ictx.drawImage(canvas, -inMemoryCanvas.width / 2, -inMemoryCanvas.height / 2);
    ictx.restore();

    imgData = ictx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);

    // gif.addFrame(canvas);
}

});


