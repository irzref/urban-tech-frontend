import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './main.css';
import $ from "jquery";

const url = "http://localhost:8080/api/";

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});



const map = L.map('map');
const defaultCenter = [38.889269, -77.050176];
const defaultZoom = 3;
const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

map.setView(defaultCenter, defaultZoom);
map.on('popupopen', function(e) {
  var popen = e.popup;
  if (popen.options.lazyload) {
    popen.setContent(
      'LOADING...'
    );
    
    $.getJSON(url + "item-info?index=" + popen.options.lazyload["index_col"], function(data) {
      popen.setContent(
        '<div><img src="'+ data.image +'" /></div>' +
        `<table style="width:50%">
          <thead>
              <th>
                Taxonomy                 
              </th>
          </thead>
          <tbody>
            <tr>
              <td>Kingdom</td>
              <td> ` + data.kingdom + ` </td>
            </tr>
            <tr>
              <td>Phylum</td>
              <td> ` + data.phylum + ` </td>
            </tr>
            <tr>
              <td>Class</td>
              <td> ` + data.class + ` </td>
            </tr>
            <tr>
              <td>Order</td>
              <td> ` + data.order + ` </td>
            </tr>
            <tr>
              <td>Family</td>
              <td> ` + data.family + ` </td>
            </tr>
            <tr>
              <td>Genus</td>
              <td> ` + data.genus + ` </td>
            </tr>
            <tr>
              <td>Species</td>
              <td> ` + data.species + ` </td>
            </tr>
          </tbody>                        
        </table>`
      );
      console.log("test", data);
    });
  }
});

basemap.addTo(map);

$("div#map").ready(function() {

  $.getJSON(url + "item-info?index=0", function(data) { 

    var itemIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });    

    const marker = new L.marker([data["decimalLatitude"],data["decimalLongitude"]], {icon: itemIcon})
    .bindPopup(L.popup({
      lazyload: {
        "index_col": data["index_col"]
      }
    })).addTo(map);

  });  

  $.getJSON(url + "similar-items-info?index=0", function(data) { 

    for (var i = 0; i < data.length; i++) {      
      
      const marker = new L.marker([data[i]["decimalLatitude"],data[i]["decimalLongitude"]])
      .bindPopup(L.popup({
        lazyload: {
          "index_col": data[i]["index_col"]
        }
      })).addTo(map);

    }

  });
});



