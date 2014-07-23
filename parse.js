function githubParser(code) {
  var m = [];
  m = (code.html).match(/(<td class="blob-line-code">)[\S\s]*?(<\/td>)/mg);
  m = m[0].match(/(<div class="line" id="LC)[\S\s]*?(<\/span><\/div>)/mg);

  var snippet1 = "";
  m.forEach(function(entry) {
    entry = entry.replace(/<div[\S\s]*?>|<\/div>|<span[\S\s]*?>|<\/span>/mg, "");
    entry = entry.replace(/&amp;/mg, '"&"');
    entry = entry.replace(/&lt;/mg, "<");
    entry = entry.replace(/&gt;/mg, ">");
    entry = entry.replace(/&nbsp;/mg, " ");
    entry = entry.replace(/"&"/mg, "&");
    entry = entry.replace(/<br>/mg, "\n");
    snippet1 += entry;
    snippet1 += "\n";
  });
  return snippet1;
}
