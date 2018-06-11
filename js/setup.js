'use strict';

var characterWindow = document.querySelector('.setup');
characterWindow.classList.remove('hidden');

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var colors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var generateRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var createRandomName = function () {
  return (
    names[generateRandomNumber(names)] +
    ' ' +
    surnames[generateRandomNumber(surnames)]
  );
};

var getRandomColor = function () {
  return colors[generateRandomNumber(colors)];
};

var getRandomEyesColor = function () {
  return eyesColor[generateRandomNumber(eyesColor)];
};

var wizards = [];
(function generateRandomWizards() {
  for (var i = 0; i < 4; i++) {
    var createWizard = Object({});
    createWizard.name = createRandomName();
    createWizard.coatColor = getRandomColor();
    createWizard.eyesColor = getRandomEyesColor();
    wizards.push(createWizard);
  }
})();

var createFragment = function (name, coatColor, eyeColor) {
  var template = document.querySelector('#similar-wizard-template');
  var wizardDiv = template.content.cloneNode(true);

  var wizardName = wizardDiv.querySelector('.setup-similar-label');
  wizardName.innerText = name;

  var wizardCoatColor = wizardDiv.querySelector('.wizard-coat');
  wizardCoatColor.style.fill = coatColor;

  var wizardEyesColor = wizardDiv.querySelector('.wizard-eyes');
  wizardEyesColor.style.fill = eyeColor;

  return wizardDiv;
};

(function generateRandomWizards() {
  for (var j = 0; j < wizards.length; j++) {
    var wizard = createFragment(wizards[j].name, wizards[j].coatColor, wizards[j].eyesColor);
    var list = document.querySelector('.setup-similar-list');
    list.appendChild(wizard);
  }
})();

var wizardsMenu = document.querySelector('.setup-similar');
wizardsMenu.classList.remove('hidden');
