define(
    ['kinetic'],
    function( Kinetic )
    {
        var layer = new Kinetic.Layer();

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

            layer.add( hLine );

            var vLine = new Kinetic.Line({
                points:     [s, 0, s, 500],
                stroke:     "gray",
                strokeWidth: 0.5,
                lineCap:    "round",
                lineJoin:   "round"
            });

            layer.add( vLine );
        }

        return {
            layer: layer
        };
    }
);
