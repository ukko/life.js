require(
['app/grid'],
function( grid )
{
    var stage = new Kinetic.Stage({
        container: "container",
        width: 550,
        height: 550
    });

    var layer = new Kinetic.Layer();
    var cell = function(x, y) {
        var circle = new Kinetic.Circle({
            x: (x * 25) + 12.5,
            y: (y * 25) + 12.5,
            radius: 10,
            fill: "red",
            stroke: "black",
            strokeWidth: 1
        });

        layer.add( circle );
    };

    var drawRect = function(x, y)
    {
        return new Kinetic.Rect({
            x:      x * 10,
            y:      y * 10,
            width:  10,
            height: 10,
            fill:   '#000000'
        });
    }

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Первоначальное рассеивание
     *
     * @param cells
     * @return {*}
     */
    function seed( cells )
    {
        for( i = 0; i <= 50; i++ )
        {
            cells[i] = new Array(50);
            for( j = 0; j <= 50; j++ )
            {
                cells[i][j] = (getRandomInt(1, 2) === 2);
            }
        }
        return cells;
    }

    function point(i)
    {
        if ( i == -1 ) i = 50 + i;
        if ( i == 50 ) i = 50 - i;

        return i;
    }
    function parentCount(cells, i, j )
    {
        i = point(i);
        j = point(j);

        var cnt = 0;

        for( ii = i - 1; ii <= 3; ii++ )
        {
            for( jj = j - 1; jj <= 3; jj++ )
            {
                iii = point(ii);
                jjj = point(jj);

                if (iii == i && jjj == j)
                {}
                else
                {
                    if (cells[iii][jjj] == true)
                    {
                        cnt++;
                    }
                }
            }
        }

        return cnt;
    }

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
    function life( cells )
    {
        for( i = 0; i <= 50; i++ )
        {
            for( j = 0; j <= 50; j++ )
            {
                var pcnt = parentCount( cells, i, j );

                // живая
                if ( cells[i][j] == true )
                {
                    cells[i][j] = ( pcnt == 2 || pcnt == 3 ) ? true : false;
                }
                // пустое поле
                else
                {
                    cells[i][j] = (pcnt == 3);
                }
            }
        }

        return cells;
    }

    function drawCells( cells )
    {
        for(i = 0; i < 50; i++) {
            for(j = 0; j < 50; j++) {
                if ( cells[i][j] == true )
                {
                    layer.add( drawRect(i, j) );
                }
            }
        }
    }

    var cells   = new Array(50);

    cells = seed( cells );

//    drawCells( cells );
//    stage.add( grid.layer );
//    stage.add(layer);


    // Зацикливаем
    window.setInterval(function() {
        cells = life(cells);
//        stage.clear();

        drawCells( cells );
        stage.add( grid.layer );
        stage.add( layer );
//        stage.draw();
    }, 1000);
});
