/**
 * Поле с игрой
 * @constructor
 */
function Board()
{
    "use strict";

    /**
     * Ширина поля в пикселях
     * @type {Number}
     */
    this.width   = 550;

    /**
     * Высота поля в пикселях
     * @type {Number}
     */
    this.height  = 550;

    /**
     * Количество ячеек по горизонтали
     * @type {Number}
     */
    this.cellsX  = 50;

    /**
     * Количество ячеек по вертикали
     * @type {Number}
     */
    this.cellsY  = 50;

    /**
     * Основной слой с "живностью"
     * @type {Kinetic.Layer}
     */
    this.layer  = new Kinetic.Layer();

    /**
     * Объект для рисования сетки
     * @type {Grid}
     */
    this.grid = new Grid();

    /**
     * Основная сцена
     * @type {Kinetic.Stage}
     */
    this.stage = new Kinetic.Stage({
        container: "container",
        width:  this.width,
        height: this.height
    });

    /**
     * Отрисовывает прямоугольник
     * @param x
     * @param y
     * @return {Kinetic.Rect}
     */
    this.drawRect = function(x, y)
    {
        return new Kinetic.Rect({
            x:      x * 10,
            y:      y * 10,
            width:  10,
            height: 10,
            fill:   '#876D78'
        });
    }

    /**
     * Добавляет ячейку на слой
     * @param cells
     */
    this.drawCells = function( cells )
    {
        this.layer.removeChildren();

        for ( var i in cells )
        {
            for ( var j in cells[i] )
            {
                // @TODO Удалить
                if (cells[i][j]== undefined)
                {
                    console.warn('board.drawCells', i, j, cells);
                    return;
                }

                if ( cells[i][j] == true )
                {
                    var rect = this.drawRect(i, j);
                    this.layer.add( rect );
                }
            }
        }
    }
};
