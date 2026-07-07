from flask import Flask, render_template, jsonify, send_from_directory
import geopandas as gpd
import os

app = Flask(__name__)

DATA_FOLDER = "data"


# =====================================================
# LER GEOJSON
# =====================================================

def carregar_geojson(nome):

    caminho = os.path.join(DATA_FOLDER, nome)

    if not os.path.exists(caminho):

        return {
            "type": "FeatureCollection",
            "features": []
        }

    gdf = gpd.read_file(caminho)

    if gdf.crs is not None:

        gdf = gdf.to_crs(epsg=4326)

    return gdf.__geo_interface__


# =====================================================
# PÁGINA PRINCIPAL
# =====================================================

@app.route("/")
def index():

    return render_template("index.html")


# =====================================================
# ESTADO DO SISTEMA
# =====================================================

@app.route("/status")
def status():

    return jsonify({

        "estado":"online",

        "sistema":"Sistema WebGIS",

        "area":"Distrito de Chókwè"

    })


# =====================================================
# LIMITE
# =====================================================

@app.route("/api/limite")
def limite():

    return jsonify(

        carregar_geojson("Limite_chokwe.geojson")

    )


# =====================================================
# DRENAGEM
# =====================================================

@app.route("/api/drenagem")
def drenagem():

    return jsonify(

        carregar_geojson("rede_drenagem.geojson")

    )


# =====================================================
# USO DO SOLO
# =====================================================

@app.route("/api/uso_solo")
def uso_solo():

    return jsonify(

        carregar_geojson("uso_solo.geojson")

    )


# =====================================================
# SOLOS
# =====================================================

@app.route("/api/solos")
def solos():

    return jsonify(

        carregar_geojson("solos.geojson")

    )


# =====================================================
# NDVI
# =====================================================

@app.route("/raster/ndvi")
def ndvi():

    return send_from_directory(

        DATA_FOLDER,

        "NDVI_Classificado_Chokwe_2025_Render.tif"

    )


# =====================================================
# DEM
# =====================================================

@app.route("/raster/dem")
def dem():

    return send_from_directory(

        DATA_FOLDER,

        "dem.tif"

    )


# =====================================================
# EXECUTAR
# =====================================================

if __name__ == "__main__":

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=True

    )