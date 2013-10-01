$(function() {
  $("#speakers .fancybox").fancybox({
    maxWidth  : 500,
    maxHeight : 400,
    fitToView : false,
    width     : '90%',
    height    : '80%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
  });

  // typical single page smooth scrolling functionality
  $('#scroll-nav').onePageNav({
    currentClass: 'active',
    scrollThreshold: 0.4,
    scrollOffset: 40,
    scrollSpeed: 1200
  });
});
