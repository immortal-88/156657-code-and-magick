'use strict';

(function () {
  document.querySelector('.setup').classList.remove('hidden');

  var wizards = [];

  var WIZARDS_QUANTITY = 4;

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var generateRandomNumber = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var createRandomName = function () {
    return (
      WIZARD_NAMES[generateRandomNumber(WIZARD_NAMES)] +
      ' ' +
      WIZARD_SURNAMES[generateRandomNumber(WIZARD_SURNAMES)]
    );
  };

  var getRandomColor = function () {
    return WIZARD_COAT_COLORS[generateRandomNumber(WIZARD_COAT_COLORS)];
  };

  var getRandomEyesColor = function () {
    return WIZARD_EYES_COLORS[generateRandomNumber(WIZARD_EYES_COLORS)];
  };

  var createWizard = function () {
    return {
      name: createRandomName(),
      coatColor: getRandomColor(),
      eyesColor: getRandomEyesColor()
    };
  };

  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    wizards.push(createWizard());
  }

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

  for (var j = 0; j < wizards.length; j++) {
    var wizard = createFragment(wizards[j].name, wizards[j].coatColor, wizards[j].eyesColor);
    var list = document.querySelector('.setup-similar-list');
    list.appendChild(wizard);
  }

  document.querySelector('.setup-similar').classList.remove('hidden');

})();
