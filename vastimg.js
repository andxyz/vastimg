// var dgram = require('dgram');
// var Buffer = require('buffer').Buffer;
// var socket = dgram.createSocket('udp4');

/* some example code */
// var hello = new Buffer('hello');
// socket.send(hello, 0, hello.length, 3000, 'andxyz.com');

var jQuery = require('jquery-browserify');

(function($) {
  var App = {},
  App.keyboard = {},
  App.keyboard.spacebar     = 32,
  App.keyboard.arrowleft    = 37,
  App.keyboard.arrowup      = 38,
  App.keyboard.arrowright   = 39,
  App.keyboard.arrowdown    = 40,
  App.keyboard.backspace    = 8,
  App.keyboard.enter        = 13,
  App.keyboard.esc          = 27,
  App.keyboard.questionmark = 191;

  var query = document.location.search,
        src = query.substring(1, query.length),
        img = $('img'),
       form = $('form'),
      input = $('input'),
       help = $('div'),
        log = function(){console && console.log.apply(console, arguments)}

  img.attr('src', src)
  form.submit(function () { log('canceling submit'); return false })

  /* listen/unlisten for top-level keyboard events */
  function listen (func) {
    func = func || key
    document.onkeydown =
      function (ev) { return func(ev.keyCode) }
  }
  function unlisten () { document.onkeydown = null }

  /** process keyCode value
  * http://www.javascripter.net/faq/keycodes.htm
  */
  function key (code) {
    if (code === App.keyboard.spacebar || (code >= App.keyboard.arrowleft && code <= App.keyboard.arrowdown)) {
      // unlisten()
      // location.href = '/'
      log("key: ", code);
    } else if (code === App.keyboard.questionmark || code === App.keyboard.esc) { // ?
      if (help.css('opacity') > 0.0) {
        help.css('opacity', 0.0);
      } else {
        help.css('opacity', 0.8);
        return false;
      }
    } else if (code === App.keyboard.backspace) {
      // bad();
      return false;
    } else {
      log("key: ", code);
    }
  }

  /* activate paste target input */
  function activateInput() {
    input.attr('value', src);
    input.show();
    listen();
    check();
    log("input activated");
  }
  activateInput()

  /* check paste target for new stuff, loss of focus */
  function check() {
    var value = input.val();
    if (value !== src) {
      unlisten()
      input.hide()
      if (!receive(value)) {
        log('bzzt: ' + value)
        activateInput()
      }
      return
    }

    if (document.activeElement !== input[0]) {
      log('paste target lost focus');
      input.focus();
      input.select();
    }

    if (input[0].selectionStart > 0 || input[0].selectionEnd < src.length) {
      log("paste target lost selection")
      input.select()
    }

    setTimeout(check, 100)
  }

  /* detect URLs in input */
  function receive(text) {
    var url = text.trim(), match
    if (url.match(/^(?:https?|data):/)) {
      if (match = url.match(/^https?:\/\/vastimg\.herokuapp\.com\/\?(.*)/)) {
        url = match[1]
      }
      preview(url);
      return url;
    }
  }

  /* preview pasted image */
  var previewImg = $(document.createElement("img")),
              ok = $(document.createElement("a"))
  ok.text("SHIP IT")
  function preview(url) {
    var href = "/?" + url
    log("preview: " + url)

    if (help.css('opacity') > 0.0) {
      help.css('opacity', 0.0)
    }

    previewImg.attr('src', url)
    form.append(previewImg)

    ok.attr('href', href)
    form.append(ok)

    img.css('opacity',  0.3)
    form.css('opacity', 0.9)

    listen(function (code) {
      if (code === App.keyboard.spacebar || code === App.keyboard.enter) {
        document.location = href
      } else if (code === App.keyboard.esc) {
        dismiss();
      }
    }, 200)
  }

  function dismiss() {
    activateInput()
    img.css('opacity',  1.0)
    form.css('opacity', 0.0)
    setTimeout(function () { form.find("img", "a").remove() }, 200)
  }

})(jQuery);
