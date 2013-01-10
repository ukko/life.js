window.onload = function () {
    "use strict";

    /**
     * Класс игры - жизнь
     * @type {Life}
     */
    var life        = new Life(),
        startBtn    = document.getElementById('start'),
        refreshBtn  = document.getElementById('refresh'),
        radioBtns   = document.getElementsByName('speed'),
        radioOnClick,
        radioLength = radioBtns.length;

    life.init();
    life.countDays = document.getElementById('countDays');
    life.countDead = document.getElementById('countDead');
    life.countLive = document.getElementById('countLive');

    startBtn.onclick = function () {

        var classes = (startBtn.getAttribute('class') || '').split(' '),
            i = classes.indexOf('btn-primary');

        if (i >= 0) {
            classes.push('btn-danger');
            this.value = 'Стоп ◼';
            life.start(life);
        } else {
            i = classes.indexOf('btn-danger');
            classes.push('btn-primary');
            this.value = 'Старт ▶';
            life.stop();
        }

        if (i >= 0) {
            delete classes[i];
        }

        this.setAttribute('class', classes.join(' '));
    };

    refreshBtn.onclick = function () {
        life.refresh();
    };

    radioOnClick = function () {
        var speed = {
                slow:   1000,
                normal: 500,
                fast:   100
            },
            val     = this.value;

        life.speed = speed[val] ? speed[val]:speed['normal'];

        if (life.timer !== null)
        {
            life.stop();
            life.start();
        }
    };

    while (radioLength = radioLength - 1) {
        radioBtns[radioLength].onclick = radioOnClick;
    }
};

