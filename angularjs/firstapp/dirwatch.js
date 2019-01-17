var dirContent = [".gitignore","dirwatch","dirwatch.exe","dirwatch.js","fourth.html","index.html","multi-ctrl.html","multi-view.html","node_modules","package-lock.json","package.json","second.html","third.html"];

document.write("<div id='dirwatcher'>");
dirContent.forEach(item => {
  if(item.endsWith(".htm") || item.endsWith(".html"))
    document.write("<a href='" + item + "'>" + item + "</a>&nbsp;&nbsp;")
});

document.write("<br /><hr /><br /></div>");

