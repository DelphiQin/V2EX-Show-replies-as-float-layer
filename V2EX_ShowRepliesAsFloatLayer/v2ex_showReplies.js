floatLayer = $('<div class="floatLayer">');
$(document.body).append(floatLayer);
floatLayer.hide();
$(".reply_content>a").mouseover(function(sender) {
    // console.info(sender);
    var username = sender.target.innerHTML;
    if (username.length <= 0) {
        return;
    };
    var replys = $(".cell strong > a:contains("+username+")");

    var fill = [];
    for (var i=0; i<replys.length; i++) {
        // console.dir($(replys[i]).position());
        if ($(replys[i]).position().top > sender.pageY) {
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
    // console.info(floatLayer.height()+sender.clientY, window.innerHeight);
    if (floatLayer.height()+sender.clientY+35 > window.innerHeight) {
        // console.info(sender.pageY, sender.pageY-(window.innerHeight-sender.clientY));
        floatLayer.css({
            left:sender.pageX+10,
            top:sender.pageY-(floatLayer.height()+sender.clientY+35-window.innerHeight)
        });
    } else {
        floatLayer.css({left:sender.pageX+10, top:sender.pageY+5});
    }
    floatLayer.show();
}).mouseout(function() {
    floatLayer.hide();
});
