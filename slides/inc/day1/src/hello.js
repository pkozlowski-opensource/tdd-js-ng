// slide:start:hellojs;
var isIE = document.attachEvent;

var addEventListener = isIE  ? function (e, t, fn) {
    e.attachEvent('on' + t, fn);
  } : function (e, t, fn) {
    e.addEventListener(t, fn, false);
  };

addEventListener(document, 'load', function () {
  var greeting = document.getElementById('greeting');
  if (isIE) {
    greeting.innerText = 'Hello World!';
  } else {
    greeting.textContent = 'Hello World!';
  }
});
// slide:end