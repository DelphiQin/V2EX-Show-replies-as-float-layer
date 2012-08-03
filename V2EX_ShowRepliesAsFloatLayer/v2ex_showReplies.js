floatLayer = $('<div class="floatLayer">');
recentlySender = null;

$(document.body).append(floatLayer);
floatLayer.hide();

$(".reply_content>a").mouseover(function(sender) {
    recentlySender = sender;
    intervalId = setInterval(showFloatLayer, 250)
}).mouseout(function() {
    clearInterval(intervalId);
    floatLayer.clearQueue();
    floatLayer.stop();
    floatLayer.hide();
});

function showFloatLayer() {
    // console.info(recentlySender);
    var username = recentlySender.target.innerHTML;
    if (username.length <= 0) {
        return;
    };
    var replys = $(".cell strong > a:contains("+username+")");

    var fill = [];
    for (var i=0; i<replys.length; i++) {
        // console.dir($(replys[i]).position());
        if ($(replys[i]).position().top > recentlySender.pageY) {
            break;
        };
        var cell = '<div class="cell_style">' + $(replys[i]).parent().siblings(".reply_content").html() + "</div>";
        fill.push(cell);
    }
    if (fill.length <= 0) {
        return;
    };

    // 取最近三条回复
    var last = fill.slice(-3);
    var separateLine = '<hr class="separateLine" />';
    var title = '<div class="title_cell center">'+username+' 的回复</div><hr class="separateTitle" />';
    floatLayer.html(title+last.join(separateLine));
    // console.info(floatLayer.height()+recentlySender.clientY, window.innerHeight);
    if (floatLayer.height()+recentlySender.clientY+35 > window.innerHeight) {
        // console.info(recentlySender.pageY, recentlySender.pageY-(window.innerHeight-recentlySender.clientY));
        floatLayer.css({
            left:recentlySender.pageX+10,
            top:recentlySender.pageY-(floatLayer.height()+recentlySender.clientY+35-window.innerHeight)
        });
    } else {
        floatLayer.css({left:recentlySender.pageX+10, top:recentlySender.pageY+5});
    }
    floatLayer.fadeIn(300);
}