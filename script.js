function initDemoMap(){
  // 衛星写真タイルレイヤ
  var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy Esri &mdash Source: Esri, i-cubed, USDA, USGS, ' +
    'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  })

  // 地形マップ
  var Stamen_TerrainBackground = L.tileLayer(
      'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash Map data &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  )

  // 黒地マップ
  var CartoDB_DarkMatterNoLabels = L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
    }
  )

  var baseLayers = {
    "Satellite": Esri_WorldImagery,
    "OpenElevationMap": Stamen_TerrainBackground,
    "CartoDB.DarkMatter": CartoDB_DarkMatterNoLabels
  }

  // マップ設定
  map = L.map('map', {
    layers: [CartoDB_DarkMatterNoLabels],
    minZoom: 4,
    maxZoom: 10
  })

  var layerControl = L.control.layers(baseLayers)
  layerControl.addTo(map)
  map.setView([36.5, 136], 5)

  return {
    map: map,
    layerControl: layerControl
  }
}

// demo map
var mapStuff = initDemoMap()
var map = mapStuff.map
var layerControl = mapStuff.layerControl

// load data (u, v grids) from somewhere (e.g. https://github.com/danwild/wind-js-server)
$.getJSON('./wind.json', function (data) {
  var velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: 'GBR Wind',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No wind data'
    },
    data: data,
    minVelocity: 0,
    maxVelocity: 11,
    velocityScale: 0.015,
  })
  layerControl.addOverlay(velocityLayer, 'Wind - Japan 2021.3.2 -')
})
