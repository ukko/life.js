function Grid()
{
    this.layer  = new Kinetic.Layer();

    this.draw   = function()
    {
        this.layer.removeChildren();

        for ( i = 0; i <= 50; i ++ )
        {
            var s = i * 10;

            var hLine = new Kinetic.Line({
                points:     [0, s, 500, s],
                stroke:     "gray",
                strokeWidth: 0.5,
                lineCap:    "round",
                lineJoin:   "round"
            });

            this.layer.add( hLine );

            var vLine = new Kinetic.Line({
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
