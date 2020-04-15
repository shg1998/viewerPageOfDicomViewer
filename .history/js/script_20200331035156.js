const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let img = new Image();
let fileName = "";
const downloadBtn = document.getElementById("download-btn");
const UploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

revertBtn.addEventListener("click", e => {
    Caman("#canvas", img, function() {
        this.revert();
    });
});
//add filter and effects:
document.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function() {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function() {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function() {
                this.contrast(5).render();
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function() {
                this.contrast(-5).render();
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function() {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function() {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains("vibrance-add")) {
            Caman("#canvas", img, function() {
                this.vibrance(-5).render();
            });
        } else if (e.target.classList.contains("vibrance-remove")) {
            Caman("#canvas", img, function() {
                this.vibrance(-5).render();
            });
        } else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function() {
                this.vintage().render();
            });
        } else if (e.target.classList.contains("lomo-add")) {
            Caman("#canvas", img, function() {
                this.lomo().render();
            });
        } else if (e.target.classList.contains("clarity-add")) {
            Caman("#canvas", img, function() {
                this.clarity().render();
            });
        } else if (e.target.classList.contains("sinCity-add")) {
            Caman("#canvas", img, function() {
                this.sinCity().render();
            });
        } else if (e.target.classList.contains("crossProcess-add")) {
            Caman("#canvas", img, function() {
                this.crossProcess().render();
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function() {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function() {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains("herMajesty-add")) {
            Caman("#canvas", img, function() {
                this.herMajesty().render();
            });
        }
    }
});

//uploadFile:
UploadFile.addEventListener("change", e => {
    const file = document.getElementById("upload-file").files[0];

    //init  fileReader
    const reader = new FileReader();
    if (file) {
        fileName = file.name;
        //read the data as url
        reader.readAsDataURL(file);
        //write the path of image:
        document.getElementById("uploaded-name").innerHTML = fileName;
    }

    //add image to the canvas:
    reader.addEventListener(
        "load",
        () => {
            //create the img
            img = new Image();


            // $.ajax({
            //     url: URL,
            //     type: "GET",
            //     dataType: "html",
            //     async: false,
            //     crossDomain: "true",
            //     success: function(data, status) {
            //         console.log("Status: " + status + "\nData: " + data);
            //         result = data;

            //         /* creating image */
            //         var img = $('<img id="image_id">');
            //         img.attr("src", "data:image/gif;base64," + data);
            //         img.appendTo("#id_of_element_where_you_want_to_add_image");
            //     }
            // });



            //set src:
            img.src = reader.result;
            //on image load , add to canvas
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.removeAttribute("data-caman-id");
            };
        },
        false
    );
});
//download:
downloadBtn.addEventListener("click", () => {
    //get the file extension:
    const fileExt = fileName.slice(-4);
    //initialize new file name
    let newFileName;

    //check image type
    if (fileExt === ".jpg" || fileExt === "png") {
        newFileName = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
    }

    //call download
    download(canvas, newFileName);
});

function download(canvas, filename) {
    // init event
    let ev;
    //creat Link
    const link = document.createElement("a");
    //set Props:
    link.download = filename;
    link.href = canvas.toDataURL("image/jpg", 0.8);
    //new mouse event
    ev = new MouseEvent("click");
    //dispatch ev
    link.dispatchEvent(ev);
}