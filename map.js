/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var gray = L.layerGroup();
    // more than one service can be grouped together and passed to the control together
    L.esri.basemapLayer("GrayLabels").addTo(gray);  
    L.esri.basemapLayer("DarkGray").addTo(gray);

  var states = L.esri.featureLayer({
      url: "https://apl.esri.com/apl2/rest/services/Mexico/Mexico_traveller_c/MapServer/28",
      style: function (feature) {
          return {color: '#bada55', weight:1};
      }
  });

  var map = L.map('map', {
      center: [22, -99],
      zoom: 5,
      layers: [L.esri.basemapLayer("Topographic"), states],
      
  });

  var baseLayers = {
      "Oceanos":L.esri.basemapLayer("Oceans"),
      "Gris": gray,
      "Streetmap": L.esri.basemapLayer("Streets"),
      "Topographic":L.esri.basemapLayer("Topographic"),
      "Streets":L.esri.basemapLayer("Streets"),
      "NationalGeographic":L.esri.basemapLayer("NationalGeographic")     
  };

 

  // http://leafletjs.com/reference-1.0.3.html#control-layers
 

var lugares = [
  [31.77, -113.49], 
  [27.4697, -112.591],
  [29.967149, -114.396597],
  [19.311111, -110.805556],
  [18.7833, -110.95],
  [21.4504, -104.733],
  [27.516278, -107.826806],
  [22.881111, -109.913611]
];



var imagenes = [['https://i.ytimg.com/vi/vB8DgjEcGRI/maxresdefault.jpg','Cráter El Elegante, Sierra del Pinacate, Sonora'],
["https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/LasTresVirgenes06.jpg/413px-LasTresVirgenes06.jpg", 'Las Tres Vírgenes. Mulegé, Baja California Sur'],
["https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/LasTresVirgenes06.jpg/250px-LasTresVirgenes06.jpg", 'La Caldera La Reforma, Isla San Luis, Península de Baja California Sur.'],
["https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Barcena.jpg/413px-Barcena.jpg", 'Bárcena, Isla San Benedicto, Colima'],
["http://hablemosdevolcanes.com/wp-content/uploads/2018/10/evemar.jpg", 'Evermann, Isla Socorro, en el archipiélago de Revillagigedo, Colima'],
["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Volc%C3%A1n_Sangang%C3%BCey.jpg/413px-Volc%C3%A1n_Sangang%C3%BCey.jpg", "Sangangüey. Tepic, Nayarit"],
["https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Barranca_del_cobre_2.jpg/375px-Barranca_del_cobre_2.jpg", "Barrancas del Cobre, Chihuahua"],
["https://blog.bestday.com.mx/wp-content/uploads/2014/05/Las-3-mejores-playas-de-Los-Cabos.jpg", "Los Cabos, Baja California"]
];


/* Se inicializa arreglos marcadores */
var arregloDeMarcadores = [];
var imgIcon = [];
var popup =[];

/* Se agregan los marcadores al arreglo y al mapa */
for(var i=0; i < lugares.length; i++){
	imgIcon[i] = L.icon({iconUrl: 'img/ico'+i+'.svg',iconSize:(24,24)});
	arregloDeMarcadores[i] = new L.marker(lugares[i], {icon: imgIcon[i]}).addTo(map);
	popup[i]= L.popup({minWidth:150}).setContent('<img src="'+imagenes[i][0]+'" style="width:100px;height:80px;border:0;"><p>'+imagenes[i][1]+'</p>')
	arregloDeMarcadores[i].bindPopup(popup[i])
}
var sismosStyle={
    radius: 1.6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
}

var geojsonLayer = L.geoJson(sismos, {
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h1>'+feature.properties.Magnitud+'</h1>');
  },
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, sismosStyle);
    }
}).addTo(map);

 var overlays = {
      "Estados de México": states,
      "Sismos 2019": geojsonLayer
  };

var home = {
  lat: 22,
  lng: -99,
  zoom: 5
}; 

L.easyButton('<img src="img/placeholder.png">', function(btn, map){
  map.setView([home.lat, home.lng], home.zoom);
},'Zoom To Home').addTo(map);

L.control.layers(baseLayers, overlays).addTo(map);

