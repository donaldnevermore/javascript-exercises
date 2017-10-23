var text = "cat,bat,sat,fat";
var pattern = /.at/;
var matches = text.match(pattern);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern.lastIndex);

var pos = text.search(/at/);
console.log(pos);

var result = text.replace(/at/g, "ond");
console.log(result);