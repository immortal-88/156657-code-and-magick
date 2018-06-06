'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';

var SHADE_COLOR = 'rgba(0, 0, 0, 0.7)';

var COLUMN_WIDTH = 40;
var COLUMN_DISTANCE = COLUMN_WIDTH + 50;

var drawFigure = function (ctx, color, shift) {
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.fillStyle = color;
  ctx.moveTo(100 + shift, 10 + shift);
  ctx.lineTo(310 + shift, 15 + shift);
  ctx.lineTo(520 + shift, 10 + shift);
  ctx.lineTo(520 + shift, 270 + shift);
  ctx.lineTo(310 + shift, 265 + shift);
  ctx.lineTo(100 + shift, 270 + shift);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

var renderCustomCloud = function (ctx, shade, color) {
  drawFigure(ctx, shade, 10);
  drawFigure(ctx, color, 0);
};

var renderCloud = function (ctx, x, y, shade, color) {
  ctx.fillStyle = shade;
  ctx.fillRect(x + 10, y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderColumn = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, COLUMN_WIDTH, height);

  ctx.fillStyle = '#000';
  ctx.fontSize = '16px';
};

var getRandomBlue = function () {
  return Math.random() * 256;
};

window.renderStatistics = function (ctx, names, times) {
  // Usual rect
  renderCloud(ctx, 110, 20, SHADE_COLOR, CLOUD_COLOR);

  // Custom cloud
  // renderCustomCloud(ctx, SHADE_COLOR, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.fontSize = '16px';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);
  ctx.fontFamily = 'PT Mono';

  var columnX = 150;
  var columnY = 90;
  var largestValue = 0;
  var histHeight = 150;

  for (var j = 0; j < times.length; j++) {
    if (times[j] > largestValue) {
      largestValue = times[j];
    }
  }

  for (var i = 0; i < names.length; i++) {
    var height = times[i] === largestValue ? histHeight : times[i] * histHeight / largestValue;
    var columnColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, ' + getRandomBlue() + ', 1)';
    var diff = histHeight - height;

    renderColumn(ctx, columnX, columnY + diff, height, columnColor);
    ctx.fillText(names[i], columnX, columnY + histHeight + 20);
    ctx.fillText(Math.round(times[i]), columnX, (columnY - 10) + diff);
    columnX += COLUMN_DISTANCE;
  }
};
