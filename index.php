<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/td/style.css">
    <title>Tower Defence</title>
</head>
<body>
    <section id='mainmenu'>
    </section>

    <section id='pausemenu'>
    </section>

    <section id='game'>
        <div id='map'>
            <div id='tiles'>
            </div>
            <div id='entities'>
            </div>
            <div id='towers'>
            </div>
            <div id='projectiles'>
            </div>
        </div>
        <div id='sidepanel'>
            <div id='info'>
                <p>Score: <span id='score'>0</span></p>
                <p>Money: <span id='money'>0</span></p>
                <p>Lives: <span id='lives'>50</span></p>
            </div>
            <div id='buildmenu'>
                <ul>
                    <li><button onclick='pick_up_tower(this)' data-tower='Gun1'>Gun 1</button></li>
                </ul>
                <ul>
                    <li><button onclick='pick_up_tower(this)' data-tower='Barrier'>Remove Road</button></li>
                </ul>
            </div>
        </div>
        <div id='sidepanel_2' class=''>
            <div class='sidepanel_dismiss'>X</div>
            <div id='sidepanel_2_content'></div>
        </div>
    </section>

    <script type='module' src='/td/main.js'></script>
</body>
</html>