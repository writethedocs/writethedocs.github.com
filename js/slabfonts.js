// slab text functions for banner

function slabTextHeadlines() {
  // auto fit slab text 
  $(".slab").slabText();
  // unhide 
  $("#slab").removeClass('hidden');
};

// web font loader. don't try to slab text until fonts are loaded.

WebFontConfig = {
  custom: {
    families: ['Hagin Caps Medium'],
    urls: [
      '../../font/hagin-caps-medium-webfont.eot',
      '../../font/hagin-caps-medium-webfont.svg',
      '../../font/hagin-caps-medium-webfont.ttf',
      '../../font/hagin-caps-medium-webfont.woff',
      '../../css/typography.css'
      ]
  },
  active: slabTextHeadlines,
  inactive: slabTextHeadlines
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

