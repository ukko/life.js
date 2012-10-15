function Life()
{
    this.timer  = null;
    this.board  = new Board();
    this.cells  = [];
    this.count  = 0;
    this.countD  = 0;
    this.countL  = 0;

    this.countDays = $('#countDays');
    this.countDead = $('#countDead');
    this.countLive = $('#countLive');


    /**
     * Инициализация игры ЖИЗНЬ
     */
    this.init = function()
    {
        this.cells = this.seed( this.cells );
        this.board.stage.add( Grid() );
    };

    /**
     * Тут происходит вся жизнь клеток
     */
    this.live = function()
    {
        var cells = this.life(this.cells);
        this.board.stage.clear();

        this.board.drawCells( cells );
        this.board.stage.add( Grid() );
        this.board.stage.add( this.board.layer );

        // @FIXME
        this.board.layer = new Kinetic.Layer();

        // @TODO Вынести
        $(this.countDays).text(this.count);
        $(this.countDead).text(this.countD);
        $(this.countLive).text(this.countL);


        this.count++;
        this.cells = cells;
    }

    /**
     * Запускает "жизнь"
     */
    this.start = function( life )
    {
        if ( this.timer ) this.stop();

        var me = this;
        this.timer = window.setInterval(function(){ me.live() }, 1000);
    };

    /**
     * Останавливает "жизнь"
     */
    this.stop = function()
    {
        if ( this.timer !== null )
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
    this.getRandomInt = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   ;

    /**
     * Первоначальное рассеивание
     *
     * @param cells
     * @return {*}
     */
    this.seed = function( cells )
    {
        cells = this.feel( cells );
        for ( var i in cells )
        {
            for ( var j in cells[i] )
            {
                cells[i][j] = (this.getRandomInt(1, 2) === 2);
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
    this.feel = function ( cells )
    {
        for( var i = 0; i < this.board.cellsX; i++ )
        {
            cells[i] = [];
            for( var j = 0; j < this.board.cellsY; j++ )
            {
                cells[i][j] = null;
            }
        }
        return cells;
    }

    /**
     * Возвращает корректные координаты точки
     *
     * @param i
     * @return {*}
     */
    this.point = function( x )
    {
        i = parseInt(x);

        if ( i < 0 && i > -4 )
        {
            i = this.board.cellsX + i;
        }
        else if ( i > ( this.board.cellsX - 1 ) && i < ( this.board.cellsX + 2 ) )
        {
            i = (i + 1) - this.board.cellsX;
        }
        else if ( i >= 0 && i < this.board.cellsX )
        {
        }
        else
        {
            // @TODO Такого не может быть, удалить
            i = 0;
            console.log('life.point', i);
        }

        // @TODO удалить
        if (i < 0 || i > 49)
        {
            console.log(x, i);
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
    this.neighbourCount = function(cells, i, j )
    {
        var cnt = 0;

        x = this.point(i);
        y = this.point(j);

        for( var ii = -1; ii < 2; ii++ )
        {
            for( var jj = -1; jj < 2; jj++ )
            {
                var iii = this.point( x + ii );
                var jjj = this.point( y + jj );

                if (iii == x && jjj == x)
                {}
                else
                {
                    // @TODO Удалить
                    if ( cells[iii][jjj] == undefined )
                    {
                        console.log('life.neighbourCount undefined', iii, jjj);
                    }

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
                    console.log('life.life undefined',cells);
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

        return cells;
    };
};



