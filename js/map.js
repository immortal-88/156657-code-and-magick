'use strict';

(function () {
  var ADS_QUANTITY = 8;
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var pins = document.querySelector('.map__pins');
  var copyTemplate = document.querySelector('template')
    .content.cloneNode(true);

  var ads = [];
  var shuffledTitles = TITLES.slice(0, TITLES.length);
  var fragment = document.createDocumentFragment();

  var generateRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
  };

  var getRandomArrayValue = function (arr) {
    return arr[Math.ceil(Math.random() * arr.length - 1)];
  };

  var getRandomFeatures = function (arr) {
    var random = Math.ceil(Math.random() * arr.length);
    if (random !== 0) {
      return arr.slice(0, random);
    }
    return arr.slice(0, 1);
  };

  var shuffleArray = function (arr) {
    var copyArr = arr;
    var counter = copyArr.length;
    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);
      counter--;
      var temp = copyArr[counter];
      copyArr[counter] = copyArr[index];
      copyArr[index] = temp;
    }
    return copyArr;
  };

  var selectType = function (type) {
    switch (type) {
      case 'palace':
        type = 'Дворец';
        break;
      case 'flat':
        type = 'Квартира';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
    }
    return type;
  };

  var clearFromChildren = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var createAd = function (index) {
    var randomX = generateRandomNumber(300, 900);
    var randomY = generateRandomNumber(130, 630);
    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      location: {
        x: randomX,
        y: randomY
      },
      offer: {
        title: shuffleArray(shuffledTitles)[shuffledTitles.length - 1],
        address: randomX + ', ' + randomY,
        price: generateRandomNumber(1000, 1000000),
        type: getRandomArrayValue(TYPES),
        rooms: generateRandomNumber(1, 5),
        guests: generateRandomNumber(1, 10),
        checkin: getRandomArrayValue(CHECK_TIME),
        checkout: getRandomArrayValue(CHECK_TIME),
        features: getRandomFeatures(FEATURES),
        description: '',
        photos: shuffleArray(PHOTOS)
      }
    };
  };

  var generateAds = function () {
    for (var i = 0; i < ADS_QUANTITY; i++) {
      ads.push(createAd(i));
      shuffledTitles.splice(shuffledTitles.length - 1, 1);
    }
  };

  var createPin = function (x, y, avatar, title) {
    var pin = copyTemplate.querySelector('.map__pin').cloneNode(true);
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
    pin.querySelector('img').src = avatar;
    pin.querySelector('img').alt = title;
    return pin;
  };

  var fillFeatures = function (features) {
    for (var j = 0; j < ads[0].offer.features.length; j++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + ads[0].offer.features[j]);
      features.appendChild(feature);
    }
  };

  var fillPhotos = function (photos) {
    for (var k = 0; k < ads[0].offer.photos.length; k++) {
      var photo = document.createElement('img');
      photo.src = ads[0].offer.photos[k];
      photo.width = 45;
      photo.height = 40;
      photo.classList.add('popup__photo');
      photos.appendChild(photo);
    }
  };

  var fillArticle = function () {
    var templateMap = copyTemplate.querySelector('.map__card');
    var map = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var title = templateMap.querySelector('.popup__title');
    var address = templateMap.querySelector('.popup__text--address');
    var price = templateMap.querySelector('.popup__text--price');
    var type = templateMap.querySelector('.popup__type');
    var roomsAndGuests = templateMap.querySelector('.popup__text--capacity');
    var checkTime = templateMap.querySelector('.popup__text--time');
    var features = templateMap.querySelector('.popup__features');
    var description = templateMap.querySelector('.popup__description');
    var avatar = templateMap.querySelector('.popup__avatar');
    var photos = templateMap.querySelector('.popup__photos');

    templateMap.querySelector('.popup__title');
    title.textContent = ads[0].offer.title;
    address.textContent = ads[0].offer.address;
    price.textContent = ads[0].offer.price + '₽/ночь';
    type.textContent = selectType(ads[0].offer.type);
    roomsAndGuests.textContent = ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей';
    checkTime.textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
    description.textContent = ads[0].offer.description;
    avatar.src = ads[Math.floor(Math.random() * ads.length)].author.avatar;

    clearFromChildren(features);
    clearFromChildren(photos);

    fillFeatures(features);
    fillPhotos(photos);

    map.insertBefore(templateMap, mapFiltersContainer);
  };

  generateAds();
  fillArticle();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i].location.x, ads[i].location.y, ads[i].author.avatar, ads[i].offer.title));
  }
  pins.appendChild(fragment);

  document.querySelector('.map').classList.remove('map--faded');

})();

