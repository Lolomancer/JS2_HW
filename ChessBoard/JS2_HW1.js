"use strict";

var props = {
    selector: 'chessboard',
    selectorCan: 'board',    //Назначение элемента полотна для создания доски.
    primary: 'purple',       //Цвет "белых".
    secondary: 'black',      //Цвет "чёрных".
    casual: 'gold',          //Цвет активной ячейки.
    wholem: 64,              //Общее количество шашечек.
    clm: 8                   //Назначение количества колонн.
};

function ChessBoard (props) {

    let figcanvas = document.getElementById('fig'+props.selectorCan);   //Отдельное полотно для фигур.
    let canvas = document.getElementById(props.selectorCan);            //Полотно.
    this.picture = document.getElementById('pic');                      //Ссылка на картинку с фигурами.
    this.picture.style.display = "none";                                //Скрытие картинки-паттерна.

    this.chessMaster = {                                //Объект конструктора.
        context: canvas.getContext('2d'),               //Контекст полотна.

        color: {                                        //Свойства для закрашивания шашечек.
            odd: "white",
            even: "black",
            border: "solid "+ props.casual
        },

        styleSheet: document.styleSheets[0],            //Доступ к styles.css.

        styleHover: function() {                        //Стиль рамки.
            this.styleSheet.insertRule(
            ".cell:hover {animation: fadingframe 2s infinite; "+
            "border: "+this.color.border+";"+
            "@-webkit-animation: fadingframe 2s infinite;"+
            "visibility: visible;}", 2)},

        styleHoverFade: function() {                    //Эффект угасания.
            this.styleSheet.insertRule(
            "@-webkit-keyframes fadingframe" +
            "{1% { opacity: 0; } 50% {opacity: 1;} 100% { opacity: 0; }}", 3)},

        arr: [],                                        //Массив для хранения идентификаторов дивов.

        cycle: 0                                        //Переменная подсчёта соотношения ряда к колонне.
    };

    this.board = function() {                           //Функция построения доски.
        var fin = 0;                                    //Переменная подсчёта цикла для закрашивания цветом.
        var i = 0;
        var tumbler = 0;                                //Переменная подсчёта цикла для шашечек/рядов.

        let cell_create = ((a, b, c) => {               //Создание div+css, с расположением относительно клеток полотна.
            var column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];        //Массив с буквами для колонн.
            var x = document.createElement('DIV');                        //Переменная для дива над шашечкой.
            var coord = document.createTextNode(
                column[this.chessMaster.cycle] + (8 - c));                //Переменная с определением имён для шашечек.
            x.setAttribute('id', ('cell' + fin));                         //Назначение идентификатора дива.
            x.setAttribute('class', 'cell');
            x.appendChild(coord);                                         //Назначение имён для шашечек.
            x.setAttribute('style', "width : 50px; height : 50px;" +      //Назначение размера и позиции дива стилями.
                "position:absolute; left:" + a + "px; top:" + b + "px;");
            this.chessMaster.arr.push(x.id);                              //Наполнение массива значениями id.
            document.getElementById(props.selector).appendChild(x);       //Создание дива.
        });

         let canW = (props.clm)*57+50;                                    //Определение и назначение размера полотна.
         let canH = (props.wholem/props.clm)*58;
         let f2 = document.getElementById(props.selectorCan);
         let f3 = document.getElementById('fig'+props.selectorCan);
         f3.width = canW;
         f3.height = canH;
         f2.width = canW;
         f2.height = canH;

        this.pick = function () {                           // Внутренняя функция выборки цвета для шашечек.
            this.x = {
                color: fin % 2 === 0 ? this.chessMaster.color.even : this.chessMaster.color.odd
            };
            return this.x.color;
        };

        this.switcher = function () {
            if (tumbler % 2 === 0) {
                this.chessMaster.color.odd = props.primary;
                this.chessMaster.color.even = props.secondary;
                this.chessMaster.color.border = ("solid"+" "+props.casual)
            }
            else {
                this.chessMaster.color.odd = props.secondary;
                this.chessMaster.color.even = props.primary
            }
        };

        for (i = 0; fin <= props.wholem;
             i++, fin++, this.chessMaster.cycle++) {            //Цикл для определения и реализации параметров шашечек.

            this.pick();

            this.chessMaster.context.fillStyle = this.pick();

            this.switcher(); //Вызов переключателя "чёт-нечет".

            this.chessMaster.context.fillRect(x, a, b, z); //Собственно, шашечки.
            this.chessMaster.context.beginPath(); // Декорирование оконтовкой.
            this.chessMaster.context.rect(x, a, b, z); // Форма оконтовки.
            this.chessMaster.context.lineWidth = 1;         //|-\
            this.chessMaster.context.strokeStyle = "black"; //|---Параметры для оконтовки.
            this.chessMaster.context.stroke();              //|-/ Вызов.
            var pos = 53 * (i); //|-\
            var x = (37 + pos); //|--\
            var a = 37 + (tumbler * 53); //|----Параметры шашечек.
            var b = 50;         //|--/
            var z = 50;         //|-/
            cell_create.call
            (this, x + 6, a + 6, tumbler);       //Создание div+css для обработки взаимодействия с шашечками.

            if (i >= (props.clm-1)) {            //Условие для корректной реализации рядов.
                i = -1;
                tumbler++;
                this.chessMaster.cycle = -1;
                }
            }
        };

    this.letters = function () {                 //Функция для вывода буквенно-числовых знаков.

        this.chessMaster.context.font = "40px Verdana black";     //Параметры шрифта.
        this.chessMaster.context.fillStyle = "black";
                                                                  //Буквы.
        this.chessMaster.context.fillText("A", 45, 32);
        this.chessMaster.context.fillText("B", 100, 32);
        this.chessMaster.context.fillText("C", 151, 32);
        this.chessMaster.context.fillText("D", 205, 32);
        this.chessMaster.context.fillText("E", 260, 32);
        this.chessMaster.context.fillText("F", 315, 32);
        this.chessMaster.context.fillText("G", 363, 32);
        this.chessMaster.context.fillText("H", 415, 32);
                                                                  //Числа.
        this.chessMaster.context.fillText("8", 5, 78);
        this.chessMaster.context.fillText("7", 5, 129);
        this.chessMaster.context.fillText("6", 5, 184);
        this.chessMaster.context.fillText("5", 5, 235);
        this.chessMaster.context.fillText("4", 5, 289);
        this.chessMaster.context.fillText("3", 5, 341);
        this.chessMaster.context.fillText("2", 5, 395);
        this.chessMaster.context.fillText("1", 5, 447);
    };

    this.figures = (figureDraw => {                             //Фигуры
        let picture = this.picture;
        this.picture.src = 'img/chessboard.png';
        this.picture.onload = function () {

            let xmlhttp = new XMLHttpRequest();                 //Получение координат из файла "coords.json".

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let figcords = JSON.parse(xmlhttp.responseText);

                    let figInCell = (number => {
                        if (number > 15) {
                            number += 32;
                        }

                        if (number >= 48 && number<=55) {       //Из-за обратного порядка отрисовки белых фигур,
                            number = 55-number+48;              //данная формула меняет значение "cell" на верное.
                        } else if (number>55) {
                            number = 64-number+55
                        }
                        return number;
                    });

                    figcords.forEach ((pass, i) => {           //Изначальная отрисовка фигур на поле.
                        figureDraw.figctx.drawImage(picture, figcords[i].a, figcords[i].b, figcords[i].c,
                            figcords[i].d, figcords[i].e, figcords[i].f, figcords[i].g, figcords[i].h)});

                    figcords.forEach ((pass, i) => {
                        figureDraw.figuresAll.push({           //Назначение и хранение положения отрисованной фигуры.
                            coord1: figcords[i].a, coord2: figcords[i].b, coord3: figcords[i].c,
                            coord4: figcords[i].d, pos1: figcords[i].e, pos2: figcords[i].f,
                            pos3: figcords[i].g, pos4: figcords[i].h, cell: ('cell' + figInCell(i))
                        });
                    });
                }
            };
            xmlhttp.open('GET', 'coords.json', true);
            xmlhttp.send();
        }
    });

    this.chessMaster.arr.pop();

//---------------------------------------Активный интерфейс---------------

    var figureDraw = {                                         //Свойства для работы с оконтовкой и фигурами.
    draw: function(departure, destination)                     //Отрисовка фигуры.
    {

        let a = 40, b = 93, c = 146, d = 199, e = 252, f = 305, g = 358, h = 411,
            r8 = 40, r7 = 93, r6 = 146, r5 = 199, r4 = 252, r3 = 305, r2 = 358, r1 = 411;

        let ticket = null;                                     //Сохранение координат фигуры в "image".

            this.figuresAll.forEach ((pass, i) => {
            if (this.figuresAll[i].cell == departure.cell) {
                ticket = {
                    c1: this.figuresAll[i].coord1, c2: this.figuresAll[i].coord2,
                    c3: this.figuresAll[i].coord3, c4: this.figuresAll[i].coord4
                };

                this.figuresAll.forEach ((pass, j) => {
                    if (this.figuresAll[j].cell == destination.cell) {
                        this.figuresAll[j].cell = null;
                    }
                });
                this.figuresAll[i].cell = destination.cell;
            }
        });

        if (ticket === null) {
            return false
        }

        this.figctx.clearRect(eval(departure.rowCol.toLowerCase().charAt(0)),   //Очистка поля от переносимой фигуры.
            eval('r' + departure.rowCol.charAt(1)), 45, 45);

        this.figctx.clearRect(eval(destination.rowCol.toLowerCase().charAt(0)), //Очистка поля для новой фигуры.
            eval('r' + destination.rowCol.charAt(1)), 45, 45);

        this.figctx.drawImage(this.picture, ticket.c1, ticket.c2, ticket.c3, ticket.c4,
            eval(destination.rowCol.toLowerCase().charAt(0)),
            eval('r' + destination.rowCol.charAt(1)), 45, 45);

        return true;
        },

        picture: this.picture,
        figuresAll: [],                           //Массив активных координат.
        temp: [],                                 //Массив для оконтовки нажатой шашечки.
        anchor: null,                             //Буферная переменная для хранения условной ссяылки на фигуру.
        figctx: figcanvas.getContext('2d')        //Контекст фигур.
    };

    this.scout = function() {                     //Функция вывода значения клетки.
        document.getElementById('cell64').style.color = "red";
        document.getElementById('cell64').style.fontSize = "xx-large";
        document.getElementById('cell64').innerHTML = this.innerText;

        if (figureDraw.anchor === null) {                    //Реализация перемещения фигуры по клику на поле.
            figureDraw.anchor = {rowCol: this.innerText,
                      cell: this.id};
        } else {
            var portal = {rowCol: this.innerText,
                          cell: this.id};

            if (portal === figureDraw.anchor.rowCol) {       //Отмена переноса фигуры по второму клику на то же поле.
                figureDraw.anchor = null;
                return;
            }

            if (figureDraw.draw(figureDraw.anchor, portal)){ //Реализиция корректой работы выделенного поля без фигуры.
                figureDraw.anchor = null;
            } else {
                figureDraw.anchor = {rowCol: this.innerText,
                    cell: this.id};
            }
        }
    };


   this.tap = function () {                       //Функция залипания и отлипания оконтовки (нажатия).
        if (figureDraw.temp != 0) {
            document.getElementById(figureDraw.temp[0]).style.border = '';
        }
        document.getElementById(this.id).style.border = "solid "+props.casual;
       figureDraw.temp.pop();
       figureDraw.temp.push(this.id);
    };

    this.bigBro = function () {                   //Функция назначения элемента слежения за событием.
        this.chessMaster.arr.pop();
        const testo = this.figureDraw;
        for (var i = 0; i < this.chessMaster.arr.length; i++) {
            document.getElementById(this.chessMaster.arr[i]).addEventListener('click', this.scout);
            document.getElementById(this.chessMaster.arr[i]).addEventListener('click', this.tap);
        }
    };

 this.create = function () {                      //It has begun!
     this.chessMaster.styleHover();
     this.chessMaster.styleHoverFade();
     this.board.call(this);
     this.letters();
     this.figures(figureDraw);
     this.bigBro.call(this);
 }
}

var game = new ChessBoard(props);

game.create();