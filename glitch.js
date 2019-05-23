
document.addEventListener("DOMContentLoaded", () => {


var imageLoader = document.getElementById('uploadPhoto');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);



            
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var i;

            for(let j = 0; j< 100; j++){
            for (i = 0; i < imgData.data.length-4; i += 4) {
                if(imgData.data[i+4] < imgData.data[i]){
                    imgData.data[i] = imgData.data[i+4];
                    imgData.data[i+1] = imgData.data[i+4+1];
                    imgData.data[i+2] = imgData.data[i+4+2];
                    imgData.data[i+2] = imgData.data[i+4+2];
                    imgData.data[i+3] = imgData.data[i+4+3];
                    
                // imgData.data[i] = 255 - imgData.data[i];
                // imgData.data[i + 1] = 255 - imgData.data[i + 1];
                // imgData.data[i + 2] = 255 - imgData.data[i + 2];
                // imgData.data[i + 3] = 255;
                }
            }
        }
            ctx.putImageData(imgData, 0, 0);





        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    }



});


