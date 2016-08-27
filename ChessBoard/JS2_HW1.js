"use strict";

function ChessBoard (selector, selectorCan, primary, secondary, casual, wholem, clm) {

    this.primary = primary;            //цвет "белых".
    this.secondary = secondary;        //цвет "чёрных".
    this.casual = casual;              //цвет активной ячейки.
    this.wholem = wholem;              //общее количество шашечек.
    this.selector = selector;
    this.selectorCan = selectorCan;   //назначение элемента полотна для создания доски.
    this.clm = clm;                   //назначение количества рядов.


    var figcanvas = document.getElementById('fig'+this.selectorCan); //Отдельное полотно для фигур.
    var canvas = document.getElementById(this.selectorCan);          //Полотно.
    var context = canvas.getContext('2d');                           //Контекст полотна.
    var figctx = figcanvas.getContext('2d');                         //Контекст фигур.
    var picture = document.getElementById('pic');                    //Ссылка на картинку с фигурами.
    var ii = 0;     //Переменная подсчёта цикла для шашечек/рядов.
    var fin = 0;    //Переменная подсчёта цикла для закрашивания цветом.
    var cycle = 0;  //Переменная подсчёта соотношения ряда к колонне.
    var arr = [];   //Массив для хранения идентификаторов дивов.
    var temp = [];  //Массив для оконтовки нажатой шашечки.
    var figuresAll = []; //Массив активных координат.
    var anchor = null;   //Буферная переменная для хранения условной ссяылки на фигуру.

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
         var canH = (this.wholem/this.clm)*58;
         var f2 = document.getElementById(this.selectorCan);
         var f3 = document.getElementById('fig'+this.selectorCan);
         f3.width = canW;
         f3.height = canH;
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
        context.font = "40px Verdana black";
        context.fillStyle = 'black';
//Буквы.
        context.fillText("A", 45, 32);
        context.fillText("B", 100, 32);
        context.fillText("C", 151, 32);
        context.fillText("D", 205, 32);
        context.fillText("E", 260, 32);
        context.fillText("F", 315, 32);
        context.fillText("G", 363, 32);
        context.fillText("H", 415, 32);
//Числа.
        context.fillText("8", 5, 78);
        context.fillText("7", 5, 129);
        context.fillText("6", 5, 184);
        context.fillText("5", 5, 235);
        context.fillText("4", 5, 289);
        context.fillText("3", 5, 341);
        context.fillText("2", 5, 395);
        context.fillText("1", 5, 447);
    }

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

                    var figInCell = function (number) {
                        if (number > 15) {
                            number += 32;
                        }
                        //Из-за обратного порядка отрисовки белых фигур, данная формула меняет значение "cell" на верное.
                        if (number >= 48 && number<=55) {
                            number = 55-number+48;
                        } else if (number>55) {
                            number = 64-number+55
                        }
                        return number;
                    };
                    //Изначальная отрисовка фигур на поле.
                    for (var i=0; i<figcords.length; i++) {
                        figctx.drawImage(picture, figcords[i].a, figcords[i].b, figcords[i].c,
                            figcords[i].d, figcords[i].e, figcords[i].f, figcords[i].g, figcords[i].h);

                        //Назначение каждой отрисованной фигуре своего положения на поле и хранение этих данных.
                        figuresAll.push({coord1:figcords[i].a, coord2:figcords[i].b, coord3:figcords[i].c,
                            coord4:figcords[i].d, pos1:figcords[i].e, pos2:figcords[i].f,
                            pos3:figcords[i].g, pos4:figcords[i].h, cell: ('cell'+figInCell(i))
                        });
                    }
                }
            };
            xmlhttp.open('GET', 'coords.json', true);
            xmlhttp.send();
        }
    }

    arr.pop();

//---------------------------------------Активный интерфейс---------------

//Функция отрисовки фигуры.
    function figureDraw (departure, destination) {

        var a = 40, b = 93, c = 146, d = 199, e = 252, f = 305, g = 358, h = 411,
            r8 = 40, r7 = 93, r6 = 146, r5 = 199, r4 = 252, r3 = 305, r2 = 358, r1 = 411;

        //Отрисовка фигуры на очищенном поле
        var ticket = null; //переменная для хранения координат фигуры в "image".
        for (var i=0; i<figuresAll.length; i++) {
            if (figuresAll[i].cell == departure.cell) {
                ticket = {c1: figuresAll[i].coord1, c2:figuresAll[i].coord2,
                          c3:figuresAll[i].coord3, c4:figuresAll[i].coord4};
                for (var j=0; j<figuresAll.length; j++) {
                    if (figuresAll[j].cell == destination.cell) {
                        figuresAll[j].cell = null;
                        break;
                    }
                }
                figuresAll[i].cell = destination.cell;
                break;
            }
        }
        if (ticket == null) {return false}

        //Очистка поля от переносимой фигуры
        figctx.clearRect(eval(departure.rowCol.toLowerCase().charAt(0)), eval('r'+departure.rowCol.charAt(1)), 45, 45);

        //Очистка поля для новой фигуры
        figctx.clearRect(eval(destination.rowCol.toLowerCase().charAt(0)),
            eval('r'+destination.rowCol.charAt(1)), 45, 45);
        figctx.drawImage(picture, ticket.c1, ticket.c2, ticket.c3, ticket.c4,
                         eval(destination.rowCol.toLowerCase().charAt(0)),
                         eval('r'+destination.rowCol.charAt(1)), 45, 45);
        return true;
    }

//Функция вывода значения клетки.
    function scout() {
        document.getElementById('cell64').style.color = 'red';
        document.getElementById('cell64').style.fontSize = 'xx-large';
        document.getElementById('cell64').innerHTML = this.innerText;

        //Реализация перемещения фигуры по клику на поле.
        if (anchor == null) {
            anchor = {rowCol: this.innerText,
                      cell: this.id};
        } else {
            var portal = {rowCol: this.innerText, cell: this.id};

        //Отмена переноса фигуры по второму клику на то же поле.
            if (portal === anchor.rowCol) {
                anchor = null;
                return;
            }
        //Реализиция корректой работы при выделенном поле без фигуры.
            if (figureDraw(anchor, portal)){
                anchor = null;
            } else {
                anchor = {rowCol: this.innerText,
                    cell: this.id};
            }
        }
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
        for (var i = 0; i < arr.length; i++) {
            document.getElementById(arr[i]).addEventListener('click', scout);
            document.getElementById(arr[i]).addEventListener('click', tap);
        }
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