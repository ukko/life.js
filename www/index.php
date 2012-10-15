<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Игра "Жизнь"</title>
    <link rel="stylesheet" href="/css/bootstrap.css">
</head>

<body>
    <div class="container">
        <h2>Игра "Жизнь"</h2>
        <div class="span3">
            <h5>ТТХ</h5>
            <ul>
                <li>Прожито дней: <b id="countDays">0</b> </li>
                <li>Кол-во живых: <b id="countLive">0</b> </li>
                <li>Кол-во пустых: <b id="countDead">0</b> </li>
            </ul>
            <h5>Запуск</h5>
            <input type="button" value="Старт" class="btn btn-primary">
        </div>
        <div class="span4" id="container"></div>
        <div class="span4"></div>
    </div>

    <script data-main="js/app/app" src="/js/ext/jquery.js"></script>
    <script data-main="js/app/app" src="/js/ext/kinetic.min.js"></script>

    <script data-main="js/app/app" src="/js/app/life.js"></script>
    <script data-main="js/app/app" src="/js/app/board.js"></script>
    <script data-main="js/app/app" src="/js/app/grid.js"></script>
    <script data-main="js/app/app" src="/js/app/app.js"></script>
</body>
</html>
