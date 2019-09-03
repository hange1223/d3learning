+function(d, w) {
    var WIDTH_TO_REM = 114.28571;
    var HEIGHT_TO_REM = 64.28571;
        var i = d.documentElement,
        s = function() {
            var t = i.clientWidth;
            var h = i.clientHeight;
            console.log(t +' *W* '+t / WIDTH_TO_REM);
            console.log(h +' *H* '+t / HEIGHT_TO_REM);
            if(t/h < 16/9){
            		t && (i.style.fontSize = (t / WIDTH_TO_REM) + "px");
            }else{
//          		t && (i.style.fontSize = (t / WIDTH_TO_REM) + "px");
            		h && (i.style.fontSize = (h / HEIGHT_TO_REM) + "px");
            }
        };
    if (d.addEventListener) {
        d.addEventListener("DOMContentLoaded", s, false);
        w.addEventListener("resize", s, false);
        w.addEventListener("orientationchange", s, false);
    } else {	
        d.attachEvent("onDOMContentLoaded", s);
        w.attachEvent("onresize", s);
        w.attachEvent("onorientationchange", s);
    }
}(document, window);