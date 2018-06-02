$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMQfX4qnTUdBiB58RlkBH_u8tr_LGfniXtnsVxi0Btffp9YvilT3PiUL7rLfVAxGFmt6GMVgBItN6F/pub?output=csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push([headers[j],data[j]]);
            }
            lines.push(tarr);
        }
    }

    console.log(lines);

    generateMarkup(lines);
}

function generateMarkup(lines) {
    var header = 1;
    var markup = "";
    markup += "<table>";
    for (var i=0; i < lines.length; i++) {
        if (header == 1) {
            markup += "<thead>";
            markup += "<tr>";
            for (var j = 0; j < lines[i].length; j++) {
                var data = "<th>" + lines[i][j][0].replace(/['"]+/g, '') + "</th>";
                markup += data;
            }
            markup += "</tr>";
            markup += "</thead>";
            header = 0;
        }
        markup += "<tr>";
        for (var j = 0; j < lines[i].length; j++) {
            var data = "<td";
            if (lines[i][j][0] == 'Accompanists') {
                data += " class='multiline'";
            }
            data += ">"
            var input = lines[i][j][1];
            input = input.replace(';', '\n\n');
            data += input.replace(/['"]+/g, '') + "</td>"; 
            markup += data;
        }
        markup += "</tr>";
    }
    markup += "</table>"

    $("#schedule").append(markup);
}
