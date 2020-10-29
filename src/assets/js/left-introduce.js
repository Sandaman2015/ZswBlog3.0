window.onload=function(){
    d = new Date();
    days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    day = d.getDate();
    w = days[d.getDay()];
    month = months[d.getMonth()];
    h = d.getHours();
    y = d.getFullYear();
    m = d.getMinutes();
    ampm = h >= 12 ? '下午' : '上午';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    m = m < 10 ? '0' + m : m;
    var strTime = h + ':' + m + ' ' + ampm;
    document.getElementsByClassName('time')[0].innerHTML = y + ' ' + month + ' ' + day + '<br />' + '&nbsp;&nbsp;&nbsp;&nbsp; ' + w + ' ' + strTime+'<br/>'+'<br/>'+'<br/>';
    var body = document.body;
    setTimeout(function () {
        body.classList.add('active');
    }, 200);
};