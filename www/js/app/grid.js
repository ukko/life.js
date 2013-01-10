/**
 * Сетка
 * @constructor
 */
function Grid()
{
    "use strict";

    /**
     * Слой с сеткой
     * @type {Kinetic.Layer}
     */
    this.layer  = new Kinetic.Layer();

    /**
     * Рисует сетку
     * @return {Kinetic.Layer}
     */
    this.draw   = function()
    {
        var i, s, hLine, vLine;

        this.layer.removeChildren();

        for (i = 0; i <= 50; i += 1 )
        {
            s = i * 10;

            hLine = new Kinetic.Line({
                points:     [0, s, 500, s],
                stroke:     "gray",
                strokeWidth: 0.5,
                lineCap:    "round",
                lineJoin:   "round"
            });

            this.layer.add( hLine );

            vLine = new Kinetic.Line({
                points:     [s, 0, s, 500],
                stroke:     "gray",
                strokeWidth: 0.5,
                lineCap:    "round",
                lineJoin:   "round"
            });

            this.layer.add( vLine );
        }

        return this.layer;
    }
};
