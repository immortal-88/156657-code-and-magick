'use strict';

(function () {
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
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var wizards = [];
  var isModalOpened = true;

  var setupOpen = document.querySelector('.setup-open');
  var setupDialog = document.querySelector('.setup');
  var setupClose = document.querySelector('.setup-close');
  var userIcon = document.querySelector('.setup-open-icon');
  var userName = document.querySelector('.setup-user-name');
  var wizardAppearance = document.querySelector('.setup-wizard-appearance');

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireBall = document.querySelector('.setup-fireball-wrap');

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

  var getRandomFireballColor = function () {
    return FIREBALL_COLORS[generateRandomNumber(FIREBALL_COLORS)];
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

  var openWindow = function () {
    setupDialog.classList.remove('hidden');
  };

  var closeWindow = function () {
    setupDialog.classList.add('hidden');
  };

  setupOpen.addEventListener('click', function () {
    openWindow();
  });

  setupClose.addEventListener('click', function () {
    closeWindow();
  });

  wizardCoat.addEventListener('click', function () {
    var randomCoatColor = getRandomColor();
    var coatInput = wizardAppearance.querySelector('input[name=coat-color]');
    wizardCoat.style.fill = randomCoatColor;
    coatInput.value = randomCoatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var randomEyesColor = getRandomEyesColor();
    var eyesInput = wizardAppearance.querySelector('input[name=eyes-color]');
    wizardEyes.style.fill = randomEyesColor;
    eyesInput.value = randomEyesColor;
  });

  wizardFireBall.addEventListener('click', function () {
    wizardFireBall.style.backgroundColor = getRandomFireballColor();
  });

  for (var j = 0; j < wizards.length; j++) {
    var wizard = createFragment(wizards[j].name, wizards[j].coatColor, wizards[j].eyesColor);
    var list = document.querySelector('.setup-similar-list');
    list.appendChild(wizard);
  }

  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (document.activeElement === userIcon) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        openWindow();
        isModalOpened = true;
      }
    }
    if (isModalOpened || document.activeElement !== userName) {
      if (evt.keyCode === ESC_KEY_CODE || document.activeElement === setupClose) {
        closeWindow();
        isModalOpened = false;
      }
    }
  });
})();
