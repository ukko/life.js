/**
 * Жизнь
 * @constructor
 */
function Life()
{
    "use strict";

    /**
     * ID таймера
     * @type {null}
     */
    this.timer      = null;

    /**
     * Игровое поле
     * @type {Board}
     */
    this.board      = new Board();

    /**
     * Массив с ячейками
     * @type {Array}
     */
    this.cells      = [];

    /**
     * Количество прожитых "дней"
     * @type {Number}
     */
    this.count      = 0;

    /**
     * Количество мёртвых ячеек
     * @type {Number}
     */
    this.countD     = 0;

    /**
     * Количество живых ячеек
     * @type {Number}
     */
    this.countL     = 0;

    /**
     * Скорость "дня"
     * @type {Number}
     */
    this.speed      = 500;

    /**
     * @FIXME
     * @type {*|jQuery|HTMLElement}
     */
    this.countDays  = undefined;
    this.countDead  = undefined;
    this.countLive  = undefined;


    /**
     * Инициализация игры ЖИЗНЬ
     */
    this.init = function ()
    {
        this.cells = this.seed(this.cells);
        this.board.stage.add(this.board.grid.draw());
    };

    /**
     * Тут происходит вся жизнь клеток
     */
    this.live = function ()
    {
        var cells = this.life(this.cells);
        this.board.stage.removeChildren();

        this.board.drawCells(cells);
        this.board.stage.add(this.board.grid.draw());
        this.board.stage.add(this.board.layer);

        this.board.layer.removeChildren();

        // @TODO Вынести
        this.countDays.innerHTML = this.count;
        this.countDead.innerHTML = this.countD;
        this.countLive.innerHTML = this.countL;

        this.count = this.count + 1;
        this.cells = cells;

        cells = null;
    }

    /**
     * Сбрасывает данные сессии и перезапускает игру
     */
    this.refresh = function ()
    {
        this.stop();
        this.count  = 0;
        this.countD = 0;
        this.countL = 0;
        this.cells  = this.seed([]);
        this.start();
    };

    /**
     * Запускает "жизнь"
     */
    this.start = function ()
    {
        var me = this;

        if (this.timer) {
            this.stop();
        }

        this.timer = window.setInterval(function () { me.live() }, this.speed);
    };

    /**
     * Останавливает "жизнь"
     */
    this.stop = function ()
    {
        if (this.timer !== null)
        {
            window.clearInterval(this.timer);
            this.timer = null;
        }
    };

    /**
     * Выдаёт рандомное значение в пределах указанного диапазона
     *
     * @param min
     * @param max
     * @return {Number}
     */
    this.getRandomInt = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Первоначальное рассеивание
     *
     * @param cells
     * @return {*}
     */
    this.seed = function (cells)
    {
        cells = this.feel(cells);

        for (var i in cells)
        {
            for (var j in cells[i])
            {
                cells[i][j] = (this.getRandomInt(1, 10) === 1);
            }
        }
        return cells;
    };

    /**
     * Создаёт пустой массив ячеек
     *
     * @param cells
     * @return {*}
     */
    this.feel = function (cells)
    {
        var i, j;
        for (i = 0; i < this.board.cellsX; i = i + 1)
        {
            cells[i] = [];
            for (j = 0; j < this.board.cellsY; j = j + 1)
            {
                cells[i][j] = null;
            }
        }
        return cells;
    }

    /**
     * Возвращает корректные координаты точки
     *
     * @param x
     * @return {*}
     */
    this.point = function (x)
    {
        var i = parseInt(x, 10);

        if (i < 0 && i > -4)
        {
            i = this.board.cellsX + i;
        }
        else if (i > (this.board.cellsX - 1) && i < (this.board.cellsX + 2))
        {
            i = (i + 1) - this.board.cellsX;
        }

        // @TODO удалить
        if (i < 0 || i > 49)
        {
            console.warn(x, i);
        }

        return i;
    };

    /**
     * Возвращает количество соседей вокруг текущей клетки
     *
     * @param cells
     * @param i
     * @param j
     * @return {Number}
     */
    this.neighbourCount = function (cells, i, j)
    {
        var cnt = 0,
            x = this.point(i),
            y = this.point(j),
            ii, jj;

        for (ii = -1; ii < 2; ii = ii + 1)
        {
            for (jj = -1; jj < 2; jj = jj + 1)
            {
                var iii = this.point(x + ii);
                var jjj = this.point(y + jj);

                if (iii !== x || jjj !== x)
                {
                    if (cells[iii][jjj] == true)
                    {
                        cnt++;
                    }
                }
            }
        }

        return cnt;
    };

    /**
     *  - на пустом поле, рядом с которым ровно 3 живые клетки, зарождается новая клетка;
     *
     * - если у живой клетки есть 2 или 3 живые соседки, эта клетка продолжает жить;
     *
     * - если соседей меньше 2 или больше 3, клетка умирает (от «одиночества» или от «перенаселённости» соответственно).
     *
     * @param cells
     * @return {*}
     */
    this.life = function( cells )
    {
        for( var i in cells )
        {
            // @FIXME
            this.countD = 0;
            this.countL = 0;

            for( var j in cells[i] )
            {
                var nCnt = this.neighbourCount( cells, i, j );

                // @TODO Удалить
                if ( cells[i][j] == undefined ) {
                    console.warn('life.life undefined', cells);
                    return;
                }

                // @FIXME
                this.countD += 9 - nCnt;
                this.countL += nCnt;

                // живая
                if ( cells[i][j] == true )
                {
                    cells[i][j] = ( nCnt == 2 || nCnt == 3 ) ? true : false;
                }
                // пустое поле
                else
                {
                    cells[i][j] = (nCnt == 3);
                }
            }
        }

        nCnt = null;

        return cells;
    };
};



