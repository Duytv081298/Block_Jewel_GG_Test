
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
var lowerBlock = false;
var spriteSheet, setTimeEnd;
var blockUse = [], storageBlock;
var containerMain = new createjs.Container(), containerNew = [], blockTempNew = [];
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
        framerate: 24,
        frames: [
            [1, 1, 388, 392, 0, 0, 0],
            [391, 1, 100, 31, 0, 0, 0],
            [391, 34, 100, 31, 0, 0, 0],
            [391, 67, 100, 31, 0, 0, 0],
            [391, 100, 95, 48, 0, 0, 0],
            [391, 150, 54, 64, 0, -2, -13],
            [447, 150, 45, 53, 0, -5, -1],
            [447, 205, 45, 42, 0, -8, -17],
            [391, 216, 54, 64, 0, -2, -13],
            [447, 249, 45, 42, 0, -8, -17],
            [391, 282, 54, 64, 0, -2, -13],
            [447, 293, 45, 42, 0, -8, -17],
            [447, 337, 45, 42, 0, -8, -17],
            [391, 348, 53, 68, 0, -2, -13],
            [1, 395, 388, 84, 0, 0, 0],
            [446, 381, 46, 47, 0, 0, 0],
            [391, 418, 53, 68, 0, -2, -13],
            [1, 481, 388, 70, 0, 0, 0],
            [446, 430, 46, 47, 0, 0, 0],
            [446, 479, 46, 47, 0, 0, 0],
            [391, 488, 53, 68, 0, -2, -13],
            [446, 528, 46, 47, 0, 0, 0],
            [1, 553, 300, 533, 0, 0, 0],
            [303, 558, 134, 44, 0, 0, 0],
            [439, 577, 53, 68, 0, -2, -13],
            [303, 604, 133, 44, 0, 0, 0],
            [438, 647, 53, 68, 0, -2, -13],
            [303, 717, 150, 150, 0, 0, 0],
            [303, 650, 51, 65, 0, -4, -13],
            [356, 650, 51, 65, 0, -4, -13],
            [455, 717, 37, 52, 0, -12, -7],
            [455, 771, 37, 52, 0, -12, -7],
            [455, 825, 37, 52, 0, -12, -7],
            [409, 650, 19, 17, 0, -31, -68],
            [409, 669, 19, 17, 0, -31, -68],
            [409, 688, 19, 17, 0, -31, -68],
            [303, 869, 53, 68, 0, -2, -13],
            [358, 869, 53, 64, 0, -3, -13],
            [413, 869, 39, 68, 0, -11, 0],
            [358, 935, 53, 64, 0, -3, -13],
            [303, 939, 53, 64, 0, -3, -13],
            [454, 879, 37, 52, 0, -12, -7],
            [454, 933, 37, 52, 0, -12, -7],
            [413, 939, 39, 68, 0, -11, 0],
            [358, 1001, 52, 72, 0, -3, -13],
            [303, 1005, 52, 72, 0, -3, -13],
            [454, 987, 37, 52, 0, -12, -7],
            [412, 1009, 39, 68, 0, -11, 0],
            [453, 1041, 39, 68, 0, -11, 0],
            [357, 1075, 52, 72, 0, -3, -13],
            [303, 1079, 52, 72, 0, -3, -13],
            [411, 1079, 39, 68, 0, -11, 0],
            [452, 1111, 39, 68, 0, -11, 0],
            [357, 1149, 52, 72, 0, -3, -13],
            [411, 1149, 39, 61, 0, -11, -2],
            [452, 1181, 39, 61, 0, -11, -2],
            [411, 1212, 39, 61, 0, -11, -2],
            [452, 1244, 39, 61, 0, -11, -2],
            [1, 1088, 250, 139, 0, 0, 0],
            [253, 1088, 47, 47, 0, -7, -16],
            [253, 1137, 47, 47, 0, 0, 0],
            [302, 1153, 52, 72, 0, -3, -13],
            [253, 1186, 47, 46, 0, -7, -16],
            [356, 1223, 51, 65, 0, -4, -13],
            [409, 1275, 41, 70, 0, -10, -3],
            [452, 1307, 39, 61, 0, -11, -2],
            [302, 1227, 51, 65, 0, -4, -13],
            [355, 1290, 51, 65, 0, -4, -13],
            [408, 1347, 42, 50, 0, -10, -9],
            [452, 1370, 39, 61, 0, -11, -2],
            [1, 1433, 41, 70, 0, -10, -3],
            [1, 1399, 33, 32, 0, -14, -27],
            [36, 1399, 33, 32, 0, -14, -27],
            [1, 1357, 35, 39, 0, -13, -20],
            [38, 1357, 35, 39, 0, -13, -20],
            [1, 1294, 49, 55, 0, -5, -14],
            [1, 1234, 49, 55, 0, -5, -14],
            [52, 1294, 49, 55, 0, -5, -14],
            [52, 1234, 49, 55, 0, -5, -14],
            [44, 1433, 41, 70, 0, -10, -3],
            [71, 1398, 33, 33, 0, -14, -26],
            [75, 1351, 35, 45, 0, -13, -14],
            [103, 1294, 49, 55, 0, -5, -14],
            [103, 1234, 49, 55, 0, -5, -14],
            [87, 1433, 41, 70, 0, -10, -3],
            [106, 1398, 33, 33, 0, -14, -26],
            [112, 1351, 35, 45, 0, -13, -14],
            [130, 1433, 41, 70, 0, -10, -3],
            [141, 1398, 33, 33, 0, -14, -26],
            [149, 1351, 35, 45, 0, -13, -14],
            [154, 1294, 42, 50, 0, -10, -9],
            [198, 1229, 51, 65, 0, -4, -13],
            [154, 1229, 42, 50, 0, -10, -9],
            [251, 1234, 47, 46, 0, -7, -16],
            [251, 1282, 47, 46, 0, -7, -16],
            [198, 1296, 50, 48, 0, 0, 0],
            [300, 1294, 47, 46, 0, -7, -16],
            [250, 1330, 47, 46, 0, -7, -16],
            [299, 1342, 46, 47, 0, 0, 0],
            [347, 1357, 46, 47, 0, 0, 0],
            [395, 1399, 45, 42, 0, -8, -17],
            [442, 1433, 45, 42, 0, -8, -17],
            [173, 1477, 35, 44, 0, -13, -15],
            [173, 1443, 33, 32, 0, -14, -27],
            [186, 1391, 42, 50, 0, -10, -9],
            [208, 1443, 33, 32, 0, -14, -27],
            [230, 1391, 42, 50, 0, -10, -9],
            [210, 1477, 35, 44, 0, -13, -15],
            [243, 1443, 33, 32, 0, -14, -27],
            [274, 1391, 42, 50, 0, -10, -9],
            [186, 1346, 35, 39, 0, -13, -20],
            [247, 1477, 35, 39, 0, -13, -20],
            [278, 1443, 33, 32, 0, -14, -27],
            [284, 1477, 35, 39, 0, -13, -20],
            [321, 1391, 19, 17, 0, -31, -68],
            [321, 1477, 35, 39, 0, -13, -20],
            [358, 1406, 35, 45, 0, -13, -14],
            [395, 1443, 41, 70, 0, -10, -3],
            [358, 1453, 33, 33, 0, -14, -26],
            [358, 1488, 33, 33, 0, -14, -26],
            [318, 1410, 33, 33, 0, -14, -26],
            [223, 1346, 19, 17, 0, -31, -68],
            [223, 1365, 19, 17, 0, -31, -68]
        ],

        "animations": {
            "grid": { "frames": [0] },
            "btn_continue": { "frames": [1] },
            "install_now": { "frames": [2] },
            "play_again": { "frames": [3] },
            "pause": { "frames": [4] },
            "explosive_orange": { "frames": [71, 80, 73, 81, 30, 54, 38, 64, 68, 7, 62, 75, 28, 44, 5, 13, 33] },
            "hand_tut": { "frames": [6] },
            "explosive_purple": { "frames": [108, 119, 113, 89, 42, 65, 51, 87, 106, 100, 97, 82, 67, 53, 8, 26, 121] },
            "explosive_cyan": { "frames": [72, 85, 74, 102, 31, 55, 43, 70, 90, 9, 93, 76, 29, 45, 37, 16, 34] },
            "explosive_red": { "frames": [112, 120, 115, 116, 46, 69, 52, 117, 109, 101, 59, 83, 91, 61, 10, 36, 122] },
            "explosive_green": { "frames": [103, 88, 110, 107, 32, 56, 47, 79, 92, 11, 94, 77, 63, 49, 39, 20, 35] },
            "explosive_pink": { "frames": [105, 118, 111, 86, 41, 57, 48, 84, 104, 12, 96, 78, 66, 50, 40, 24, 114] },
            "bot": { "frames": [14] },
            "block_cyan": { "frames": [15] },
            "top": { "frames": [17] },
            "block_green": { "frames": [18] },
            "block_orange": { "frames": [19] },
            "block_pink": { "frames": [21] },
            "bg": { "frames": [22] },
            "scrore": { "frames": [23] },
            "best": { "frames": [25] },
            "icon": { "frames": [27] },
            "block_jewel": { "frames": [58] },
            "square_hint": { "frames": [60] },
            "cup": { "frames": [95] },
            "block_purple": { "frames": [98] },
            "block_red": { "frames": [99] }
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
                arr.push({ x: block.x, y: block.y, existing: true, block: block, color: null, colorTemp: null, blockTemp: null });
            } else arr.push({ x: xb + defaultX, y: y + defaultY, existing: false, block: null, color: null, colorTemp: null, blockTemp: null });

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
            500, createjs.Ease.linear
        )
        .to({ scale: install_nowscale, x: install_nowx, y: install_nowy }, 500, createjs.Ease.linear);
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
        var heightGrBlock = isMobile ? (blockUse[groupCurr].height + 2) * storageBlock.height / 5.5 * target.scale : blockUse[groupCurr].height * storageBlock.height / 5.5 * target.scale
        grWHCrr = { width: widthGrBlock, height: heightGrBlock }
        target.x = location.x - grWHCrr.width / 2;
        target.y = location.y - grWHCrr.height;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var newScaleGroup = game.scale / scaleItem;
        target.scale = newScaleGroup
        renderHint({ x: location.x - grWHCrr.width / 2, y: location.y - grWHCrr.height })
    }
}
function onMouseUp(evt) {
    if (pressUp) {

        pressMove = false;
        containerNew = []
        var target = blockUse[groupCurr].target;
        if (hintFree.length != 0) {
            lowerBlock = true;
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
                game.map[hintFree[i].y][hintFree[i].x] = { x: item.x, y: item.y, existing: true, block: newblock, color: color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
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

function addBlock(index) {
    const color = blockUse[groupCurr].color;
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = game.scale;
    var item = game.map[index.y][index.x]
    block.x = item.x
    block.y = item.y
    containerMain.addChild(block);
    blockTempNew.push({ x: index.x, y: index.y })
    game.map[index.y][index.x] = { x: item.x, y: item.y, existing: true, block: item.block, color: item.color, colorTemp: color, blockTemp: block }
}

function removeBlockTemp() {
    if (blockTempNew) {
        for (let i = 0; i < blockTempNew.length; i++) {
            const index = blockTempNew[i];
            var item = game.map[index.y][index.x]
            containerMain.removeChild(item.blockTemp)
        }
        blockTempNew = []
    }
}
function renderHint(location) {
    var array = [];
    var render = true
    removeHint()
    removeBlockTemp()
    lowerBlock = false
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
            game.map[index.y][index.x] = { x: item.x, y: item.y, existing: true, block: item.block, color: item.color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
            var newHint = hint.clone()
            newHint.x = item.x;
            newHint.y = item.y;
            containerMain.addChild(newHint);
            hintFree.push({ x: index.x, y: index.y, hint: newHint })
        }
        var removeArray = checkRC(hintFree)
        if (removeArray.lengthRemove) {
            removeArray.arr.forEach(index => {
                addBlock(index)
            });
        } else {
            removeBlockTemp()
        }
    }
}
function removeHint() {
    for (let i = 0; i < hintFree.length; i++) {
        if (!lowerBlock) {
            var hintt = hintFree[i]
            var item = game.map[hintt.y][hintt.x]
            game.map[hintt.y][hintt.x] = { x: item.x, y: item.y, existing: false, block: item.block, color: item.color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
        }
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
        var listBlock = randomIndex()
        for (let i = 0; i < listBlock.length; i++) {
            const block = listBlock[i];
            var color = Math.floor(Math.random() * 6)
            renderGroupBlock(block, color, i);
        }

    }
}
function randomIndex() {
    var pass = true;
    var listIndex = [];
    var index;
    for (let i = 0; i < 3; i++) {
        index = Math.floor(Math.random() * blockFree.length)
        if (listIndex.indexOf(index) != -1) {
            if (pass) {
                while (listIndex.indexOf(index) != -1) {
                    index = Math.floor(Math.random() * blockFree.length)
                }
            } else {
                while (listIndex.indexOf(index) != -1 && getCol(blockFree[index]) >= 3) {
                    index = Math.floor(Math.random() * blockFree.length)
                }
            }
        } else {
            var a = getCol(blockFree[index])
            if (!pass) while (a >= 3) {
                index = Math.floor(Math.random() * blockFree.length)
                a = getCol(blockFree[index])
            }
        }
        if (getCol(blockFree[index]) > 2) pass = false
        listIndex.push(blockFree[index])
    }
    return listIndex
}
function getCol(grBlock) {
    var maxCol = grBlock[0].length
    grBlock.forEach(row => {
        if (maxCol < row.length) maxCol = row.length
    });
    return maxCol
}

//Collision
function removeBlock() {
    const removeArray = checkRC(containerNew)
    var removeArr = removeArray.arr

    game.scores += hintFree.length * 10
    updateScore()

    removeHint()
    for (let i = 0; i < removeArr.length; i++) {
        const index = removeArr[i];
        const item = game.map[index.y][index.x]
        blockDie(item)
        containerMain.removeChild(item.block);

        containerMain.removeChild(item.blockTemp)
        game.map[index.y][index.x] = { x: item.x, y: item.y, existing: false, block: null, color: null, colorTemp: null, blockTemp: null }
    }
}
function blockDie(item) {
    var block = new createjs.Sprite(spriteSheet, convertAnimations(blockUse[groupCurr].color));
    block.scale = game.scale * 1.2;
    block.x = item.x + game.block.width / 2 - block.getBounds().width * block.scale;
    block.y = item.y + game.block.height / 2 - block.getBounds().height * block.scale;
    stage.addChild(block);
    block.on("animationend", handleComplete);
    function handleComplete() {
        stage.removeChild(this);
        block = null;
    }
}
// check row and column
function checkRC(arr) {
    var checkX = [];
    var checkY = [];
    for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
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