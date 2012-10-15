$(document).ready(function()
{
    var life = new Life();
    life.init();

    $('input:button').click(function () {
        if ($(this).hasClass('btn-primary')) {
            $(this).removeClass('btn-primary').addClass('btn-danger').val('Стоп');
            life.start( life );
        }
        else {
            $(this).removeClass('btn-danger').addClass('btn-primary').val('Старт');
            life.stop();
        }
    });
});

