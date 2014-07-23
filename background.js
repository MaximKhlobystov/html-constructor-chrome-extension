chrome.windows.onCreated.addListener(function() {//triggered when a new window is opened
  if(localStorage["prototype-showed"] == "False") {
    localStorage.clear();
  } else localStorage["prototype-showed"] = "False";
})

chrome.runtime.onInstalled.addListener(function() {//triggered when extension is first installed or updated
  localStorage.clear();
  localStorage["prototype-showed"] = "False";
})

chrome.commands.onCommand.addListener(function(command) {
  if(command == "send-snippet") {
    chrome.tabs.query( {
      active: true,
      lastFocusedWindow: true
    },
    function(array_of_Tabs) {
      var tab = array_of_Tabs[0], notification;
      
      if(localStorage["projector-snippet-count"] === undefined) localStorage["projector-snippet-count"] = 1;
      else localStorage["projector-snippet-count"]++;

      localStorage["projector-snippet-title" + localStorage["projector-snippet-count"]] = tab.title;
      localStorage["projector-snippet-url" + localStorage["projector-snippet-count"]] = tab.url;

      var urlString = tab.url;

      if(urlString.substring(urlString.length - 5, urlString.length) == ".html")
        localStorage["projector-snippet-lang" + localStorage["projector-snippet-count"]] = "html";
      if(urlString.substring(urlString.length - 4, urlString.length) == ".css")
        localStorage["projector-snippet-lang" + localStorage["projector-snippet-count"]] = "css";

      chrome.tabs.executeScript(tab.id, {code: "chrome.runtime.sendMessage({ html: document.getElementsByTagName('html')[0].innerHTML });"});
    });
  }
});

chrome.runtime.onMessage.addListener(function(request) {
  localStorage["projector-snippet-code" + localStorage["projector-snippet-count"]] = githubParser(request);
});
