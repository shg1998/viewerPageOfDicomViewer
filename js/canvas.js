class CanvasBinding {
    constructor(el) {

    }
    setup() {
        var x = document.createElement("CANVAS");
        var ctx = x.getContext("2d");
        ctx.width = "100%";
        ctx.height = "400px";
        
        document.body.appendChild(x);
    }
}

var canv1 = new CanvasBinding();
canv1.setup();
var canv2 = new CanvasBinding();
canv2.setup();
