
var isMobile = detectMobile();

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var canvas, stage, update = true;
var supportsPassive = false, pressMove = false, pressUp = false;
var game = {
    block: { width: 0, height: 0 },
    scale: 0,
    map: [],
    best: 1098,
    scores: 0
};
var spriteSheet, setTimeEnd;
var blockUse = [], storageBlock;
var containerMain = new createjs.Container(), containerNew = [];
var defaultX = 0, defaultY = 0;
var groupCurr = 0, grWHCrr = {};
var indexHint = {}, hintCurr = 0, groupHint = new createjs.Container(), distanceGTH = 0, hintFree = [];
var hand_tut, scoresTemp = 0, install_now;
var txtBest, txtScores;
const blockFree = [
    [[0, 1], [1, 1], [0, 1]],
    [[1, 1], [1, 1]],
    [[0, 1], [1, 1]],
    [[1], [1, 1]],
    [[1, 1], [1], [1]],
    [[1, 1], [0, 1]],
    [[1, 1]],
    [[1], [1], [1], [1]],
    [[1, 1], [1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 0], [1, 1], [1, 0]],
    [[1, 1, 1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1]],
    [[1], [1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1]]
];

const blockFreeHard = [
    [[1, 1], [1], [1]],
    [[1], [1], [1], [1], [1]],
    [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1, 1, 1]],
];
const map = [
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1]
];
//game initialization
async function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage();
    loadImage();
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}
async function loadImage() {
    queue = new createjs.LoadQueue(false);
    var manifest = [
        { src: './images/full_block.png', id: 'full_block' },
    ];
    queue.on("complete", setAnimation);
    queue.loadManifest(manifest);
}
function setAnimation() {
    spriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("full_block")],
        framerate: 25,
        frames: [
            [1, 1, 300, 533, 0, 0, 0],
            [1, 536, 388, 392, 0, 0, 0],
            [1, 930, 388, 84, 0, 0, 0],
            [1, 1016, 388, 70, 0, 0, 0],
            [1, 1088, 250, 139, 0, 0, 0],
            [303, 1, 150, 150, 0, 0, 0],
            [253, 1088, 134, 44, 0, 0, 0],
            [303, 153, 133, 44, 0, 0, 0],
            [253, 1134, 95, 48, 0, 0, 0],
            [303, 199, 100, 31, 0, 0, 0],
            [303, 232, 100, 31, 0, 0, 0],
            [303, 265, 100, 31, 0, 0, 0],
            [438, 153, 31, 52, 0, -8, 0],
            [303, 298, 50, 48, 0, 0, 0],
            [303, 348, 45, 53, 0, -5, -1],
            [355, 298, 47, 47, 0, 0, 0],
            [303, 403, 46, 47, 0, 0, 0],
            [303, 452, 46, 47, 0, 0, 0],
            [405, 199, 31, 52, 0, -8, 0],
            [438, 207, 31, 52, 0, -8, 0],
            [350, 1134, 39, 50, 0, -3, -10],
            [405, 253, 31, 52, 0, -8, 0],
            [438, 261, 31, 52, 0, -8, 0],
            [253, 1184, 37, 36, 0, -5, -12],
            [292, 1184, 37, 36, 0, -5, -12],
            [404, 307, 31, 52, 0, -8, 0],
            [437, 315, 29, 40, 0, -9, -5],
            [303, 501, 27, 30, 0, -10, -15],
            [350, 348, 41, 50, 0, -2, -9],
            [351, 400, 41, 50, 0, -2, -9],
            [351, 452, 46, 47, 0, 0, 0],
            [393, 361, 37, 36, 0, -5, -12],
            [394, 399, 39, 50, 0, -3, -10],
            [399, 451, 39, 50, 0, -3, -10],
            [432, 361, 37, 36, 0, -5, -12],
            [435, 399, 33, 38, 0, -7, -7],
            [440, 439, 29, 40, 0, -9, -5],
            [440, 481, 29, 40, 0, -9, -5],
            [332, 501, 27, 30, 0, -10, -15],
            [361, 501, 27, 30, 0, -10, -15],
            [391, 503, 46, 47, 0, 0, 0],
            [391, 552, 46, 47, 0, 0, 0],
            [391, 601, 46, 47, 0, 0, 0],
            [391, 650, 41, 50, 0, -2, -9],
            [391, 702, 41, 50, 0, -2, -9],
            [391, 754, 41, 50, 0, -2, -9],
            [391, 806, 41, 50, 0, -2, -9],
            [391, 858, 39, 50, 0, -3, -10],
            [391, 910, 39, 50, 0, -3, -10],
            [391, 962, 39, 50, 0, -3, -10],
            [432, 858, 37, 36, 0, -5, -12],
            [432, 896, 37, 36, 0, -5, -12],
            [391, 1014, 33, 38, 0, -7, -7],
            [432, 934, 33, 38, 0, -7, -7],
            [432, 974, 33, 38, 0, -7, -7],
            [426, 1014, 33, 38, 0, -7, -7],
            [439, 523, 29, 40, 0, -9, -5],
            [439, 565, 29, 40, 0, -9, -5],
            [439, 607, 29, 40, 0, -9, -5],
            [391, 1054, 33, 38, 0, -7, -7],
            [426, 1054, 28, 35, 0, -9, -10],
            [389, 1094, 28, 34, 0, -9, -11],
            [391, 1130, 28, 34, 0, -9, -11],
            [391, 1166, 28, 34, 0, -9, -11],
            [331, 1186, 28, 34, 0, -9, -11],
            [361, 1186, 28, 34, 0, -9, -11],
            [419, 1094, 27, 30, 0, -10, -15],
            [421, 1126, 27, 30, 0, -10, -15],
            [421, 1158, 27, 30, 0, -10, -15],
            [421, 1190, 26, 26, 0, -10, -20],
            [391, 1202, 16, 13, 0, -23, -52],
            [434, 650, 26, 26, 0, -10, -20],
            [434, 678, 26, 26, 0, -10, -20],
            [434, 706, 26, 26, 0, -10, -20],
            [434, 734, 26, 26, 0, -10, -20],
            [434, 762, 26, 26, 0, -10, -20],
            [434, 790, 16, 13, 0, -23, -52],
            [434, 805, 16, 13, 0, -23, -52],
            [434, 820, 16, 13, 0, -23, -52],
            [434, 835, 16, 13, 0, -23, -52],
            [452, 790, 16, 13, 0, -23, -52]
        ],

        "animations": {
            "bg": { "frames": [0] },
            "grid": { "frames": [1] },
            "bot": { "frames": [2] },
            "top": { "frames": [3] },
            "block_jewel": { "frames": [4] },
            "icon": { "frames": [5] },
            "scrore": { "frames": [6] },
            "best": { "frames": [7] },
            "pause": { "frames": [8] },
            "btn_continue": { "frames": [9] },
            "install_now": { "frames": [10] },
            "play_again": { "frames": [11] },
            "explosive_cyan": { "frames": [69, 27, 61, 26, 12, 35, 23, 20, 28, 70] },
            "cup": { "frames": [13] },
            "hand_tut": { "frames": [14] },
            "square_hint": { "frames": [15] },
            "block_cyan": { "frames": [16] },
            "block_green": { "frames": [17] },
            "explosive_green": { "frames": [71, 38, 62, 36, 18, 52, 24, 32, 29, 76] },
            "explosive_orange": { "frames": [72, 39, 63, 37, 19, 53, 31, 33, 43, 77] },
            "explosive_pink": { "frames": [73, 66, 64, 56, 21, 54, 34, 47, 44, 78] },
            "explosive_purple": { "frames": [74, 67, 65, 57, 22, 55, 50, 48, 45, 79] },
            "explosive_red": { "frames": [75, 68, 60, 58, 25, 59, 51, 49, 46, 80] },
            "block_orange": { "frames": [30] },
            "block_pink": { "frames": [40] },
            "block_purple": { "frames": [41] },
            "block_red": { "frames": [42] }
        },
    });
    setBackground();
    stage.addChild(containerMain);
    game.map = setMap(map);
    createGroupBlockFree();
    addHand()
    setTimeEnd = setTimeout(setEndTime, 45000)
}
function setMap(map) {
    var locationArr = [];
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        var x = game.block.width,
            y = i * game.block.height;
        var arr = [];
        for (let j = 0; j < row.length; j++) {
            var xb = j * x;
            const color = map[i][j]
            if (color >= 0) {
                var colorstr = convertBlock(color);
                var block = new createjs.Sprite(spriteSheet, colorstr);
                block.scale = game.scale
                block.x = xb + defaultX
                block.y = y + defaultY
                containerMain.addChild(block);
                arr.push({ x: block.x, y: block.y, existing: true, block: block, color: null });
            } else arr.push({ x: xb + defaultX, y: y + defaultY, existing: false, block: null, color: null });

        }
        locationArr.push(arr);
    }
    return locationArr;
}
function setStage() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = true;
    canvas.height = height;
    canvas.width = width;
}
function setBackground() {

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;

    var top = new createjs.Sprite(spriteSheet, "top");
    top.scale = (stage.canvas.width * 2.7 / 3) / top.getBounds().width;
    top.x = (stage.canvas.width - top.getBounds().width * top.scale) / 2
    top.y = stage.canvas.height / 30

    var best = new createjs.Sprite(spriteSheet, "best");
    best.scale = (stage.canvas.width * 2.7 / 3) / top.getBounds().width;
    best.x = top.x + (top.getBounds().width * top.scale) / 5 - best.getBounds().width * best.scale / 2
    best.y = top.y + (top.getBounds().height * top.scale - best.getBounds().height * best.scale) / 2


    var txtBesttemp = new createjs.Text(game.best, "30px Impact", "#f7eb6a");
    txtBesttemp.scale = top.scale;
    txtBesttemp.x = best.x + (best.getBounds().width * best.scale - txtBesttemp.getMeasuredWidth() * txtBesttemp.scale) / 2
    txtBesttemp.y = best.y + (best.getBounds().height * best.scale - txtBesttemp.getMeasuredHeight() * txtBesttemp.scale) / 3


    txtBest = {
        x: best.x + best.getBounds().width * best.scale / 2,
        y: best.y + best.getBounds().height * best.scale / 3,
        txt: txtBesttemp
    }
    var scrore = new createjs.Sprite(spriteSheet, "scrore");
    scrore.scale = (stage.canvas.width * 2.7 / 3) / top.getBounds().width;
    scrore.x = top.x + (top.getBounds().width * top.scale) * 2.8 / 5 - scrore.getBounds().width * scrore.scale / 2
    scrore.y = top.y + (top.getBounds().height * top.scale - scrore.getBounds().height * scrore.scale) / 2

    var txtScorestemp = new createjs.Text(scoresTemp, "30px Impact", "#f7eb6a");
    txtScorestemp.scale = top.scale;
    txtScorestemp.x = scrore.x + (scrore.getBounds().width * scrore.scale - txtScorestemp.getMeasuredWidth() * txtScorestemp.scale) / 2
    txtScorestemp.y = scrore.y + (scrore.getBounds().height * scrore.scale - txtScorestemp.getMeasuredHeight() * txtScorestemp.scale) / 3

    txtScores = {
        x: scrore.x + scrore.getBounds().width * scrore.scale / 2,
        y: scrore.y + scrore.getBounds().height * scrore.scale / 3,
        txt: txtScorestemp
    }
    var pause = new createjs.Sprite(spriteSheet, "pause");
    pause.scale = (stage.canvas.width * 2.6 / 3) / top.getBounds().width;
    pause.x = top.x + (top.getBounds().width * top.scale) * 4.3 / 5 - pause.getBounds().width * pause.scale / 2
    pause.y = top.y + (top.getBounds().height * top.scale - pause.getBounds().height * pause.scale) / 2

    var cup = new createjs.Sprite(spriteSheet, "cup");
    cup.scale = (stage.canvas.width * 1.7 / 3) / top.getBounds().width;
    cup.x = best.x - cup.getBounds().width * cup.scale / 3
    cup.y = best.y - cup.getBounds().height * cup.scale / 3


    var grid = new createjs.Sprite(spriteSheet, "grid");
    grid.scale = (stage.canvas.width * 2.7 / 3) / grid.getBounds().width;
    grid.x = (stage.canvas.width - grid.getBounds().width * grid.scale) / 2
    grid.y = top.y + top.getBounds().height * top.scale * 1.3

    var bot = new createjs.Sprite(spriteSheet, "bot");
    bot.scale = (stage.canvas.width * 2.7 / 3) / bot.getBounds().width;
    bot.scaleY = bot.scale * 1.5;
    bot.x = (stage.canvas.width - bot.getBounds().width * bot.scale) / 2
    bot.y = grid.y + grid.getBounds().height * grid.scale + top.getBounds().height * top.scale * 0.3

    var block_cyan = new createjs.Sprite(spriteSheet, "block_cyan");

    game.scale = grid.scale
    defaultX = (grid.getBounds().width * game.scale - block_cyan.getBounds().width * game.scale * 8) / 2 + grid.x
    defaultY = (grid.getBounds().height * game.scale - block_cyan.getBounds().height * game.scale * 8) / 2 + grid.y

    stage.addChild(bg, top, grid, bot, best, txtBest.txt, cup, scrore, txtScores.txt, pause);
    game.block = { width: block_cyan.getBounds().width * game.scale, height: block_cyan.getBounds().height * game.scale };


    storageBlock = {
        height: bot.getBounds().height * bot.scaleY,
        avgY: bot.y + bot.getBounds().height * bot.scaleY / 2,
        minX: bot.x + stage.canvas.width / 10,
        maxX: bot.x + bot.getBounds().width * bot.scale - stage.canvas.width / 10
    };



    hand_tut = new createjs.Sprite(spriteSheet, "hand_tut");

    install_now = new createjs.Sprite(spriteSheet, "install_now");
    install_now.scale = stage.canvas.width / 4 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scale) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scale * 1.5;

    stage.addChild(install_now);
    var install_nowx = install_now.x,
        install_nowy = install_now.y,
        install_nowscale = stage.canvas.width / 4 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 5) / install_now.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 5) / install_now.getBounds().width) * install_now.getBounds().width) / 2,
                y: install_nowy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            400,
            createjs.Ease.linear
        )
        .to({ scale: install_nowscale, x: install_nowx, y: install_nowy }, 300, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);
}

function renderGroupBlock(blockArr, color, index) {
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = (storageBlock.height / 5.5) / block.getBounds().width;
    var colContainer = blockArr[0].length;
    var size = block.scale * block.getBounds().width;

    var arr = [];
    var containerBlockUse = new createjs.Container();
    for (let i = 0; i < blockArr.length; i++) {
        for (let j = 0; j < blockArr[i].length; j++) {
            if (blockArr[i][j] == 1) {
                var blockClone = block.clone();
                blockClone.y = i * size;
                blockClone.x = j * size;
                containerBlockUse.addChild(blockClone);
            }
        }
        if (colContainer < blockArr[i].length) colContainer = blockArr[i].length;
        arr.push({ x: blockClone.x, y: blockClone.y });
    }
    var heightContainer = blockArr.length * block.getBounds().height * block.scale;
    var widthContainer = colContainer * block.getBounds().width * block.scale;

    containerBlockUse.y = storageBlock.avgY - heightContainer / 2;
    containerBlockUse.x = index == 0 ? storageBlock.minX : index == 1 ? (storageBlock.maxX + storageBlock.minX - widthContainer + stage.canvas.width / 40) / 2 : storageBlock.maxX - widthContainer;

    stage.addChild(containerBlockUse);
    var groupBlock = {
        target: containerBlockUse,
        x: containerBlockUse.x,
        y: containerBlockUse.y,
        width: colContainer,
        height: blockArr.length,
        scale: containerBlockUse.scale,
        color: color
    };
    blockUse.push(groupBlock);
    addEventFree(containerBlockUse, blockUse.length - 1)
}
function addHand() {
    console.log(blockUse[1]);
    hand_tut.x = blockUse[1].x - hand_tut.getBounds().width * hand_tut.scale * 0.5;
    hand_tut.y = blockUse[1].y + (blockUse[1].height * storageBlock.height / 5.5) / 2;
    hand_tut.scale = (stage.canvas.width / 8) / hand_tut.getBounds().width;
    stage.addChild(hand_tut);
    createjs.Tween.get(hand_tut, { loop: true })
        .to({ x: game.map[3][1].x, y: game.map[3][1].y }, 1500)
        .wait(300)
        .to({ x: blockUse[1].x - hand_tut.getBounds().width * hand_tut.scale * 0.5, y: blockUse[1].y + (blockUse[1].height * storageBlock.height / 5.5) / 2 }, 1500)
        .wait(300)
}
function removeHand() {
    createjs.Tween.removeTweens(hand_tut);
    stage.removeChild(hand_tut)
}

//Event
function removeAllEvent() {
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (isMobile) {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
            }
        } else {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown);
                canvas.removeEventListener("mousemove", onPressMove);
                canvas.removeEventListener("mouseup", onMouseUp);
            }
        }
    }
}
function detectMobile() {
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
    if (iOS) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        return true;
    }
    return false;
}
function onMouseDown(evt) {
    pressMove = true;
    var location = currentMouse(evt);
    groupCurr = evt.currentTarget.myParam;
    distanceGTH = getDistance(location, { x: location.x, y: game.map[7][0].y })

    var target = blockUse[groupCurr].target;
    var scaleItem = blockUse[groupCurr].target.children[0].scale;
    var newScaleGroup = game.scale / scaleItem;
    var widthGrBlock = blockUse[groupCurr].width * storageBlock.height / 5.5 * target.scale
    var heightGrBlock = (blockUse[groupCurr].height + 2) * storageBlock.height / 5.5 * target.scale
    grWHCrr = { width: widthGrBlock, height: heightGrBlock }
    target.x = location.x - grWHCrr.width / 2;
    target.y = location.y - grWHCrr.height;
    target.scale = newScaleGroup
}

// Free
function addEventFree(target, i) {
    if (isMobile) {
        target.addEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
        target.myParam = i;

    } else {
        target.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onPressMove);
        canvas.addEventListener("mouseup", onMouseUp);
        target.myParam = i;

    }

}
function onPressMove(evt) {
    if (pressMove) {
        pressUp = true;
        var location = currentMouse(evt);
        var target = blockUse[groupCurr].target;
        var widthGrBlock = blockUse[groupCurr].width * storageBlock.height / 5.5 * target.scale
        var heightGrBlock = (blockUse[groupCurr].height + 2) * storageBlock.height / 5.5 * target.scale
        grWHCrr = { width: widthGrBlock, height: heightGrBlock }
        target.x = location.x - grWHCrr.width / 2;
        target.y = location.y - grWHCrr.height;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var newScaleGroup = game.scale / scaleItem;
        target.scale = newScaleGroup
        // var percent
        // if (target.y > game.map[7][0].y + game.block.width) {
        //     var distance = target.y - (game.map[7][0].y + game.block.width);
        //     percent = distance / distanceGTH - 1;
        //     console.log(percent);
        // }
        // if (newScaleGroup * Math.abs(percent) > blockUse[groupCurr].scale) {
        //     target.scale = newScaleGroup * Math.abs(percent);
        // }
        renderHint({ x: location.x - grWHCrr.width / 2, y: location.y - grWHCrr.height })
    }
}
function onMouseUp(evt) {
    if (pressUp) {

        pressMove = false;
        containerNew = []
        var target = blockUse[groupCurr].target;
        if (hintFree.length != 0) {
            removeHand()
            game.scores += hintFree.length * 5
            updateScore()
            const color = blockUse[groupCurr].color;
            var colorstr = convertBlock(color);
            var block = new createjs.Sprite(spriteSheet, colorstr);
            block.scale = game.scale;
            for (let i = 0; i < hintFree.length; i++) {
                const hint = hintFree[i].hint;
                const item = game.map[hintFree[i].y][hintFree[i].x]
                var newblock = block.clone()
                newblock.x = hint.x
                newblock.y = hint.y
                containerMain.addChild(newblock);
                containerNew.push({ x: hintFree[i].x, y: hintFree[i].y })
                game.map[hintFree[i].y][hintFree[i].x] = { x: item.x, y: item.y, existing: true, block: newblock, color: color }
            }
            removeBlock();
            blockUse[groupCurr].target.removeAllChildren()
            stage.removeChild(blockUse[groupCurr].target)
            blockUse[groupCurr].target = null
            createGroupBlockFree();
            endGame();

        } else {
            target.x = blockUse[groupCurr].x;
            target.y = blockUse[groupCurr].y;
            target.scale = blockUse[groupCurr].scale;
        }
        pressUp = false
    }
}
function renderHint(location) {
    var array = [];
    var render = true
    removeHint()
    var hint = new createjs.Sprite(spriteSheet, "square_hint");
    hint.scale = game.scale;
    if (location.x >= game.map[0][0].x - game.block.width / 2 &&
        location.x < game.map[0][7].x + (1.5 - blockUse[groupCurr].width) * game.block.width &&
        location.y > game.map[0][0].y &&
        location.y < game.map[7][0].y + (1.5 - blockUse[groupCurr].height) * game.block.width) {
        var index = lToI(location)
        var blockChild = blockUse[groupCurr].target.children
        hintFree = []
        for (let i = 0; i < blockChild.length; i++) {
            var block = blockChild[i];
            var index1 = lToIGr({ x: block.x, y: block.y })
            var x = index.x + index1.x
            var y = index.y + index1.y
            var item = game.map[y][x]
            if (!item.existing) {
                array.push({ x: x, y: y })
            } else render = false
        }
    } else {
        hintFree = []
    }
    if (render) {
        for (let i = 0; i < array.length; i++) {
            const index = array[i];
            var item = game.map[index.y][index.x]
            var newHint = hint.clone()
            newHint.x = item.x;
            newHint.y = item.y;
            containerMain.addChild(newHint);
            hintFree.push({ x: index.x, y: index.y, hint: newHint })
        }
    }
}
function removeHint() {
    for (let i = 0; i < hintFree.length; i++) {
        const hint = hintFree[i].hint;
        containerMain.removeChild(hint)
    }
    hintFree = [];
}
function createGroupBlockFree() {
    var render = true
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (target != null) render = false
    }
    if (render) {
        blockUse = []
        for (let i = 0; i < 3; i++) {
            var block = blockFree[Math.floor(Math.random() * blockFree.length)]
            var color = Math.floor(Math.random() * 6)
            renderGroupBlock(block, color, i);
        }
    }
}

//Collision
function removeBlock() {
    const removeArray = checkRC()
    var removeArr = removeArray.arr

    game.scores += hintFree.length * 10
    updateScore()
    removeHint();

    for (let i = 0; i < removeArr.length; i++) {
        const index = removeArr[i];
        const item = game.map[index.y][index.x]
        blockDie(item)
        containerMain.removeChild(item.block);
        game.map[index.y][index.x] = { x: item.x, y: item.y, existing: false, block: null, color: null }
    }
}
function blockDie(item) {
    var block = new createjs.Sprite(spriteSheet, convertAnimations(item.color));
    block.scale = game.scale * 1.3;
    block.x = item.x;
    block.y = item.y;
    stage.addChild(block);
    block.on("animationend", handleComplete);
    function handleComplete() {
        stage.removeChild(this);
        block = null;
    }
}
// check row and column
function checkRC() {
    var checkX = [];
    var checkY = [];
    for (let i = 0; i < containerNew.length; i++) {
        var item = containerNew[i];
        if (checkX.indexOf(item.x) < 0) checkX.push(item.x);
        if (checkY.indexOf(item.y) < 0) checkY.push(item.y);
    }
    var arrRemove = [];
    var arrtemp = [];
    var array = [];
    for (let i = 0; i < checkX.length; i++) {
        const x = checkX[i];
        for (let y = 0; y < 8; y++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 8) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < checkY.length; i++) {
        const y = checkY[i];
        for (let x = 0; x < 8; x++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 8) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < arrRemove.length; i++) {
        var add = true;
        const item = arrRemove[i];
        for (let j = 0; j < array.length; j++) {
            const element = array[j];
            if (item.x == element.x && item.y == element.y) add = false
        }
        if (add) array.push(item)

    }
    return { arr: array, lengthRemove: arrRemove.length }
}

function endGame() {
    var close = checkLose();
    if (close) {
        clearTimeout(setTimeEnd);
        createjs.Tween.removeTweens(install_now)
        stage.removeChild(install_now);
        removeAllEvent()
        var particle = new createjs.Shape();
        particle.graphics.f("#fafafa").dr(0, 0, stage.canvas.width, stage.canvas.height);
        particle.alpha = 0.4

        var bgcore = new createjs.Shape();
        bgcore.graphics.lf(["#2d3779", "#58407b"], [0, 1], stage.canvas.width / 4, 0, stage.canvas.width / 4, stage.canvas.height / 5);
        bgcore.graphics.rc(0, 0, stage.canvas.width / 2, stage.canvas.height / 5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 2) / 2
        bgcore.y = stage.canvas.height / 4.7
        bgcore.alpha = 1

        var best = new createjs.Text('BEST', "Italic 30px Impact", "#ffffff");
        best.scale = (stage.canvas.width / 7) / best.getMeasuredWidth()
        best.x = (stage.canvas.width - best.getMeasuredWidth() * best.scale) / 2
        best.y = bgcore.y + best.getMeasuredHeight() * best.scale
        var text = new createjs.Text(game.scores, "30px Impact", "#ffffff");
        if (game.scores < 1000) {
            text.scale = (stage.canvas.width / 6.5) / text.getMeasuredWidth()
            text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2
            text.y = bgcore.y * 2 - text.getMeasuredHeight() * text.scale * 1.6
        } else {
            text.scale = (stage.canvas.width / 5.5) / text.getMeasuredWidth()
            text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2
            text.y = bgcore.y * 2 - text.getMeasuredHeight() * text.scale * 1.8
        }


        var play_again = new createjs.Sprite(spriteSheet, "play_again");
        play_again.scale = (stage.canvas.width / 2.7) / play_again.getBounds().width
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2
        play_again.y = text.y + play_again.getBounds().height * play_again.scale * 2.5

        stage.addChild(particle, bgcore, best, text, play_again);

        var play_againx = play_again.x,
            play_againy = play_again.y,
            play_againscale = stage.canvas.width / 2.7 / play_again.getBounds().width;
        createjs.Tween.get(play_again, { loop: true })
            .to(
                {
                    scale: (stage.canvas.width / 4) / play_again.getBounds().width,
                    x: (stage.canvas.width - ((stage.canvas.width / 4) / play_again.getBounds().width) * play_again.getBounds().width) / 2,
                    y: play_againy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
                },
                500,
                createjs.Ease.linear
            )
            .to({ scale: play_againscale, x: play_againx, y: play_againy }, 500, createjs.Ease.linear);
        play_again.addEventListener("click", () => { getLinkInstall() }, false);


    }
}
function checkLose() {
    var mainGr = [];
    var close = false;
    for (let i = 0; i < blockUse.length; i++) {
        if (blockUse[i].target != null) {
            const blockChild = blockUse[i].target.children;
            var indexChild = [];
            for (let i = 0; i < blockChild.length; i++) {
                var block = blockChild[i];
                var index = lToIGr({ x: block.x, y: block.y });
                indexChild.push(index)
            }
            mainGr.push(indexChild)
        }
    }
    var map = game.map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const item = map[y][x];
            if (!item.existing) {
                for (let i = 0; i < mainGr.length; i++) {
                    var grTrue = true;
                    for (let j = 0; j < mainGr[i].length; j++) {
                        const index = mainGr[i][j];
                        var indexGrX = x + index.x
                        var indexGrY = y + index.y
                        if (indexGrY > 7 || indexGrX > 7) grTrue = false
                        else {
                            var block = map[indexGrY][indexGrX]
                            if (block.existing) grTrue = false
                        }
                    }
                    if (grTrue) {
                        close = true
                        break;
                    }
                }
            }

        }
    }
    return !close
}
// location to index
function lToI(location) {
    var x = (location.x - defaultX) / game.block.width;
    var y = (location.y - defaultY) / game.block.height;
    var decimalX = parseFloat("0." + (x + "").split(".")[1])
    var decimalY = parseFloat("0." + (y + "").split(".")[1])
    if (y < 0) y = 0.0
    if (x < 0) x = 0.0
    var xtemp = decimalX > 0.7 ? Math.round(x) : Math.floor(x)
    var ytemp = decimalY > 0.7 ? Math.round(y) : Math.floor(y)
    return { x: xtemp, y: ytemp };
}
function lToIGr(location) {
    var x = location.x / (storageBlock.height / 5.5);
    var y = location.y / (storageBlock.height / 5.5);
    return { x: Math.floor(x), y: Math.floor(y) };
}
function indexToLocation(p) {
    var x = p.x * game.block.width + defaultX + p.x * game.block.width * 0.024;
    var y = p.y * game.block.width + defaultY + (p.y * game.block.width + defaultY) * 0.02;
    return { x: x, y: y };
}

function tick(event) {
    if (update) {
        stage.update(event);
    }
}

//Support
function getLinkInstall() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en")
    } else if (/android/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en");
    } else {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en")
    }
}
function convertBlock(id) {
    switch (id) {
        case 0:
            return "block_cyan";
        case 1:
            return "block_green";
        case 2:
            return "block_orange";
        case 3:
            return "block_pink";
        case 4:
            return "block_purple";
        case 5:
            return "block_red";
        case 100:
            return "square_hint";
        default:
            return null;
    }
}
function convertAnimations(color) {
    switch (color) {
        case 0:
            return "explosive_cyan";
        case 1:
            return "explosive_green";
        case 2:
            return "explosive_orange";
        case 3:
            return "explosive_pink";
        case 4:
            return "explosive_purple";
        case 5:
            return "explosive_red";
        default:
            return null;
    }
}
function getDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
}
function currentMouse(evt) {
    if (evt.type == 'mousedown') {
        if (isMobile) return { x: evt.currentTarget.x, y: evt.currentTarget.y }
        else return { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY }
    }
    else if (isMobile) return { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY }
    else return { x: evt.layerX, y: evt.layerY }
}
function callEndTime() {

}
function setEndTime() {

    createjs.Tween.removeTweens(install_now)
    removeAllEvent()

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    bg.alpha = 0.85


    var logo = new createjs.Sprite(spriteSheet, "icon");
    logo.scale = (stage.canvas.width / 3.5) / logo.getBounds().width
    logo.x = (stage.canvas.width - logo.getBounds().width * logo.scale) / 2
    logo.y = stage.canvas.height / 9
    logo.shadow = new createjs.Shadow('#000', 0, 0, 10);



    var block_jewel = new createjs.Sprite(spriteSheet, "block_jewel");
    block_jewel.scale = (stage.canvas.width * 2 / 3) / block_jewel.getBounds().width
    block_jewel.x = (stage.canvas.width - block_jewel.getBounds().width * block_jewel.scale) / 2
    block_jewel.y = logo.y + logo.getBounds().height * logo.scale * 1.3




    var btn_continue = new createjs.Sprite(spriteSheet, "btn_continue");
    btn_continue.scale = (stage.canvas.width / 2.7) / btn_continue.getBounds().width
    btn_continue.x = (stage.canvas.width - btn_continue.getBounds().width * btn_continue.scale) / 2
    btn_continue.y = block_jewel.y + block_jewel.getBounds().height * block_jewel.scale * 1.3

    stage.addChild(bg, btn_continue, logo, block_jewel);


    var btn_continuex = btn_continue.x,
        btn_continuey = btn_continue.y,
        btn_continuescale = stage.canvas.width / 2.7 / btn_continue.getBounds().width;
    createjs.Tween.get(btn_continue, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 4) / btn_continue.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 4) / btn_continue.getBounds().width) * btn_continue.getBounds().width) / 2,
                y: btn_continuey - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scale: btn_continuescale, x: btn_continuex, y: btn_continuey }, 500, createjs.Ease.linear);
    btn_continue.addEventListener("click", () => { getLinkInstall() }, false);
}

function updateScore() {
    var upScore = setInterval(function () {
        scoresTemp += 1;
        if (scoresTemp <= game.scores) {
            txtScores.txt.x = txtScores.x - txtScores.txt.getMeasuredWidth() * txtScores.txt.scale / 2;
            txtScores.txt.y = txtScores.y - txtScores.txt.getMeasuredHeight() * txtScores.txt.scale / 3;
            txtScores.txt.text = scoresTemp;
            if (scoresTemp > game.best) {
                game.best = scoresTemp
                txtBest.txt.x = txtBest.x - txtBest.txt.getMeasuredWidth() * txtBest.txt.scale / 2;
                txtBest.txt.y = txtBest.y - txtBest.txt.getMeasuredHeight() * txtBest.txt.scale / 3;
                txtBest.txt.text = scoresTemp;
            }
        }
        else clearInterval(upScore);
    }, 30);
}