//==========================================================
// SISTEMA WEBGIS
// Dashboard.js
//==========================================================

//----------------------------------------------------------
// GRÁFICO - USO DO SOLO
//----------------------------------------------------------

fetch("/api/uso_solo")

.then(response => response.json())

.then(function(data){

    let contagem = {};

    data.features.forEach(function(f){

        let classe = f.properties.LC_DESCRIP;

        if(!classe) classe = "Sem informação";

        if(contagem[classe]){

            contagem[classe]++;

        }else{

            contagem[classe]=1;

        }

    });

    let labels = Object.keys(contagem);

    let valores = Object.values(contagem);

    new Chart(

        document.getElementById("graficoUso"),

        {

            type:"bar",

            data:{

                labels:labels,

                datasets:[{

                    label:"Número de Polígonos",

                    data:valores,

                    backgroundColor:"#2E8B57"

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    legend:{display:false},

                    title:{

                        display:true,

                        text:"Uso do Solo"

                    }

                },

                scales:{

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

});
//----------------------------------------------------------
// GRÁFICO - SOLOS
//----------------------------------------------------------

fetch("/api/solos")

.then(response => response.json())

.then(function(data){

    let contagem = {};

    data.features.forEach(function(f){

        let solo = f.properties.AGRUP_SOLO;

        if(!solo) solo = "Sem informação";

        if(contagem[solo]){

            contagem[solo]++;

        }else{

            contagem[solo]=1;

        }

    });

    let labels = Object.keys(contagem);

    let valores = Object.values(contagem);

    new Chart(

        document.getElementById("graficoSolo"),

        {

            type:"pie",

            data:{

                labels:labels,

                datasets:[{

                    data:valores,

                    backgroundColor:[

                        "#8BC34A",
                        "#FFC107",
                        "#03A9F4",
                        "#FF5722",
                        "#9C27B0",
                        "#795548",
                        "#607D8B",
                        "#4CAF50",
                        "#CDDC39",
                        "#009688"

                    ]

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    title:{

                        display:true,

                        text:"Grupos de Solo"

                    },

                    legend:{

                        position:"bottom"

                    }

                }

            }

        }

    );

});