'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;

var DISPLACEMENT = 10;
var BAR_CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SPACING = 50;

var TEXT_SIZE = 16;
var LINE_HEIGHT = 20;
var textSpacing = 10;
var colorText = '#000';

var VERTICAL_OFFSET = 20;

var labelHeight = CLOUD_HEIGHT - VERTICAL_OFFSET;

var players = ['Вы', 'Кекс', 'Катя', 'Игорь'];
var scores = [2725, 4025, 1244, 1339];
var barColors = ['rgba(255, 0, 0, 1)', 'rgb(0, 0, 255)', 'rgb(0, 0, 255, 0.3)', 'rgba(0, 0, 255, 0.6)'];

var getMaxScore = function (scoreValues) {
  var max = scoreValues[0];
  for (var i = 0; i < scores.length; i++) {
    if (max < scoreValues[i]) {
      max = scoreValues[i];
    }
  }
  return max;
};

var maxScore = getMaxScore(scores);

var getBarHeigth = function (scoreIndex) {
  return scores[scoreIndex] / maxScore * (BAR_CHART_HEIGHT - (textSpacing + (LINE_HEIGHT * 2)));
};

var shape = [
  [220, 10, 310, 40],
  [400, 10, 490, 40],
  [520, 100, 490, 130],
  [520, 190, 490, 250],
  [400, 280, 310, 250],
  [220, 280, 130, 250],
  [100, 190, 130, 130],
  [100, 100, 130, 40]
];

var getShadow = function (shapePoints) {
  var shadowPoints = [];
  for (var i = 0; i < shapePoints.length; i++) {
    shadowPoints[i] = [];
    for (var j = 0; j < shapePoints[i].length; j++) {
      shadowPoints [i][j] = shapePoints[i][j] + DISPLACEMENT;
    }
  }
  return shadowPoints;
};

var shadow = getShadow(shape);

var shapeColor = 'white';

var shadowColor = 'rgba(0, 0, 0, 0.7)';

var shapeStartingPoint = [130, 40];

var shadowStartingPoint = [140, 50];

var renderCloud = function (ctx, color, startingPoint, points) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(startingPoint[0], startingPoint[1]);
  for (var i = 0; i < 8; i++) {
    ctx.quadraticCurveTo(points[i][0], points[i][1], points[i][2], points[i][3]);
  }
  ctx.stroke();
  ctx.fill();
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, shadowColor, shadowStartingPoint, shadow);
  renderCloud(ctx, shapeColor, shapeStartingPoint, shape);

  ctx.fillStyle = colorText;
  ctx.font = TEXT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', 140, 50);
  ctx.fillText('Список результатов:', 140, 66);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = colorText;
    ctx.fillText(players[i], CLOUD_X + BAR_SPACING + (BAR_WIDTH + BAR_SPACING) * i, labelHeight);
    ctx.fillText(scores[i], CLOUD_X + BAR_SPACING + (BAR_WIDTH + BAR_SPACING) * i, (labelHeight - getBarHeigth(i) - LINE_HEIGHT - textSpacing));
    ctx.fillStyle = barColors[i];
    ctx.fillRect(CLOUD_X + BAR_SPACING + (BAR_WIDTH + BAR_SPACING) * i, labelHeight - getBarHeigth(i) - LINE_HEIGHT, BAR_WIDTH, getBarHeigth(i));
  }
};
