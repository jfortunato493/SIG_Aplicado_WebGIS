//==========================================================
// SISTEMA WEBGIS COM BIG DATA
// Distrito de Chókwè
// mapa.js
//==========================================================


//==========================================================
// CRIAÇÃO DO MAPA
//==========================================================

var map = L.map("map", {

    zoomControl: false,
    attributionControl: false

}).setView([-24.53, 32.98], 10);


//==========================================================
// MAPAS BASE
//==========================================================

//---------------- OpenStreetMap ----------------

var osm = L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{
    maxZoom:19,
    attribution:'OpenStreetMap'
});


//---------------- Satélite ----------------

var satelite = L.tileLayer(

'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

{
    attribution:'Esri'
});


//---------------- CartoDB ----------------

var carto = L.tileLayer(

'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',

{
    attribution:'CartoDB'
});


//==========================================================
// MAPA INICIAL
//==========================================================

osm.addTo(map);


//==========================================================
// CONTROLO DOS MAPAS BASE
//==========================================================

var mapasBase = {

    "OpenStreetMap":osm,
    "Satélite":satelite,
    "CartoDB":carto

};


//==========================================================
// ZOOM
//==========================================================

L.control.zoom({

    position:"topright"

}).addTo(map);


//==========================================================
// ESCALA
//==========================================================

L.control.scale({

    imperial:false

}).addTo(map);


//==========================================================
// CONTROLO DE CAMADAS
//==========================================================

var overlays = {};

L.control.layers(

mapasBase,
overlays,

{
collapsed:false

}).addTo(map);


//==========================================================
// PESQUISA
//==========================================================

L.Control.geocoder({

    defaultMarkGeocode:true

})

.on('markgeocode', function(e){

    map.fitBounds(

        e.geocode.bbox

    );

})

.addTo(map);


//==========================================================
// COORDENADAS
//==========================================================

map.on("mousemove",function(e){

document.getElementById("coordX").innerHTML=

"<b>Lon:</b> "

+e.latlng.lng.toFixed(5);

document.getElementById("coordY").innerHTML=

"<b>Lat:</b> "

+e.latlng.lat.toFixed(5);

});


//==========================================================
// ZOOM
//==========================================================

map.on("zoomend",function(){

document.getElementById("zoom").innerHTML=

"<b>Zoom:</b> "

+map.getZoom();

});


//==========================================================
// BOTÃO HOME
//==========================================================

document.getElementById("btnHome")

.onclick=function(){

map.setView(

[-24.53,32.98],

10

);

};


//==========================================================
// ALTERAR MAPA BASE
//==========================================================

document.getElementById("basemap")

.onchange=function(){

map.removeLayer(osm);

map.removeLayer(satelite);

map.removeLayer(carto);

if(this.value==="osm"){

osm.addTo(map);

}

if(this.value==="sat"){

satelite.addTo(map);

}

if(this.value==="carto"){

carto.addTo(map);

}

};


//==========================================================
// FULLSCREEN
//==========================================================

document.getElementById("btnFullscreen")

.onclick=function(){

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}

else{

document.exitFullscreen();

}

};


//==========================================================
// IMPRIMIR
//==========================================================

document.getElementById("btnPrint")

.onclick=function(){

window.print();

};


//----------------------------------------------------------
// EXPORTAR MAPA PARA PNG
//----------------------------------------------------------

document.getElementById("btnExportar").onclick = function () {

    html2canvas(document.getElementById("map")).then(function(canvas){

        var link = document.createElement("a");

        link.download = "Mapa_Chokwe.png";

        link.href = canvas.toDataURL();

        link.click();

    });

};


//==========================================================
// SOBRE
//==========================================================

document.getElementById("btnInfo")

.onclick=function(){

var modal=new bootstrap.Modal(

document.getElementById("sobreModal")

);

modal.show();

};

//----------------------------------------------------------
// MEDIÇÃO
//----------------------------------------------------------

L.control.measure({

    position:"topright",

    primaryLengthUnit:"meters",

    secondaryLengthUnit:"kilometers",

    primaryAreaUnit:"sqmeters",

    secondaryAreaUnit:"hectares"

}).addTo(map);
//==========================================================
// MAPA CARREGADO
//==========================================================

console.log(

"WebGIS carregado com sucesso."

);
//----------------------------------------------------------
// PESQUISA LOCAL
//----------------------------------------------------------

document.getElementById("pesquisa")

.addEventListener("keyup",function(e){

if(e.key==="Enter"){

var texto=this.value.toLowerCase();

usoLayer.eachLayer(function(layer){

var p=layer.feature.properties;

if(

(p.LC_DESCRIP &&
p.LC_DESCRIP.toLowerCase().includes(texto))

){

map.fitBounds(layer.getBounds());

layer.openPopup();

}

});

}

});