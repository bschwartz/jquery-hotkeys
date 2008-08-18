////
// simple hotkeys plugin.
// 
//   <a href="link" hotkey="a">all</a>
//
//   $.hotkey('a', function() { window.location = 'somewhere' })
//
//   $.hotkeys({
//     'a': function() { window.location = 'somewhere' },
//     'b': function() { alert('something else') }
//   })
//
// also privode the Javascript key code.
//
//   $.hotkeys({
//     37: function() { alert('left arrow button')},
//     39: function() { alert('right arrow button')}
//   })
//
(function($) {
  
  var isInteger = function(s) {
    return !isNaN(parseInt(s));
  }
  
  $.hotkeys = function(options) {
    for(key in options) $.hotkey(key, options[key])
    return this
  }

  // accepts a function or url
  $.hotkey = function(key, value) {
    if (isInteger(key)) {
      $.hotkeys.cache[parseInt(key)] = value;
    }
    else {
      $.hotkeys.cache[key.charCodeAt(0) - 32] = value
    }
    return this
  }
  
  $.hotkeys.cache = {}
})(jQuery)

jQuery(document).ready(function($) {  
  $('a[hotkey]').each(function() {
    $.hotkey($(this).attr('hotkey'), $(this).attr('href'))
  })

  $(document).bind('keydown.hotkey', function(e) {
    // don't hotkey when typing in an input
    if ($(e.target).is(':input')) return
    // no modifiers supported 
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return true
    var el = $.hotkeys.cache[e.keyCode]
    if (el) $.isFunction(el) ? el.call(this) : window.location = el
  })
});
