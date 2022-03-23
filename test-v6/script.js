$(function() {
  var dataFile = [];
    
  $.getJSON('https://test.jeanfernandez.repl.co/dataFile.json', function(data) {
    $.each(data.dataFile, function(i, f) {
      var tblRow = "<tr>" + "<td>" + f.date + "</td>" + "<td>" + f.title + "</td>" + "<td>" + f.preview + "</td>"
      $(tblRow).appendTo("#userdata tbody");
    });
  });
});