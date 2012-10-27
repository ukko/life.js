$(document).ready(function()
{
    /**
     * Класс игры - жизнь
     * @type {Life}
     */
    var life = new Life();

    life.init();

    $('#start:button').click(function(){
        if ($(this).hasClass('btn-primary')) {
            $(this).removeClass('btn-primary').addClass('btn-danger').val('Стоп ◼');
            life.start( life );
        }
        else {
            $(this).removeClass('btn-danger').addClass('btn-primary').val('Старт ▶');
            life.stop();
        }
    });

    $('#refresh:button').click(function(){
        life.refresh();
    });

    $(':radio').click( function(){
        switch ( $(this).val() )
        {
            case 'slow' :
                life.speed = 1000;
                break;

            case 'normal':
                life.speed = 500;
                break;

            case 'fast':
                life.speed = 100;
                break;

            default :
                life.speed = 500;
        }

        if ( life.timer !== null )
        {
            life.stop();
            life.start();
        }
    });
});

