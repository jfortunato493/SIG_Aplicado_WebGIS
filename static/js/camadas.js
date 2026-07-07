//==========================================================
// SISTEMA WEBGIS
// CAMADAS
//==========================================================


//==========================================================
// VARIÁVEIS
//==========================================================

var limiteLayer = null;
var drenagemLayer = null;
var usoLayer = null;
var solosLayer = null;


//==========================================================
// CORES DOS SOLOS
//==========================================================

function corSolo(nome){

    if(!nome) return "#b5651d";

    nome = nome.toLowerCase();

    if(nome.includes("arg")) return "#8d6e63";

    if(nome.includes("aren")) return "#f4d03f";

    if(nome.includes("franco")) return "#cd853f";

    if(nome.includes("vert")) return "#556b2f";

    return "#b5651d";

}


//==========================================================
// CORES DO USO DO SOLO
//==========================================================

function corUso(nome){

    if(!nome) return "#4caf50";

    nome = nome.toLowerCase();

    if(nome.includes("agri")) return "#f1c40f";

    if(nome.includes("veget")) return "#2ecc71";

    if(nome.includes("agua")) return "#3498db";

    if(nome.includes("urban")) return "#7f8c8d";

    return "#95a5a6";

}


//==========================================================
// LIMITE
//==========================================================

fetch("/api/limite")

.then(r => r.json())

.then(function(data){

    limiteLayer = L.geoJSON(data,{

        style:{

            color:"#d32f2f",
            weight:3,
            fill:false

        }

    });

    limiteLayer.addTo(map);

});


//==========================================================
// DRENAGEM
//==========================================================

fetch("/api/drenagem")

.then(r => r.json())

.then(function(data){

    drenagemLayer = L.geoJSON(data,{

        style:{

            color:"#1976d2",
            weight:2

        },

        onEachFeature:function(feature,layer){

            layer.bindPopup(

                "<h5>Rede de Drenagem</h5>"

            );

        }

    });

    drenagemLayer.addTo(map);

});


//==========================================================
// USO DO SOLO
//==========================================================

fetch("/api/uso_solo")

.then(response => response.json())

.then(function(data){

    usoLayer = L.geoJSON(data,{

        style:function(feature){

            return{

                color:"#555",

                weight:1,

                fillColor:"#F4D03F",

                fillOpacity:0.70

            };

        },

        onEachFeature:function(feature,layer){

            var p = feature.properties;

            layer.bindPopup(`

            <div style="width:260px">

            <h4 style="color:#2E8B57;">🌾 Uso do Solo</h4>

            <hr>

            <table class="table table-sm">

            <tr>

            <th>Código</th>

            <td>${p.LC_PRI_1 || "-"}</td>

            </tr>

            <tr>

            <th>Classe</th>

            <td>${p.LC_DESCRIP || "-"}</td>

            </tr>

            <tr>

            <th>Área</th>

            <td>${p.HECTARES || "-"} ha</td>

            </tr>

            <tr>

            <th>Reclassificação</th>

            <td>${p.RECLASS1 || "-"}</td>

            </tr>

            </table>

            </div>

            `);

            layer.on({

                mouseover:function(e){

                    e.target.setStyle({

                        weight:3,

                        color:"#000"

                    });

                },

                mouseout:function(e){

                    usoLayer.resetStyle(e.target);

                }

            });

        }

    });

});


//==========================================================
// SOLOS
//==========================================================

fetch("/api/solos")

.then(response => response.json())

.then(function(data){

    solosLayer = L.geoJSON(data,{

        style:function(feature){

            return{

                color:"#4E342E",

                weight:1,

                fillColor:"#A1887F",

                fillOpacity:0.70

            };

        },

        onEachFeature:function(feature,layer){

            var p = feature.properties;

            layer.bindPopup(`

            <div style="width:300px">

            <h4 style="color:#6D4C41;">🌱 Tipo de Solo</h4>

            <hr>

            <table class="table table-sm">

            <tr>

            <th>Grupo</th>

            <td>${p.AGRUP_SOLO || "-"}</td>

            </tr>

            <tr>

            <th>Textura</th>

            <td>${p.TEXTURA || "-"}</td>

            </tr>

            <tr>

            <th>Topografia</th>

            <td>${p.TOPOGRAFIA || "-"}</td>

            </tr>

            <tr>

            <th>Drenagem</th>

            <td>${p.DRENAGEM || "-"}</td>

            </tr>

            <tr>

            <th>Profundidade</th>

            <td>${p.PROFUNDI || "-"}</td>

            </tr>

            <tr>

            <th>Acidez</th>

            <td>${p.ACIDEZ_ALC || "-"}</td>

            </tr>

            <tr>

            <th>Matéria Orgânica</th>

            <td>${p.MATER_RGAN || "-"}</td>

            </tr>

            <tr>

            <th>Geologia</th>

            <td>${p.GEOM_GEOLO || "-"}</td>

            </tr>

            </table>

            </div>

            `);

            layer.on({

                mouseover:function(e){

                    e.target.setStyle({

                        weight:3,

                        color:"#000"

                    });

                },

                mouseout:function(e){

                    solosLayer.resetStyle(e.target);

                }

            });

        }

    });

});


//==========================================================
// CHECKBOXES
//==========================================================

document.getElementById("chkLimite")

.onchange=function(){

if(this.checked){

map.addLayer(limiteLayer);

}else{

map.removeLayer(limiteLayer);

}

};


document.getElementById("chkDrenagem")

.onchange=function(){

if(this.checked){

map.addLayer(drenagemLayer);

}else{

map.removeLayer(drenagemLayer);

}

};


document.getElementById("chkUso")

.onchange=function(){

if(this.checked){

map.addLayer(usoLayer);

}else{

map.removeLayer(usoLayer);

}

};


document.getElementById("chkSolos")

.onchange=function(){

if(this.checked){

map.addLayer(solosLayer);

}else{

map.removeLayer(solosLayer);

}

};
//----------------------------------------------------------
// LEGENDA
//----------------------------------------------------------

function legendaUso(){

document.getElementById("legenda").innerHTML=`

<div class="item-legenda">

<div class="cor-legenda" style="background:#F4D03F;"></div>

Agricultura

</div>

<div class="item-legenda">

<div class="cor-legenda" style="background:#2ECC71;"></div>

Vegetação

</div>

<div class="item-legenda">

<div class="cor-legenda" style="background:#3498DB;"></div>

Água

</div>

<div class="item-legenda">

<div class="cor-legenda" style="background:#7F8C8D;"></div>

Urbano

</div>

`;

}


function legendaSolo(){

document.getElementById("legenda").innerHTML=`

<div class="item-legenda">

<div class="cor-legenda" style="background:#A1887F;"></div>

Grupo de Solos

</div>

<div class="item-legenda">

<div class="cor-legenda" style="background:#8D6E63;"></div>

Argilosos

</div>

<div class="item-legenda">

<div class="cor-legenda" style="background:#F4D03F;"></div>

Arenosos

</div>

`;

}


document.getElementById("chkUso").addEventListener("change",function(){

if(this.checked){

legendaUso();

}

});


document.getElementById("chkSolos").addEventListener("change",function(){

if(this.checked){

legendaSolo();

}

});