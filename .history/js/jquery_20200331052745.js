$(document).ready(function() {
    var XPosition;
    var YPosition;
    var i = 0;
    var points = [];
    //for PunctuationPunctuation on canvas!
    $("#Punctuation-btn").click(function(e) {
        $("#canvas").click(function(ev) {
            mouseX = ev.pageX;
            mouseY = ev.pageY;
            // console.log(mouseX + " " + mouseY);
            var color = "rgb(248, 248, 91)";
            var size = "7px";
            XPosition = mouseX;
            YPosition = mouseY;

            points.push({
                xpos: XPosition,
                ypos: YPosition
            });

            $("body").append(
                $("<canvas></canvas>")
                .css("position", "absolute")
                .css("top", mouseY + "px")
                .css("left", mouseX + "px")
                .css("width", size)
                .css("height", size)
                .css("background-color", color)
                .css("cursor", "move")
                .css("border-radius")
            );













        });
    });

    //for getting points that you clicked (x,y)
    $("#getPoints-btn").click(function(e) {
        for (var j = 0; j < points.length; j++) {
            console.log("x = " + points[j].xpos + "\n" + "y = " + points[j].ypos);
        }

        var getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "json";

            xhr.onload = function() {
                var status = xhr.status;

                if (status == 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status);
                }
            };

            xhr.send();
        };

        getJSON("getPoints.webService", function(err, data) {
            if (err != null) {
                console.error(err);
            } else {
                var text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`;

                console.log(text);
            }
        });
    });

    //erasing styles in canvas
    $("#Erase-btn").click(function(e) {
        $("canvas").removeAttr("style");
    });
    $("#addPoints-btn").click(function(e) {
        //first method
        // sendJSON(points);

        //second method
        let xhr = new XMLHttpRequest();
        let url = "server";

        // open a connection
        xhr.open("POST", "addPoints", true);
        var myJson = JSON.stringify(points);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Print received data from server
                console.log(this.responseText);
            }
        };

        xhr.send({
            data: {
                param: myJson
            }
        });
    });
});

function sendJSON(object) {
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "addPoints.webService";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            console.log(this.responseText);
        }
    };

    // Converting JSON data to string
    var data = [];
    for (let i = 0; i < object.length; i++) {
        data[i] = JSON.stringify({
            XPosition: object[i].xpos,
            YPosition: object[i].ypos
        });
    }
    // console.log(object[0].xpos);
    // console.log(object[0].ypos);

    // Sending data with the request
    xhr.send(data);
}







//  $.ajax({

//              type: "POST",

//              url: "DataService.asmx/GetData",

//              contentType: "application/json; charset=utf-8",

//              dataType: "json",

//              success: function (response) {

//                  var names = response.d;

//                  alert(names);

//              },

//              failure: function (response) {

//                  alert(response.d);

//              }

//          });

//      });