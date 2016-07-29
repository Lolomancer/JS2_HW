"use strict";

function ChessBoard (selector, selectorCan, primary, secondary, casual, wholem, clm) {

    this.primary = primary;            //цвет "белых".
    this.secondary = secondary;        //цвет "чёрных".
    this.casual = casual;              //цвет активной ячейки.
    this.wholem = wholem;              //общее количество шашечек.
    this.selector = selector;
    this.selectorCan = selectorCan;   //назначение элемента полотна для создания доски.
    this.clm = clm;                   //назначение количества рядов.


    var canvas = document.getElementById(this.selectorCan);  //Полотно.
    var context = canvas.getContext('2d');                   //Контекст полотна.
    var letctx = canvas.getContext('2d');                    //Контекст букв.
    var figctx = canvas.getContext('2d');                    //Контекст фигур.
    var picture = document.getElementById('pic');   //Ссылка на картинку с фигурами.
    var ii = 0;     //Переменная подсчёта цикла для шашечек/рядов.
    var fin = 0;    //Переменная подсчёта цикла для закрашивания цветом.
    var cycle = 0;  //Переменная подсчёта соотношения ряда к колонне.
    var arr = [];   //Массив для хранения идентификаторов дивов.
    var temp = [];  //Массив для оконтовки нажатой шашечки.

    picture.style.display = 'none'; //Скрытие картинки-паттерна.

//Переменная для закрашивания шашечек.
    var color = {
        odd: 'white',
        even: 'black',
        border: 'solid gold'
    };

//Переключатель "чёт-нечет" для корректной наполнения цветом.
    function switcher() {
        if (ii % 2 == 0) {
            color.odd = this.primary;
            color.even = this.secondary;
            color.border = ('solid'+' '+this.casual)
        }
        else {
            color.odd = this.secondary;
            color.even = this.primary
        }
    }

//Функция создания div+css, с идентичным расположением по отношению к клеткам полотна.
    function cell_create(a, b, c) {
        var column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];        //Массив с буквами для колонн.
        var x = document.createElement('DIV');                        //Переменная для дива над шашечкой.
        var coord = document.createTextNode(column[cycle] + (8 - c)); //Переменная с определением имён для шашечек.
        x.setAttribute('id', ('cell' + fin));                         //Назначение идентификатора дива.
        x.setAttribute('class', 'cell');
        x.appendChild(coord);                                       //Назначение имён для шашечек.
        x.setAttribute('style', 'width : 50px; height : 50px;' +    //Назначение размера и позиции дива стилями.
            'position:absolute; left:' + a + 'px; top:' + b + 'px;');
        arr.push(x.id);                                             //Наполнение массива значениями id.
        document.getElementById(this.selector).appendChild(x);      //Создание дива.
    }

//Функция построения доски.
    function board() {
        var i = 0;

        //Определение и назначение размера полотна.
         var canW = (this.clm)*57+50;
         var canH = (this.wholem/this.clm)*57;
         var f2 = document.getElementById('board');
         f2.width = canW;
         f2.height = canH;

// Внутренняя функция выборки цвета для шашечек.
        function pick() {
            var x = {
                color: fin % 2 == 0 ? color.even : color.odd
            };
            return x.color;
        }

//Цикл для определения и реализации параметров шашечек.
        for (i = 0; fin <= this.wholem; i++, fin++, cycle++) {
            context.fillStyle = pick();
            switcher.call(this); //Вызов переключателя "чёт-нечет".
            context.fillRect(x, a, b, z); //Собственно, шашечки.
            context.beginPath(); // Декорирование оконтовкой.
            context.rect(x, a, b, z); // Форма оконтовки.
            context.lineWidth = 1;         //|-\
            context.strokeStyle = 'black'; //|---Параметры для оконтовки.
            context.stroke();              //|-/ Вызов.
            var pos = 53 * (i); //|-\
            var x = (37 + pos); //|--\
            var a = 37 + (ii * 53); //|----Параметры шашечек.
            var b = 50;         //|--/
            var z = 50;         //|-/
            cell_create.call
            (this, x + 6, a + 6, ii); //Создание div+css для обработки взаимодействия с шашечками.

            if (i >= (this.clm-1)) {
                i = -1;
                ii++;
                cycle = -1;
            } //Условие для корректной реализации рядов.
        }
    }

//Функция для вывода буквенно-числовых знаков.
    function letters() {
//Параметры шрифта.
        letctx.font = "40px Verdana black";
        letctx.fillStyle = 'black';
//Буквы.
        letctx.fillText("A", 45, 32);
        letctx.fillText("B", 100, 32);
        letctx.fillText("C", 151, 32);
        letctx.fillText("D", 205, 32);
        letctx.fillText("E", 260, 32);
        letctx.fillText("F", 315, 32);
        letctx.fillText("G", 363, 32);
        letctx.fillText("H", 415, 32);
//Числа.
        letctx.fillText("8", 5, 78);
        letctx.fillText("7", 5, 129);
        letctx.fillText("6", 5, 184);
        letctx.fillText("5", 5, 235);
        letctx.fillText("4", 5, 289);
        letctx.fillText("3", 5, 341);
        letctx.fillText("2", 5, 395);
        letctx.fillText("1", 5, 447);
    }

// Через цикл не отрисовывает, почему-то. Вручную пришлось задавать.

//Фигуры
    function figures() {
        var width = picture.width;
        var height = picture.height;
        picture.src = "img/chessboard.png";
        picture.onload = function () {
//Получение координат из файла "coords.json".
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var figcords = JSON.parse(xmlhttp.responseText);
                    for (var i=0; i<figcords.length; i++) {
                        figctx.drawImage(picture, figcords[i].a, figcords[i].b, figcords[i].c,
                            figcords[i].d, figcords[i].e, figcords[i].f, figcords[i].g, figcords[i].h)
                       }
                    }
                };
            xmlhttp.open('GET', 'coords.json', true);
            xmlhttp.send();
        }
    }

    arr.pop();

//---------------------------------------Активный интерфейс---------------

//Функция вывода значения клетки.
    function scout() {
        document.getElementById('cell64').style.color = 'red';
        document.getElementById('cell64').style.fontSize = 'xx-large';
        document.getElementById('cell64').innerHTML = this.innerText;
    }

//Функция залипания и отлипания оконтовки (нажатия).
    function tap() {
        if (temp != 0) {
            document.getElementById(temp[0]).style.border = '';
        }
        document.getElementById(this.id).style.border = color.border;
        temp.pop();
        temp.push(this.id);

    }

//Функция назначения элемента слежения за событием.
    function bigBro() {
        arr.pop();
        for (var i = 0; i < arr.length; i++)
            document.getElementById(arr[i]).addEventListener('click', scout);
        for (i = 0; i < arr.length; i++)
            document.getElementById(arr[i]).addEventListener('click', tap);
    }

//It has begun!
 this.create = function () {
     board.call(this);
     letters();
     figures();
     bigBro();
 }
}

var chessBoard = new ChessBoard('test', 'board', 'purple'); //элемент, полотно и цвет "белых".
chessBoard.secondary = 'black'; //цвет "чёрных".
chessBoard.casual = 'gold';     //цвет активной ячейки.
chessBoard.wholem = 64;         //общее число шашечек.
chessBoard.clm = 8;             //число колонн.
chessBoard.create();