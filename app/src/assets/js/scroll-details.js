$(document).ready(function () {
    window.addEventListener('scroll', function () {
        let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
        if (t > $(".ad").height()) {
            $('.box-details').addClass('box-details-active')
        } else {
            $('.box-details').removeClass('box-details-active')
        }
    });
});
