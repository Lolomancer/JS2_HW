"use strict";

//1.0

function changer(tab) {
    var tabId = tab.getAttribute('id').replace(/^\D+/g, '');        //Числовой идентификатор 'tab'
    $(".source.active").replaceWith(function () {                   //Выборка и замена всех 'div' на 'inactive'
        return '<div id="'+this.getAttribute('id')+'"class="source inactive">'+$(this).text()+'</div>'});
    var tabContent = document.getElementById('tabContent'+tabId);   //Получение идентификатора активного 'div'
    tabContent.setAttribute('class', 'source active');              //Замена класса активного элемента на 'active'
    $(".pressed").removeAttr("class");                              // |__Корректировка класса активного элемента 'tab'
    tab.setAttribute('class', 'pressed');                           // |
}


changer(tab1);


//2.


function submitHandler () {
//    var dataObj = $('#dataShell').serialize();
    var dataObj = {username:"username"};
    alert (dataObj);
    $.post('validator.php', dataObj, function (resultData) {
        alert (resultData);
    })
}