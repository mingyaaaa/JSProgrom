var chess = document.getElementById('chess');
var me = true;
var chessBord = [];

//赢法数组
var wins = [];
var winCount = 0;
var over = false;
//初始化
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
//统计所有的竖列
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][winCount] = true;
		}
		winCount++;
	}
}
//统计横列
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 15; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j][winCount] = true;
		}
		winCount++;
	}
}
//统计所有的/
//wins[4][0]
//wins[3][1]
//wins[2][2]
//wins[1][3]
//wins[0][4]

//wins[4][1]
//wins[3][2]
//wins[2][3]
//wins[1][4]
//wins[0][5]
for (var i = 4; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i - k][j + k][winCount] = true;
		}
		winCount++;
	}
}

//统计所有的\
//wins[0][0]
//wins[1][1]
//wins[2][2]
//wins[3][3]
//wins[4][4]

//wins[0][1]
//wins[1][2]
//wins[2][3]
//wins[3][4]
//wins[4][5]
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][winCount] = true;
		}
		winCount++;
	}
}

//赢法的统计数组
var myWin = [];
var compWin = [];
for (var i = 0; i < winCount; i++) {
	myWin[i] = 0;
	compWin[i] = 0;
}






for (var i = 0; i < 15; i++) {
	chessBord[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBord[i][j] = 0;
	}
}
var context = chess.getContext('2d');
context.strokeStyle = 'black';
var logo = new Image();
logo.src = "image/shuiyin.jpg";
logo.onload = function() {
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}

var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}
}
var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e) {
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (chessBord[i][j] == 0) {
		oneStep(i, j, me);
		chessBord[i][j] = 1;
		for (var k = 0; k < winCount; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				compWin[k] = 6;
				if (myWin[k] == 5) {
					window.alert("你赢了！！！");
					over = true;
				}
			}
		}
		if (!over) {
			me = !me;
			computerAI();
		}
	}
}
var computerAI = function() {
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0,
		v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBord[i][j] == 0) {
				for (var k = 0; k < winCount; k++) {
					if (wins[i][j][k]) {
						if (myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if (myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if (myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if (myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if (compWin[k] == 1) {
							myScore[i][j] += 210;
						} else if (compWin[k] == 2) {
							myScore[i][j] += 420;
						} else if (compWin[k] == 3) {
							myScore[i][j] += 2200;
						} else if (compWin[k] == 4) {
							myScore[i][j] += 20000;
						}
					}

				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore == max) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if (computerScore == max) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBord[u][v] = 2;
	for (var k = 0; k < winCount; k++) {
		if (wins[u][v][k]) {
			compWin[k]++;
			myWin[k] = 6;
			if (compWin[k] == 5) {
				window.alert("电脑赢了！！！");
				over = true;
			}
		}
	}
	if (!over) {
		me = !me;
	}
}