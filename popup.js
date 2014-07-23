$(document).ready(function() {
  localStorage["buffer"] = "";//ID for the currently chosen snippet box
  localStorage["hovered-id"] = "";//ID for the currently hovered snippet box
  localStorage["rrh"] = "";//HTML "ready to run" box
  //CSS "ready to run" boxes:
  localStorage["rrc1"] = "";
  localStorage["rrc2"] = "";
  localStorage["rrc3"] = "";
  localStorage["rrc4"] = "";
  
  localStorage["projector-snippet-code"] = "";

  var htmlSnippets = document.getElementById("html-snippets");
  var cssSnippets = document.getElementById("css-snippets");

  for(var i = 1; i <= localStorage["projector-snippet-count"]; i++) {
    if(localStorage["projector-snippet-code" + i] != "") {
      var newElement = document.createElement("p");
      newElement.setAttribute("class", "boxes");
      newElement.setAttribute("id", "sn" + i);
      newElement.textContent = cutName(localStorage["projector-snippet-url" + i]);
      if(localStorage["projector-snippet-lang" + i] == "html")
        htmlSnippets.appendChild(newElement);
      if(localStorage["projector-snippet-lang" + i] == "css")
        cssSnippets.appendChild(newElement);
    }
  }

  $('.boxes').hover(
    function () {
      if(localStorage["buffer"] == "") {
        $(this).css("color", "#5E5E5E");
        $(this).css("border", "2px solid #D7D7D7");
        $(this).css("background-color", "#DEDEDE");
      }

      var snippetPre = document.getElementById("snippet-field");
      snippetPre.textContent = localStorage["projector-snippet-code" + this.id[2]];

      localStorage["hovered-id"] = this.id[2];
    },
    function () {
      if(localStorage["buffer"] == "") {
        $(this).css("color", "black");
        $(this).css("border", "2px solid #666666");
        $(this).css("background-color", "#ccc");
      }
    }
  );

  $(".boxes").dblclick(function() {
    localStorage["projector-snippet-url" + this.id[2]] = "";
    localStorage["projector-snippet-lang" + this.id[2]] = "";
    localStorage["projector-snippet-code" + this.id[2]] = "";
    localStorage["projector-snippet-title" + this.id[2]] = "";
    $(this).remove();
  });

  $(".boxes").click(function() {
    if(localStorage["buffer"] == "") {
      localStorage["buffer"] = this.id[2];
      $(this).css("color", "#OA141F");
      $(this).css("border", "2px solid #OA141F");
      $(this).css("background-color", "#85A3C2");
      $(this).animate({height:"40px"}, 500);
    } else {
      if(localStorage["buffer"] == this.id[2]) {//we click to the box that is currently opened
        localStorage["buffer"] = "";
        $(this).css("color", "black");
        $(this).css("border", "2px solid #666666");
        $(this).css("background-color", "#ccc");
        $(this).animate({height:"20px"}, 500);
      } else {//there's an opened box somewhere else

        //put currently opened box into its initial mode
        $("#sn" + localStorage["buffer"]).css("color", "black");
        $("#sn" + localStorage["buffer"]).css("border", "2px solid #666666");
        $("#sn" + localStorage["buffer"]).css("background-color", "#ccc");
        $("#sn" + localStorage["buffer"]).animate({height:"20px"}, 500);
        
        //open the box pointed
        localStorage["buffer"] = this.id[2];
        $(this).css("color", "#FF33CC");
        $(this).css("border", "2px solid #FF33CC");
        $(this).css("background-color", "#FFFFFF");
        $(this).animate({height:"40px"}, 500);
      }
    }
  });

  $("#open").click(function() {
  	var wnd = window.open("about:blank", "", "width=1000,height=500,top=150,left=0");
    $(wnd.document.body).html(merge(localStorage["projector-snippet-code" + localStorage["rrh"]], localStorage["projector-snippet-code" + localStorage["rrc1"]], localStorage["projector-snippet-code" + localStorage["rrc2"]], localStorage["projector-snippet-code" + localStorage["rrc3"]], localStorage["projector-snippet-code" + localStorage["rrc4"]]));
    localStorage["prototype-showed"] = "True";
  });

  $("#preview").click(function() {
    if($("#h").text() != "HTML") {
      var snippetPre = document.getElementById("snippet-field");
      snippetPre.textContent = merge(localStorage["projector-snippet-code" + localStorage["rrh"]], localStorage["projector-snippet-code" + localStorage["rrc1"]], localStorage["projector-snippet-code" + localStorage["rrc2"]], localStorage["projector-snippet-code" + localStorage["rrc3"]], localStorage["projector-snippet-code" + localStorage["rrc4"]]);
      localStorage["hovered-id"] = "";//this is not and editor anymore, we are previewing the merged code right now
    }
  });

  $("#save").click(function() {
    //check if this is not just a preview mode:
    if(localStorage["hovered-id"] != "") localStorage["projector-snippet-code" + localStorage["hovered-id"]] = $("#snippet-field").text();
  });

  $(".ready-to-run").click(function() {
    if(localStorage["buffer"] != "") {
      if((localStorage["projector-snippet-lang" + localStorage["buffer"]] == "html" && $(this).attr("id") == "h") || (localStorage["projector-snippet-lang" + localStorage["buffer"]] == "css" && $(this).attr("id")[0] == "c")) {
        $(this).text(cutName(localStorage["projector-snippet-url" + localStorage["buffer"]]));
        $("#sn" + localStorage["buffer"]).css("color", "black");
        $("#sn" + localStorage["buffer"]).css("border", "2px solid #666666");
        $("#sn" + localStorage["buffer"]).css("background-color", "#ccc");
        $("#sn" + localStorage["buffer"]).animate({height:"20px"}, 500);
        localStorage["rr" + $(this).attr("id")] = localStorage["buffer"];
        localStorage["buffer"] = "";
      }
    }
  });
});
