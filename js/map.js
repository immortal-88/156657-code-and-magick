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

  var pins = document.querySelector('.map__pins');
  var copyTemplate = document.querySelector('template')
    .content.cloneNode(true);

  var ads = [];
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var generateRandomNumber = function (min, max, isUnique) {
    if (isUnique) {
      return shuffleArray(numbers)[numbers.length - 1];
    }
    return Math.round(Math.random() * (max - min + 1) + min);
  };

  var getRandomArrayValue = function (arr, isUnique) {
    if (isUnique) {
      return shuffleArray(arr)[arr.length - 1];
    }
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
    var counter = arr.length;
    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);
      counter--;
      var temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
    return arr;
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

  var createAd = function () {
    var randomX = generateRandomNumber(300, 900);
    var randomY = generateRandomNumber(130, 630);
    return {
      author: {
        avatar: 'img/avatars/user0' + generateRandomNumber(1, 8, true) + '.png'
      },
      location: {
        x: randomX,
        y: randomY
      },
      offer: {
        title: getRandomArrayValue(titles, true),
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
      ads.push(createAd());
      numbers.splice(numbers.length - 1, 1);
      titles.splice(titles.length - 1, 1);
    }
  };

  generateAds();

  var createPin = function (x, y, avatar, title) {
    var pin = copyTemplate.querySelector('.map__pin').cloneNode(true);
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
    pin.children[0].src = avatar;
    pin.children[0].alt = title;
    pins.appendChild(pin);
  };

  for (var i = 0; i < ads.length; i++) {
    createPin(ads[i].location.x, ads[i].location.y, ads[i].author.avatar, ads[i].offer.title);
  }

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
    title.innerText = ads[0].offer.title;
    address.innerText = ads[0].offer.address;
    price.innerText = ads[0].offer.price + '₽/ночь';
    type.innerText = selectType(ads[0].offer.type);
    roomsAndGuests.innerText = ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей';
    checkTime.innerText = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
    description.innerText = ads[0].offer.description;
    avatar.src = ads[0].author.avatar;

    clearFromChildren(features);
    clearFromChildren(photos);

    for (var j = 0; j < ads[0].offer.features.length; j++) {
      var item = document.createElement('li');
      item.classList.add('popup__feature', 'popup__feature--' + ads[0].offer.features[j]);
      features.appendChild(item);
    }

    for (var k = 0; k < ads[0].offer.photos.length; k++) {
      var photo = document.createElement('img');
      photo.src = ads[0].offer.photos[k];
      photo.width = 45;
      photo.height = 40;
      photo.classList.add('popup__photo');
      photos.appendChild(photo);
    }

    map.insertBefore(templateMap, mapFiltersContainer);
  };

  fillArticle();

  document.querySelector('.map').classList.remove('map--faded');

})();

