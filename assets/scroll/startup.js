/*$(function() {*/
    zbdp.resizePage();
    window.onresize = function() {
        throttle(zbdp.resizePage);
    }

    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function() {
            method.call(context);
        }, 100);
    }

    zbdp.initNews();

	//zbdp.loadEmergency();

/*});*/
