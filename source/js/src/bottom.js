
  });

}( jQuery ));

// JavaScript micro-templating, from underscore.js
function tmpl(str) {
  var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
    'with(obj||{}){__p.push(\'' +
    str.replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(/<%-([\s\S]+?)%>/g, function(match, code) {
         return "',esc(" + code.replace(/\\'/g, "'") + "),'";
       })
       .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
         return "'," + code.replace(/\\'/g, "'") + ",'";
       })
       .replace(/<%([\s\S]+?)%>/g, function(match, code) {
         return "');" + code.replace(/\\'/g, "'")
                            .replace(/[\r\n\t]/g, ' ') + ";__p.push('";
       })
       .replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       + "');}return __p.join('');";
  var func = new Function('obj', tmpl);
  return function(data) {
    return func.call(this, data);
  };
};