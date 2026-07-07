# Sistema WebGIS com Big Data para Monitorização Ambiental no Distrito de Chókwè

## Descrição

Este projecto consiste no desenvolvimento de um Sistema WebGIS para visualização, análise e monitorização de dados ambientais do Distrito de Chókwè, Província de Gaza, Moçambique.

O sistema permite visualizar diferentes camadas geográficas, incluindo:

- Limite do Distrito de Chókwè
- Uso e cobertura do solo
- Rede de drenagem
- Solos
- Modelo Digital de Elevação (DEM)
- Índice de Vegetação (NDVI)

O projecto foi desenvolvido no âmbito da disciplina **SIG Aplicado à Gestão Ambiental e Desenvolvimento Sustentável**.

---

## Funcionalidades

- Visualização interactiva de mapas
- Activação e desactivação de camadas
- Visualização de raster NDVI
- Visualização do DEM
- Interface WebGIS baseada em Leaflet
- Dashboard com estatísticas ambientais

---

## Tecnologias Utilizadas

- Python
- Flask
- Leaflet
- HTML5
- CSS3
- JavaScript
- GeoJSON
- QGIS

---

## Estrutura do Projecto

```
SIG_Aplicado_WebGIS
│
├── data/
├── static/
│   ├── css/
│   └── js/
├── templates/
├── app.py
├── requirements.txt
└── README.md
```

---

## Como executar

1. Instalar as dependências

```bash
pip install -r requirements.txt
```

2. Executar o servidor

```bash
python app.py
```

3. Abrir no navegador

```
http://127.0.0.1:5000
```

---

## Autor

**João Fortunato e Carlos Tembe**

Universidade Técnica de Moçambique

Disciplina:

**SIG Aplicado à Gestão Ambiental e Desenvolvimento Sustentável**

Ano: 2026