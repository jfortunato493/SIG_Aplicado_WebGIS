//=========================================================
// ESTATÍSTICAS DO WEBGIS
//=========================================================

//---------------------------------------------------------
// USO DO SOLO
//---------------------------------------------------------

fetch("/api/uso_solo")

.then(response => response.json())

.then(function(data){

    var numeroPoligonos = data.features.length;

    var areaTotal = 0;

    var classes = {};

    data.features.forEach(function(feature){

        var p = feature.properties;

        if(p.HECTARES){

            areaTotal += Number(p.HECTARES);

        }

        if(p.LC_DESCRIP){

            classes[p.LC_DESCRIP]=true;

        }

    });

    document.getElementById("totalUso").innerHTML=

    numeroPoligonos;

    document.getElementById("areaUso").innerHTML=

    areaTotal.toLocaleString()+" ha";

    document.getElementById("classesUso").innerHTML=

    Object.keys(classes).length;

});


//---------------------------------------------------------
// SOLOS
//---------------------------------------------------------

fetch("/api/solos")

.then(response => response.json())

.then(function(data){

    var numeroSolos = data.features.length;

    var grupos = {};

    data.features.forEach(function(feature){

        var p = feature.properties;

        if(p.AGRUP_SOLO){

            grupos[p.AGRUP_SOLO]=true;

        }

    });

    document.getElementById("totalSolos").innerHTML=

    numeroSolos;

    document.getElementById("gruposSolo").innerHTML=

    Object.keys(grupos).length;

});


//---------------------------------------------------------
// DRENAGEM
//---------------------------------------------------------

fetch("/api/drenagem")

.then(response => response.json())

.then(function(data){

document.getElementById("totalDrenagem").innerHTML=

data.features.length;

});


//---------------------------------------------------------
// LIMITE
//---------------------------------------------------------

fetch("/api/limite")

.then(response=>response.json())

.then(function(data){

document.getElementById("totalLimite").innerHTML=

data.features.length;

});