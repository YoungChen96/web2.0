var resultArray = new Array();
var trArray;
var tbodyArray;
var index;
$(document).ready(init);

function init() {
    $("th").click(function() {
        trArray = $(this).parents("table").find("tbody tr");
        tbodyArray = $(this).parents("table").find("tbody");
        index = $(this).index();
        resultArray.length = 0;
        $(trArray).find("td").each(function() {
            if ($(this).index() == index)
                resultArray.push($(this).text());
        });
        if ($(this).hasClass("asend")) {
            $('th').removeClass();
            $(this).addClass("desend");
            desend();
        } else {
            $('th').removeClass();
            $(this).addClass("asend");
            asend();
        }
    });
}

function asend() {
    resultArray.sort();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var bodyTds = $(trArray[j]).find("td");
            if (bodyTds[index].innerHTML == resultArray[i]) {
                tbodyArray.append(trArray[j]);
            }
        }
    }
}

function desend() {
    resultArray.sort();
    for (var i = 2; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            var bodyTds = $(trArray[j]).find("td");
            if (bodyTds[index].innerHTML == resultArray[i]) {
                tbodyArray.append(trArray[j]);
            }
        }
    }
}