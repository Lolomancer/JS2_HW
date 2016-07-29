"use strict";

var xmlhttp = new XMLHttpRequest();

var Reflector = function(obj) {
    this.getProperties = function() {
        var properties = [];
        for (var prop in obj) {
            if (typeof obj[prop] != 'function') {
                properties.push(prop);
            }
        }
        return properties;
    }
};

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var parsedAnswer = JSON.parse(xmlhttp.responseText);
        if (parsedAnswer.length == 0) return;
        var reflector = new Reflector(parsedAnswer[0]);
        var list = reflector.getProperties();
        for (var i=0; i<parsedAnswer.length; i++) {
            var e = document.createElement('li');
            var innerHTMLText = '';
            for (var j=0; j<list.length; j++) {
                innerHTMLText += list[j] + ':&nbsp;' + parsedAnswer[i][list[j]] + '<br>';
            }
                e.innerHTML = innerHTMLText+'<br>';
                document.getElementById('list').appendChild(e);

        }
    }
};

xmlhttp.open('GET', 'phones.json', true);
xmlhttp.send();


