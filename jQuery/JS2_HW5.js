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
    var dataObj = $('#dataShell').serialize();  //Получение значения полей в более-менее адекватном виде.
    var endOfName = dataObj.indexOf('&');       //Значение имени, отделённое от прочего.
    $.post('validator.php', dataObj, function (resultData) {
        //Внесение информации об успешной отправке в 'div'
        if (resultData == '{"result":true}') {
            document.getElementById('tabContent1').innerHTML = ('Information submited.'+'<br>'+'Please proceed, citizen '
            +dataObj.substring(9,endOfName));
            document.getElementById('tabContent2').innerHTML = ('Information submited.'+'<br>'+'Please proceed, citizen '
            +dataObj.substring(9,endOfName));
            document.getElementById('tabContent3').innerHTML = ('Information submited.'+'<br>'+'Please proceed, citizen '
            +dataObj.substring(9,endOfName))
        } else {
            errorHandler(resultData);
        }
    })
}

//Реализация прогресс-бара.
function progressBar (){
    var prBar = function (checker) {
        $('.inp').each(function () {
            if ($(this).val().length > 0) checker = checker + 1; //Проверка заполненности формы.
        });
        $('#progress').progressbar({value: checker, 'max':7
        });
        var complete = function () {
            if (checker<7) {return checker*15+'%'}
            else return 'Complete!';                             //Вывод текста в случае, если нет пустых полей.
        };
        $('#progressVal').html(complete)
    };
    var progress = 1;                                            //Реализация для изначально 100% автозаполнения.
    prBar(progress);
    $('#dataShell').change(function () {
        var progress = 0;                                        //Проверка изменения значения в форме.
        prBar(progress);
        });
}

//Реализация возврата текста ошибки через JQui_Dialog.
function errorHandler (resultData) {
    var res = JSON.parse(resultData);
    var resMessage = '';
    for (var prop in res.error) {
        resMessage += res.error[prop] + ',<br>';
        $('#'+prop.toLowerCase()).effect('highlight', 2500);       //Эффект подсвечивания полей с ошибкой.
    }
    resMessage = resMessage.replace(/,<br>$/, "") + ".";           //Замена запятой на точку в диалоговом окне.
    $('#errors').dialog({position:{my: 'left bottom', at: 'left'}})
                .html(resMessage)
                .dialog('open');
}

$ (function () {
    progressBar();                                                  //Вызов прогресс-бара.
    $('#birth').datepicker({dateFormat:'yy/mm/dd'})                 //Календарь в нужном формате.
               .datepicker('setDate', new Date());
});