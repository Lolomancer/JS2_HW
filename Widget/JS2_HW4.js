function Clock(options) {
    var elem = options.elem;

//Функция установления "правильного" времени.
    function setTime() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        var hours = d.getHours();
        elem.querySelector('.time').innerHTML = t;
    }

//Механизм "кнопки-переключателя".
    var button;

//Переключатель на "вкл".
    this.start = function (){
         button = setInterval(setTime, 250);
     };

//Переключатель на "выкл".
    this.stop = function() {
        clearInterval(button);
    };

//Эмитация синхронизации времени.
    this.alarm = function () {
        var x = document.getElementById('first');
        if (x == undefined) return;
        this.stop();
        setTimeout(function () {x.getElementsByClassName('time')[0].style.color='transparent'}, 500);
        setTimeout(function () {x.getElementsByClassName('time')[0].style.color='black'}, 1000);
        setTimeout(function () {x.getElementsByClassName('time')[0].style.color='transparent'}, 1500);
        setTimeout(function () {x.getElementsByClassName('time')[0].style.color='black'}, 2000);
        setTimeout(this.start, 2500);
    }
}

//Новые часы.
var clock = new Clock({
    elem: document.getElementById('first')
});

//Тест.
clock.start();
clock.stop();
