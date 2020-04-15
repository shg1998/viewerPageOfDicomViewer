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
                .css("border-radius", "20px")
            );

            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var $canvas = $("#canvas");
            var canvasOffset = $canvas.offset();
            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;
            var scrollX = $canvas.scrollLeft();
            var scrollY = $canvas.scrollTop();
            var cw = canvas.width;
            var ch = canvas.height;

            // flag to indicate a drag is in process
            // and the last XY position that has already been processed
            var isDown = false;
            var lastX;
            var lastY;

            // the radian value of a full circle is used often, cache it
            var PI2 = Math.PI * 2;

            // variables relating to existing circles
            var circles = [];
            var stdRadius = 10;
            var draggingCircle = -1;

            // clear the canvas and redraw all existing circles
            function drawAll() {
                ctx.clearRect(0, 0, cw, ch);
                for (var i = 0; i < circles.length; i++) {
                    var circle = circles[i];
                    ctx.beginPath();
                    ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
                    ctx.closePath();
                    ctx.fillStyle = circle.color;
                    ctx.fill();
                }
            }

            function handleMouseDown(e) {
                // tell the browser we'll handle this event
                e.preventDefault();
                e.stopPropagation();

                // save the mouse position
                // in case this becomes a drag operation
                lastX = parseInt(e.clientX - offsetX);
                lastY = parseInt(e.clientY - offsetY);

                // hit test all existing circles
                var hit = -1;
                for (var i = 0; i < circles.length; i++) {
                    var circle = circles[i];
                    var dx = lastX - circle.x;
                    var dy = lastY - circle.y;
                    if (dx * dx + dy * dy < circle.radius * circle.radius) {
                        hit = i;
                    }
                }

                // if no hits then add a circle
                // if hit then set the isDown flag to start a drag
                if (hit < 0) {
                    circles.push({ x: lastX, y: lastY, radius: stdRadius, color: randomColor() });
                    drawAll();
                } else {
                    draggingCircle = circles[hit];
                    isDown = true;
                }

            }

            function handleMouseUp(e) {
                // tell the browser we'll handle this event
                e.preventDefault();
                e.stopPropagation();

                // stop the drag
                isDown = false;
            }

            function handleMouseMove(e) {

                // if we're not dragging, just exit
                if (!isDown) { return; }

                // tell the browser we'll handle this event
                e.preventDefault();
                e.stopPropagation();

                // get the current mouse position
                mouseX = parseInt(e.clientX - offsetX);
                mouseY = parseInt(e.clientY - offsetY);

                // calculate how far the mouse has moved
                // since the last mousemove event was processed
                var dx = mouseX - lastX;
                var dy = mouseY - lastY;

                // reset the lastX/Y to the current mouse position
                lastX = mouseX;
                lastY = mouseY;

                // change the target circles position by the 
                // distance the mouse has moved since the last
                // mousemove event
                draggingCircle.x += dx;
                draggingCircle.y += dy;

                // redraw all the circles
                drawAll();
            }

            // listen for mouse events
            $("#canvas").mousedown(function(e) { handleMouseDown(e); });
            $("#canvas").mousemove(function(e) { handleMouseMove(e); });
            $("#canvas").mouseup(function(e) { handleMouseUp(e); });
            $("#canvas").mouseout(function(e) { handleMouseUp(e); });

            //////////////////////
            // Utility functions

            function randomColor() {
                return ('#' + Math.floor(Math.random() * 16777215).toString(16));
            }


        });
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