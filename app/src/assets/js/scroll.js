$(document).ready(function () {
  window.addEventListener('scroll', function () {
    let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
    if (t > 0) {
      $('.box').addClass('box-active')
      // $('.nav_category').addClass('nav_category-active')
      // $('.nav_serch').addClass('nav_search-active')
    } else {
      $('.box').removeClass('box-active')
      // $('.nav_category').removeClass('nav_category-active')
      // $('.nav_serch').removeClass('nav_search-active')
    }
  })
});