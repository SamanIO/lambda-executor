exports.handler = function(event, context) {
  var results = [];
  var i = 1;

  while (true) {
    results.push(new Array(i++));
  }
};
