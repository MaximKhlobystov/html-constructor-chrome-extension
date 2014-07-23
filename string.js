//count the length of indentation at this particular place
function indentationHere(string, index) {
  var i = index - 1;
  var count = 0;
  while(string[i] != '\n') {
    count++;
    i--;
  }
  return count;
}

//adds specific indentation before the string
function indentString(string, indent) {
  var spaces = "";
  for(var k = 0; k < indent; k++) spaces = spaces + " ";
  for(var i = 0; i < string.length; i++) {
    if(string[i] == '\n') string = string.substring(0, i + 1) + spaces + string.substring(i + 1);
  }
  return string;
}

//cuts filename so it can be showed in a snippet box
function cutName(name) {
  var filenames = [];
  filenames = name.match(/[^\/]+\.\w+$/ig);
  if(filenames[0].length > 15) return "..." + filenames[0].slice(filenames[0].length - 10);
  else return filenames[0];
}

//inserts CSS code inside HTML
function merge(html, c1, c2, c3, c4) {
  c = [c1, c2, c3, c4];
  var i = html.search(/<head>/);
  var j = html.search(/<html>/);
  var count;

  if(i != -1) {
    count = i + 6;
    while(html[count] != '<') {
      count++;
    }
  } else {
    count = j + 6;
    while(html[count] != '<') {
      count++;
    }
  }

  var indentation = indentationHere(html, count);

  var spaces = "";
  for(var k = 0; k < indentation; k++) spaces = spaces + " ";

  for(var k = 3; k >= 0; k--) {
    if(c[k] != "") {
      if(i != -1) {
        html = html.substring(0, i + 6) + "\n" + spaces + "<style>\n" + spaces + indentString(c[k], indentation) + "\n" + spaces + "</style>\n" + html.substring(i + 6);
      } else {
        html = html.substring(0, j + 6) + "\n" + spaces + "<style>\n" + spaces + indentString(c[k], indentation) + "\n" + spaces + "</style>\n" + html.substring(j + 6);
      }
    }
  }

  return html;
}
