if (document.querySelector('#map')) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [59.859872, 30.287930],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    });

    var myPlacemark = new ymaps.GeoObject({
      geometry: {
          type: "Point",
          coordinates: [59.859872, 30.287930]
      }
    });

    myMap.geoObjects.add(myPlacemark);
  }
}
