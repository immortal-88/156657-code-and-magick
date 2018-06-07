'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';

var SHADE_COLOR = 'rgba(0, 0, 0, 0.7)';

var COLUMN_WIDTH = 40;
var COLUMN_DISTANCE = COLUMN_WIDTH + 50;

var HIST_HEIGHT = 150;

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

var getColumnColor = function (name) {
  return name === 'Вы'
    ? 'rgba(255, 0, 0, 1)'
    : 'rgba(0, 0, ' + Math.random() * 256 + ', 1)';
};

var maxValue = 0;
var getLargestValue = function (times) {
  for (var j = 0; j < times.length; j++) {
    if (times[j] > maxValue) {
      maxValue = times[j];
    }
  }
  return maxValue;
};

var getColumnHeight = function (times, time, largestValue) {
  return time === largestValue
    ? HIST_HEIGHT
    : time * HIST_HEIGHT / largestValue;
};

var renderAllColumns = function (ctx, names, times) {
  var columnX = 150;
  var columnY = 90;
  var largestValue = getLargestValue(times);
  for (var i = 0; i < names.length; i++) {
    var columnHeight = getColumnHeight(times, times[i], largestValue);
    var diff = HIST_HEIGHT - columnHeight;

    renderColumn(ctx, columnX, columnY + diff, columnHeight, getColumnColor(names[i]));
    ctx.fillText(names[i], columnX, columnY + HIST_HEIGHT + 20);
    ctx.fillText(Math.round(times[i]), columnX, columnY - 10 + diff);
    columnX += COLUMN_DISTANCE;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, SHADE_COLOR, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.fontSize = '16px';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);
  ctx.fontFamily = 'PT Mono';

  renderAllColumns(ctx, names, times);
};
