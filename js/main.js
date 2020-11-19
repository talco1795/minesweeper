'use strict'

var gBoard = []
var gSize = 4;
var gNumMine = 4;
var gClickCount = 0;
var gFlagCount = 0;

var gMine = '💣';
var gFlag = '🚩';
var gHappyFace = '🙂';
var gSadFace = '☹️';


function init() {
    gClickCount = 0;
    gBoard = []
    createBoard(gBoard)
    renderBoard(gBoard)
    console.table(gBoard)
}

//console.log(setMinesNegsCount(1, 1, gBoard[1][1].minesAroundCount))
function boardSize(elSize) {
    gSize = elSize;
    if (elSize === 4) gNumMine = 4
    if (elSize === 6) gNumMine = 8
    if (elSize === 8) gNumMine = 12

    init()
}

function setMinesNegsCount(rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine) count++;
        }
    }
    return count;
}


function createBoard() {
    for (var i = 0; i < gSize; i++) {
        gBoard[i] = []
        for (var j = 0; j < gSize; j++) {
            gBoard[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
}

function SetMines() {
    var numOfMine = 0
    while (numOfMine < gNumMine) {
        var randomI = getRandomInteger(0, gBoard.length)
        var randomJ = getRandomInteger(0, gBoard[0].length)
        if (!gBoard[randomI][randomJ].isMine && !gBoard[randomI][randomJ].isShown) {
            gBoard[randomI][randomJ].isMine = true
            numOfMine++
        }
    }
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            var className = 'cells cell-' + i + '-' + j;
            strHTML += '<td class="' + className + '" onclick="cellClicked(this)" oncontextmenu="setFlag(this)"> </td>';
        }

        strHTML += '</tr>';
        // console.log(strHTML)
    }
    var elTable = document.querySelector('tbody');
    elTable.innerHTML = strHTML;
}

function setFlag(elStr) {
    var str = elStr.className;
    var pos = str.split('-')
    var i = +pos[1]
    var j = +pos[2]
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true;
        elStr.innerText = gFlag;
        gFlagCount++
    }
    else if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;  //not changing
        elStr.innerText = '';
        gFlagCount--
    }

}  ///////////// check win



function checkWin() {

  //  if (gFlagCount === gNumMine
    
}

function cellClicked(elStr) {
    var str = elStr.className;
    var pos = str.split('-')
    var i = +pos[1]
    var j = +pos[2]
    gBoard[i][j].isShown = true;
    if (gClickCount === 0) startGame()
    gClickCount++
    elStr.innerText = setMinesNegsCount(i, j)
    if (gBoard[i][j].isMine) {
        elStr.innerText = gMine;
        GameOver()
    }
    elStr.style = 'background-color : darkslategrey'

}

function GameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {

                document.querySelector('.cell-' + i + '-' + j).innerText = gMine
            }
        }
    }
    setTimeout(timer())
    console.log(timeCount)
}


function startGame() {
    SetMines()
    timer()
}

function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

function timer() {

    // var timeCount = 0
    // timeCount = setInterval(timeCount++, 1000)
    // console.log(timeCount)
}





